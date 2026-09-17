// P6 owns this file — content model + entries for the Writing section.
// P0 ships the typed shape with an empty list so the section always builds.

export interface WritingPost {
  date: string;
  tag: string;
  title: string;
  readTime: string;
  href?: string;
}

export const writingPosts: WritingPost[] = [];
