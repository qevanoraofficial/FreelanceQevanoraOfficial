import AnimatedStoreIntro from "@/components/home/AnimatedStoreIntro";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "QEVANORA OFFICIAL | Produk Digital Terpercaya",
  description:
    "Temukan produk digital, testimoni transaksi, status order, dan dukungan resmi QEVANORA OFFICIAL dalam satu website.",
};

export default function HomePage() {
  return <AnimatedStoreIntro />;
}
