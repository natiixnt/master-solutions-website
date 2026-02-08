"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type LenisWindow = Window & { __lenis?: Lenis };

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    (window as LenisWindow).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as LenisWindow).__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
