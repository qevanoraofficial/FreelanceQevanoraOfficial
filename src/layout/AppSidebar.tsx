"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import FreelanceIcon from "../icons/freelance.svg";
import HomeIcon from "../icons/home.svg";
import TestimonialMenuIcon from "../icons/testimonial-menu.svg";

const BlacklistIcon = () => (
  <svg
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 2c1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.902 7.902 0 0 1 4 12c0-4.41 3.59-8 8-8Zm0 16c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.902 7.902 0 0 1 20 12c0 4.41-3.59 8-8 8Z" />
  </svg>
);

const TutorialIcon = () => (
  <svg
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 4H14.5A3.5 3.5 0 0 0 12 5.05 3.5 3.5 0 0 0 9.5 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6.5a1.5 1.5 0 0 1 1.5 1.5h2A1.5 1.5 0 0 1 14.5 20H21a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm-10 14.26A3.5 3.5 0 0 0 9.5 18H4V6h5.5A1.5 1.5 0 0 1 11 7.5v10.76ZM20 18h-5.5a3.5 3.5 0 0 0-1.5.34V7.5A1.5 1.5 0 0 1 14.5 6H20v12Z" />
  </svg>
);

const AdminMenuIcon = () => (
  <svg
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-1 10c-5.33 0-8 2.67-8 6v1h8.08a6.96 6.96 0 0 1-.08-1c0-2.39 1.19-4.5 3-5.77A12.7 12.7 0 0 0 11 14Zm7-1-5 2v3.5c0 3.08 2.13 5.96 5 6.5 2.87-.54 5-3.42 5-6.5V15l-5-2Zm0 2.15 3 1.2v2.15c0 1.95-1.23 3.89-3 4.45-1.77-.56-3-2.5-3-4.45v-2.15l3-1.2Z" />
  </svg>
);

const navItems = [
  { icon: <HomeIcon />, name: "ʜᴏᴍᴇ", path: "/" },
  {
    icon: <FreelanceIcon />,
    name: "ꜰʀᴇᴇʟᴀɴᴄᴇ",
    path: "/freelance",
  },
  {
    icon: <TestimonialMenuIcon />,
    name: "ᴛᴇꜱᴛɪᴍᴏɴɪ",
    path: "/testimonials",
  },
  {
    icon: <BlacklistIcon />,
    name: "ʙʟᴀᴄᴋʟɪꜱᴛ",
    path: "/blacklist",
  },
  {
    icon: <TutorialIcon />,
    name: "ᴛᴜᴛᴏʀɪᴀʟ",
    path: "/tutorial",
  },
  {
    icon: <AdminMenuIcon />,
    name: "ᴀᴅᴍɪɴ ᴍᴇɴᴜ",
    path: "/admin",
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
