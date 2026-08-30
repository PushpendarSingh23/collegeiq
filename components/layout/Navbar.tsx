"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  Layers,
  Sparkles,
  Search,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { clsx } from "clsx";

export function Navbar() {
  const pathname = usePathname();
  const { compareItems } = useCompare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Explore Colleges",
      href: "/colleges",
      icon: <Search className="w-4 h-4" />,
    },
    {
      name: "Compare",
      href: "/compare",
      icon: <Layers className="w-4 h-4" />,
      badge: compareItems.length > 0 ? compareItems.length : null,
    },
    {
      name: "Rank Predictor",
      href: "/predictor",
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      highlight: true,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  College<span className="text-blue-600">IQ</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                  Track A
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Discovery & Decision Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                  {link.badge !== null && link.badge !== undefined && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/predictor"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Predict My College</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-5 space-y-1.5 shadow-lg">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium",
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                {link.badge !== null && link.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-blue-600 rounded-full">
                    {link.badge} selected
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/predictor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-xs"
            >
              <Compass className="w-4 h-4" />
              <span>Predict My College</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
