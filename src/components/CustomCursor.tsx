"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);


  const [isMounted, setIsMounted] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  // Enable the custom cursor only on devices with a precise pointer + hover
  // (a real mouse/trackpad). Phones and tablets report (pointer: coarse) /
  // (hover: none), so they keep the native touch behaviour and the cursor is
  // never rendered or hidden there.
  useEffect(() => {
    setIsMounted(true);
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMounted || !hasFinePointer) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-hover], input, [role='button']");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMounted, hasFinePointer, cursorX, cursorY]);

  if (!isMounted || !hasFinePointer) return null;

  return (
    <div ref={containerRef}>
      {/* Hide native cursor globally */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border-2 border-white"
          animate={{
            width: isHovering ? 56 : 32,
            height: isHovering ? 56 : 32,
            opacity: isHovering ? 0.9 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-white mix-blend-difference"
          animate={{
            width: isHovering ? 8 : 5,
            height: isHovering ? 8 : 5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />
      </motion.div>
    </div>
  );
}
