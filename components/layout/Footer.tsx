import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Cpu, Database, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                College<span className="text-blue-400">IQ</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              A modern college discovery, side-by-side comparison, and
              database-driven entrance exam cutoff predictor platform. Built for
              data transparency and student decision making.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Next.js 16 + React 19
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                <Database className="w-3.5 h-3.5 text-emerald-400" /> PostgreSQL + Prisma
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> TypeScript + Tailwind
              </span>
            </div>
          </div>

          {/* Feature Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase text-xs tracking-wider">
              Core Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/colleges"
                  className="hover:text-white transition-colors"
                >
                  Colleges Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="hover:text-white transition-colors"
                >
                  Multi-College Comparison
                </Link>
              </li>
              <li>
                <Link
                  href="/predictor"
                  className="hover:text-white transition-colors"
                >
                  Entrance Cutoff Predictor
                </Link>
              </li>
              <li>
                <Link
                  href="/api/colleges"
                  target="_blank"
                  className="hover:text-white transition-colors font-mono text-xs"
                >
                  REST API Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Assessment Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase text-xs tracking-wider">
              Technical Assessment
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Track A: College Discovery</span>
              </div>
              <p className="text-slate-400 leading-snug">
                Full-stack implementation featuring server-side pagination, 
                dynamic rank estimation algorithms, and normalized PostgreSQL models.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CollegeIQ Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with clean architecture & production-ready TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
