

# Add Animations to Landing Page

Add scroll-triggered fade-in animations and interactive hover effects throughout the page.

## Changes

### 1. Install framer-motion
Add `framer-motion` for scroll-triggered animations.

### 2. Update `src/pages/Index.tsx`
- Wrap each section's content in `motion.div` with `whileInView` fade-up animations (opacity 0→1, translateY 20→0)
- Stagger children in grids (pricing cards, how-it-works steps, notes)
- Add hover scale effects on cards (`whileHover={{ scale: 1.02 }}`)
- Add a subtle float animation to the hero shield/crown icon
- CTA buttons get a gentle pulse or scale on hover

### 3. Update `tailwind.config.ts`
- Add `fade-in` keyframe and animation from the animation utilities context (if not already present)

All animations will be subtle and performant, using `once: true` on viewport triggers so they only play once.

