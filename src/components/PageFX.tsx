import { motion, useScroll } from "framer-motion";

/**
 * Lightweight decorative layer. Kept static (no infinite blur animations)
 * so scrolling stays smooth on phones.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-accent"
    />
  );
}

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_10%_10%,hsl(var(--secondary)/0.15),transparent_40%),radial-gradient(circle_at_90%_45%,hsl(var(--accent)/0.12),transparent_40%),radial-gradient(circle_at_40%_95%,hsl(var(--primary)/0.08),transparent_40%)]"
    />
  );
}
