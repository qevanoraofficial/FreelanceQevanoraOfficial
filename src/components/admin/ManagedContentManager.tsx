"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type {
  ManagedContentItem,
  ManagedSection,
} from "@/types/managed-content";

type ActionKey = "add" | "edit" | "hapus";

type Props = {
  section: ManagedSection;
  action: ActionKey;
  initialItems: ManagedContentItem[];
  initialError?: string;
};

type MessageState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

const SECTION_NAMES: Record<ManagedSection, string> = {
  freelance: "FREELANCE",
  testimoni: "TESTIMONI",
  blacklist: "BLACKLIST",
  tutorial: "TUTORIAL",
};

function mediaUrl(path: string): string {
  return `/api/media?path=${encodeURIComponent(path)}`;
}

async function readPayload(response: Response) {
  const payload = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
    item?: ManagedContentItem;
  };

  if (!response.ok || payload.ok === false) {
    throw new Error(payload.error || "Permintaan gagal diproses.");
  }

  return payload;
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2 block text-sm font-bold text-[#f7e6a8]">
      {children}
    </span>
  );
}

function PhotoInput({
  required,
  name = "photo",
}: {
  required: boolean;
  name?: string;
}) {
  return (
    <input
      name={name}
      type="file"
      accept="image/jpeg,image/png,image/webp"
      required={required}
      className="block w-full rounded-xl border border-brand-500/20 bg-[#020b18] px-3 py-3 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-500 file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#031126]"
    />
  );
}

function EmptyState({
  section,
  action,
}: {
  section: ManagedSection;
  action: ActionKey;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-500/20 bg-white/[0.02] px-5 py-12 text-center">
      <p className="text-sm font-bold text-brand-300">
        BELUM ADA DATA {SECTION_NAMES[section]}
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
        Tambahkan data melalui menu ADD sebelum menggunakan menu{" "}
        {action === "edit" ? "EDIT" : "HAPUS"}.
      </p>
    </div>
  );
}

export default function ManagedContentManager({
  section,
  action,
  initialItems,
  initialError,
}: Props) {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(initialItems[0]?.id || "");
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState<MessageState>(
    initialError
      ? { type: "error", message: initialError }
      : null,
  );

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) || null,
    [items, selectedId],
  );

  async function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("add");
    setMessage(null);

    try {
      const form = event.currentTarget;
      const response = await fetch(
        `/api/qevanora-admin/content/${section}`,
        {
          method: "POST",
          body: new FormData(form),
          credentials: "same-origin",
        },
      );
      const payload = await readPayload(response);

      if (payload.item) {
        setItems((current) => [
          payload.item as ManagedContentItem,
          ...current,
        ]);
        setSelectedId(payload.item.id);
      }

      form.reset();
      setMessage({
        type: "success",
        message: `${SECTION_NAMES[section]} berhasil ditambahkan dan langsung tersedia di halaman publik.`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Data gagal ditambahkan.",
      });
    } finally {
      setBusy("");
    }
  }

  async function handleEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedItem) {
      return;
    }

    setBusy(`edit-${selectedItem.id}`);
    setMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      formData.set("id", selectedItem.id);

      const response = await fetch(
        `/api/qevanora-admin/content/${section}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "same-origin",
        },
      );
      const payload = await readPayload(response);

      if (payload.item) {
        const updated = payload.item as ManagedContentItem;
        setItems((current) =>
          current.map((item) =>
            item.id === updated.id ? updated : item,
          ),
        );
      }

      setMessage({
        type: "success",
        message: `${SECTION_NAMES[section]} berhasil diedit.`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Data gagal diedit.",
      });
    } finally {
      setBusy("");
    }
  }

  async function handleDelete(item: ManagedContentItem) {
    if (
      !window.confirm(
        `Hapus "${item.name}" dari ${SECTION_NAMES[section]}?`,
      )
    ) {
      return;
    }

    setBusy(`delete-${item.id}`);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.set("id", item.id);

      const response = await fetch(
        `/api/qevanora-admin/content/${section}`,
        {
          method: "DELETE",
          body: formData,
          credentials: "same-origin",
        },
      );
      await readPayload(response);

      const nextItems = items.filter((entry) => entry.id !== item.id);
      setItems(nextItems);

      if (selectedId === item.id) {
        setSelectedId(nextItems[0]?.id || "");
      }

      setMessage({
        type: "success",
        message: `${SECTION_NAMES[section]} berhasil dihapus.`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Data gagal dihapus.",
      });
    } finally {
      setBusy("");
    }
  }

  return (
    <section className="mt-6 rounded-3xl border border-brand-500/15 bg-[#031126] p-5 text-white sm:p-7">
      {message && (
        <div
          role="alert"
          className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-green-500/25 bg-green-500/10 text-green-300"
              : "border-red-500/25 bg-red-500/10 text-red-300"
          }`}
        >
          {message.message}
        </div>
      )}

      {action === "add" && (
        <form onSubmit={handleAdd} className="space-y-6">
          <label className="block">
            <FieldLabel>NAMA {SECTION_NAMES[section]}</FieldLabel>
            <input
              name="name"
              type="text"
              required
              autoComplete="off"
              placeholder={`Masukkan nama ${SECTION_NAMES[section].toLowerCase()}`}
              className="h-12 w-full rounded-xl border border-brand-500/20 bg-[#020b18] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-brand-400"
            />
          </label>

          <label className="block">
            <FieldLabel>TEXT</FieldLabel>
            <textarea
              name="text"
              required
              rows={12}
              placeholder="Masukkan text"
              className="min-h-72 w-full resize-y rounded-xl border border-brand-500/20 bg-[#020b18] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 focus:border-brand-400"
            />
            <span className="mt-2 block text-xs text-gray-500">
              Tidak ada maxLength pada text.
            </span>
          </label>

          <label className="block">
            <FieldLabel>PHOTO</FieldLabel>
            <PhotoInput required />
          </label>

          <button
            type="submit"
            disabled={busy === "add"}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-500 px-5 text-sm font-black text-[#031126] transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy === "add"
              ? "MENYIMPAN..."
              : `ADD ${SECTION_NAMES[section]}`}
          </button>
        </form>
      )}

      {action === "edit" &&
        (items.length === 0 ? (
          <EmptyState section={section} action={action} />
        ) : (
          <div className="space-y-6">
            <div>
              <FieldLabel>PILIH DATA YANG MAU DIEDIT</FieldLabel>
              <select
                value={selectedId}
                onChange={(event) => setSelectedId(event.target.value)}
                className="h-12 w-full rounded-xl border border-brand-500/20 bg-[#020b18] px-4 text-sm text-white outline-none focus:border-brand-400"
              >
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedItem && (
              <form
                key={selectedItem.id}
                onSubmit={handleEdit}
                className="space-y-6"
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={mediaUrl(selectedItem.imagePath)}
                      alt={selectedItem.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <label className="block">
                  <FieldLabel>
                    NAMA {SECTION_NAMES[section]}
                  </FieldLabel>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={selectedItem.name}
                    className="h-12 w-full rounded-xl border border-brand-500/20 bg-[#020b18] px-4 text-sm text-white outline-none transition focus:border-brand-400"
                  />
                </label>

                <label className="block">
                  <FieldLabel>TEXT</FieldLabel>
                  <textarea
                    name="text"
                    required
                    rows={12}
                    defaultValue={selectedItem.text}
                    className="min-h-72 w-full resize-y rounded-xl border border-brand-500/20 bg-[#020b18] px-4 py-3 text-sm leading-6 text-white outline-none transition focus:border-brand-400"
                  />
                  <span className="mt-2 block text-xs text-gray-500">
                    Tidak ada maxLength pada text.
                  </span>
                </label>

                <label className="block">
                  <FieldLabel>
                    PHOTO BARU (OPSIONAL)
                  </FieldLabel>
                  <PhotoInput required={false} />
                  <span className="mt-2 block text-xs text-gray-500">
                    Kosongkan kalau photo lama tidak ingin diganti.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={busy === `edit-${selectedItem.id}`}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-500 px-5 text-sm font-black text-[#031126] transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy === `edit-${selectedItem.id}`
                    ? "MENYIMPAN..."
                    : `SIMPAN EDIT ${SECTION_NAMES[section]}`}
                </button>
              </form>
            )}
          </div>
        ))}

      {action === "hapus" &&
        (items.length === 0 ? (
          <EmptyState section={section} action={action} />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#020b18]"
              >
                <div className="relative aspect-[16/9] w-full bg-black/20">
                  <Image
                    src={mediaUrl(item.imagePath)}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h2 className="break-words text-base font-bold text-white">
                    {item.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-400">
                    {item.text}
                  </p>

                  <button
                    type="button"
                    disabled={busy === `delete-${item.id}`}
                    onClick={() => handleDelete(item)}
                    className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 text-sm font-black text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {busy === `delete-${item.id}`
                      ? "MENGHAPUS..."
                      : `HAPUS ${SECTION_NAMES[section]}`}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ))}
    </section>
  );
}
