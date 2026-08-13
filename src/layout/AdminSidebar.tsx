"use client";

import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import DashboardIcon from "@/icons/grid.svg";

export default function AdminSidebar() {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebar();

  const showLabels = isExpanded || isHovered || isMobileOpen;

  const closeMobileSidebar = () => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 mt-16 flex h-screen flex-col border-r border-brand-500/15 bg-[#020b18] px-5 text-white transition-all duration-300 ease-in-out lg:mt-0 ${
        isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex py-8 ${
          !showLabels ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link
          href="/admin/panel"
          className="flex items-center gap-3"
          onClick={closeMobileSidebar}
        >
          <Image
            src="/images/logo/digie-store-icon.png"
            alt="Logo QEVANORA OFFICIAL"
            width={42}
            height={42}
            className="qevanora-brand-mark h-10 w-10 shrink-0 object-contain"
            priority
          />
          {showLabels && (
            <span className="qevanora-brand-wordmark whitespace-nowrap text-xl font-bold">
              QEVANORA OFFICIAL
            </span>
          )}
        </Link>
      </div>

      <nav className="mb-6 flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              href="/admin/panel"
              onClick={closeMobileSidebar}
              className={`menu-item menu-item-active group ${
                !showLabels ? "lg:justify-center" : "lg:justify-start"
              }`}
            >
              <span className="menu-item-icon-active">
                <DashboardIcon />
              </span>

              {showLabels && (
                <span className="menu-item-text">ᴅᴀꜱʜʙᴏᴀʀᴅ</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
