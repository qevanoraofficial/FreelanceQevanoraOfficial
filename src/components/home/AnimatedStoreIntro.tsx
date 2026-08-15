"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const benefits = [
  {
    title: "Sesuai Kebutuhan",
    text: "Setiap project dibahas berdasarkan kebutuhan dan hasil yang ingin dicapai.",
  },
  {
    title: "Komunikasi Jelas",
    text: "Detail pekerjaan, progress, dan revisi disampaikan dengan jelas.",
  },
  {
    title: "Harga Transparan",
    text: "Biaya dan scope disepakati terlebih dahulu sebelum pengerjaan dimulai.",
  },
  {
    title: "Pengerjaan Terarah",
    text: "Project dikerjakan mengikuti scope dan kesepakatan yang sudah dibuat.",
  },
];

const steps = [
  {
    number: "01",
    title: "Jelaskan kebutuhan",
    text: "Sampaikan kebutuhan project, detail pekerjaan, dan hasil yang diharapkan.",
  },
  {
    number: "02",
    title: "Sepakati pengerjaan",
    text: "Scope, biaya, revisi, dan detail pengerjaan dibahas sebelum project dimulai.",
  },
  {
    number: "03",
    title: "Project dikerjakan",
    text: "Pengerjaan berjalan sesuai kesepakatan dengan komunikasi dan progress yang jelas.",
  },
];

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3 12h18M10 12v2h4v-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={className}>{children}</section>;
}

export default function AnimatedStoreIntro() {
  return (
    <main className="relative isolate w-full overflow-x-clip pb-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-blue-light-500/10 blur-3xl" />
        <div className="absolute -right-24 top-[28rem] h-80 w-80 rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <Section className="py-6 sm:py-10 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <span className="qevanora-kicker inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-300">
              <span className="h-2 w-2 rounded-full bg-success-500" />
              Jasa freelance digital
            </span>

            <h1 className="qevanora-title-metallic mt-5 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              QEVANORA OFFICIAL
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
              Partner freelance untuk membantu kebutuhan digital Anda. Mulai
              dari pembahasan kebutuhan, proses pengerjaan, revisi, hingga
              penyelesaian project dilakukan dengan komunikasi yang jelas dan
              sesuai kesepakatan.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/freelance"
                className="qevanora-gold-button inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition"
              >
                Lihat Layanan Freelance
              </Link>

              <Link
                href="/testimonials"
                className="qevanora-blue-button inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition"
              >
                Lihat Testimoni
              </Link>
            </div>

            <div className="mt-7 border-y border-brand-500/20 py-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              <span className="mr-2 text-brand-500">✦</span>
              Kebutuhan digital dikerjakan lebih terarah, transparan, dan
              mudah dikomunikasikan bersama QEVANORA OFFICIAL.
            </div>
          </div>

          <div className="rounded-3xl border border-brand-500/20 bg-[#031126]/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="flex items-center gap-4 border-b border-brand-500/15 pb-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-500/25 bg-brand-500/10 text-brand-300">
                <WorkIcon />
              </span>

              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-brand-300">
                  FREELANCE SERVICE
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  Project Anda, dikerjakan lebih terarah
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-300">
                      <CheckIcon />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-gray-400">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/freelance"
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 px-4 text-sm font-bold text-brand-200 transition hover:bg-brand-500/15"
            >
              Buka Daftar Layanan
            </Link>
          </div>
        </div>
      </Section>

      <Section className="mt-4 rounded-3xl border border-brand-500/15 bg-[#031126]/70 p-5 sm:p-7">
        <p className="text-xs font-bold tracking-[0.22em] text-brand-300">
          CARA KERJA
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">
          Proses freelance yang sederhana
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number}>
              <p className="text-xs font-bold tracking-[0.2em] text-brand-300">
                {step.number}
              </p>
              <h3 className="mt-2 text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <footer className="mt-8 border-t border-gray-200 py-7 text-center dark:border-gray-800">
        <p className="text-sm font-medium leading-7 text-gray-500 dark:text-gray-400">
          © 2026 QEVANORA OFFICIAL. All Rights Reserved. Made with ❤️ in
          QEVANORA OFFICIAL
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-gray-400">
          <Link href="/privacy" className="hover:text-brand-500">
            Kebijakan Privasi
          </Link>
          <Link href="/disclaimer" className="hover:text-brand-500">
            Disclaimer
          </Link>
          <Link href="/support" className="hover:text-brand-500">
            Support
          </Link>
        </div>
      </footer>
    </main>
  );
}
