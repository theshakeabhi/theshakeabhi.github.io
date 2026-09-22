// P6 — content model + entries for the Writing section.
//
// PLACEHOLDER CONTENT: the five titles below are carried over from the
// prototype (portfolio-2.jsx) and every href points at the dev.to profile
// until real posts exist. Swap titles/hrefs as articles are published.
// Sep '26 resume refresh: titles 1 and 3 retitled so no title cites a
// metric the resume doesn't back (Lighthouse 39→81, KYC 25→85%).

export interface WritingPost {
  date: string;
  tag: string;
  title: string;
  readTime: string;
  href?: string;
}

const DEVTO_PROFILE = "https://dev.to/theshakeabhi";

export const writingPosts: WritingPost[] = [
  {
    date: "2026 · 03 · 14",
    tag: "PERF",
    title: "Lighthouse 39 to 81 without the rewrite anyone was asking for",
    readTime: "12 MIN",
    href: DEVTO_PROFILE,
  },
  {
    date: "2026 · 01 · 22",
    tag: "PEOPLE",
    title: "Mentoring frontend engineers like you actually mean it",
    readTime: "9 MIN",
    href: DEVTO_PROFILE,
  },
  {
    date: "2025 · 11 · 06",
    tag: "PRODUCT",
    title: "The 25→85% KYC story (and the four screens we deleted)",
    readTime: "14 MIN",
    href: DEVTO_PROFILE,
  },
  {
    date: "2025 · 09 · 12",
    tag: "AI",
    title: "Claude in the loop: a senior engineer's honest manual",
    readTime: "18 MIN",
    href: DEVTO_PROFILE,
  },
  {
    date: "2025 · 06 · 02",
    tag: "RELIABILITY",
    title: "Incident reduction is a UX problem in disguise",
    readTime: "11 MIN",
    href: DEVTO_PROFILE,
  },
];
