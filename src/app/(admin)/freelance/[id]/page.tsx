import Image from "next/image";
import { getManagedContentItems } from "@/lib/managed-content-store";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Freelance | QEVANORA OFFICIAL",
  description: "Detail layanan freelance QEVANORA OFFICIAL.",
};

type Props = {
  params: Promise<{ id: string }>;
};

function mediaUrl(path: string): string {
  return `/api/media?path=${encodeURIComponent(path)}`;
}

export default async function FreelanceDetailPage({ params }: Props) {
  const { id } = await params;
  const items = await getManagedContentItems("freelance");
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="qevanora-card rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] sm:p-8">
        <p className="text-xs font-bold tracking-[0.24em] text-brand-500">
          ꜰʀᴇᴇʟᴀɴᴄᴇ
        </p>
        <h1 className="mt-2 break-words text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {item.name}
        </h1>
      </section>

      <article className="qevanora-card overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/20">
          <Image
            src={mediaUrl(item.imagePath)}
            alt={item.name}
            fill
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="p-5 sm:p-7">
          <h2 className="break-words text-2xl font-bold text-gray-900 dark:text-white">
            {item.name}
          </h2>
          <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-gray-600 dark:text-gray-300">
            {item.text}
          </p>
        </div>
      </article>
    </div>
  );
}
