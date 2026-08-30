"use client";

import React, { useState } from "react";
import { Sparkles, Compass, AlertCircle, HelpCircle } from "lucide-react";
import { ALLOWED_EXAMS, PredictorInput } from "@/lib/validations/predictorSchema";
import { Button } from "@/components/ui/Button";

interface PredictorFormProps {
  initialValues?: Partial<PredictorInput>;
  onSubmit: (data: PredictorInput) => void;
  isLoading?: boolean;
  availableStates?: string[];
}

export function PredictorForm({
  initialValues,
  onSubmit,
  isLoading = false,
  availableStates = [],
}: PredictorFormProps) {
  const [exam, setExam] = useState<string>(initialValues?.exam || "JEE Main");
  const [rank, setRank] = useState<string>(initialValues?.rank ? String(initialValues.rank) : "");
  const [category, setCategory] = useState<string>(initialValues?.category || "General");
  const [preferredState, setPreferredState] = useState<string>(initialValues?.preferredState || "");
  const [error, setError] = useState<string | null>(null);

  const categories = ["General", "OBC-NCL", "SC", "ST", "EWS"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numRank = parseInt(rank.trim(), 10);

    if (isNaN(numRank) || numRank <= 0) {
      setError("Please enter a valid positive rank (greater than 0).");
      return;
    }

    if (numRank > 1000000) {
      setError("Please enter a rank less than or equal to 1,000,000.");
      return;
    }

    onSubmit({
      exam: exam as any,
      rank: numRank,
      category,
      preferredState: preferredState || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900 text-lg">
            College Cutoff Predictor
          </h2>
          <p className="text-xs text-slate-500">
            Enter your competitive exam rank to view matched colleges and admission probabilities
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-rose-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Exam Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Entrance Exam <span className="text-rose-500">*</span>
          </label>
          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-100 text-slate-900 font-medium"
          >
            {ALLOWED_EXAMS.map((ex) => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>
        </div>

        {/* All India Rank Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Your Exam Rank (AIR) <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">e.g. 15000</span>
          </div>
          <input
            type="number"
            min="1"
            max="1000000"
            required
            value={rank}
            onChange={(e) => {
              setRank(e.target.value);
              setError(null);
            }}
            placeholder="e.g. 25000"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-900 font-medium"
          />
        </div>

        {/* Category Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Category Quota
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-100 text-slate-900 font-medium"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred State Filter */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Preferred State (Optional)
          </label>
          <select
            value={preferredState}
            onChange={(e) => setPreferredState(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-100 text-slate-900 font-medium"
          >
            <option value="">Any State in India</option>
            {availableStates.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full font-bold shadow-md"
          leftIcon={<Compass className="w-5 h-5" />}
        >
          Predict Matching Colleges
        </Button>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>
          Matches are computed dynamically against verified opening & closing cutoff databases.
        </span>
      </div>
    </form>
  );
}
