import { clsx, type ClassValue } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date?: string | null) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function makeSlug(input: string) {
  return slugify(input, { lower: true, strict: true, trim: true });
}

export function splitLines(value?: string | null) {
  if (!value) return [];

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function toJsonString(value: unknown, fallback = "{}") {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return fallback;
  }
}
