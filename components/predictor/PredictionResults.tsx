"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Flame,
  MapPin,
  TrendingUp,
  Layers,
  Check,
  ExternalLink,
  Info,
} from "lucide-react";
import { PredictorResult, PredictionMatch, AdmissionProbability } from "@/lib/services/predictorService";
import { formatINR, formatPackage, formatRank } from "@/lib/utils/formatters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RatingStars } from "@/components/ui/RatingStars";
import { useCompare } from "@/context/CompareContext";

interface PredictionResultsProps {
  result: PredictorResult;
}

export function PredictionResults({ result }: PredictionResultsProps) {
  const { addCollege, removeCollege, isInComparison } = useCompare();
  const [selectedTier, setSelectedTier] = useState<string>("All");

  const filteredRecommendations =
    selectedTier === "All"
      ? result.recommendations
      : result.recommendations.filter((r) => r.probability === selectedTier);

  const getProbabilityConfig = (prob: AdmissionProbability) => {
    switch (prob) {
      case "High Chance":
        return {
          badgeVariant: "success" as const,
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
          colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
          barColor: "bg-emerald-500",
          label: "Safe / High Probability",
        };
      case "Moderate Chance":
        return {
          badgeVariant: "warning" as const,
          icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
          colorClass: "text-amber-700 bg-amber-50 border-amber-200",
          barColor: "bg-amber-500",
          label: "Target / Moderate Probability",
        };
      case "Reach":
        return {
          badgeVariant: "purple" as const,
          icon: <Flame className="w-4 h-4 text-purple-600" />,
          colorClass: "text-purple-700 bg-purple-50 border-purple-200",
          barColor: "bg-purple-500",
          label: "Ambitious / Reach",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stat Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Prediction Summary for
            </span>
            <h3 className="text-lg font-extrabold text-slate-900">
              {result.exam} • AIR {formatRank(result.userRank)} ({result.category})
            </h3>
          </div>
          <div className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Total Matches: <strong className="text-slate-900">{result.totalMatches}</strong>
          </div>
        </div>

        {/* Tier Filter Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
          <button
            type="button"
            onClick={() => setSelectedTier("All")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTier === "All"
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span className="block text-[11px] font-semibold opacity-80 uppercase">All Matches</span>
            <span className="text-xl font-extrabold">{result.totalMatches}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier("High Chance")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTier === "High Chance"
                ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                : "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            <span className="block text-[11px] font-semibold opacity-80 uppercase">High Chance</span>
            <span className="text-xl font-extrabold">{result.summary.highChanceCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier("Moderate Chance")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTier === "Moderate Chance"
                ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
            }`}
          >
            <span className="block text-[11px] font-semibold opacity-80 uppercase">Moderate</span>
            <span className="text-xl font-extrabold">{result.summary.moderateChanceCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTier("Reach")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTier === "Reach"
                ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                : "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100"
            }`}
          >
            <span className="block text-[11px] font-semibold opacity-80 uppercase">Reach</span>
            <span className="text-xl font-extrabold">{result.summary.reachCount}</span>
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredRecommendations.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No colleges match the selected tier filter. Try selecting "All Matches".
          </div>
        ) : (
          filteredRecommendations.map((match) => {
            const config = getProbabilityConfig(match.probability);
            const isSelected = isInComparison(match.collegeId) || isInComparison(match.collegeSlug);

            return (
              <div
                key={`${match.collegeId}-${match.cutoffId}`}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-5 md:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={config.badgeVariant} size="sm">
                        {config.icon}
                        <span>{config.label}</span>
                      </Badge>
                      {match.branch && (
                        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          {match.branch}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/colleges/${match.collegeSlug || match.collegeId}`}
                      className="block group/link"
                    >
                      <h4 className="font-bold text-slate-900 text-lg group-hover/link:text-blue-600 transition-colors">
                        {match.collegeName}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{match.location}</span>
                    </div>
                  </div>

                  {/* Probability Gauge Score */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-1 p-3 bg-slate-50 rounded-xl border border-slate-100 min-w-[140px]">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">
                      Match Confidence
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-slate-900">
                        {match.probabilityScore}%
                      </span>
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${config.barColor}`}
                          style={{ width: `${match.probabilityScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50/60 rounded-xl border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Cutoff Range</span>
                    <span className="font-bold text-slate-800">
                      {formatRank(match.minRank)} – {formatRank(match.maxRank)}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Annual Fees</span>
                    <span className="font-bold text-slate-800">
                      {formatINR(match.fees, true)}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Avg Placement</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {formatPackage(match.averagePackage)}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Rating</span>
                    <RatingStars rating={match.rating} size="sm" />
                  </div>
                </div>

                {/* Explanation text */}
                <div className="flex items-start gap-2 text-xs text-slate-600 bg-blue-50/40 p-3 rounded-lg border border-blue-100/60">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{match.reasoning}</span>
                </div>

                {/* Action footer */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant={isSelected ? "primary" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (isSelected) {
                        removeCollege(match.collegeId);
                      } else {
                        const res = addCollege({
                          id: match.collegeId,
                          name: match.collegeName,
                          slug: match.collegeSlug,
                          location: match.location,
                          fees: match.fees,
                          rating: match.rating,
                          averagePackage: match.averagePackage,
                          imageUrl: match.imageUrl,
                        });
                        if (!res.success) alert(res.message);
                      }
                    }}
                    leftIcon={
                      isSelected ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Layers className="w-3.5 h-3.5" />
                      )
                    }
                  >
                    {isSelected ? "In Comparison" : "Add to Compare"}
                  </Button>

                  <Link href={`/colleges/${match.collegeSlug || match.collegeId}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      View College Profile
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
