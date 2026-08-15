import AnimatedStoreIntro from "@/components/home/AnimatedStoreIntro";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "QEVANORA OFFICIAL | Jasa Freelance Digital",
  description:
    "QEVANORA OFFICIAL menyediakan layanan freelance digital dengan komunikasi jelas, proses kerja terarah, harga transparan, dan hasil sesuai kebutuhan.",
};

export default function HomePage() {
  return <AnimatedStoreIntro />;
}
