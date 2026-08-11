"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import BuyProductButton from "@/components/products/BuyProductButton";

type PanelProductConfiguratorProps = {
  productId: string;
  category: string;
  categoryName: string;
  stock: number;
  supplier?: "follow" | "nokos" | "alfaprem" | "manual";
};

const panelPlans = [
  {
    id: "panel-4gb",
    name: "4 GB",
    price: 2_000,
    description: "Cocok untuk bot ringan",
  },
  {
    id: "panel-7gb",
    name: "7 GB",
    price: 5_000,
    description: "Lebih lega untuk aktivitas harian",
  },
  {
    id: "panel-10gb",
    name: "10 GB",
    price: 7_000,
    description: "Stabil untuk kebutuhan lebih besar",
  },
  {
    id: "panel-unlimited",
    name: "Unlimited",
    price: 10_000,
    description: "Pilihan maksimal tanpa batas RAM",
  },
] as const;

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PanelProductConfigurator({
  productId,
  category,
  categoryName,
  stock,
  supplier,
}: PanelProductConfiguratorProps) {
  const [selectedPlanId, setSelectedPlanId] =
    useState<(typeof panelPlans)[number]["id"]>("panel-4gb");
  const [username, setUsername] = useState("");

  const selectedPlan = useMemo(
    () =>
      panelPlans.find((plan) => plan.id === selectedPlanId) ?? panelPlans[0],
    [selectedPlanId],
  );

  const cleanUsername = username.trim();
  const isAvailable = Number(stock) > 0;

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-b from-brand-500/[0.08] to-transparent p-4 dark:from-brand-500/[0.12] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-500 dark:text-brand-400">
            Konfigurasi Panel
          </p>
          <h2 className="mt-2 text-xl font-bold text-gray-800 dark:text-white/90 sm:text-2xl">
            Pilih paket yang kamu butuhkan
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Semua paket aktif selama satu bulan dan siap digunakan untuk
            menjalankan bot.
          </p>
        </div>

        <span
          className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
            isAvailable
              ? "bg-success-500/10 text-success-600 dark:text-success-400"
              : "bg-error-500/10 text-error-600 dark:text-error-400"
          }`}
        >
          {isAvailable ? "● Tersedia" : "● Stok Habis"}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 lg:grid-cols-4">
        {panelPlans.map((plan) => {
          const active = selectedPlanId === plan.id;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlanId(plan.id)}
              aria-pressed={active}
              className={`relative min-h-36 rounded-2xl border p-4 text-left transition sm:min-h-40 ${
                active
                  ? "border-brand-500 bg-brand-500/10 shadow-[0_14px_40px_rgba(8,119,217,0.14)]"
                  : "border-gray-200 bg-white/70 hover:border-brand-500/40 dark:border-gray-800 dark:bg-white/[0.03]"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold ${
                  active
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-gray-300 text-gray-400 dark:border-gray-700"
                }`}
                aria-hidden="true"
              >
                {active ? "✓" : "○"}
              </span>
              <span className="mt-4 block text-lg font-bold text-gray-800 dark:text-white/90">
                {plan.name}
              </span>
              <span className="mt-1 block text-base font-bold text-brand-500 dark:text-brand-400">
                {formatRupiah(plan.price)}
              </span>
              <span className="mt-2 block text-xs leading-5 text-gray-500 dark:text-gray-400">
                {plan.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-gray-200 bg-white/80 p-4 dark:border-gray-800 dark:bg-gray-900/60 sm:p-5">
        <label
          htmlFor="panel-username"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          Username Panel
        </label>
        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
          Gunakan huruf, angka, titik, garis bawah, atau tanda minus.
        </p>
        <input
          id="panel-username"
          type="text"
          value={username}
          onChange={(event) =>
            setUsername(
              event.target.value.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 60),
            )
          }
          autoComplete="username"
          inputMode="text"
          placeholder="Contoh: qevanora_bot"
          className="mt-3 h-12 w-full rounded-xl border border-gray-300 bg-transparent px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90"
        />

        <div className="mt-5 flex flex-col gap-4 border-t border-gray-200 pt-5 dark:border-gray-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Paket terpilih
            </p>
            <p className="mt-1 text-base font-bold text-gray-800 dark:text-white/90">
              PANEL {selectedPlan.name.toUpperCase()} · 1 BULAN
            </p>
            <p className="mt-1 text-2xl font-bold text-brand-500 dark:text-brand-400">
              {formatRupiah(selectedPlan.price)}
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:w-auto sm:min-w-72 sm:grid-cols-2">
            <BuyProductButton
              productId={productId}
              productName={`PANEL ${selectedPlan.name.toUpperCase()} | 1 BULAN`}
              categoryName={categoryName}
              price={selectedPlan.price}
              stock={stock}
              supplier={supplier}
              panelPlan={selectedPlan.id}
              panelUsername={cleanUsername}
            />
            <Link
              href={`/products/${category}`}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
