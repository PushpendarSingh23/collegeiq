import React, { Suspense } from "react";
import { PredictorClient } from "./PredictorClient";

export const metadata = {
  title: "College Cutoff Predictor — JEE Main, NEET & CAT | CollegeIQ",
  description:
    "Predict your college admission chances based on your entrance exam rank with probability scores across top Indian institutions.",
};

export default function PredictorPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
          Loading Predictor Engine...
        </div>
      }
    >
      <PredictorClient />
    </Suspense>
  );
}
