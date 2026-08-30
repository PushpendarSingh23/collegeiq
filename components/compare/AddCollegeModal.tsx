"use client";

import React, { useState, useEffect } from "react";
import { X, Search, Plus, Building2, MapPin } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { CollegeSummary } from "@/lib/services/collegeService";
import { formatINR, formatPackage } from "@/lib/utils/formatters";
import { RatingStars } from "@/components/ui/RatingStars";

interface AddCollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCollegeModal({ isOpen, onClose }: AddCollegeModalProps) {
  const { addCollege, isInComparison, compareItems, maxLimit } = useCompare();
  const [colleges, setColleges] = useState<CollegeSummary[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchColleges = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/colleges?limit=25&search=${encodeURIComponent(search)}`);
        const json = await res.json();
        if (json.success) {
          setColleges(json.data);
        }
      } catch (err) {
        console.error("Failed to load colleges in modal:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchColleges, 250);
    return () => clearTimeout(timer);
  }, [isOpen, search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              Add College to Comparison
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select up to {maxLimit} colleges (Currently {compareItems.length}/{maxLimit})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by college name or city..."
              className="w-full pl-10 pr-4 py-2 bg-white text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs text-slate-900"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 space-y-1">
          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              <span className="inline-block w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
              Searching colleges...
            </div>
          ) : colleges.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No colleges match your search keyword.
            </div>
          ) : (
            colleges.map((college) => {
              const isAlreadyAdded = isInComparison(college.id) || isInComparison(college.slug);

              return (
                <div
                  key={college.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm truncate">
                        {college.name}
                      </h4>
                      <RatingStars rating={college.rating} size="sm" showScore={false} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {college.location}
                      </span>
                      <span>• Fees: {formatINR(college.fees, true)}</span>
                      <span>• Avg: {formatPackage(college.averagePackage)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isAlreadyAdded || compareItems.length >= maxLimit}
                    onClick={() => {
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
                      if (res.success) {
                        onClose();
                      } else {
                        alert(res.message);
                      }
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isAlreadyAdded
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-2xs"
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {isAlreadyAdded ? "Added" : "Select"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
