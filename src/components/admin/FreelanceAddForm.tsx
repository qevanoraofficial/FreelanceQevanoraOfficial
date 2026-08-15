"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type RequestState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export default function FreelanceAddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState<RequestState>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handlePhotoChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setState(null);

    try {
      const response = await fetch("/api/qevanora-admin/freelance", {
        method: "POST",
        body: new FormData(event.currentTarget),
        credentials: "same-origin",
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || payload.ok === false) {
        throw new Error(
          payload.error || "Freelance gagal ditambahkan.",
        );
      }

      formRef.current?.reset();

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
      }

      setState({
        type: "success",
        message:
          "Freelance berhasil ditambahkan dan sudah tersedia di halaman Freelance.",
      });
    } catch (error) {
      setState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Freelance gagal ditambahkan.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-6 rounded-3xl border border-brand-500/15 bg-[#031126] p-5 text-white sm:p-7">
      <form ref={formRef} onSubmit={submit} className="space-y-6">
        {state && (
          <div
            role="alert"
            className={`rounded-2xl border px-4 py-3 text-sm ${
              state.type === "success"
                ? "border-green-500/25 bg-green-500/10 text-green-300"
                : "border-red-500/25 bg-red-500/10 text-red-300"
            }`}
          >
            {state.message}
          </div>
        )}

        <div>
          <label
            htmlFor="freelance-name"
            className="mb-2 block text-sm font-bold text-[#f7e6a8]"
          >
            NAMA FREELANCE
          </label>
          <input
            id="freelance-name"
            name="name"
            type="text"
            required
            autoComplete="off"
            placeholder="Masukkan nama freelance"
            className="h-12 w-full rounded-xl border border-brand-500/20 bg-[#020b18] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-brand-400"
          />
        </div>

        <div>
          <label
            htmlFor="freelance-text"
            className="mb-2 block text-sm font-bold text-[#f7e6a8]"
          >
            TEXT
          </label>
          <textarea
            id="freelance-text"
            name="text"
            required
            rows={12}
            placeholder="Masukkan text freelance. Panjang text tidak dibatasi oleh form."
            className="min-h-72 w-full resize-y rounded-xl border border-brand-500/20 bg-[#020b18] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 focus:border-brand-400"
          />
          <p className="mt-2 text-xs text-gray-500">
            Tidak ada maxLength pada text. Baris baru akan tetap ditampilkan.
          </p>
        </div>

        <div>
          <label
            htmlFor="freelance-photo"
            className="mb-2 block text-sm font-bold text-[#f7e6a8]"
          >
            PHOTO
          </label>

          <label
            htmlFor="freelance-photo"
            className="flex min-h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-brand-500/25 bg-[#020b18] p-4 text-center transition hover:border-brand-400/50"
          >
            {previewUrl ? (
              <div className="relative h-56 w-full overflow-hidden rounded-xl">
                <Image
                  src={previewUrl}
                  alt="Preview photo freelance"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-brand-300"
                >
                  <path
                    d="M4 5h16v14H4V5Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9"
                    cy="10"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="m5 17 4-4 3 3 2-2 5 3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="mt-3 text-sm font-bold text-gray-300">
                  Pilih Photo
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  JPG, PNG, atau WEBP
                </span>
              </>
            )}
          </label>

          <input
            id="freelance-photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            onChange={handlePhotoChange}
            className="sr-only"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-brand-500 px-5 text-sm font-black text-[#031126] transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "MENYIMPAN..." : "ADD FREELANCE"}
          </button>

          <Link
            href="/freelance"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-bold text-gray-300 transition hover:border-brand-400/30 hover:text-white"
          >
            LIHAT FREELANCE
          </Link>
        </div>
      </form>
    </section>
  );
}
