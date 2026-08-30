"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Building2,
  TrendingUp,
  Award,
  Layers,
  Check,
  ChevronLeft,
  GraduationCap,
  BookOpen,
  DollarSign,
  Star,
  Users,
  ExternalLink,
  ShieldCheck,
  Target,
  Sparkles,
} from "lucide-react";
import { formatINR, formatPackage, formatRank, formatRating } from "@/lib/utils/formatters";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCompare } from "@/context/CompareContext";
import { getCollegeById } from "@/lib/services/collegeService";

interface CollegeDetailClientProps {
  college: NonNullable<Awaited<ReturnType<typeof getCollegeById>>>;
}

export function CollegeDetailClient({ college }: CollegeDetailClientProps) {
  const { addCollege, removeCollege, isInComparison } = useCompare();
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "placements" | "cutoffs" | "reviews">("overview");

  const isSelected = isInComparison(college.id) || isInComparison(college.slug);

  const handleToggleCompare = () => {
    if (isSelected) {
      removeCollege(college.id);
    } else {
      const res = addCollege({
        id: college.id,
        name: college.name,
        slug: college.slug,
        location: college.location,
        fees: college.fees,
        rating: college.rating,
        averagePackage: college.averagePackage,
        imageUrl: college.imageUrl,
      });
      if (!res.success) alert(res.message);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview & Campus", icon: <Building2 className="w-4 h-4" /> },
    { id: "courses", label: `Courses & Fees (${college.courses.length})`, icon: <BookOpen className="w-4 h-4" /> },
    { id: "placements", label: "Placements & ROI", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "cutoffs", label: `Cutoffs (${college.cutoffs.length})`, icon: <Target className="w-4 h-4" /> },
    { id: "reviews", label: `Reviews (${college.reviews.length})`, icon: <Star className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/colleges" className="hover:text-blue-600 flex items-center gap-1 font-medium">
          <ChevronLeft className="w-4 h-4" />
          Back to Colleges
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-semibold truncate">{college.name}</span>
      </div>

      {/* College Header Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={college.type === "Government" ? "primary" : "secondary"}
                size="md"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{college.type} Institution</span>
              </Badge>

              {college.establishedYear && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium px-2.5 py-1 bg-slate-100 rounded-md">
                  <Calendar className="w-3.5 h-3.5" />
                  Estd. {college.establishedYear}
                </span>
              )}

              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Database Profile
              </span>
            </div>

            {/* College Name */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {college.name}
            </h1>

            {/* Location & Website */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{college.location}</span>
              </div>
              {college.websiteUrl && (
                <a
                  href={college.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Action Header Block */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Button
              type="button"
              variant={isSelected ? "primary" : "outline"}
              size="md"
              onClick={handleToggleCompare}
              leftIcon={isSelected ? <Check className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
              className={isSelected ? "bg-blue-600 text-white" : ""}
            >
              {isSelected ? "In Comparison (Remove)" : "Add to Compare"}
            </Button>

            <Link href={`/predictor?preferredState=${encodeURIComponent(college.state)}`}>
              <Button
                variant="secondary"
                size="md"
                className="w-full text-xs font-semibold"
                leftIcon={<Sparkles className="w-4 h-4 text-amber-500" />}
              >
                Predict Admission Chance
              </Button>
            </Link>
          </div>
        </div>

        {/* Highlight Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Annual Fees
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              {formatINR(college.fees, true)}
            </span>
            <span className="block text-[11px] text-slate-400 mt-0.5">Approx. Tuition</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <span className="block text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Average Package
            </span>
            <span className="text-xl font-extrabold text-emerald-700">
              {formatPackage(college.averagePackage)}
            </span>
            <span className="block text-[11px] text-emerald-600 mt-0.5">Annual CTC</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <span className="block text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1">
              Highest Package
            </span>
            <span className="text-xl font-extrabold text-blue-700">
              {formatPackage(college.highestPackage)}
            </span>
            <span className="block text-[11px] text-blue-600 mt-0.5">International / Domestic</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
            <span className="block text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              Overall Rating
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-amber-900">
                {formatRating(college.rating)}
              </span>
              <RatingStars rating={college.rating} size="sm" showScore={false} />
            </div>
            <span className="block text-[11px] text-amber-700 mt-0.5">
              Based on {college.reviews.length} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "border-blue-600 text-blue-600 bg-blue-50/50 rounded-t-xl"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Contents */}
      <div className="space-y-8">
        {/* 1. Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900">About {college.name}</h2>
              <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line">
                {college.overview}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Key Campus Highlights</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>State-of-the-art computational & research facilities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Active student societies & cultural symposiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Robust global alumni mentoring network</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>On-campus startup incubation and venture funding</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Facts Sidebar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
                Institutional Facts
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Institution Type</span>
                  <span className="font-semibold text-slate-800">{college.type} University</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">State & Region</span>
                  <span className="font-semibold text-slate-800">{college.state}, India</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Campus Location</span>
                  <span className="font-semibold text-slate-800">{college.location}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Established</span>
                  <span className="font-semibold text-slate-800">{college.establishedYear || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Degrees Conferred</span>
                  <span className="font-semibold text-slate-800">
                    {Array.from(new Set(college.courses.map((c) => c.degree))).join(", ") || "Undergraduate / Postgraduate"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Courses & Fees Tab */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Offered Programs & Fee Structure</h2>
              <p className="text-xs text-slate-500 mt-1">
                Detailed breakdown of academic courses, duration, seats, and tuition charges
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-xs font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 px-6">Program Name</th>
                    <th className="p-4">Degree</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Total Seats</th>
                    <th className="p-4 text-right px-6">Annual Tuition Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {college.courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 px-6 font-bold text-slate-900">
                        {course.name}
                      </td>
                      <td className="p-4">
                        <Badge variant="primary" size="sm">
                          {course.degree}
                        </Badge>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {course.duration}
                      </td>
                      <td className="p-4 text-slate-600">
                        {course.seats ? `${course.seats} Seats` : "Available"}
                      </td>
                      <td className="p-4 text-right px-6 font-extrabold text-slate-900">
                        {formatINR(course.fees, true)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Placements Tab */}
        {activeTab === "placements" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Placement Statistics & ROI</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Salary statistics verified against campus placement records
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Average Annual Package
                  </span>
                  <div className="text-3xl font-black text-emerald-700">
                    {formatPackage(college.averagePackage)}
                  </div>
                  <span className="text-xs text-emerald-600 block">
                    Across engineering & graduate cohorts
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-2">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                    Highest Annual Offer
                  </span>
                  <div className="text-3xl font-black text-blue-700">
                    {formatPackage(college.highestPackage)}
                  </div>
                  <span className="text-xs text-blue-600 block">
                    International & Domestic Peak
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100 text-center space-y-2">
                  <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">
                    Estimated ROI Multiplier
                  </span>
                  <div className="text-3xl font-black text-purple-700">
                    {((college.averagePackage) / (college.fees * 4 || 1)).toFixed(1)}x
                  </div>
                  <span className="text-xs text-purple-600 block">
                    Annual package vs 4-year tuition
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed">
                <strong>Placement Note:</strong> Top tech giants (Google, Microsoft, Amazon), consulting firms (McKinsey, BCG, Bain), investment banks, and research laboratories recruit annually from this campus.
              </div>
            </div>
          </div>
        )}

        {/* 4. Cutoffs Tab */}
        {activeTab === "cutoffs" && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Entrance Exam Cutoffs</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Historical opening and closing rank thresholds for admissions
                </p>
              </div>
              <Link href="/predictor">
                <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-4 h-4" />}>
                  Check My Rank in Predictor
                </Button>
              </Link>
            </div>

            {college.cutoffs.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm">
                No cutoff records published for this institution. Direct merit / management admissions apply.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-xs font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4 px-6">Entrance Exam</th>
                      <th className="p-4">Program / Branch</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Opening Rank</th>
                      <th className="p-4">Closing Cutoff Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {college.cutoffs.map((cutoff) => (
                      <tr key={cutoff.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-4 px-6">
                          <Badge variant="primary" size="sm">
                            {cutoff.exam}
                          </Badge>
                        </td>
                        <td className="p-4 font-semibold text-slate-900">
                          {cutoff.branch || "General Program"}
                        </td>
                        <td className="p-4 text-slate-600">
                          <Badge variant="secondary" size="sm">
                            {cutoff.category}
                          </Badge>
                        </td>
                        <td className="p-4 font-mono text-slate-700">
                          {formatRank(cutoff.minRank)}
                        </td>
                        <td className="p-4 font-mono font-extrabold text-blue-700">
                          {formatRank(cutoff.maxRank)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 5. Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Student & Alumni Reviews</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Verified feedback on academics, hostel life, placements, and campus atmosphere
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 px-4 py-2.5 rounded-2xl border border-amber-200">
                  <span className="text-2xl font-black text-amber-900">
                    {formatRating(college.rating)}
                  </span>
                  <div className="flex flex-col">
                    <RatingStars rating={college.rating} size="sm" showScore={false} />
                    <span className="text-[11px] text-amber-800 font-semibold">
                      {college.reviews.length} Verified Reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Items */}
              <div className="space-y-4">
                {college.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {review.authorName}
                        </h4>
                        {review.authorRole && (
                          <span className="text-xs text-slate-500 font-medium">
                            {review.authorRole}
                          </span>
                        )}
                      </div>
                      <RatingStars rating={review.rating} size="sm" scorePosition="badge" />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
