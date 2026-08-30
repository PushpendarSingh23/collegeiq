import React, { Suspense } from "react";
import { CompareClient } from "./CompareClient";

export const metadata = {
  title: "Compare Colleges Side-by-Side — CollegeIQ",
  description:
    "Compare up to 3 Indian colleges and universities side-by-side across fees, placements, ratings, programs, and entrance exam cutoffs.",
};

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500">
          Loading comparison data...
        </div>
      }
    >
      <CompareClient />
    </Suspense>
  );
}
