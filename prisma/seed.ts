import { PrismaClient } from "@prisma/client";
import { SEED_COLLEGES } from "./seedData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for CollegeIQ...");

  // Clean existing records to ensure fresh idempotency
  await prisma.examCutoff.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  console.log("🗑️  Cleaned existing records.");

  let seededCount = 0;

  for (const collegeData of SEED_COLLEGES) {
    const { courses, reviews, cutoffs, ...collegeFields } = collegeData;

    await prisma.college.create({
      data: {
        ...collegeFields,
        courses: {
          create: courses.map((course) => ({
            name: course.name,
            degree: course.degree,
            duration: course.duration,
            fees: course.fees,
            seats: course.seats ?? null,
          })),
        },
        reviews: {
          create: reviews.map((review) => ({
            rating: review.rating,
            comment: review.comment,
            authorName: review.authorName,
            authorRole: review.authorRole,
          })),
        },
        cutoffs: {
          create: cutoffs.map((cutoff) => ({
            exam: cutoff.exam,
            branch: cutoff.branch,
            category: cutoff.category,
            minRank: cutoff.minRank,
            maxRank: cutoff.maxRank,
            year: cutoff.year,
          })),
        },
      },
    });

    seededCount++;
    console.log(`✅ Seeded (${seededCount}/${SEED_COLLEGES.length}): ${collegeFields.name}`);
  }

  console.log(`\n🎉 Successfully seeded ${seededCount} colleges with comprehensive courses, reviews, and cutoffs!`);
}

main()
  .catch((e) => {
    console.error("❌ Error during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
