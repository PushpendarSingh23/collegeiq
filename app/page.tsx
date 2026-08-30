import React from "react";
import Link from "next/link";
import {
  Search,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building2,
  GraduationCap,
  ShieldCheck,
  Award,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { getColleges } from "@/lib/services/collegeService";
import { collegeQuerySchema } from "@/lib/validations/collegeSchema";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { formatINR, formatPackage } from "@/lib/utils/formatters";

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  // Fetch top 6 rated colleges for featured section
  const { data: featuredColleges } = await getColleges(
    collegeQuerySchema.parse({
      sortBy: "rating",
      sortOrder: "desc",
      limit: 6,
      page: 1,
    })
  );

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            AI Software Engineer Technical Assessment • Track A
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Discover, Compare & Predict Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Dream College
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Data-backed college discovery with transparent fees, audited placement
            packages, side-by-side comparisons, and rank cutoff predictions for JEE Main, NEET & CAT.
          </p>

          {/* Quick Search Form */}
          <div className="max-w-2xl mx-auto pt-4">
            <form
              action="/colleges"
              method="GET"
              className="flex flex-col sm:flex-row items-center gap-2.5 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
            >
              <div className="relative flex-1 w-full flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search by college name, city (e.g., IIT Bombay, Delhi)..."
                  className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Search Colleges</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Popular:</span>
              <Link
                href="/colleges?search=IIT"
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors"
              >
                IITs
              </Link>
              <Link
                href="/colleges?search=IIM"
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors"
              >
                IIMs
              </Link>
              <Link
                href="/colleges?search=AIIMS"
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors"
              >
                AIIMS
              </Link>
              <Link
                href="/colleges?search=BITS"
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors"
              >
                BITS Pilani
              </Link>
              <Link
                href="/colleges?state=Delhi"
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors"
              >
                Delhi Colleges
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Highlight Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: College Listing */}
          <Link
            href="/colleges"
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between hover:border-blue-400"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                1. College Discovery & Filters
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Filter 40+ premier Indian colleges by fee budgets, NIRF ratings,
                locations, and average placement packages with real-time pagination.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Browse All Colleges</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Card 2: Compare Tool */}
          <Link
            href="/compare"
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between hover:border-blue-400"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                2. Multi-College Comparison
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Select 2 or 3 colleges for side-by-side evaluation of annual fees,
                highest packages, ROI multipliers, and accepted entrance exams.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
              <span>Open Comparison Matrix</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Card 3: Predictor Tool */}
          <Link
            href="/predictor"
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between hover:border-blue-400"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                3. Rank Cutoff Predictor
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Input your exam rank (JEE Main, NEET, CAT, BITSAT) to match
                admissions across High Chance, Moderate, and Reach probability tiers.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>Predict Admissions Now</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Top Institutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <Award className="w-4 h-4" />
              <span>Top Rated Institutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Featured Colleges & Universities
            </h2>
          </div>
          <Link
            href="/colleges"
            className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Explore All 40+ Colleges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      </section>

      {/* Cutoff Predictor CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Smart Matching Algorithm
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Have your exam rank ready? Predict which colleges you can get into.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our algorithm matches your rank against opening and closing cutoffs
              for JEE Main, NEET, and CAT, categorizing your options into High
              Chance, Target, and Reach.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/predictor"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
            >
              <span>Try Rank Predictor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
