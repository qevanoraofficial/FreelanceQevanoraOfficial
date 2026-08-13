import AdminMenuShell from "@/components/admin/AdminMenuShell";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Access | QEVANORA OFFICIAL",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

type AdminPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (verifyAdminSessionToken(session)) {
    redirect("/admin/panel");
  }

  const { error } = await searchParams;

  return (
    <AdminMenuShell>
      <main className="flex min-h-[calc(100vh-150px)] items-center justify-center px-2 py-8 sm:px-4">
        <section className="w-full max-w-xl rounded-[28px] border border-brand-500/15 bg-[#041226]/95 p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:p-9">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 text-brand-300">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-8 w-8"
            >
              <path
                d="M7 10V8a5 5 0 0 1 10 0v2m-11 0h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14v3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl">
            Admin Access
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-400">
            Masukkan password admin untuk membuka menu pengelolaan.
          </p>

          {error === "invalid" && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              Password admin salah. Coba lagi.
            </div>
          )}

          {error === "config" && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              Konfigurasi keamanan admin belum siap.
            </div>
          )}

          <form
            action="/api/qevanora-admin/login"
            method="post"
            className="mt-8"
          >
            <label
              htmlFor="admin-password"
              className="text-sm font-black tracking-[0.15em] text-gray-300"
            >
              PASSWORD ADMIN
            </label>

            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              spellCheck={false}
              placeholder="Masukkan password admin"
              className="mt-3 h-14 w-full rounded-2xl border border-white/10 bg-black/20 px-5 text-base text-white outline-none transition placeholder:text-gray-600 focus:border-brand-400/60 focus:ring-4 focus:ring-brand-500/10"
            />

            <button
              type="submit"
              className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-brand-500 px-6 text-base font-black text-[#031126] transition hover:bg-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/20"
            >
              BUKA ADMIN MENU
            </button>
          </form>
        </section>
      </main>
    </AdminMenuShell>
  );
}
