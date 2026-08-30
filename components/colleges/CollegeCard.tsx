"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  Layers,
  Check,
  Building2,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { formatINR, formatPackage } from "@/lib/utils/formatters";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCompare } from "@/context/CompareContext";
import { CollegeSummary } from "@/lib/services/collegeService";

interface CollegeCardProps {
  college: CollegeSummary;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const { addCollege, removeCollege, isInComparison, compareItems, maxLimit } =
    useCompare();

  const isSelected = isInComparison(college.id) || isInComparison(college.slug);

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

      if (!res.success) {
        alert(res.message);
      }
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Header & Badges */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge
              variant={
                college.type === "Government"
                  ? "primary"
                  : college.type === "Autonomous"
                  ? "purple"
                  : "secondary"
              }
              size="sm"
            >
              <Building2 className="w-3 h-3" />
              <span>{college.type}</span>
            </Badge>

            {college.establishedYear && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Calendar className="w-3 h-3" />
                Estd. {college.establishedYear}
              </span>
            )}
          </div>

          <RatingStars
            rating={college.rating}
            size="sm"
            scorePosition="badge"
          />
        </div>

        {/* College Name & Location */}
        <Link
          href={`/colleges/${college.slug || college.id}`}
          className="block group/link focus:outline-hidden"
        >
          <h3 className="font-bold text-slate-900 text-lg group-hover/link:text-blue-600 transition-colors line-clamp-2 mb-1.5 leading-snug">
            {college.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{college.location}</span>
        </div>

        {/* Overview snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {college.overview}
        </p>

        {/* Highlight Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div>
            <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Annual Fees
            </span>
            <span className="font-bold text-slate-900 text-sm">
              {formatINR(college.fees, true)}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Avg Package
            </span>
            <span className="font-bold text-emerald-700 text-sm flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {formatPackage(college.averagePackage)}
            </span>
          </div>

          <div className="col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
            <span>
              Highest Package:{" "}
              <strong className="text-slate-900 font-semibold">
                {formatPackage(college.highestPackage)}
              </strong>
            </span>
            {college.courseCount ? (
              <span className="text-slate-400 font-medium">
                {college.courseCount} programs
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2.5">
        <Link
          href={`/colleges/${college.slug || college.id}`}
          className="flex-1"
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center"
            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          >
            View Details
          </Button>
        </Link>

        <Button
          type="button"
          variant={isSelected ? "primary" : "secondary"}
          size="sm"
          onClick={handleToggleCompare}
          leftIcon={
            isSelected ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Layers className="w-3.5 h-3.5" />
            )
          }
          className={
            isSelected
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "text-slate-700"
          }
        >
          {isSelected ? "Added" : "Compare"}
        </Button>
      </div>
    </div>
  );
}
