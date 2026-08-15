import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Admin Management | QEVANORA OFFICIAL",
  robots: { index: false, follow: false, nocache: true },
};

const sectionLabels = {
  freelance: "ꜰʀᴇᴇʟᴀɴᴄᴇ",
  testimoni: "ᴛᴇꜱᴛɪᴍᴏɴɪ",
  blacklist: "ʙʟᴀᴄᴋʟɪꜱᴛ",
  tutorial: "ᴛᴜᴛᴏʀɪᴀʟ",
} as const;

const actionLabels = {
  add: "ADD",
  edit: "EDIT",
  hapus: "HAPUS",
} as const;

type SectionKey = keyof typeof sectionLabels;
type ActionKey = keyof typeof actionLabels;

type Props = {
  params: Promise<{ section: string; action: string }>;
};

function isSection(value: string): value is SectionKey {
  return Object.prototype.hasOwnProperty.call(sectionLabels, value);
}

function isAction(value: string): value is ActionKey {
  return Object.prototype.hasOwnProperty.call(actionLabels, value);
}

function ActionIcon({ action }: { action: ActionKey }) {
  if (action === "hapus") {
    return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5M14 11v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }

  if (action === "edit") {
    return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 20 4.2-1 10.6-10.6a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="m14.5 6.7 2.8 2.8" stroke="currentColor" strokeWidth="1.8" /></svg>;
  }

  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
}

export default async function AdminCrudPage({ params }: Props) {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifyAdminSessionToken(session)) redirect("/admin");

  const { section, action } = await params;
  if (!isSection(section) || !isAction(action)) notFound();

  return (
    <main className="min-w-0">
      <section className="relative overflow-hidden rounded-3xl border border-brand-500/15 bg-[#031126] p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.24)] sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,166,47,0.12),transparent_38%)]" />
        <div className="relative flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 text-brand-300"><ActionIcon action={action} /></span>
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-brand-300">ADMIN MANAGEMENT</p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">{actionLabels[action]} {sectionLabels[section]}</h1>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-brand-500/15 bg-[#031126] p-5 text-white sm:p-7">
        <div className="rounded-2xl border border-dashed border-brand-500/20 bg-white/[0.02] px-5 py-12 text-center">
          <p className="text-sm font-bold text-brand-300">HALAMAN {actionLabels[action]} {sectionLabels[section]}</p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">Sub halaman sudah aktif dan siap diisi fitur pengelolaan.</p>
        </div>
      </section>
    </main>
  );
}
