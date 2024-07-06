import type { Metadata } from "next";
import { montserrat } from "./ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Acá van a encontrar noticias sobre el Centro de Formación Profesional Victor Navajas Artaza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
