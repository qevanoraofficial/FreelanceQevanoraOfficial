import type { Metadata, Viewport } from "next";
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import QevanoraMotion from '@/components/motion/QevanoraMotion';

export const metadata: Metadata = {
  title: "QEVANORA OFFICIAL",
  description: "Produk digital Minecraft Bedrock gratis dan premium.",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/logo/digie-store-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#031126",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="bg-gray-900">
        <QevanoraMotion />
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
