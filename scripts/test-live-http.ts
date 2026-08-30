// Comprehensive Live HTTP Test Runner for CollegeIQ

const BASE_URL = "http://localhost:3000";

interface TestReport {
  name: string;
  passed: boolean;
  status: number;
  expectedStatus: number;
  error?: string;
  dataSnippet?: string;
}

async function runLiveHttpAudit() {
  console.log("🔍 Running Live HTTP Acceptance Audit against", BASE_URL, "\n");

  const results: TestReport[] = [];

  async function testEndpoint(
    name: string,
    path: string,
    options: RequestInit,
    expectedStatus: number,
    validator?: (json: any, text: string) => boolean
  ) {
    try {
      const res = await fetch(`${BASE_URL}${path}`, options);
      const text = await res.text();
      let json: any = null;
      try {
        json = JSON.parse(text);
      } catch {}

      const statusMatch = res.status === expectedStatus;
      let valid = statusMatch;
      let error = "";

      if (!statusMatch) {
        error = `Expected HTTP ${expectedStatus}, got HTTP ${res.status}`;
      } else if (validator) {
        try {
          const validResult = validator(json, text);
          if (!validResult) {
            valid = false;
            error = "Custom validator assertion failed";
          }
        } catch (vErr) {
          valid = false;
          error = `Validator threw: ${vErr instanceof Error ? vErr.message : String(vErr)}`;
        }
      }

      results.push({
        name,
        passed: valid,
        status: res.status,
        expectedStatus,
        error: error || undefined,
        dataSnippet: json ? JSON.stringify(json).slice(0, 120) : text.slice(0, 80),
      });

      console.log(
        `${valid ? "✅ PASS" : "❌ FAIL"} [${res.status}] ${name} (${path})`
      );
      if (!valid && error) {
        console.log(`   ↳ Reason: ${error}`);
      }
    } catch (err) {
      results.push({
        name,
        passed: false,
        status: 0,
        expectedStatus,
        error: err instanceof Error ? err.message : String(err),
      });
      console.log(`❌ FAIL [CONN_ERR] ${name} (${path})`);
      console.log(`   ↳ Error:`, err);
    }
  }

  // 1. Pages HTTP Tests
  console.log("--- 1. Testing UI Pages (App Router HTML Delivery) ---");
  await testEndpoint("Home Page HTML", "/", {}, 200, (_, text) => text.includes("CollegeIQ"));
  await testEndpoint("Colleges Listing HTML", "/colleges", {}, 200, (_, text) => text.includes("Explore Colleges"));
  await testEndpoint("College Detail HTML (IIT Bombay)", "/colleges/iit-bombay", {}, 200, (_, text) => text.includes("Bombay"));
  await testEndpoint("College Detail HTML (Not Found)", "/colleges/non-existent-college-slug", {}, 404);
  await testEndpoint("Compare Page HTML", "/compare", {}, 200, (_, text) => text.includes("Compare"));
  await testEndpoint("Predictor Page HTML", "/predictor", {}, 200, (_, text) => text.includes("Predictor"));

  // 2. Colleges API Tests
  console.log("\n--- 2. Testing /api/colleges REST Endpoints ---");
  await testEndpoint("GET /api/colleges (Default)", "/api/colleges", {}, 200, (json) => {
    return json.success === true && Array.isArray(json.data) && json.data.length > 0 && json.pagination.total >= 30;
  });

  await testEndpoint(
    "GET /api/colleges (Filtered by search & sort)",
    "/api/colleges?search=IIT&state=Delhi&minRating=4.5&sortBy=averagePackage&sortOrder=desc",
    {},
    200,
    (json) => {
      return json.success === true && json.data.length > 0 && json.data[0].state.toLowerCase().includes("delhi");
    }
  );

  await testEndpoint(
    "GET /api/colleges (Invalid query parameter validation)",
    "/api/colleges?page=-5",
    {},
    400,
    (json) => json.success === false && json.error.includes("Invalid")
  );

  // 3. College Detail API Tests
  console.log("\n--- 3. Testing /api/colleges/[id] REST Endpoints ---");
  await testEndpoint(
    "GET /api/colleges/[id] (Valid Slug: iit-delhi)",
    "/api/colleges/iit-delhi",
    {},
    200,
    (json) => {
      return json.success === true && json.data.slug === "iit-delhi" && json.data.courses.length > 0 && json.data.cutoffs.length > 0;
    }
  );

  await testEndpoint(
    "GET /api/colleges/[id] (Invalid ID 404 check)",
    "/api/colleges/fake-non-existent-college-id",
    {},
    404,
    (json) => json.success === false
  );

  // 4. Compare API Tests
  console.log("\n--- 4. Testing /api/compare REST Endpoints ---");
  await testEndpoint(
    "GET /api/compare (2 Colleges)",
    "/api/compare?ids=iit-bombay,iit-delhi",
    {},
    200,
    (json) => {
      return json.success === true && json.data.colleges.length === 2 && json.data.metrics.roiRatios !== undefined;
    }
  );

  await testEndpoint(
    "GET /api/compare (3 Colleges)",
    "/api/compare?ids=iit-bombay,iit-delhi,bits-pilani",
    {},
    200,
    (json) => {
      return json.success === true && json.data.colleges.length === 3;
    }
  );

  await testEndpoint(
    "GET /api/compare (Exceeds 3 colleges -> 400)",
    "/api/compare?ids=col1,col2,col3,col4",
    {},
    400,
    (json) => json.success === false
  );

  await testEndpoint(
    "GET /api/compare (Missing 'ids' param -> 400)",
    "/api/compare",
    {},
    400,
    (json) => json.success === false
  );

  // 5. Predictor API Tests
  console.log("\n--- 5. Testing /api/predict REST Endpoints ---");
  await testEndpoint(
    "POST /api/predict (Valid JEE Main AIR 12000)",
    "/api/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exam: "JEE Main", rank: 12000, category: "General" }),
    },
    200,
    (json) => {
      return (
        json.success === true &&
        json.data.totalMatches > 0 &&
        json.data.summary.highChanceCount !== undefined &&
        json.data.recommendations.length > 0
      );
    }
  );

  await testEndpoint(
    "POST /api/predict (Valid NEET AIR 50)",
    "/api/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exam: "NEET", rank: 50, category: "General" }),
    },
    200,
    (json) => {
      return json.success === true && json.data.recommendations.some((r: any) => r.collegeName.includes("AIIMS"));
    }
  );

  await testEndpoint(
    "POST /api/predict (Invalid negative rank -> 400)",
    "/api/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exam: "JEE Main", rank: -500 }),
    },
    400,
    (json) => json.success === false
  );

  await testEndpoint(
    "POST /api/predict (Unsupported exam -> 400)",
    "/api/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exam: "UNSUPPORTED_EXAM", rank: 100 }),
    },
    400,
    (json) => json.success === false
  );

  await testEndpoint(
    "GET /api/predict (Shareable query params for CAT)",
    "/api/predict?exam=CAT&rank=99&category=General",
    {},
    200,
    (json) => json.success === true && json.data.totalMatches > 0
  );

  // Summary
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log("\n========================================================");
  console.log(`Live HTTP Audit Complete: ${passed}/${results.length} Passed, ${failed} Failed`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runLiveHttpAudit();
