import React from "react";
import { notFound } from "next/navigation";
import { getCollegeById } from "@/lib/services/collegeService";
import { CollegeDetailClient } from "./CollegeDetailClient";

interface CollegeDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CollegeDetailPageProps) {
  const { id } = await params;
  const college = await getCollegeById(id);

  if (!college) {
    return {
      title: "College Not Found — CollegeIQ",
      description: "The requested college profile could not be found.",
    };
  }

  return {
    title: `${college.name} — Fees, Placements, Cutoffs & Reviews | CollegeIQ`,
    description: college.overview.slice(0, 160),
  };
}

export default async function CollegeDetailPage({
  params,
}: CollegeDetailPageProps) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    notFound();
  }

  const college = await getCollegeById(id);

  if (!college) {
    notFound();
  }

  return <CollegeDetailClient college={college} />;
}
