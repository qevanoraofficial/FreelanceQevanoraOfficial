import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  adminUnauthorizedResponse,
  isAdminRequest,
  isSameOriginRequest,
} from "@/lib/admin-api";
import { readImageUpload } from "@/lib/catalog-upload";
import { addFreelanceItem } from "@/lib/freelance-store";
import {
  deleteRepositoryFile,
  writeRepositoryFile,
} from "@/lib/github-store";
import type { FreelanceItem } from "@/types/freelance";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function noStoreJson(
  body: Record<string, unknown>,
  status = 200,
): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return noStoreJson(
      { ok: false, error: "Origin request tidak valid." },
      403,
    );
  }

  if (!isAdminRequest(request)) {
    return adminUnauthorizedResponse();
  }

  let imagePath = "";

  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const text = String(formData.get("text") || "").trim();

    if (!name) {
      return noStoreJson(
        { ok: false, error: "Nama freelance wajib diisi." },
        400,
      );
    }

    if (!text) {
      return noStoreJson(
        { ok: false, error: "Text freelance wajib diisi." },
        400,
      );
    }

    const image = await readImageUpload(formData.get("photo"));
    const id = randomUUID();
    imagePath = `storage/freelance/${id}.${image.extension}`;

    await writeRepositoryFile(
      imagePath,
      image.bytes,
      `Upload freelance image ${name}`,
    );

    const item: FreelanceItem = {
      id,
      name,
      text,
      imagePath,
      createdAt: new Date().toISOString(),
    };

    await addFreelanceItem(item);

    return noStoreJson({ ok: true, item }, 201);
  } catch (error) {
    if (imagePath) {
      await deleteRepositoryFile(
        imagePath,
        "Cleanup failed freelance upload",
      ).catch(() => false);
    }

    return noStoreJson(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Freelance gagal ditambahkan.",
      },
      500,
    );
  }
}
