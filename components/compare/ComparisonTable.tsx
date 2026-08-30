"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  Plus,
  ExternalLink,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { formatINR, formatPackage } from "@/lib/utils/formatters";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCompare } from "@/context/CompareContext";
import { getCollegeById } from "@/lib/services/collegeService";
import { ComparisonResult } from "@/lib/services/compareService";

interface ComparisonTableProps {
  comparisonData: ComparisonResult;
  onOpenAddModal: () => void;
}

export function ComparisonTable({
  comparisonData,
  onOpenAddModal,
}: ComparisonTableProps) {
  const { removeCollege, compareItems } = useCompare();
  const { colleges, metrics } = comparisonData;

  const canAddMore = colleges.length < 3;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Sticky Table Header with College Cards */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              <th className="p-5 w-1/4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Comparison Metric
              </th>
              {colleges.map((college) => (
                <th key={college.id} className="p-5 w-1/4 align-top">
                  <div className="relative p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between h-full">
                    {/* Remove Action */}
                    <button
                      type="button"
                      onClick={() => removeCollege(college.id)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="pr-6 mb-3">
                      <Badge
                        variant={
                          college.type === "Government" ? "primary" : "secondary"
                        }
                        size="sm"
                        className="mb-1.5"
                      >
                        {college.type}
                      </Badge>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                        {college.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 truncate">
                        {college.location}
                      </p>
                    </div>

                    <Link
                      href={`/colleges/${college.slug || college.id}`}
                      className="mt-2"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs py-1"
                        rightIcon={<ExternalLink className="w-3 h-3" />}
                      >
                        Full Profile
                      </Button>
                    </Link>
                  </div>
                </th>
              ))}

              {/* Empty placeholder slot if < 3 colleges */}
              {canAddMore && (
                <th className="p-5 w-1/4 align-middle">
                  <button
                    type="button"
                    onClick={onOpenAddModal}
                    className="w-full h-full min-h-[140px] border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors group cursor-pointer bg-slate-50/50 hover:bg-blue-50/40"
                  >
                    <div className="w-9 h-9 rounded-full bg-slate-200 group-hover:bg-blue-600 text-slate-600 group-hover:text-white flex items-center justify-center mb-2 transition-colors">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700">
                      Add College ({colleges.length}/3)
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      Select another institution
                    </span>
                  </button>
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {/* Section: Academic & General */}
            <tr className="bg-slate-50/50 font-bold text-xs uppercase text-slate-700 tracking-wider">
              <td colSpan={colleges.length + (canAddMore ? 2 : 1)} className="px-5 py-2.5">
                🏛️ Institutional Overview
              </td>
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">Location</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4 text-slate-900 font-medium">
                  {c.location}
                </td>
              ))}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">Overall Rating</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={c.rating} size="sm" scorePosition="badge" />
                    {metrics.ratingRankings[c.id] === 1 && (
                      <Badge variant="warning" size="sm">
                        Top Rated
                      </Badge>
                    )}
                  </div>
                </td>
              ))}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">Established Year</td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4 text-slate-800">
                  {c.establishedYear || "N/A"}
                </td>
              ))}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>

            {/* Section: Financials & ROI */}
            <tr className="bg-slate-50/50 font-bold text-xs uppercase text-slate-700 tracking-wider">
              <td colSpan={colleges.length + (canAddMore ? 2 : 1)} className="px-5 py-2.5">
                💰 Financials & Value for Money
              </td>
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">
                Annual Tuition Fees
              </td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">
                      {formatINR(c.fees, true)}
                    </span>
                    {metrics.feeRankings[c.id] === 1 && (
                      <span className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                        ✨ Most Affordable
                      </span>
                    )}
                  </div>
                </td>
              ))}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">
                Average Package
              </td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-emerald-700">
                      {formatPackage(c.averagePackage)}
                    </span>
                    {metrics.placementRankings[c.id] === 1 && (
                      <span className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                        🏆 Best Avg Placement
                      </span>
                    )}
                  </div>
                </td>
              ))}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">
                Highest Placement
              </td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4 text-slate-900 font-bold">
                  {formatPackage(c.highestPackage)}
                </td>
              ))}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">
                ROI Multiplier (Est.)
              </td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4">
                  <Badge variant="success" size="sm">
                    <TrendingUp className="w-3 h-3" />
                    {metrics.roiRatios[c.id] || 1}x Annual Return
                  </Badge>
                </td>
              ))}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>

            {/* Section: Academic Offerings & Admissions */}
            <tr className="bg-slate-50/50 font-bold text-xs uppercase text-slate-700 tracking-wider">
              <td colSpan={colleges.length + (canAddMore ? 2 : 1)} className="px-5 py-2.5">
                📚 Academics & Entrance Cutoffs
              </td>
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">
                Key Programs Offered
              </td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4 align-top">
                  <div className="space-y-1 text-xs">
                    {c.courses.slice(0, 3).map((cr) => (
                      <div key={cr.id} className="text-slate-700 font-medium truncate">
                        • {cr.name}
                      </div>
                    ))}
                    {c.courses.length > 3 && (
                      <div className="text-slate-400 text-[11px]">
                        +{c.courses.length - 3} more programs
                      </div>
                    )}
                  </div>
                </td>
              ))}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">
                Accepted Entrance Exams
              </td>
              {colleges.map((c) => {
                const exams = Array.from(new Set(c.cutoffs.map((ct) => ct.exam)));
                return (
                  <td key={c.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {exams.length > 0 ? (
                        exams.map((ex) => (
                          <Badge key={ex} variant="secondary" size="sm">
                            {ex}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-slate-400 text-xs">Direct / Merit</span>
                      )}
                    </div>
                  </td>
                );
              })}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>

            <tr>
              <td className="p-4 px-5 font-semibold text-slate-700">
                Student Reviews
              </td>
              {colleges.map((c) => (
                <td key={c.id} className="p-4">
                  <span className="text-xs text-slate-700 font-medium">
                    {c.reviews.length} Verified Student Reviews
                  </span>
                </td>
              ))}
              {canAddMore && <td className="p-4 text-slate-400">—</td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
