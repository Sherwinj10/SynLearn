import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "SynLearn — AI Craniofacial Syndrome Intelligence",
  description: "AI‑powered prediction for 34 craniofacial syndromes. Identify syndromes from clinical features with medical-grade accuracy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain">
        <Nav />
        <div className="scanline" />
        {children}
      </body>
    </html>
  );
}
