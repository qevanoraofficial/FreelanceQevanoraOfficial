import ManagedContentGrid from "@/components/content/ManagedContentGrid";
import { getManagedContentItems } from "@/lib/managed-content-store";
import type { ManagedContentItem } from "@/types/managed-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Freelance | QEVANORA OFFICIAL",
  description: "Layanan freelance dari QEVANORA OFFICIAL.",
};

export default async function FreelancePage() {
  let items: ManagedContentItem[] = [];
  let error = "";

  try {
    items = await getManagedContentItems("freelance");
  } catch (cause) {
    error =
      cause instanceof Error
        ? cause.message
        : "Data freelance gagal dimuat.";
  }

  return (
    <ManagedContentGrid
      eyebrow="ꜰʀᴇᴇʟᴀɴᴄᴇ"
      title="Layanan Freelance"
      description="Layanan freelance QEVANORA OFFICIAL."
      emptyMessage="Belum ada freelance yang ditambahkan."
      items={items}
      error={error || undefined}
    />
  );
}
