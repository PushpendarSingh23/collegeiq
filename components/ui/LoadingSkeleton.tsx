import React from "react";
import { clsx } from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-slate-200/80 rounded-md",
        className
      )}
    />
  );
}

export function CollegeCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-14 rounded-lg" />
        </div>
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-16 w-full rounded-lg mb-4" />
      </div>
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function CollegeListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <CollegeCardSkeleton key={idx} />
      ))}
    </div>
  );
}
