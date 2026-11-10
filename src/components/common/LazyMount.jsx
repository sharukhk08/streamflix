"use client";
import React, { useEffect, useRef, useState } from "react";

// Renders children only when the placeholder is about to scroll into view,
// so below-the-fold rows do not cost anything on the first load.
export default function LazyMount({ children, minHeight = 320, rootMargin = "600px", maxWaitMs = 4000 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    // Safety net: never leave a row empty if the observer does not fire.
    const t = setTimeout(() => setShow(true), maxWaitMs);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [show, rootMargin, maxWaitMs]);
  return show ? <>{children}</> : <div ref={ref} style={{ minHeight }} aria-hidden="true" />;
}
