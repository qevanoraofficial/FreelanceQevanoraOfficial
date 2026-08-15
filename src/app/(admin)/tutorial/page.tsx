import ManagedContentGrid from "@/components/content/ManagedContentGrid";
import { getManagedContentItems } from "@/lib/managed-content-store";
import type { ManagedContentItem } from "@/types/managed-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Tutorial | QEVANORA OFFICIAL",
  description: "Tutorial dan panduan QEVANORA OFFICIAL.",
};

export default async function TutorialPage() {
  let items: ManagedContentItem[] = [];
  let error = "";

  try {
    items = await getManagedContentItems("tutorial");
  } catch (cause) {
    error =
      cause instanceof Error
        ? cause.message
        : "Data tutorial gagal dimuat.";
  }

  return (
    <ManagedContentGrid
      eyebrow="ᴛᴜᴛᴏʀɪᴀʟ"
      title="Tutorial"
      description="Tutorial dan panduan QEVANORA OFFICIAL."
      emptyMessage="Belum ada tutorial yang ditambahkan."
      items={items}
      error={error || undefined}
    />
  );
}
