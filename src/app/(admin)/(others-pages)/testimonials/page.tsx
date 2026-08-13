import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimoni | QEVANORA OFFICIAL",
  description: "Halaman testimoni QEVANORA OFFICIAL.",
};

export default function TestimonialsPage() {
  return (
    <section className="flex min-h-[420px] items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="max-w-md">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Testimoni
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Belum ada testimoni yang ditampilkan.
        </p>
      </div>
    </section>
  );
}
