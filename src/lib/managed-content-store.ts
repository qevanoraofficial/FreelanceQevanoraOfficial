import "server-only";

import { readJsonArray, updateJsonArray } from "@/lib/github-store";
import type {
  ManagedContentItem,
  ManagedSection,
} from "@/types/managed-content";

const DEFAULT_FILES: Record<ManagedSection, string> = {
  freelance: "src/data/freelance.json",
  testimoni: "src/data/qevanora-testimoni.json",
  blacklist: "src/data/qevanora-blacklist.json",
  tutorial: "src/data/qevanora-tutorial.json",
};

const ENV_FILES: Record<ManagedSection, string> = {
  freelance: "FREELANCE_FILE",
  testimoni: "QEVANORA_TESTIMONI_FILE",
  blacklist: "QEVANORA_BLACKLIST_FILE",
  tutorial: "QEVANORA_TUTORIAL_FILE",
};

function contentFilePath(section: ManagedSection): string {
  return String(
    process.env[ENV_FILES[section]] || DEFAULT_FILES[section],
  ).trim();
}

export async function getManagedContentItems(
  section: ManagedSection,
): Promise<ManagedContentItem[]> {
  const snapshot = await readJsonArray<ManagedContentItem>(
    contentFilePath(section),
    [],
  );

  return [...snapshot.data].sort((a, b) =>
    String(b.updatedAt || b.createdAt).localeCompare(
      String(a.updatedAt || a.createdAt),
    ),
  );
}

export async function addManagedContentItem(
  section: ManagedSection,
  item: ManagedContentItem,
): Promise<ManagedContentItem> {
  return updateJsonArray<ManagedContentItem, ManagedContentItem>(
    contentFilePath(section),
    [],
    `Add ${section} ${item.name}`,
    (current) => ({
      data: [item, ...current.filter((entry) => entry.id !== item.id)],
      result: item,
    }),
  );
}

export async function editManagedContentItem(
  section: ManagedSection,
  id: string,
  values: {
    name: string;
    text: string;
    imagePath?: string;
  },
): Promise<{
  previous: ManagedContentItem;
  item: ManagedContentItem;
}> {
  return updateJsonArray<
    ManagedContentItem,
    {
      previous: ManagedContentItem;
      item: ManagedContentItem;
    }
  >(
    contentFilePath(section),
    [],
    `Edit ${section} ${id}`,
    (current) => {
      const index = current.findIndex((entry) => entry.id === id);

      if (index < 0) {
        throw new Error("Data yang ingin diedit tidak ditemukan.");
      }

      const previous = current[index];
      const item: ManagedContentItem = {
        ...previous,
        name: values.name,
        text: values.text,
        imagePath: values.imagePath || previous.imagePath,
        updatedAt: new Date().toISOString(),
      };

      const data = [...current];
      data[index] = item;

      return {
        data,
        result: { previous, item },
      };
    },
  );
}

export async function deleteManagedContentItem(
  section: ManagedSection,
  id: string,
): Promise<ManagedContentItem> {
  return updateJsonArray<ManagedContentItem, ManagedContentItem>(
    contentFilePath(section),
    [],
    `Delete ${section} ${id}`,
    (current) => {
      const item = current.find((entry) => entry.id === id);

      if (!item) {
        throw new Error("Data yang ingin dihapus tidak ditemukan.");
      }

      return {
        data: current.filter((entry) => entry.id !== id),
        result: item,
      };
    },
  );
}
