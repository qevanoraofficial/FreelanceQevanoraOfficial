import ManagedContentGrid from "@/components/content/ManagedContentGrid";
import { getManagedContentItems } from "@/lib/managed-content-store";
import type { ManagedContentItem } from "@/types/managed-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blacklist | QEVANORA OFFICIAL",
  description: "Informasi blacklist QEVANORA OFFICIAL.",
};

export default async function BlacklistPage() {
  let items: ManagedContentItem[] = [];
  let error = "";

  try {
    items = await getManagedContentItems("blacklist");
  } catch (cause) {
    error =
      cause instanceof Error
        ? cause.message
        : "Data blacklist gagal dimuat.";
  }

  return (
    <ManagedContentGrid
      eyebrow="ʙʟᴀᴄᴋʟɪꜱᴛ"
      title="Blacklist"
      description="Informasi blacklist QEVANORA OFFICIAL."
      emptyMessage="Belum ada data blacklist yang ditambahkan."
      items={items}
      error={error || undefined}
    />
  );
}
