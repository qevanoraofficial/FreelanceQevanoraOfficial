import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Menu | QEVANORA OFFICIAL",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminPage() {
  return <main className="min-h-screen bg-[#010714]" />;
}
