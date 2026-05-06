import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arihant Academy Sr. Sec. School, Rangbadi, Kota | CBSE & IIT-JEE/NEET Integrated",
  description: "Welcome to Arihant Academy Sr. Sec. School, Rangbadi, Kota. Experience premium CBSE schooling integrated with Kota's legendary coaching standards, top faculty, and advanced lab facilities.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
