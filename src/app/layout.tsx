import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/nav-bar/NavBar";
import BreadcrumbsHeader from "@/components/header/breadcrumbs/Breadcrumbs";

export const metadata: Metadata = {
  title: "Ticket System",
  description: "A basic Ticket Support system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`flex flex-col md:flex-row min-h-screen bg-main-primary text-white/90`}
      >
        <NavBar />
        <div className="py-8 px-8 md:py-11 md:px-12 w-full">
          <BreadcrumbsHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
