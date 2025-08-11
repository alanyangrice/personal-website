"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type AsciiAnimatorProps = {
  frames: string[];
  fps?: number;
  loop?: boolean;
  className?: string;
  ariaLabel?: string;
  playbackMode?: "loop" | "pingpong";
  preClassName?: string;
  fitToElementId?: string;
  fitPaddingPx?: number;
  lineHeight?: number;
  minFontPx?: number;
  maxFontPx?: number;
  charAspectRatio?: number;
};

export default function AsciiAnimator({
  frames,
  fps = 12,
  loop = true,
  className = "",
  ariaLabel = "Rotating ASCII animation",
  playbackMode = "loop",
  preClassName = "",
  fitToElementId,
  fitPaddingPx = 0,
  lineHeight = 0.85,
  minFontPx = 6,
  maxFontPx = 28,
  charAspectRatio = 0.6,
}: AsciiAnimatorProps) {
  const safeFrames = useMemo(() => (Array.isArray(frames) && frames.length > 0 ? frames : [""]), [frames]);
  const [frameIndex, setFrameIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const directionRef = useRef<1 | -1>(1);
  const [computedFontPx, setComputedFontPx] = useState<number | null>(null);

  // Derive number of lines from the first frame for vertical fit
  const lineCount = useMemo(() => {
    const first = safeFrames[0] ?? "";
    const lines = first.split(/\r?\n/);
    // Remove trailing empty line if present
    if (lines.length > 1 && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }
    return Math.max(1, lines.length);
  }, [safeFrames]);

  // Derive max columns from the first frame for horizontal fit
  const maxColumns = useMemo(() => {
    const first = safeFrames[0] ?? "";
    const lines = first.split(/\r?\n/);
    if (lines.length > 1 && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }
    let maxLen = 1;
    for (const line of lines) {
      maxLen = Math.max(maxLen, line.length);
    }
    return maxLen;
  }, [safeFrames]);

  useEffect(() => {
    // Reset when frames set changes
    setFrameIndex(0);
    directionRef.current = 1;
  }, [safeFrames]);

  // Compute font-size to fit a given element's height
  useEffect(() => {
    if (!fitToElementId) {
      setComputedFontPx(null);
      return;
    }

    const target = document.getElementById(fitToElementId);

    const recompute = () => {
      const h = target?.clientHeight ?? window.innerHeight;
      const w = target?.clientWidth ?? window.innerWidth;
      const availableH = Math.max(0, h - fitPaddingPx);
      const availableW = Math.max(0, w - fitPaddingPx);
      if (lineCount > 0 && maxColumns > 0) {
        const sizeByHeight = availableH / (lineCount * lineHeight);
        const sizeByWidth = availableW / (maxColumns * charAspectRatio);
        const size = Math.min(sizeByHeight, sizeByWidth);
        const clamped = Math.max(minFontPx, Math.min(maxFontPx, Math.floor(size)));
        setComputedFontPx(clamped);
      }
    };

    recompute();
    const ro = target ? new ResizeObserver(recompute) : null;
    ro?.observe(target as Element);
    window.addEventListener("resize", recompute);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [fitToElementId, fitPaddingPx, lineCount, maxColumns, lineHeight, minFontPx, maxFontPx, charAspectRatio]);

  useEffect(() => {
    const frameIntervalMs = Math.max(16, Math.floor(1000 / fps));

    const tick = () => {
      setFrameIndex((prev) => {
        const total = safeFrames.length;
        if (total <= 1) return 0;

        if (playbackMode === "loop") {
          const nextIndex = prev + 1;
          if (nextIndex >= total) {
            return loop ? 0 : prev;
          }
          return nextIndex;
        }

        // pingpong mode: bounce at ends without repeating endpoints
        const dir = directionRef.current;
        const next = prev + dir;
        if (next >= total) {
          directionRef.current = -1;
          return total - 2 >= 0 ? total - 2 : 0;
        }
        if (next < 0) {
          directionRef.current = 1;
          return total > 1 ? 1 : 0;
        }
        return next;
      });
    };

    intervalRef.current = window.setInterval(tick, frameIntervalMs);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [fps, loop, playbackMode, safeFrames.length]);

  return (
    <div className={className} aria-live="polite" aria-label={ariaLabel} role="img">
      <pre
        className={`font-mono whitespace-pre overflow-hidden select-none ${preClassName}`}
        style={computedFontPx ? { fontSize: `${computedFontPx}px`, lineHeight } : { lineHeight }}
      >
{safeFrames[frameIndex]}
      </pre>
    </div>
  );
}


