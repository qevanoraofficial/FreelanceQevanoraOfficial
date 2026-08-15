import ManagedContentGrid from "@/components/content/ManagedContentGrid";
import { getManagedContentItems } from "@/lib/managed-content-store";
import type { ManagedContentItem } from "@/types/managed-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Testimoni | QEVANORA OFFICIAL",
  description: "Testimoni QEVANORA OFFICIAL.",
};

export default async function TestimonialsPage() {
  let items: ManagedContentItem[] = [];
  let error = "";

  try {
    items = await getManagedContentItems("testimoni");
  } catch (cause) {
    error =
      cause instanceof Error
        ? cause.message
        : "Data testimoni gagal dimuat.";
  }

  return (
    <ManagedContentGrid
      eyebrow="ᴛᴇꜱᴛɪᴍᴏɴɪ"
      title="Testimoni"
      description="Testimoni QEVANORA OFFICIAL."
      emptyMessage="Belum ada testimoni yang ditambahkan."
      items={items}
      error={error || undefined}
    />
  );
}
