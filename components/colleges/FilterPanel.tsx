"use client";

import React from "react";
import { Filter, RotateCcw, ArrowUpDown, DollarSign, Star, Building2, MapPin } from "lucide-react";
import { formatINR } from "@/lib/utils/formatters";

export interface FilterState {
  search: string;
  location: string;
  state: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  type: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  availableStates: string[];
  totalResults: number;
}

export function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  availableStates,
  totalResults,
}: FilterPanelProps) {
  const ratingOptions = [
    { label: "All", value: 0 },
    { label: "4.0+", value: 4.0 },
    { label: "4.5+", value: 4.5 },
    { label: "4.8+", value: 4.8 },
  ];

  const collegeTypes = ["All", "Government", "Private", "Autonomous"];

  const sortOptions = [
    { label: "Highest Rating", sortBy: "rating", sortOrder: "desc" },
    { label: "Fees: Low to High", sortBy: "fees", sortOrder: "asc" },
    { label: "Fees: High to Low", sortBy: "fees", sortOrder: "desc" },
    { label: "Average Package", sortBy: "averagePackage", sortOrder: "desc" },
    { label: "Highest Package", sortBy: "highestPackage", sortOrder: "desc" },
    { label: "College Name (A-Z)", sortBy: "name", sortOrder: "asc" },
  ];

  const feePresets = [
    { label: "Under ₹1 Lakh", max: 100000 },
    { label: "Under ₹3 Lakhs", max: 300000 },
    { label: "Under ₹6 Lakhs", max: 600000 },
    { label: "Under ₹15 Lakhs", max: 1500000 },
    { label: "Any Fee", max: undefined },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-sm">Filters & Sorting</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 font-medium cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Sort By Selector */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          Sort By
        </label>
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split("-");
            onFilterChange({ sortBy, sortOrder: sortOrder as "asc" | "desc" });
          }}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-100 text-slate-800 font-medium"
        >
          {sortOptions.map((opt) => (
            <option
              key={`${opt.sortBy}-${opt.sortOrder}`}
              value={`${opt.sortBy}-${opt.sortOrder}`}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* State / Location Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          State / Location
        </label>
        <select
          value={filters.state || ""}
          onChange={(e) => onFilterChange({ state: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-100 text-slate-800 font-medium"
        >
          <option value="">All States & Territories</option>
          {availableStates.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* College Type Selector */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          Institution Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {collegeTypes.map((type) => {
            const isSelected = (filters.type || "All") === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => onFilterChange({ type })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-blue-50 border-blue-300 text-blue-700"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Maximum Annual Fees Filter */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            Max Annual Fees
          </label>
          <span className="text-xs font-bold text-blue-600">
            {filters.maxFees ? formatINR(filters.maxFees, true) : "Any Amount"}
          </span>
        </div>

        {/* Preset Fee Pills */}
        <div className="flex flex-wrap gap-1.5">
          {feePresets.map((preset) => {
            const isSelected = filters.maxFees === preset.max;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => onFilterChange({ maxFees: preset.max })}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating Filter */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 text-amber-500" />
          Minimum Rating
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {ratingOptions.map((opt) => {
            const isSelected =
              (filters.minRating === undefined && opt.value === 0) ||
              filters.minRating === opt.value;

            return (
              <button
                key={opt.label}
                type="button"
                onClick={() =>
                  onFilterChange({
                    minRating: opt.value === 0 ? undefined : opt.value,
                  })
                }
                className={`py-1.5 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-amber-50 border-amber-300 text-amber-900 font-bold"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results badge footer */}
      <div className="pt-3 border-t border-slate-100 text-center">
        <span className="text-xs text-slate-500 font-medium">
          Showing matching institutions (
          <strong className="text-slate-900">{totalResults}</strong> found)
        </span>
      </div>
    </div>
  );
}
