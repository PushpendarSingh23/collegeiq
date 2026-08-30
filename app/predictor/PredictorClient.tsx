"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, HelpCircle, Compass, RotateCcw } from "lucide-react";
import { PredictorForm } from "@/components/predictor/PredictorForm";
import { PredictionResults } from "@/components/predictor/PredictionResults";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { PredictorInput } from "@/lib/validations/predictorSchema";
import { PredictorResult } from "@/lib/services/predictorService";

export function PredictorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [result, setResult] = useState<PredictorResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Initial values from URL if present
  const initialExam = searchParams.get("exam") || "JEE Main";
  const initialRank = searchParams.get("rank") ? Number(searchParams.get("rank")) : undefined;
  const initialCategory = searchParams.get("category") || "General";
  const initialPreferredState = searchParams.get("preferredState") || "";

  // Load distinct states
  useEffect(() => {
    fetch("/api/colleges?limit=50")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          const states = Array.from(
            new Set((json.data as any[]).map((c) => c.state))
          ).sort();
          setAvailableStates(states);
        }
      })
      .catch((e) => console.warn("Could not load states:", e));
  }, []);

  const runPrediction = useCallback(async (data: PredictorInput) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Sync URL
      const params = new URLSearchParams();
      params.set("exam", data.exam);
      params.set("rank", String(data.rank));
      if (data.category) params.set("category", data.category);
      if (data.preferredState) params.set("preferredState", data.preferredState);
      router.replace(`/predictor?${params.toString()}`, { scroll: false });

      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (json.success) {
        setResult(json.data);
      } else {
        throw new Error(json.error || "Failed to compute predictions");
      }
    } catch (err) {
      console.error("Predictor execution error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while predicting admissions."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  // If initialRank exists in URL on mount, trigger automatic prediction
  useEffect(() => {
    if (initialRank && !hasSearched) {
      runPrediction({
        exam: initialExam as any,
        rank: initialRank,
        category: initialCategory,
        preferredState: initialPreferredState || undefined,
      });
    }
  }, [initialRank, initialExam, initialCategory, initialPreferredState, hasSearched, runPrediction]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Database-Driven Cutoff Engine
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Entrance Exam Rank & Cutoff Predictor
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Input your All India Rank (AIR) in JEE Main, NEET, CAT, or BITSAT to calculate
          your admission probability across verified institutional cutoffs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Predictor Form (Left Column) */}
        <div className="lg:col-span-5 sticky top-20">
          <PredictorForm
            initialValues={{
              exam: initialExam as any,
              rank: initialRank,
              category: initialCategory,
              preferredState: initialPreferredState,
            }}
            onSubmit={runPrediction}
            isLoading={loading}
            availableStates={availableStates}
          />
        </div>

        {/* Prediction Results (Right Column) */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
              <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-base">
                  Querying Database Cutoffs...
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Comparing your rank against opening & closing ranks for government and private colleges.
                </p>
              </div>
            </div>
          ) : error ? (
            <ErrorState
              title="Prediction Calculation Failed"
              message={error}
            />
          ) : result ? (
            result.totalMatches === 0 ? (
              <EmptyState
                title="No colleges matched for this rank & criteria"
                description={`No historical cutoffs in our database accommodate an AIR of #${result.userRank.toLocaleString()} for ${result.exam} under the selected filters. Try removing state filters or exploring our full colleges directory.`}
                actionText="Explore All Colleges"
                onAction={() => router.push("/colleges")}
                icon={<Compass className="w-7 h-7 text-amber-500" />}
              />
            ) : (
              <PredictionResults result={result} />
            )
          ) : (
            /* Idle State before user submits form */
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Ready to find your college matches?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Fill in the form on the left with your entrance exam and All India Rank.
                Our algorithm will instantly categorize your chances into Safe (High Chance), Target (Moderate), and Reach.
              </p>

              <div className="pt-4 grid grid-cols-3 gap-3 max-w-md mx-auto text-left text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="font-bold text-emerald-800 block">High Chance</span>
                  <span className="text-[11px] text-emerald-600">Rank comfortably within cutoff</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-800 block">Moderate</span>
                  <span className="text-[11px] text-amber-600">Near cutoff; spot rounds</span>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <span className="font-bold text-purple-800 block">Reach</span>
                  <span className="text-[11px] text-purple-600">Ambitious stretch option</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
