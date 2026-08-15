import Image from "next/image";
import type { ManagedContentItem } from "@/types/managed-content";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  emptyMessage: string;
  items: ManagedContentItem[];
  error?: string;
};

function mediaUrl(path: string): string {
  return `/api/media?path=${encodeURIComponent(path)}`;
}

export default function ManagedContentGrid({
  eyebrow,
  title,
  description,
  emptyMessage,
  items,
  error,
}: Props) {
  return (
    <div className="space-y-6">
      <section className="qevanora-card rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] sm:p-8">
        <p className="text-xs font-bold tracking-[0.24em] text-brand-500">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!error && items.length === 0 && (
        <section className="qevanora-card rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {emptyMessage}
          </p>
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.id}
            className="qevanora-card overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/20">
              <Image
                src={mediaUrl(item.imagePath)}
                alt={item.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="p-5 sm:p-6">
              <h2 className="break-words text-xl font-bold text-gray-900 dark:text-white">
                {item.name}
              </h2>
              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-gray-600 dark:text-gray-300">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
