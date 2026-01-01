"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function AnimatedNumber({
  value,
  duration = 0.6,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const start = Number(ref.current.textContent) || 0;

    const controls = animate(start, value, {
      duration,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toString();
        }
      },
    });

    return () => controls.stop();
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
