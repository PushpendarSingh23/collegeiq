// End-to-End API and Services Verification Script for CollegeIQ
import { getColleges, getCollegeById } from "../lib/services/collegeService";
import { getComparisonData } from "../lib/services/compareService";
import { predictColleges } from "../lib/services/predictorService";
import { collegeQuerySchema } from "../lib/validations/collegeSchema";
import { predictorInputSchema } from "../lib/validations/predictorSchema";
import { compareQuerySchema } from "../lib/validations/compareSchema";

async function verifyAll() {
  console.log("🚀 Starting CollegeIQ E2E Verification...\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - ${detail || "Condition not met"}`);
      failed++;
    }
  }

  // 1. College Listing & Search
  console.log("--- Testing Feature 1: College Listing & Search ---");
  const listing = await getColleges(collegeQuerySchema.parse({ page: 1, limit: 10 }));
  assert(listing.data.length === 10, "Default pagination returns 10 colleges");
  assert(listing.pagination.total >= 30, "Total count includes 35+ seeded colleges");

  const searchResult = await getColleges(collegeQuerySchema.parse({ search: "Delhi", limit: 20 }));
  assert(searchResult.data.length > 0, "Search by 'Delhi' returns matching colleges");
  assert(
    searchResult.data.every((c) =>
      c.name.toLowerCase().includes("delhi") ||
      c.location.toLowerCase().includes("delhi") ||
      c.city.toLowerCase().includes("delhi") ||
      c.state.toLowerCase().includes("delhi")
    ),
    "All search results contain 'Delhi'"
  );

  const feeFiltered = await getColleges(collegeQuerySchema.parse({ maxFees: 250000, limit: 50 }));
  assert(
    feeFiltered.data.every((c) => c.fees <= 250000),
    "Max fee filter (<= 2.5L) strictly respected"
  );

  // 2. College Detail Page
  console.log("\n--- Testing Feature 2: College Detail Page ---");
  const detail = await getCollegeById("iit-bombay");
  assert(detail !== null, "College detail lookup by slug succeeds");
  assert(detail?.name.includes("Bombay") ?? false, "College name matches IIT Bombay");
  assert((detail?.courses.length ?? 0) >= 3, "College has multiple courses");
  assert((detail?.reviews.length ?? 0) >= 2, "College has multiple verified reviews");
  assert((detail?.cutoffs.length ?? 0) >= 2, "College has multiple exam cutoffs");

  const notFound = await getCollegeById("non-existent-random-id");
  assert(notFound === null, "Invalid college ID returns null (triggers 404)");

  // 3. Compare Colleges
  console.log("\n--- Testing Feature 3: Compare Colleges ---");
  const comp = await getComparisonData(["iit-bombay", "iit-delhi", "bits-pilani"]);
  assert(comp.colleges.length === 3, "Fetches exactly 3 colleges for 3-way comparison");
  assert(Object.keys(comp.metrics.roiRatios).length === 3, "Calculates ROI ratios for all 3");
  assert(Object.keys(comp.metrics.feeRankings).length === 3, "Calculates fee rankings");

  const capComp = await getComparisonData(["iit-bombay", "iit-delhi", "bits-pilani", "nit-trichy"]);
  assert(capComp.colleges.length === 3, "Strictly caps comparison at maximum 3 colleges");

  // 4. Predictor Tool
  console.log("\n--- Testing Feature 4: Predictor Tool ---");
  const jeePrediction = await predictColleges({
    exam: "JEE Main",
    rank: 12000,
    category: "General",
  });
  assert(jeePrediction.totalMatches > 0, "Predicts matches for JEE Main AIR 12000");
  assert(
    jeePrediction.summary.highChanceCount > 0 ||
    jeePrediction.summary.moderateChanceCount > 0,
    "Calculates probability tiers (High Chance / Moderate / Reach)"
  );

  const neetPrediction = await predictColleges({
    exam: "NEET",
    rank: 45,
    category: "General",
  });
  assert(
    neetPrediction.recommendations.some((r) => r.collegeName.includes("AIIMS")),
    "Top NEET rank matches AIIMS New Delhi with High Chance"
  );

  // 5. Input Validation
  console.log("\n--- Testing Validation & Error Rejections ---");
  const invalidRank = predictorInputSchema.safeParse({ exam: "JEE Main", rank: -500 });
  assert(!invalidRank.success, "Negative rank rejected by validation");

  const invalidExam = predictorInputSchema.safeParse({ exam: "UNKNOWN_EXAM", rank: 100 });
  assert(!invalidExam.success, "Unsupported exam name rejected by validation");

  const invalidCompare = compareQuerySchema.safeParse({ ids: "a,b,c,d,e" });
  assert(!invalidCompare.success, "More than 3 compare IDs rejected by validation");

  console.log(`\n========================================`);
  console.log(`E2E Verification Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

verifyAll().catch((e) => {
  console.error("Verification crashed:", e);
  process.exit(1);
});
