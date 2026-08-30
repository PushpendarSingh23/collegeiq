import React from "react";
import { Star } from "lucide-react";
import { clsx } from "clsx";

interface RatingStarsProps {
  rating: number; // 0.0 - 5.0
  max?: number;
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
  scorePosition?: "right" | "badge";
  className?: string;
}

export function RatingStars({
  rating,
  max = 5,
  size = "md",
  showScore = true,
  scorePosition = "right",
  className,
}: RatingStarsProps) {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs font-semibold",
    md: "text-sm font-semibold",
    lg: "text-base font-bold",
  };

  if (scorePosition === "badge") {
    return (
      <div
        className={clsx(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold",
          textSizes[size],
          className
        )}
      >
        <span>{rating.toFixed(1)}</span>
        <Star className={clsx(iconSizes[size], "fill-emerald-600 text-emerald-600")} />
      </div>
    );
  }

  return (
    <div className={clsx("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, idx) => {
          const filled = idx + 1 <= Math.round(rating);
          return (
            <Star
              key={idx}
              className={clsx(
                iconSizes[size],
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-slate-200 text-slate-200"
              )}
            />
          );
        })}
      </div>
      {showScore && (
        <span className={clsx("text-slate-700 font-semibold", textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
