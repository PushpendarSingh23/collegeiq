"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Building2, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { SearchBar } from "@/components/colleges/SearchBar";
import { FilterPanel, FilterState } from "@/components/colleges/FilterPanel";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { Pagination } from "@/components/colleges/Pagination";
import { CollegeListSkeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { CollegeSummary } from "@/lib/services/collegeService";
import { PaginationMeta } from "@/lib/utils/apiResponse";

export function CollegeListingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL query params into state
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    state: searchParams.get("state") || "",
    minFees: searchParams.get("minFees") ? Number(searchParams.get("minFees")) : undefined,
    maxFees: searchParams.get("maxFees") ? Number(searchParams.get("maxFees")) : undefined,
    minRating: searchParams.get("minRating") ? Number(searchParams.get("minRating")) : undefined,
    type: searchParams.get("type") || "All",
    sortBy: searchParams.get("sortBy") || "rating",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
  });

  const [page, setPage] = useState<number>(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  );

  const [colleges, setColleges] = useState<CollegeSummary[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Sync state to URL search parameters
  const updateUrl = useCallback(
    (newFilters: FilterState, newPage: number) => {
      const params = new URLSearchParams();

      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.location) params.set("location", newFilters.location);
      if (newFilters.state) params.set("state", newFilters.state);
      if (newFilters.minFees !== undefined) params.set("minFees", String(newFilters.minFees));
      if (newFilters.maxFees !== undefined) params.set("maxFees", String(newFilters.maxFees));
      if (newFilters.minRating !== undefined && newFilters.minRating > 0)
        params.set("minRating", String(newFilters.minRating));
      if (newFilters.type && newFilters.type !== "All") params.set("type", newFilters.type);
      if (newFilters.sortBy !== "rating") params.set("sortBy", newFilters.sortBy);
      if (newFilters.sortOrder !== "desc") params.set("sortOrder", newFilters.sortOrder);
      if (newPage > 1) params.set("page", String(newPage));

      const queryString = params.toString();
      router.replace(queryString ? `/colleges?${queryString}` : "/colleges", {
        scroll: false,
      });
    },
    [router]
  );

  // Fetch colleges from API
  const fetchColleges = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "9");

      if (filters.search) params.set("search", filters.search);
      if (filters.location) params.set("location", filters.location);
      if (filters.state) params.set("state", filters.state);
      if (filters.minFees !== undefined) params.set("minFees", String(filters.minFees));
      if (filters.maxFees !== undefined) params.set("maxFees", String(filters.maxFees));
      if (filters.minRating !== undefined) params.set("minRating", String(filters.minRating));
      if (filters.type && filters.type !== "All") params.set("type", filters.type);
      if (filters.sortBy) params.set("sortBy", filters.sortBy);
      if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

      const res = await fetch(`/api/colleges?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const json = await res.json();
      if (json.success) {
        setColleges(json.data);
        if (json.pagination) {
          setPagination(json.pagination);
        }
      } else {
        throw new Error(json.error || "Failed to load colleges");
      }
    } catch (err) {
      console.error("Error loading colleges:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading colleges."
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Fetch distinct states for filter dropdown once
  useEffect(() => {
    fetch("/api/colleges?limit=50")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          const states = Array.from(
            new Set((json.data as CollegeSummary[]).map((c) => c.state))
          ).sort();
          setAvailableStates(states);
        }
      })
      .catch((e) => console.warn("Could not load states list:", e));
  }, []);

  const handleFilterChange = (updates: Partial<FilterState>) => {
    const updated = { ...filters, ...updates };
    setFilters(updated);
    setPage(1); // Reset to page 1 on filter change
    updateUrl(updated, 1);
  };

  const handleResetFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      location: "",
      state: "",
      minFees: undefined,
      maxFees: undefined,
      minRating: undefined,
      type: "All",
      sortBy: "rating",
      sortOrder: "desc",
    };
    setFilters(defaultFilters);
    setPage(1);
    updateUrl(defaultFilters, 1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateUrl(filters, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Page Title */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Explore Colleges in India
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Find and filter top engineering, management, and medical institutions
            </p>
          </div>

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({pagination.total})</span>
          </button>
        </div>

        {/* Global Search Bar */}
        <SearchBar
          initialValue={filters.search}
          onSearch={(search) => handleFilterChange({ search })}
        />
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            availableStates={availableStates}
            totalResults={pagination.total}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 flex justify-end">
            <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">Filters</h3>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-slate-500 font-bold px-2 py-1"
                >
                  ✕ Close
                </button>
              </div>
              <FilterPanel
                filters={filters}
                onFilterChange={(f) => {
                  handleFilterChange(f);
                }}
                onReset={handleResetFilters}
                availableStates={availableStates}
                totalResults={pagination.total}
              />
            </div>
          </div>
        )}

        {/* College Listing Main Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Tags */}
          {(filters.search ||
            filters.state ||
            filters.maxFees ||
            filters.minRating ||
            filters.type !== "All") && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs">
              <span className="font-semibold text-blue-900">Active Filters:</span>
              {filters.search && (
                <span className="px-2.5 py-1 bg-white border border-blue-200 rounded-md font-medium text-slate-700">
                  Search: "{filters.search}"
                </span>
              )}
              {filters.state && (
                <span className="px-2.5 py-1 bg-white border border-blue-200 rounded-md font-medium text-slate-700">
                  State: {filters.state}
                </span>
              )}
              {filters.maxFees && (
                <span className="px-2.5 py-1 bg-white border border-blue-200 rounded-md font-medium text-slate-700">
                  Fees ≤ ₹{(filters.maxFees / 100000).toFixed(1)}L
                </span>
              )}
              {filters.minRating && (
                <span className="px-2.5 py-1 bg-white border border-blue-200 rounded-md font-medium text-slate-700">
                  Rating ≥ {filters.minRating}★
                </span>
              )}
              {filters.type !== "All" && (
                <span className="px-2.5 py-1 bg-white border border-blue-200 rounded-md font-medium text-slate-700">
                  Type: {filters.type}
                </span>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-blue-600 hover:text-blue-800 font-bold ml-auto cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results Status */}
          {isLoading ? (
            <CollegeListSkeleton count={6} />
          ) : error ? (
            <ErrorState
              title="Unable to load colleges"
              message={error}
              onRetry={fetchColleges}
            />
          ) : colleges.length === 0 ? (
            <EmptyState
              title="No matching colleges found"
              description="No institutions matched your current filters. Try resetting filters or searching with broader terms."
              actionText="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <>
              {/* College Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
