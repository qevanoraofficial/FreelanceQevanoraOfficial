"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import type { ReactNode } from "react";

export default function AdminMenuShell({ children }: { children: ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen w-full min-w-0 max-w-full overflow-x-clip xl:flex">
      <AppSidebar />
      <Backdrop />

      <div
        className={`w-full min-w-0 max-w-full flex-1 overflow-x-clip transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="mx-auto w-full min-w-0 max-w-(--breakpoint-2xl) overflow-x-clip p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
