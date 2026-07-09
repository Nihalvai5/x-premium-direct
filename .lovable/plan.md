# Remove Discontinued Plans & Add Premium+ Off Notice

## Overview
The 12 Months, 3 Months Plus, 6 Months Plus, and 12 Months Plus subscription options are no longer available. Update the pricing section to show only the active 3 Months and 6 Months plans, and add a clear notice that Premium+ is temporarily offline with a link to the notification channel.

## Changes

### 1. Pricing Section
- Remove the following cards from `src/pages/Index.tsx`:
  - 12 Months
  - 3 Months Plus
  - 6 Months Plus
  - 12 Months Plus
- Keep only:
  - 3 Months — $5 USDT
  - 6 Months — $8 USDT (Most Popular)
- Update the pricing grid layout to display the 2 remaining cards cleanly across all screen sizes.

### 2. Premium+ Off Notice
Add a prominent banner/card directly below the pricing grid with the exact text:

```
📢 Note: Premium+ is temporarily Off! Make sure to join and PIN our channel so you get notified the exact moment Premium+ is back online!
```

- Link the channel text `https://t.me/Discount_Store0` to that URL.
- Style it with a warning/notice appearance that matches the existing gradient/glass-morphism theme.
- Animate it with the same fade-up effect used by other section elements.

### 3. Verification
- Run the TypeScript/Vite build to confirm no errors after removing the Plus cards and unused imports/logos if they become unused.
- Optionally verify the updated pricing section renders correctly in the preview.

## Files to Modify
- `src/pages/Index.tsx`

## No New Dependencies
All changes use existing Framer Motion, Tailwind, and shadcn/ui components already in the project.