import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

/**
 * Global ambient motion layer: scroll progress bar, floating aurora orbs
 * and drifting sparkle particles. Purely decorative.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-accent"
    />
  );
}

export function AmbientBackground() {
  const reduce = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        size: 2 + (i % 3),
        delay: (i % 7) * 0.9,
        duration: 14 + (i % 5) * 3,
      })),
    []
  );

  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurora orbs */}
      <motion.div
        className="absolute -top-40 -left-32 w-[38rem] h-[38rem] rounded-full blur-3xl bg-secondary/20"
        animate={{ x: [0, 80, -40, 0], y: [0, 60, 120, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[34rem] h-[34rem] rounded-full blur-3xl bg-accent/15"
        animate={{ x: [0, -70, 30, 0], y: [0, -50, 60, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full blur-3xl bg-primary/10"
        animate={{ x: [0, 50, -60, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 0.92, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting sparkles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary/50"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, bottom: -10 }}
          animate={{ y: [0, -900], opacity: [0, 0.8, 0], x: [0, p.id % 2 ? 40 : -40] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}
