"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Layers,
  Plus,
  Trash2,
  Share2,
  Check,
  Search,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { ComparisonTable } from "@/components/compare/ComparisonTable";
import { AddCollegeModal } from "@/components/compare/AddCollegeModal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ComparisonResult } from "@/lib/services/compareService";

export function CompareClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { compareItems, clearComparison, addCollege, maxLimit } = useCompare();

  const [comparisonData, setComparisonData] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync URL IDs into compareItems on first load if URL contains ?ids=...
  useEffect(() => {
    const urlIds = searchParams.get("ids");
    if (urlIds && compareItems.length === 0) {
      const idsArray = urlIds.split(",").map((s) => s.trim()).filter(Boolean);
      idsArray.slice(0, 3).forEach((id) => {
        // Fetch college basic info to add to context
        fetch(`/api/colleges/${id}`)
          .then((res) => res.json())
          .then((json) => {
            if (json.success && json.data) {
              addCollege({
                id: json.data.id,
                name: json.data.name,
                slug: json.data.slug,
                location: json.data.location,
                fees: json.data.fees,
                rating: json.data.rating,
                averagePackage: json.data.averagePackage,
                imageUrl: json.data.imageUrl,
              });
            }
          })
          .catch(() => {});
      });
    }
  }, [searchParams, compareItems.length, addCollege]);

  // Fetch full comparison data from API whenever compareItems change
  const fetchComparison = useCallback(async () => {
    if (compareItems.length === 0) {
      setComparisonData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ids = compareItems.map((c) => c.slug || c.id).join(",");
      const res = await fetch(`/api/compare?ids=${encodeURIComponent(ids)}`);

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const json = await res.json();
      if (json.success) {
        setComparisonData(json.data);
      } else {
        throw new Error(json.error || "Failed to load comparison data");
      }
    } catch (err) {
      console.error("Comparison fetch error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while generating the comparison matrix."
      );
    } finally {
      setLoading(false);
    }
  }, [compareItems]);

  useEffect(() => {
    fetchComparison();
  }, [fetchComparison]);

  const handleShareLink = () => {
    if (compareItems.length === 0) return;
    const ids = compareItems.map((c) => c.slug || c.id).join(",");
    const shareUrl = `${window.location.origin}/compare?ids=${encodeURIComponent(ids)}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddPresetPair = (col1: string, col2: string) => {
    clearComparison();
    Promise.all([
      fetch(`/api/colleges/${col1}`).then((r) => r.json()),
      fetch(`/api/colleges/${col2}`).then((r) => r.json()),
    ]).then(([res1, res2]) => {
      if (res1.success && res1.data) {
        addCollege({
          id: res1.data.id,
          name: res1.data.name,
          slug: res1.data.slug,
          location: res1.data.location,
          fees: res1.data.fees,
          rating: res1.data.rating,
          averagePackage: res1.data.averagePackage,
          imageUrl: res1.data.imageUrl,
        });
      }
      if (res2.success && res2.data) {
        addCollege({
          id: res2.data.id,
          name: res2.data.name,
          slug: res2.data.slug,
          location: res2.data.location,
          fees: res2.data.fees,
          rating: res2.data.rating,
          averagePackage: res2.data.averagePackage,
          imageUrl: res2.data.imageUrl,
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
            <Layers className="w-4 h-4" />
            <span>Side-by-Side College Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Compare Colleges ({compareItems.length}/{maxLimit})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Analyze fees, placement packages, ratings, and accepted entrance cutoffs
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {compareItems.length > 0 && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleShareLink}
                leftIcon={copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              >
                {copiedLink ? "Link Copied!" : "Share Comparison"}
              </Button>

              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={clearComparison}
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Clear All
              </Button>
            </>
          )}

          {compareItems.length < maxLimit && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add College
            </Button>
          )}
        </div>
      </div>

      {/* Main View Area */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 space-y-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium">Generating side-by-side comparison...</p>
        </div>
      ) : error ? (
        <ErrorState
          title="Could not load comparison data"
          message={error}
          onRetry={fetchComparison}
        />
      ) : compareItems.length === 0 ? (
        <div className="space-y-8">
          <EmptyState
            title="No colleges selected for comparison"
            description="Select 2 or 3 colleges to compare their annual fees, average & highest placement packages, student ratings, and cutoffs side by side."
            actionText="Browse Colleges Directory"
            onAction={() => router.push("/colleges")}
            icon={<Layers className="w-7 h-7 text-purple-600" />}
          />

          {/* Quick Preset Comparison Suggestions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-2xl mx-auto space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Popular Preset Comparisons (Click to load)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleAddPresetPair("iit-bombay", "iit-delhi")}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/40 text-left transition-colors cursor-pointer group"
              >
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 block">
                  IIT Bombay vs IIT Delhi
                </span>
                <span className="text-[11px] text-slate-500">
                  India's top two premier engineering institutes
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleAddPresetPair("iim-ahmedabad", "iim-bangalore")}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/40 text-left transition-colors cursor-pointer group"
              >
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 block">
                  IIM Ahmedabad vs IIM Bangalore
                </span>
                <span className="text-[11px] text-slate-500">
                  Leading management B-schools comparison
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleAddPresetPair("aiims-new-delhi", "cmc-vellore")}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/40 text-left transition-colors cursor-pointer group"
              >
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 block">
                  AIIMS Delhi vs CMC Vellore
                </span>
                <span className="text-[11px] text-slate-500">
                  Government vs Private premier medical colleges
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleAddPresetPair("bits-pilani", "iiit-hyderabad")}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/40 text-left transition-colors cursor-pointer group"
              >
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 block">
                  BITS Pilani vs IIIT Hyderabad
                </span>
                <span className="text-[11px] text-slate-500">
                  Top tier computer science and private excellence
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : compareItems.length === 1 ? (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900">
            <span className="text-sm font-semibold">
              You have selected 1 college ({compareItems[0].name}). Add at least 1 more college to view a side-by-side comparison.
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Second College
            </Button>
          </div>

          {comparisonData && (
            <ComparisonTable
              comparisonData={comparisonData}
              onOpenAddModal={() => setIsModalOpen(true)}
            />
          )}
        </div>
      ) : (
        comparisonData && (
          <ComparisonTable
            comparisonData={comparisonData}
            onOpenAddModal={() => setIsModalOpen(true)}
          />
        )
      )}

      {/* Add College Modal */}
      <AddCollegeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
