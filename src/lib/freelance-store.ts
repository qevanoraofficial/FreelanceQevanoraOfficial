import "server-only";

import { readJsonArray, updateJsonArray } from "@/lib/github-store";
import type { FreelanceItem } from "@/types/freelance";

function freelanceFilePath(): string {
  return String(
    process.env.FREELANCE_FILE || "src/data/freelance.json",
  ).trim();
}

export async function getFreelanceItems(): Promise<FreelanceItem[]> {
  const snapshot = await readJsonArray<FreelanceItem>(
    freelanceFilePath(),
    [],
  );

  return [...snapshot.data].sort((a, b) =>
    String(b.createdAt).localeCompare(String(a.createdAt)),
  );
}

export async function addFreelanceItem(
  item: FreelanceItem,
): Promise<FreelanceItem> {
  return updateJsonArray<FreelanceItem, FreelanceItem>(
    freelanceFilePath(),
    [],
    `Add freelance ${item.name}`,
    (current) => ({
      data: [item, ...current.filter((entry) => entry.id !== item.id)],
      result: item,
    }),
  );
}
