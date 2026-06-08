import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabprime Dashboard",
  description: "Project-based daily operations dashboard prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
