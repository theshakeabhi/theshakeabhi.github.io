// STUB(P3): replaced by package P3 (pupils track the cursor in container
// coords, blink every 3.5–6.5s, double-click spins 360° — README §Eyes
// That Follow). This stub renders static centered pupils.
import type { CSSProperties } from "react";
import { ink, borders } from "../../tokens";

export interface EyesProps {
  size?: number;
  gap?: number;
  blink?: boolean;
  style?: CSSProperties;
}

export default function Eyes({
  size = 60,
  gap = 14,
  blink: _blink = true,
  style,
}: EyesProps) {
  const pupil = Math.round(size * 0.38);
  return (
    <div style={{ display: "inline-flex", gap, ...style }} aria-hidden='true'>
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: "white",
            border: borders.default,
            boxShadow: `3px 3px 0 ${ink}`,
            display: "grid",
            placeItems: "center",
          }}
        >
          <div
            style={{
              width: pupil,
              height: pupil,
              borderRadius: "50%",
              background: ink,
            }}
          />
        </div>
      ))}
    </div>
  );
}
