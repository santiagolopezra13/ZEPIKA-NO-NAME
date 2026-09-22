import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/brand";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} · ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: `Mesa de regalos digital, sitio de evento, invitaciones y confirmación de asistencia en un solo lugar. 0% de comisión al retirar. ${brand.city}.`,
  keywords: [
    "mesa de regalos",
    "mesa de regalos digital",
    "mesa de regalos boda",
    "invitaciones digitales",
    "luna de miel",
    "México",
  ],
  openGraph: {
    title: `${brand.name} · ${brand.tagline}`,
    description: brand.claim,
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body className={`${fraunces.variable} ${inter.variable}`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
