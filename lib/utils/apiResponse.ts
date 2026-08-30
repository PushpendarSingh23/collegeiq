import { NextResponse } from "next/server";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface ApiResponsePayload<T = unknown> {
  success: boolean;
  data?: T;
  pagination?: PaginationMeta;
  error?: string;
  details?: unknown;
}

export function apiSuccess<T>(data: T, pagination?: PaginationMeta, status = 200) {
  const payload: ApiResponsePayload<T> = {
    success: true,
    data,
  };

  if (pagination) {
    payload.pagination = pagination;
  }

  return NextResponse.json(payload, { status });
}

export function apiError(message: string, status = 400, details?: unknown) {
  const payload: ApiResponsePayload = {
    success: false,
    error: message,
  };

  if (details) {
    payload.details = details;
  }

  return NextResponse.json(payload, { status });
}
