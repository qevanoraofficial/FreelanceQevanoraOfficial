import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blacklist | QEVANORA OFFICIAL",
  description: "Informasi blacklist QEVANORA OFFICIAL.",
};

export default function BlacklistPage() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-5 py-8 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Blacklist
        </h1>
        <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
          Tidak ada data blacklist yang ditampilkan saat ini.
        </p>
      </div>
    </section>
  );
}
