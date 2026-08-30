import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CollegeNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
        <GraduationCap className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          College Profile Not Found
        </h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          We couldn't locate a college matching the provided identifier or slug in our database.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link href="/colleges">
          <Button variant="primary" size="md" leftIcon={<Search className="w-4 h-4" />}>
            Browse All Colleges
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
