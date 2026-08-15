"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import DashboardIcon from "@/icons/grid.svg";

type SectionKey = "freelance" | "testimoni" | "blacklist" | "tutorial";
type ActionKey = "add" | "edit" | "hapus";

type SectionItem = {
  key: SectionKey;
  label: string;
  icon: "freelance" | "testimoni" | "blacklist" | "tutorial";
};

const sections: SectionItem[] = [
  { key: "freelance", label: "ꜰʀᴇᴇʟᴀɴᴄᴇ", icon: "freelance" },
  { key: "testimoni", label: "ᴛᴇꜱᴛɪᴍᴏɴɪ", icon: "testimoni" },
  { key: "blacklist", label: "ʙʟᴀᴄᴋʟɪꜱᴛ", icon: "blacklist" },
  { key: "tutorial", label: "ᴛᴜᴛᴏʀɪᴀʟ", icon: "tutorial" },
];

const actions: { key: ActionKey; label: string }[] = [
  { key: "add", label: "ADD" },
  { key: "edit", label: "EDIT" },
  { key: "hapus", label: "HAPUS" },
];

function SectionIcon({ type }: { type: SectionItem["icon"] }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  } as const;

  if (type === "testimoni") {
    return (
      <svg {...common}>
        <path d="M4 5h16v12H8l-4 4V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m12 8 1.1 2.2 2.4.35-1.75 1.7.42 2.4L12 13.5l-2.17 1.15.42-2.4-1.75-1.7 2.4-.35L12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "blacklist") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5.7 18.3 18.3 5.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "tutorial") {
    return (
      <svg {...common}>
        <path d="M3 5.5h6.5A2.5 2.5 0 0 1 12 8v12a2.5 2.5 0 0 0-2.5-2.5H3v-12Zm18 0h-6.5A2.5 2.5 0 0 0 12 8v12a2.5 2.5 0 0 1 2.5-2.5H21v-12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 20V8l8-4 8 4v12H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 20v-6h8v6M8 9h.01M12 9h.01M16 9h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function sectionFromPath(pathname: string): SectionKey | null {
  for (const section of sections) {
    if (pathname.startsWith(`/admin/panel/${section.key}/`)) {
      return section.key;
    }
  }
  return null;
}

export default function AdminSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileSidebar } = useSidebar();
  const pathname = usePathname();
  const activeSection = sectionFromPath(pathname);
  const [openSection, setOpenSection] = useState<SectionKey | null>(activeSection);

  useEffect(() => {
    if (activeSection) setOpenSection(activeSection);
  }, [activeSection]);

  const showLabels = isExpanded || isHovered || isMobileOpen;
  const dashboardActive = pathname === "/admin/panel";

  const closeMobileSidebar = () => {
    if (isMobileOpen) toggleMobileSidebar();
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 mt-16 flex h-screen flex-col border-r border-brand-500/15 bg-[#020b18] px-5 text-white transition-all duration-300 ease-in-out lg:mt-0 ${isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"} ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex py-8 ${!showLabels ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/admin/panel" className="flex items-center gap-3" onClick={closeMobileSidebar}>
          <Image src="/images/logo/digie-store-icon.png" alt="Logo QEVANORA OFFICIAL" width={42} height={42} className="qevanora-brand-mark h-10 w-10 shrink-0 object-contain" priority />
          {showLabels && <span className="qevanora-brand-wordmark whitespace-nowrap text-xl font-bold">QEVANORA OFFICIAL</span>}
        </Link>
      </div>

      <nav className="mb-6 flex flex-col overflow-y-auto pb-8 duration-300 ease-linear no-scrollbar">
        <ul className="flex flex-col gap-3">
          <li>
            <Link href="/admin/panel" onClick={closeMobileSidebar} className={`menu-item group ${dashboardActive ? "menu-item-active" : "menu-item-inactive"} ${!showLabels ? "lg:justify-center" : "lg:justify-start"}`}>
              <span className={dashboardActive ? "menu-item-icon-active" : "menu-item-icon-inactive"}><DashboardIcon /></span>
              {showLabels && <span className="menu-item-text">ᴅᴀꜱʜʙᴏᴀʀᴅ</span>}
            </Link>
          </li>

          {sections.map((section) => {
            const open = openSection === section.key;
            const active = activeSection === section.key;

            return (
              <li key={section.key}>
                <button
                  type="button"
                  onClick={() => setOpenSection((current) => current === section.key ? null : section.key)}
                  aria-expanded={open}
                  className={`menu-item group w-full ${active ? "menu-item-active" : "menu-item-inactive"} ${!showLabels ? "lg:justify-center" : "lg:justify-start"}`}
                >
                  <span className={active ? "menu-item-icon-active" : "menu-item-icon-inactive"}><SectionIcon type={section.icon} /></span>
                  {showLabels && <><span className="menu-item-text flex-1 text-left">{section.label}</span><ChevronIcon open={open} /></>}
                </button>

                {showLabels && open && (
                  <ul className="mt-2 space-y-1 border-l border-brand-500/20 pl-4">
                    {actions.map((action) => {
                      const href = `/admin/panel/${section.key}/${action.key}`;
                      const actionActive = pathname === href;
                      return (
                        <li key={action.key}>
                          <Link href={href} onClick={closeMobileSidebar} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${actionActive ? "bg-brand-500/12 text-brand-300" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
                            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${actionActive ? "bg-brand-300" : "bg-gray-500"}`} />
                            {action.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
