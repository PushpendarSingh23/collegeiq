import React, { Suspense } from "react";
import { CollegeListingClient } from "./CollegeListingClient";
import { CollegeListSkeleton } from "@/components/ui/LoadingSkeleton";

export const metadata = {
  title: "Explore Colleges & Universities — CollegeIQ",
  description:
    "Filter and search over 40 top Indian engineering, management, and medical universities by fees, rating, location, and placement records.",
};

export default function CollegesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <CollegeListSkeleton count={6} />
        </div>
      }
    >
      <CollegeListingClient />
    </Suspense>
  );
}
