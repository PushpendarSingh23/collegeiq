// Formatting utilities for CollegeIQ

/**
 * Formats an amount in INR into human-readable Indian lakh / crore format.
 * Example: 225000 -> "₹2.25 L/yr", 12000000 -> "₹1.20 Cr"
 */
export function formatINR(amount: number, perYear = false): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "N/A";
  }

  const suffix = perYear ? "/yr" : "";

  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr${suffix}`;
  }
  if (amount >= 100000) {
    const lk = amount / 100000;
    return `₹${lk % 1 === 0 ? lk : lk.toFixed(2)} L${suffix}`;
  }
  if (amount >= 1000) {
    const k = amount / 1000;
    return `₹${k % 1 === 0 ? k : k.toFixed(1)}k${suffix}`;
  }
  return `₹${amount.toLocaleString("en-IN")}${suffix}`;
}

/**
 * Formats placement package (in INR Per Annum) to LPA format.
 * Example: 2400000 -> "24.0 LPA", 36700000 -> "3.67 Cr"
 */
export function formatPackage(amount: number): string {
  if (!amount || isNaN(amount)) return "N/A";
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2)} Cr PA`;
  }
  const lpa = amount / 100000;
  return `₹${lpa.toFixed(1)} LPA`;
}

/**
 * Formats integer ranks with commas (e.g. 25000 -> "#25,000")
 */
export function formatRank(rank: number): string {
  if (rank === null || rank === undefined || isNaN(rank)) return "N/A";
  return `#${rank.toLocaleString("en-IN")}`;
}

/**
 * Formats rating score to 1 decimal place.
 */
export function formatRating(rating: number): string {
  if (!rating || isNaN(rating)) return "0.0";
  return rating.toFixed(1);
}
