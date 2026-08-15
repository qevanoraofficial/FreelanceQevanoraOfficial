import { NextResponse } from "next/server";
import { getManagedContentItems } from "@/lib/managed-content-store";
import { isManagedSection } from "@/types/managed-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Context = { params: Promise<{ section: string }> };

export async function GET(_request: Request, context: Context) {
  const { section } = await context.params;

  if (!isManagedSection(section)) {
    return NextResponse.json(
      { ok: false, error: "Section tidak valid.", items: [] },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const items = await getManagedContentItems(section);
    return NextResponse.json(
      { ok: true, items },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        items: [],
        error: error instanceof Error ? error.message : "Data gagal dimuat.",
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
