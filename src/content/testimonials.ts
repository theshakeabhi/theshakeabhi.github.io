// P6 owns this file — content model + entries for the Testimonials section.
// P0 ships the typed shape with an empty list so the section always builds.
// `color` should be one of the sticky-note tokens from src/tokens.ts.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  color?: string;
}

export const testimonials: Testimonial[] = [];
