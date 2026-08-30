import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CompareProvider } from "@/context/CompareContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CollegeIQ — Modern College Discovery, Comparison & Predictor",
  description:
    "Discover top Indian engineering, medical, and management institutions. Compare fees, placements, ratings side-by-side, and predict college admissions using your entrance exam rank.",
  keywords: [
    "College Search",
    "JEE Main Predictor",
    "NEET Cutoff",
    "CAT Percentile",
    "College Comparison",
    "Engineering Colleges",
    "IIM MBA",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50/50 text-slate-900 font-sans">
        <CompareProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CompareProvider>
      </body>
    </html>
  );
}
