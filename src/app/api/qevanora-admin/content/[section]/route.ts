import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  adminUnauthorizedResponse,
  isAdminRequest,
  isSameOriginRequest,
} from "@/lib/admin-api";
import { readImageUpload } from "@/lib/catalog-upload";
import {
  addManagedContentItem,
  deleteManagedContentItem,
  editManagedContentItem,
  getManagedContentItems,
} from "@/lib/managed-content-store";
import {
  deleteRepositoryFile,
  writeRepositoryFile,
} from "@/lib/github-store";
import {
  isManagedSection,
  type ManagedContentItem,
  type ManagedSection,
} from "@/types/managed-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ section: string }>;
};

function json(
  body: Record<string, unknown>,
  status = 200,
): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function validate(
  request: NextRequest,
  context: Context,
): Promise<
  | { section: ManagedSection }
  | { response: NextResponse }
> {
  if (!isSameOriginRequest(request)) {
    return {
      response: json(
        { ok: false, error: "Origin request tidak valid." },
        403,
      ),
    };
  }

  if (!isAdminRequest(request)) {
    return { response: adminUnauthorizedResponse() };
  }

  const { section } = await context.params;

  if (!isManagedSection(section)) {
    return {
      response: json(
        { ok: false, error: "Section admin tidak valid." },
        404,
      ),
    };
  }

  return { section };
}

function readRequiredText(
  formData: FormData,
  field: string,
  label: string,
): string {
  const value = String(formData.get(field) || "").trim();

  if (!value) {
    throw new Error(`${label} wajib diisi.`);
  }

  return value;
}

function imagePath(
  section: ManagedSection,
  id: string,
  extension: string,
): string {
  return `storage/${section}/${id}-${Date.now()}.${extension}`;
}

export async function POST(
  request: NextRequest,
  context: Context,
) {
  const validation = await validate(request, context);

  if ("response" in validation) {
    return validation.response;
  }

  const { section } = validation;
  let uploadedPath = "";

  try {
    const formData = await request.formData();
    const name = readRequiredText(
      formData,
      "name",
      "Nama",
    );
    const text = readRequiredText(
      formData,
      "text",
      "Text",
    );
    const photo = await readImageUpload(formData.get("photo"));
    const id = randomUUID();

    uploadedPath = imagePath(section, id, photo.extension);

    await writeRepositoryFile(
      uploadedPath,
      photo.bytes,
      `Upload ${section} image ${name}`,
    );

    const item: ManagedContentItem = {
      id,
      name,
      text,
      imagePath: uploadedPath,
      createdAt: new Date().toISOString(),
    };

    await addManagedContentItem(section, item);

    return json({ ok: true, item }, 201);
  } catch (error) {
    if (uploadedPath) {
      await deleteRepositoryFile(
        uploadedPath,
        `Cleanup failed ${section} upload`,
      ).catch(() => false);
    }

    return json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Data gagal ditambahkan.",
      },
      500,
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: Context,
) {
  const validation = await validate(request, context);

  if ("response" in validation) {
    return validation.response;
  }

  const { section } = validation;
  let newImagePath = "";

  try {
    const formData = await request.formData();
    const id = readRequiredText(formData, "id", "ID");
    const name = readRequiredText(
      formData,
      "name",
      "Nama",
    );
    const text = readRequiredText(
      formData,
      "text",
      "Text",
    );

    const currentItems = await getManagedContentItems(section);
    const current = currentItems.find((item) => item.id === id);

    if (!current) {
      return json(
        { ok: false, error: "Data yang ingin diedit tidak ditemukan." },
        404,
      );
    }

    const photoEntry = formData.get("photo");

    if (photoEntry instanceof File && photoEntry.size > 0) {
      const photo = await readImageUpload(photoEntry);
      newImagePath = imagePath(section, id, photo.extension);

      await writeRepositoryFile(
        newImagePath,
        photo.bytes,
        `Replace ${section} image ${name}`,
      );
    }

    const result = await editManagedContentItem(
      section,
      id,
      {
        name,
        text,
        imagePath: newImagePath || undefined,
      },
    );

    if (
      newImagePath &&
      result.previous.imagePath &&
      result.previous.imagePath !== newImagePath
    ) {
      await deleteRepositoryFile(
        result.previous.imagePath,
        `Delete old ${section} image`,
      ).catch(() => false);
    }

    return json({ ok: true, item: result.item });
  } catch (error) {
    if (newImagePath) {
      await deleteRepositoryFile(
        newImagePath,
        `Cleanup failed ${section} edit image`,
      ).catch(() => false);
    }

    return json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Data gagal diedit.",
      },
      500,
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: Context,
) {
  const validation = await validate(request, context);

  if ("response" in validation) {
    return validation.response;
  }

  const { section } = validation;

  try {
    const formData = await request.formData();
    const id = readRequiredText(formData, "id", "ID");
    const deleted = await deleteManagedContentItem(section, id);

    if (deleted.imagePath) {
      await deleteRepositoryFile(
        deleted.imagePath,
        `Delete ${section} image ${deleted.name}`,
      ).catch(() => false);
    }

    return json({ ok: true, item: deleted });
  } catch (error) {
    return json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Data gagal dihapus.",
      },
      500,
    );
  }
}
