import type { Metadata } from "next";
import { IBM_Plex_Mono as Font } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "pgpweb",
  description: "",
};

const font = Font({ weight: ["400", "600"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
