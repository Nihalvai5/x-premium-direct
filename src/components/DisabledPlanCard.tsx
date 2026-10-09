import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Lock, Send } from "lucide-react";

export type DisabledPlan = {
  title: string;
  original: string;
  price: string;
  isPlus: boolean;
};

export function DisabledPlanCard({ plan }: { plan: DisabledPlan }) {
  const [open, setOpen] = useState(false);
  const message = plan.isPlus
    ? "Premium+ is temporarily offline."
    : "This plan is temporarily unavailable.";
  // Only use hover on devices with a real mouse — on touch devices hover
  // emulation opens the popover mid-scroll and blocks the page.
  const canHover =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`${plan.title} — ${message} Tap for details.`}
          onMouseEnter={canHover ? () => setOpen(true) : undefined}
          onMouseLeave={canHover ? () => setOpen(false) : undefined}
          onFocus={canHover ? () => setOpen(true) : undefined}
          onBlur={canHover ? () => setOpen(false) : undefined}
          className="relative h-full w-full text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/40 px-3 py-1 text-xs">
              <Lock className="w-3 h-3 mr-1" /> Temporarily Offline
            </Badge>
          </div>
          <Card className="relative border-border/30 bg-card/30 backdrop-blur-xl opacity-60 grayscale cursor-not-allowed h-full">
            <CardHeader className="text-center pb-2 pt-6">
              <CardTitle className="text-lg font-display text-muted-foreground">{plan.title}</CardTitle>
              <div className="mt-4 flex items-baseline justify-center gap-2">
                <span className="text-base text-muted-foreground line-through">{plan.original}</span>
                <span className="text-3xl font-bold font-display text-muted-foreground">{plan.price}</span>
                <span className="text-xs text-muted-foreground">USDT</span>
              </div>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <div className="w-full inline-flex items-center justify-center rounded-full bg-muted/40 text-muted-foreground text-sm font-medium h-10 px-4 opacity-70">
                <Lock className="w-4 h-4 mr-2" /> Unavailable
              </div>
            </CardContent>
          </Card>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={12}
        collisionPadding={16}
        className="w-[calc(100vw-2rem)] max-w-sm sm:max-w-xs text-center p-4 border-primary/30"
      >
        <p className="text-sm leading-relaxed text-foreground">
          <span className="block font-semibold mb-1 text-primary">{message}</span>
          Join and PIN our Telegram channel to be notified the moment it&apos;s back:
        </p>
        <a
          href="https://t.me/Discount_Store0"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/15 hover:bg-primary/25 text-primary font-semibold text-sm px-4 py-2 transition-colors"
        >
          <Send className="w-4 h-4" /> t.me/Discount_Store0
        </a>
      </PopoverContent>
    </Popover>
  );
}
