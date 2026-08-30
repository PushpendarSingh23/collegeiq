"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface CompareItem {
  id: string;
  name: string;
  slug: string;
  location: string;
  fees: number;
  rating: number;
  averagePackage: number;
  imageUrl?: string | null;
}

interface CompareContextType {
  compareItems: CompareItem[];
  addCollege: (college: CompareItem) => { success: boolean; message: string };
  removeCollege: (collegeId: string) => void;
  clearComparison: () => void;
  isInComparison: (collegeId: string) => boolean;
  maxLimit: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "collegeiq_compare_colleges_v1";
const MAX_COMPARE_LIMIT = 3;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompareItems(parsed.slice(0, MAX_COMPARE_LIMIT));
        }
      }
    } catch (e) {
      console.warn("Failed to load compare items from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage when items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(compareItems));
    } catch (e) {
      console.warn("Failed to save compare items to localStorage:", e);
    }
  }, [compareItems, isLoaded]);

  const isInComparison = useCallback(
    (collegeId: string) => {
      return compareItems.some((item) => item.id === collegeId || item.slug === collegeId);
    },
    [compareItems]
  );

  const addCollege = useCallback(
    (college: CompareItem) => {
      if (isInComparison(college.id) || isInComparison(college.slug)) {
        return {
          success: false,
          message: `${college.name} is already in your comparison list.`,
        };
      }

      if (compareItems.length >= MAX_COMPARE_LIMIT) {
        return {
          success: false,
          message: `You can compare a maximum of ${MAX_COMPARE_LIMIT} colleges at a time. Remove one first.`,
        };
      }

      setCompareItems((prev) => [...prev, college]);
      return {
        success: true,
        message: `${college.name} added to comparison.`,
      };
    },
    [compareItems, isInComparison]
  );

  const removeCollege = useCallback((collegeId: string) => {
    setCompareItems((prev) =>
      prev.filter((item) => item.id !== collegeId && item.slug !== collegeId)
    );
  }, []);

  const clearComparison = useCallback(() => {
    setCompareItems([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addCollege,
        removeCollege,
        clearComparison,
        isInComparison,
        maxLimit: MAX_COMPARE_LIMIT,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
