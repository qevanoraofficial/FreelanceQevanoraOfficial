import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorial | QEVANORA OFFICIAL",
  description: "Tutorial dan panduan QEVANORA OFFICIAL.",
};

export default function TutorialPage() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-5 py-8 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Tutorial
        </h1>
        <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
          Panduan penggunaan layanan QEVANORA OFFICIAL akan ditampilkan di halaman ini.
        </p>
      </div>
    </section>
  );
}
