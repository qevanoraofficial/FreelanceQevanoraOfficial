"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import FreelanceIcon from "../icons/freelance.svg";
import HomeIcon from "../icons/home.svg";

const navItems = [
  { icon: <HomeIcon />, name: "ʜᴏᴍᴇ", path: "/" },
  {
    icon: <FreelanceIcon />,
    name: "ꜰʀᴇᴇʟᴀɴᴄᴇ",
    path: "/freelance",
  },
];

export default function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const showLabels = isExpanded || isHovered || isMobileOpen;

  return (
    <aside
      className={`fixed left-0 top-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:mt-0 ${
        isExpanded || isMobileOpen || isHovered
          ? "w-[min(290px,calc(100vw-24px))]"
          : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex py-8 ${
          !showLabels ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo/digie-store-icon.png"
            alt="Logo QEVANORA OFFICIAL"
            width={42}
            height={42}
            className="qevanora-brand-mark h-10 w-10 shrink-0 object-contain"
            priority
          />
          {showLabels && (
            <span className="leading-none">
              <span className="qevanora-brand-wordmark block whitespace-nowrap text-lg font-bold">
                QEVANORA OFFICIAL
              </span>
              <span className="mt-1.5 block text-[9px] font-bold tracking-[0.28em] text-brand-500">
                ꜰʀᴇᴇʟᴀɴᴄᴇ
              </span>
            </span>
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
              const active = item.path === pathname;

              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`menu-item group ${
                      active ? "menu-item-active" : "menu-item-inactive"
                    }`}
                  >
                    <span
                      className={
                        active
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                      }
                    >
                      {item.icon}
                    </span>
                    {showLabels && (
                      <span className="menu-item-text">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
