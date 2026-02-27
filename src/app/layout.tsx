import type { Metadata } from "next";
import "./globals.css";

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
      <body className="md:flex-row bg-main-primary text-white/90">
        {children}
      </body>
    </html>
  );
}
