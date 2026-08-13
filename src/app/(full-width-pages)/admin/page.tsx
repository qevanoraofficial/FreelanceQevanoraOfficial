import AdminMenuShell from "@/components/admin/AdminMenuShell";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Menu | QEVANORA OFFICIAL",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

type AdminMenuPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

type AdminMenuCardProps = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
};

function MenuIcon({ type }: { type: string }) {
  if (type === "wallet") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <path d="M4 7.5h14.5A1.5 1.5 0 0 1 20 9v9a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 12h4v4h-4a2 2 0 1 1 0-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "plus") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "stock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "trash") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5M14 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "testimonial") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <path d="m12 3 2.2 4.46 4.92.72-3.56 3.47.84 4.9L12 14.23l-4.4 2.32.84-4.9-3.56-3.47 4.92-.72L12 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M8.5 19.3 7.8 22l4.2-2.2 4.2 2.2-.7-2.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function AdminMenuCard({ href, title, description, icon }: AdminMenuCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-brand-500/[0.06]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/35 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-400/20 bg-brand-500/10 text-brand-300 transition group-hover:border-brand-300/45 group-hover:bg-brand-500/15">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold text-white">{title}</span>
          <span className="mt-1.5 block text-sm leading-6 text-gray-400">
            {description}
          </span>
        </span>
        <span className="mt-3 text-brand-300 transition-transform group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}

export default async function AdminMenuPage({ searchParams }: AdminMenuPageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = verifyAdminSessionToken(session);
  const { error } = await searchParams;

  return (
    <AdminMenuShell>
      <main className="relative min-h-[calc(100vh-150px)] overflow-hidden rounded-3xl border border-brand-500/10 bg-[#020b18] text-white shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(214,166,47,0.15),transparent_34%),radial-gradient(circle_at_100%_15%,rgba(37,99,235,0.14),transparent_30%)]" />
        <div className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full border border-brand-500/10" />
        <div className="pointer-events-none absolute -right-10 top-44 h-48 w-48 rounded-full border border-blue-500/10" />

        <div className="relative mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-brand-500/20 blur-lg" />
                <Image
                  src="/images/logo/digie-store-icon.png"
                  alt="Logo QEVANORA OFFICIAL"
                  width={64}
                  height={64}
                  priority
                  className="relative h-16 w-16 rounded-2xl object-contain"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-brand-300 sm:text-xs">
                  QEVANORA OFFICIAL
                </p>
                <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                  ADMIN MENU
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                  Control center untuk pengelolaan Qevanora Official.
                </p>
              </div>
            </div>

            {isAuthenticated && (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-2 text-xs font-bold text-green-300">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  ADMIN ACTIVE
                </span>
                <form action="/api/qevanora-admin/logout" method="post">
                  <button
                    type="submit"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
                  >
                    LOGOUT
                  </button>
                </form>
              </div>
            )}
          </div>

          {!isAuthenticated ? (
            <div className="grid gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
              <div className="max-w-xl">
                <span className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] text-brand-300">
                  PRIVATE ADMIN ACCESS
                </span>
                <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                  Kelola website dari Admin Menu yang baru.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                  Masuk menggunakan password administrator. Sistem session server tetap dipertahankan untuk keamanan, tetapi halaman admin lama tidak digunakan lagi sebagai tampilan utama.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "Produk"],
                    ["02", "Saldo"],
                    ["03", "Testimoni"],
                  ].map(([number, label]) => (
                    <div key={number} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                      <span className="text-xs font-black text-brand-300">{number}</span>
                      <span className="mt-1 block text-sm font-bold text-gray-200">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <section className="rounded-3xl border border-brand-500/15 bg-[#041226]/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 text-brand-300">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
                    <path d="M7 10V8a5 5 0 0 1 10 0v2m-11 0h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 14v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <h2 className="mt-5 text-xl font-black">Admin Access</h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Masukkan password admin untuk membuka menu pengelolaan.
                </p>

                {error === "invalid" && (
                  <div role="alert" className="mt-5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    Password admin salah. Coba lagi.
                  </div>
                )}

                {error === "config" && (
                  <div role="alert" className="mt-5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300">
                    Secret session admin belum tersedia di environment deployment.
                  </div>
                )}

                <form action="/api/qevanora-admin/login" method="post" className="mt-6">
                  <label htmlFor="admin-password" className="text-xs font-bold tracking-[0.14em] text-gray-300">
                    PASSWORD ADMIN
                  </label>
                  <input
                    id="admin-password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="Masukkan password admin"
                    className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-brand-400/60 focus:ring-4 focus:ring-brand-500/10"
                  />
                  <button
                    type="submit"
                    className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-500 px-5 text-sm font-black text-[#031126] transition hover:bg-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/20"
                  >
                    BUKA ADMIN MENU
                  </button>
                </form>
              </section>
            </div>
          ) : (
            <div className="py-8 sm:py-10">
              <div className="mb-6">
                <h2 className="text-xl font-black sm:text-2xl">Pilih Menu Pengelolaan</h2>
                <p className="mt-2 text-sm text-gray-400">
                  Pilih fitur admin yang ingin dikelola.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <AdminMenuCard
                  href="/admin/panel#summary"
                  title="Dashboard"
                  description="Lihat ringkasan statistik dan aktivitas website."
                  icon={<MenuIcon type="dashboard" />}
                />
                <AdminMenuCard
                  href="/admin/panel#saldo"
                  title="Saldo & Top Up"
                  description="Kelola saldo, top up, dan data transaksi member."
                  icon={<MenuIcon type="wallet" />}
                />
                <AdminMenuCard
                  href="/admin/panel/products/add"
                  title="Tambah Produk"
                  description="Tambahkan produk atau layanan baru ke katalog."
                  icon={<MenuIcon type="plus" />}
                />
                <AdminMenuCard
                  href="/admin/panel/products/stock"
                  title="Edit Stock"
                  description="Atur dan perbarui stock produk yang tersedia."
                  icon={<MenuIcon type="stock" />}
                />
                <AdminMenuCard
                  href="/admin/panel/products/delete"
                  title="Hapus Produk"
                  description="Hapus produk yang sudah tidak digunakan."
                  icon={<MenuIcon type="trash" />}
                />
                <AdminMenuCard
                  href="/admin/panel#add-testimonial"
                  title="Testimoni"
                  description="Kelola testimoni yang tampil di website."
                  icon={<MenuIcon type="testimonial" />}
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
                <span>Admin Menu baru aktif dan terhubung ke session Qevanora.</span>
                <Link href="/" className="font-bold text-brand-300 transition hover:text-brand-200">
                  Kembali ke Home →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </AdminMenuShell>
  );
}
