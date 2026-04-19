import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OMG! Support",
  description:
    "A mobile-first emotional support tracker with nurturing prompts and on-device reflection logs.",
  applicationName: "OMG! Support",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OMG! Support",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
