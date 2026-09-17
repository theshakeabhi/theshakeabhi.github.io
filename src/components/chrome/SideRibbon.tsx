// STUB(P4): replaced by package P4 (fixed right-edge vertical marquee,
// writing-mode vertical-rl, marqV 40s, pointer-events none — README §Side
// Ribbon). Must stay OUTSIDE any transformed ancestor (trap 1), and is
// not rendered at all below 768px.

export interface SideRibbonProps {
  items?: string[];
  speed?: number;
  color?: string;
  fg?: string;
}

export default function SideRibbon(_props: SideRibbonProps) {
  return null;
}
