"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hero?: boolean;
};

function Reveal({ children, className = "", delay = 0, hero = false }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    const revealOnNextFrame = () => {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    };

    if (!element || typeof IntersectionObserver === "undefined") {
      return revealOnNextFrame();
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return revealOnNextFrame();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      {
        threshold: hero ? 0.04 : 0.16,
        rootMargin: hero ? "0px" : "0px 0px -8% 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hero]);

  return (
    <div
      ref={elementRef}
      style={{ "--qev-section-delay": `${delay}ms` } as CSSProperties}
      className={`${className} qev-reference-reveal ${hero ? "qev-reference-hero" : ""} ${
        isVisible ? "qev-reference-visible" : ""
      }`}
    >
      {children}
    </div>
  );
}

const marqueeText =
  "Percayakan kebutuhan digital Anda kepada QEVANORA OFFICIAL — solusi belanja produk digital yang terpercaya, berkualitas, dan siap memberikan pengalaman terbaik bagi setiap pelanggan.";

const trustMarqueeItems = [
  "Aman",
  "Cepat",
  "Praktis",
  "Harga transparan",
  "Status order",
  "Support resmi",
];

export default function AnimatedStoreIntro() {
  return (
    <main className="relative isolate w-full min-w-0 max-w-full overflow-x-clip pb-6">
      <style>{`
        @keyframes qevanoraTrustScrollLeft {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        .qevanora-marquee-track,
        .qevanora-trust-track {
          display: flex;
          flex: none;
          width: max-content;
          max-width: none;
          white-space: nowrap;
          animation: qevanoraTrustScrollLeft 14s linear infinite;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .qevanora-marquee-track,
          .qevanora-trust-track {
            animation-duration: 60s;
          }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-blue-light-500/10 blur-3xl dark:bg-blue-light-500/10" />
        <div className="absolute -right-24 top-[28rem] h-80 w-80 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/10" />
      </div>

      <Reveal hero>
        <section className="relative w-full min-w-0 max-w-full overflow-hidden py-6 sm:py-10 lg:py-14">

          <div className="grid w-full min-w-0 max-w-full items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14">
            <div className="w-full min-w-0 max-w-full overflow-hidden lg:pr-2">
              <span className="qevanora-kicker qev-hero-sequence qev-hero-seq-1 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-300">
                <span className="h-2 w-2 rounded-full bg-success-500 motion-safe:animate-pulse" />
                Produk digital terpercaya
              </span>

              <h1 className="qevanora-title-metallic qev-hero-sequence qev-hero-seq-2 mt-5 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                QEVANORA OFFICIAL
              </h1>

              <p className="qev-hero-sequence qev-hero-seq-3 mt-5 max-w-xl break-words text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                Menyediakan berbagai produk digital terpercaya dengan proses transaksi yang cepat, mudah, dan aman. Kami berkomitmen untuk memberikan pelayanan terbaik, kualitas produk yang terjamin, serta harga kompetitif yang tetap terjangkau untuk semua kalangan.
              </p>

              <div className="qev-hero-sequence qev-hero-seq-4 mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#produk-terbaru"
                  className="qevanora-gold-button inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition"
                >
                  Lihat Produk
                </a>

                <Link
                  href="/testimonials"
                  className="qevanora-blue-button inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition"
                >
                  Lihat Testimoni
                </Link>
              </div>

              <div style={{ contain: "inline-size" }} className="qev-hero-sequence qev-hero-seq-5 mt-7 w-full min-w-0 max-w-full overflow-hidden border-y border-brand-500/20 py-3">
                <div className="qevanora-marquee-track">
                  <span className="inline-flex shrink-0 items-center gap-3 px-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span className="text-brand-500">✦</span>
                    {marqueeText}
                  </span>
                  <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-3 px-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span className="text-brand-500">✦</span>
                    {marqueeText}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full min-w-0 max-w-2xl overflow-hidden lg:max-w-xl">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(214,166,47,0.18),transparent_68%)] blur-2xl" />

              <div className="relative w-full min-w-0 max-w-full overflow-hidden">
                <div className="qevanora-hero-frame qev-hero-visual w-full min-w-0 max-w-full overflow-hidden">
                  <Image
                    src="/images/logo/digie-store-home.png"
                    alt="Banner QEVANORA OFFICIAL"
                    width={1536}
                    height={1024}
                    priority
                    className="block h-auto w-full max-w-full object-contain"
                  />
                </div>

                <div style={{ contain: "inline-size" }} className="qev-hero-trust mt-5 w-full min-w-0 max-w-full overflow-hidden border-y border-brand-500/20 py-2.5">
                  <div className="qevanora-trust-track">
                    {["primary", "duplicate"].map((sequence) => (
                      <div
                        key={sequence}
                        aria-hidden={sequence === "duplicate" ? true : undefined}
                        className="flex shrink-0 items-center gap-5 pr-5"
                      >
                        {trustMarqueeItems.map((item) => (
                          <span
                            key={`${sequence}-${item}`}
                            className="inline-flex shrink-0 items-center gap-2 px-4 py-2 text-xs font-semibold text-[#f7d56e] sm:text-sm"
                          >
                            <Image
                              src="/images/icons/done-all.svg"
                              alt=""
                              width={18}
                              height={18}
                              aria-hidden="true"
                              unoptimized
                              className="h-[18px] w-[18px] shrink-0 object-contain"
                            />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal className="mt-5" delay={70}>
        <footer className="border-t border-gray-200 py-7 text-center dark:border-gray-800">
          <p className="text-sm font-medium leading-7 text-gray-500 dark:text-gray-400">
            © 2026 QEVANORA OFFICIAL. All Rights Reserved. Made with ❤️ in QEVANORA OFFICIAL
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
      </Reveal>
    </main>
  );
}
