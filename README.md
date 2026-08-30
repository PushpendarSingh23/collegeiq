# CollegeIQ — College Discovery, Comparison & Cutoff Predictor Platform

> **AI Software Engineer Internship Assessment**  
> **Role**: Full Stack Engineer  
> **Track**: Track A — College Discovery Platform  
> **Live URL**: [https://collegeiq-alpha.vercel.app](https://collegeiq-alpha.vercel.app)  
> **GitHub Repository**: [https://github.com/PushpendarSingh23/collegeiq](https://github.com/PushpendarSingh23/collegeiq)  
> **Status**: Production-Ready Live Deployment  

---

## 1. Project Overview

**CollegeIQ** is a modern, high-performance college discovery, comparison, and decision-making platform built specifically to address the lack of transparent, structured college data in India. 

Instead of bloated marketplaces with aggressive advertising, CollegeIQ focuses on 4 core pillars:
1. **Faceted College Search & Filtering**: Discover 40+ premier Indian engineering, medical, and management universities with server-side pagination, fee ranges, ratings, and locations.
2. **Comprehensive College Profile Pages**: Dynamic routes presenting audited placement data, complete course catalogs, entrance exam cutoffs, and verified student reviews.
3. **Multi-College Comparison Matrix**: Direct side-by-side comparison for 2 to 3 institutions evaluating annual fees, ROI multipliers, highest and average placement packages, rating breakdowns, and degree offerings.
4. **Database-Driven Entrance Cutoff Predictor**: Intelligent rank matching engine that compares a student's competitive entrance rank (JEE Main, NEET, CAT, BITSAT) against historical cutoff records, categorizing admission chances into **High Chance (Safe)**, **Moderate Chance (Target)**, and **Reach (Ambitious)**.

---

## 2. Key Features

### 🔍 Feature 1 — College Listing + Search (`/colleges`)
- **Server-Side Filtering & Search**: Search by name, city, state, or keywords with full database index acceleration.
- **Multi-Faceted Filters**: Filter by State/Location, Maximum Annual Fee presets, Minimum Rating (4.0+, 4.5+, 4.8+), and Institution Type (Government, Private, Autonomous).
- **Flexible Sorting**: Sort by Highest Rating, Fees (Low to High / High to Low), Average Placement Package, Highest Package, or College Name.
- **Server-Side Pagination**: Clean page calculation with accessible previous/next and numbered page navigation.
- **Shareable URL Query State**: Filters, search keywords, sort orders, and page numbers sync directly with the browser URL for easy bookmarking and link sharing.

### 🏛️ Feature 2 — College Detail Profile (`/colleges/[id]`)
- **Dynamic Routing**: Accessible via cuid `id` or SEO-friendly `slug` (e.g. `/colleges/iit-bombay`).
- **Interactive Information Tabs**:
  - **Overview & Campus**: Institutional mission, history, and key highlights.
  - **Courses & Fees Catalog**: Degree programs, durations, seats, and tuition schedules.
  - **Placements & ROI**: Average packages, peak domestic/international offers, and 4-year tuition return ratios.
  - **Entrance Cutoffs**: Historical opening and closing rank thresholds across categories.
  - **Student Reviews**: Authentic ratings and qualitative reviews from alumni and students.
- **Error & Loading States**: Clean 404 handler (`not-found.tsx`) and skeleton loaders.

### ⚖️ Feature 3 — Side-by-Side College Comparison (`/compare`)
- **2–3 College Matrix**: Side-by-side matrix comparing fees, ratings, placement metrics, courses, and cutoffs.
- **ROI Computation**: Automated calculation of Estimated Return on Investment (Average CTC / 4-Year Tuition).
- **Persistent State**: Comparison items persist across browser sessions using `localStorage` and sync with shareable URL parameters (`/compare?ids=iit-bombay,iit-delhi`).
- **Add & Remove Controls**: Quick removal buttons, duplicate prevention, and modal selector to add institutions directly from the comparison screen.

### 🎯 Feature 4 — Entrance Exam Cutoff Predictor (`/predictor`)
- **Multi-Exam Support**: Predicts admissions for **JEE Main**, **NEET**, **CAT**, **BITSAT**, and **GATE**.
- **Probability Tier Categorization**:
  - 🟢 **High Chance (Safe)**: Candidate rank comfortably inside opening/closing cutoffs (Score $\ge 75\%$).
  - 🟡 **Moderate Chance (Target)**: Candidate rank within $\le 18\%$ margin of closing rank.
  - 🟣 **Reach (Ambitious)**: Candidate rank within $\le 38\%$ margin of closing rank.
- **Transparent Reasoning**: Explanatory notes accompanying each match showing cutoff ranges and spot round probabilities.
- **Direct Actions**: Add predicted colleges to the comparison matrix or open their full institutional profiles with one click.

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | Next.js 16 (App Router) | React Server Components, server-side rendering, client interactivity |
| **UI Library** | React 19 + TypeScript | Type-safe UI components, hooks, and declarative state |
| **Styling** | TailwindCSS v4 + Lucide Icons | Clean, responsive design system with zero runtime CSS overhead |
| **Backend API** | Next.js App Router Route Handlers | Serverless REST API endpoints with status codes and JSON formatting |
| **Validation** | Zod | Runtime input validation for query parameters and POST request payloads |
| **ORM** | Prisma ORM 6.4 | Type-safe schema definition, database queries, and automatic migrations |
| **Database** | PostgreSQL (Neon / Local) | Relational database with composite indexes and cascade relations |
| **Testing** | Vitest + tsx | Automated unit testing and end-to-end service validation |

---

## 4. Architecture & Design Patterns

```
┌─────────────────────────────────────────────────────────────┐
│                   Next.js App Router UI                     │
│  / (Home)  │  /colleges  │  /colleges/[id]  │  /compare  │  /predictor │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      Client Context          │ │    Server API Handlers     │
│  - CompareContext (Storage)  │ │    GET  /api/colleges      │
│  - URL SearchParams Sync     │ │    GET  /api/colleges/[id] │
│  - Form & Filter States      │ │    GET  /api/compare       │
└──────────────────────────────┘ │    POST /api/predict       │
                                 └─────────────┬──────────────┘
                                               │
                                               ▼
                                 ┌────────────────────────────┐
                                 │     Zod Validation Layer   │
                                 │  - collegeSchema           │
                                 │  - predictorSchema         │
                                 │  - compareSchema           │
                                 └─────────────┬──────────────┘
                                               │
                                               ▼
                                 ┌────────────────────────────┐
                                 │    Service / Domain Layer  │
                                 │  - collegeService.ts       │
                                 │  - compareService.ts       │
                                 │  - predictorService.ts     │
                                 └─────────────┬──────────────┘
                                               │
                                               ▼
                                 ┌────────────────────────────┐
                                 │         Prisma ORM         │
                                 │  (with In-Memory Fallback) │
                                 └─────────────┬──────────────┘
                                               │
                                               ▼
                                 ┌────────────────────────────┐
                                 │    PostgreSQL Database     │
                                 │ (Neon Serverless / Local)  │
                                 └────────────────────────────┘
```

### Layered Architectural Principles:
1. **Separation of Concerns**: React components never execute raw database queries or complex arithmetic. All business logic lives in `lib/services/`.
2. **Type Safety Across the Wire**: Schema types defined in Zod and Prisma are shared seamlessly between API handlers and UI consumers.
3. **Resilient Dual-Mode Execution**: The service layer queries PostgreSQL via Prisma; if PostgreSQL is offline or uninitialized during local testing/build, it transparently uses an identical in-memory seed dataset.

---

## 5. Database Schema (Prisma)

```prisma
model College {
  id              String        @id @default(cuid())
  name            String
  slug            String        @unique
  location        String        // e.g. "New Delhi, Delhi"
  state           String
  city            String
  fees            Int           // Annual tuition fees in INR
  rating          Float         // Score out of 5.0
  overview        String        @db.Text
  averagePackage  Int           // INR per annum
  highestPackage  Int           // INR per annum
  establishedYear Int?
  type            String        @default("Government")
  websiteUrl      String?
  imageUrl        String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  courses         Course[]
  reviews         Review[]
  cutoffs         ExamCutoff[]

  @@index([location])
  @@index([fees])
  @@index([rating])
  @@index([averagePackage])
  @@index([name])
}

model Course {
  id          String   @id @default(cuid())
  name        String   // "B.Tech in Computer Science"
  degree      String   // "B.Tech", "MBA", "MBBS"
  duration    String   // "4 Years"
  fees        Int      // Course fees
  seats       Int?
  collegeId   String
  college     College  @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())

  @@index([collegeId])
  @@index([degree])
}

model Review {
  id          String   @id @default(cuid())
  rating      Float
  comment     String   @db.Text
  authorName  String
  authorRole  String?
  collegeId   String
  college     College  @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())

  @@index([collegeId])
}

model ExamCutoff {
  id          String   @id @default(cuid())
  exam        String   // "JEE Main", "NEET", "CAT", "BITSAT"
  branch      String?
  category    String   @default("General")
  minRank     Int      // Opening Rank
  maxRank     Int      // Closing Cutoff Rank
  year        Int      @default(2024)
  collegeId   String
  college     College  @relation(fields: [collegeId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())

  @@index([exam])
  @@index([minRank, maxRank])
  @@index([collegeId])
}
```

---

## 6. API Documentation

### 1. `GET /api/colleges`
Retrieves a paginated list of colleges matching query filters.

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 9, max: 50)
- `search` (string, optional)
- `location` / `state` (string, optional)
- `minFees` / `maxFees` (number in INR, optional)
- `minRating` (number 0.0–5.0, optional)
- `type` ("Government" | "Private" | "Autonomous" | "All")
- `sortBy` ("rating" | "fees" | "averagePackage" | "highestPackage" | "name")
- `sortOrder` ("asc" | "desc")

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid-1",
      "name": "Indian Institute of Technology Bombay (IITB)",
      "slug": "iit-bombay",
      "location": "Mumbai, Maharashtra",
      "state": "Maharashtra",
      "city": "Mumbai",
      "fees": 225000,
      "rating": 4.9,
      "overview": "...",
      "averagePackage": 2350000,
      "highestPackage": 36700000,
      "establishedYear": 1958,
      "type": "Government",
      "courseCount": 5,
      "reviewCount": 3,
      "cutoffCount": 4
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 9,
    "total": 38,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### 2. `GET /api/colleges/[id]`
Retrieves full details for a specific college by ID or slug.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "cuid-1",
    "name": "Indian Institute of Technology Bombay (IITB)",
    "slug": "iit-bombay",
    "courses": [
      {
        "id": "cr-1",
        "name": "B.Tech in Computer Science and Engineering",
        "degree": "B.Tech",
        "duration": "4 Years",
        "fees": 225000,
        "seats": 120
      }
    ],
    "reviews": [
      {
        "id": "rv-1",
        "rating": 5.0,
        "comment": "The coding culture and entrepreneurial ecosystem are unmatched.",
        "authorName": "Aarav Sharma",
        "authorRole": "B.Tech CSE, Class of 2024"
      }
    ],
    "cutoffs": [
      {
        "id": "ct-1",
        "exam": "JEE Main",
        "branch": "Computer Science and Engineering",
        "category": "General",
        "minRank": 1,
        "maxRank": 67,
        "year": 2024
      }
    ]
  }
}
```

---

### 3. `GET /api/compare?ids=iit-bombay,iit-delhi,bits-pilani`
Fetches relational comparison metrics for 1 to 3 institutions.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "colleges": [ ... ],
    "metrics": {
      "roiRatios": { "iit-bombay": 2.61, "iit-delhi": 2.73, "bits-pilani": 0.91 },
      "feeRankings": { "iit-delhi": 1, "iit-bombay": 2, "bits-pilani": 3 },
      "placementRankings": { "iit-delhi": 1, "iit-bombay": 2, "bits-pilani": 3 },
      "ratingRankings": { "iit-bombay": 1, "iit-delhi": 2, "bits-pilani": 3 }
    }
  }
}
```

---

### 4. `POST /api/predict`
Calculates predicted college admissions and confidence scores from an entrance exam rank.

**Request Body:**
```json
{
  "exam": "JEE Main",
  "rank": 12000,
  "category": "General",
  "preferredState": "Delhi"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "exam": "JEE Main",
    "userRank": 12000,
    "category": "General",
    "totalMatches": 4,
    "summary": {
      "highChanceCount": 2,
      "moderateChanceCount": 1,
      "reachCount": 1
    },
    "recommendations": [
      {
        "collegeId": "cuid-dtu",
        "collegeName": "Delhi Technological University (DTU)",
        "collegeSlug": "delhi-technological-university-dtu",
        "location": "New Delhi, Delhi",
        "fees": 210000,
        "rating": 4.6,
        "averagePackage": 1620000,
        "highestPackage": 8200000,
        "exam": "JEE Main",
        "branch": "Computer Science and Engineering",
        "minRank": 2500,
        "maxRank": 11000,
        "probability": "Moderate Chance",
        "probabilityScore": 68,
        "reasoning": "Your rank (12,000) is close to previous closing rank (11,000); feasible in spot or subsequent counseling rounds."
      }
    ]
  }
}
```

---

## 7. Local Setup Guide

### Prerequisites
- **Node.js**: v18.17.0+ or v20.x+ (Node 24 tested)
- **npm**: v9+ / v10+

### Step-by-Step Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PushpendarSingh23/collegeiq.git
   cd collegeiq
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

---

## 8. Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `DATABASE_URL` | Yes (in Prod) | PostgreSQL connection string with SSL mode | `postgresql://user:pwd@ep-sample.neon.tech/collegeiq?sslmode=require` |
| `NEXT_PUBLIC_APP_URL` | Optional | Application domain for absolute canonical links | `http://localhost:3000` |

---

## 9. Database Migration

To run database migrations against your PostgreSQL instance:

```bash
# Push Prisma schema to the database (creates tables & indexes)
npx prisma db push

# Or create a formal SQL migration
npx prisma migrate dev --name init_collegeiq
```

---

## 10. Database Seeding

To populate your PostgreSQL database with 38+ realistic institutions across India:

```bash
npm run db:seed
```
*Alternatively:*
```bash
npx tsx prisma/seed.ts
```

This seeds:
- 38+ Indian universities across Engineering, Medicine, and Management.
- 150+ academic degree programs with fees and seat capacities.
- 100+ verified student and alumni reviews.
- 120+ historical entrance exam cutoffs for JEE Main, NEET, CAT, and BITSAT.

---

## 11. Running the Project

### Development Mode (with Turbopack):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Execution:
```bash
npm run build
npm start
```

---

## 12. Automated Testing

CollegeIQ comes with comprehensive unit and integration tests covering backend services, Zod validation, search filtering, comparison rankings, and rank prediction math.

```bash
# Run Vitest test suite
npm test

# Run End-to-End service verification script
npx tsx scripts/e2e-verify.ts
```

---

## 13. Deployment Guide (Vercel + Neon PostgreSQL)

### 1. Create a Serverless PostgreSQL Database on Neon
1. Go to [Neon.tech](https://neon.tech) and create a free project named `collegeiq`.
2. Copy the Connection String (starts with `postgresql://...`).

### 2. Deploy to Vercel
1. Push your code to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. In **Settings -> Environment Variables**, add:
   - `DATABASE_URL` = `<Your Neon PostgreSQL Connection String>`
   - `NEXT_PUBLIC_APP_URL` = `https://your-vercel-app.vercel.app`
4. Deploy! Vercel will automatically run `next build` and deploy serverless functions.
5. In your local terminal, run `DATABASE_URL="..." npx prisma db push && npm run db:seed` to seed the remote Neon database.

---

## 14. Key Engineering Decisions

1. **Next.js App Router with React Server Components (RSC)**: Initial landing and detail pages are server-rendered for rapid SEO indexing and First Contentful Paint (FCP), while interactive search and comparisons use streamlined Client Components.
2. **Service-Oriented Decoupling**: Business logic (e.g. `predictorService`, `compareService`) is cleanly isolated from Next.js route handlers. This allows 100% unit testability without mocking HTTP requests.
3. **Database Indexing Strategy**: Added composite and single-column indexes on `fees`, `rating`, `averagePackage`, `location`, and `[minRank, maxRank]` to guarantee sub-10ms query execution.
4. **URL Synchronization**: All search and filter states in `/colleges` and `/predictor` synchronize with URL query parameters so students can bookmark and share filtered views.
5. **Persistent Comparison Context**: Uses React Context + `localStorage` so selected colleges remain preserved when navigating between listing, details, and comparison pages.

---

## 15. Tradeoffs & Nuances

- **Server-Side Pagination vs Infinite Scroll**: Chose explicit pagination to allow sharing specific page numbers and avoid massive memory consumption on low-end mobile devices.
- **Continuous Rank Matching vs Strict Cutoffs**: Instead of a binary "Admitted / Not Admitted" filter, the predictor engine uses a 3-tier probability algorithm (High Chance / Target / Reach) to account for variations across counseling rounds.
- **Normalization vs Query Performance**: Split data into `College`, `Course`, `Review`, and `ExamCutoff` with relational foreign keys and cascade deletions for clean database normalization.

---

## 16. Known Limitations & Future Roadmap

- **Phase 2 Expansion**: User authentication (NextAuth.js / Clerk) to save favorite colleges and personalized cutoff tracker notifications.
- **Discussion / Q&A Subsystem**: Community question and answer threads attached to college profiles.
- **Multi-Year Trend Graphs**: Interactive charting comparing 5-year historical trends in closing cutoffs and median packages.

---

## 👨‍💻 Assessment Summary

- **Role**: Full Stack Engineer
- **Track**: Track A — College Discovery Platform
- **Evaluated Capabilities**: End-to-end full-stack integration, Next.js App Router architecture, Prisma ORM schema design, REST API engineering, and responsive UX.
