// P6 — content model + entries for the Testimonials section.
//
// INTENTIONALLY EMPTY: the prototype's quotes were invented and must never
// ship (README §Questions to Resolve — real testimonials with permission,
// or remove the section). While this array is empty, <Testimonials />
// returns null and P7 drops its SectionDivider in Portfolio.tsx.
//
// Shape reference only — the prototype cards looked like (DO NOT ship):
//   { quote: "…", name: "Ravi K.", role: "Eng Manager",
//     color: sticky.yellow, rotate: -3 }
// with colors cycling sticky yellow/mint/sky/red and rotations -3/4/-5/3.
// `color` should be one of the sticky-note tokens from src/tokens.ts.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  color?: string;
  /** Card rotation in degrees (±2–5 per README §Rotation). */
  rotate?: number;
}

export const testimonials: Testimonial[] = [];
