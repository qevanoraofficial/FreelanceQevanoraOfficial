export const MANAGED_SECTIONS = [
  "freelance",
  "testimoni",
  "blacklist",
  "tutorial",
] as const;

export type ManagedSection = (typeof MANAGED_SECTIONS)[number];

export type ManagedContentItem = {
  id: string;
  name: string;
  text: string;
  imagePath: string;
  createdAt: string;
  updatedAt?: string;
};

export const MANAGED_SECTION_LABELS: Record<ManagedSection, string> = {
  freelance: "ꜰʀᴇᴇʟᴀɴᴄᴇ",
  testimoni: "ᴛᴇꜱᴛɪᴍᴏɴɪ",
  blacklist: "ʙʟᴀᴄᴋʟɪꜱᴛ",
  tutorial: "ᴛᴜᴛᴏʀɪᴀʟ",
};

export function isManagedSection(value: string): value is ManagedSection {
  return (MANAGED_SECTIONS as readonly string[]).includes(value);
}
