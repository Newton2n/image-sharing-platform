import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const rafId = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,               // Smooth but responsive
      duration: 1.2,            // Ease timing
      smoothWheel: true,        // Desktop scroll
      smoothTouch: true,        // Mobile touch scroll
      wheelMultiplier: 0.9,     // Avoid jumps on fast wheel
      touchMultiplier: 1.2,     // Responsive touch speed
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    setLenisInstance(lenis);

    function raf(time) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }

    rafId.current = requestAnimationFrame(raf);

    // Handle mobile viewport changes
    const handleResize = () => lenis.resize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      cancelAnimationFrame(rafId.current);
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
