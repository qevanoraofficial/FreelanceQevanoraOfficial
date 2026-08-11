import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freelance | QEVANORA OFFICIAL",
  description: "Layanan freelance dari QEVANORA OFFICIAL.",
};

export default function FreelancePage() {
  return (
    <section className="qevanora-card rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] sm:p-8">
      <p className="text-xs font-bold tracking-[0.24em] text-brand-500">
        ꜰʀᴇᴇʟᴀɴᴄᴇ
      </p>
      <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Layanan Freelance
      </h1>
      <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
        Halaman layanan freelance QEVANORA OFFICIAL.
      </p>
    </section>
  );
}
