import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function ScrollProgress() {
  const progress = useMotionValue(0);
  const x = useSpring(progress, { stiffness: 120, damping: 25, mass: 0.2 });

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
      progress.set(Math.min(1, Math.max(0, scrolled)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left bg-primary"
      style={{ scaleX: x }}
    />
  );
}
