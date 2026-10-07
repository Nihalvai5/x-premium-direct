import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Loader2, Send, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Result = {
  giftEligible: boolean;
  status: string;
  reason: string;
  message: string;
  tip: string | null;
};

type UiState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "result"; result: Result }
  | { kind: "error"; message: string };

const API_BASE = "https://d3al.xyz/api/gift-eligibility";

function normalizeHandle(raw: string): string {
  const value = raw.trim();
  // Accept a full profile URL and reduce it to the username
  const urlMatch = value.match(/(?:x\.com|twitter\.com)\/([A-Za-z0-9_]+)/i);
  if (urlMatch) return urlMatch[1];
  return value.replace(/^@/, "");
}

export function GiftEligibilityChecker() {
  const [handle, setHandle] = useState("");
  const [state, setState] = useState<UiState>({ kind: "idle" });
  const abortRef = useRef<AbortController | null>(null);
  const reqIdRef = useRef(0);

  // Pre-filled Telegram order message; the checked account's profile link
  // is inserted into field 1 so the user doesn't have to type it.
  const buildTelegramLink = (username: string) => {
    const h = normalizeHandle(username);
    const message =
      `1%EF%B8%8F%E2%83%A3%20My%20X%20profile%20link:%20https://x.com/${encodeURIComponent(h)}` +
      `%0A2%EF%B8%8F%E2%83%A3%20Months:%206%20Months` +
      `%0A3%EF%B8%8F%E2%83%A3%20Payment:%20Wallet`;
    return `https://t.me/Nihalvai332?text=${message}`;
  };


  useEffect(() => {
    const query = normalizeHandle(handle);
    if (!query) {
      setState({ kind: "idle" });
      return;
    }

    const reqId = ++reqIdRef.current;
    setState({ kind: "loading" });

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(`${API_BASE}?handle=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (reqId !== reqIdRef.current) return;
        if (!res.ok || !data.ok) {
          setState({
            kind: "error",
            message: data?.error || `Check failed (HTTP ${res.status}). Please try again in a minute.`,
          });
          return;
        }
        setState({ kind: "result", result: data.check });
      } catch (err) {
        if (controller.signal.aborted) return;
        if (reqId !== reqIdRef.current) return;
        setState({ kind: "error", message: "Network error. Please check your connection and try again." });
        void err;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [handle]);

  const result = state.kind === "result" ? state.result : null;

  const tone = (() => {
    if (!result) return state.kind === "error" ? "error" : "idle";
    if (result.giftEligible) return "eligible";
    if (result.status === "inconclusive" || result.status === "self_only") return "warn";
    if (result.status === "error") return "error";
    return "ineligible";
  })();

  const toneStyles: Record<string, string> = {
    eligible: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    ineligible: "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400",
    warn: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    error: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  };

  const Icon = (() => {
    if (state.kind === "loading") return Loader2;
    if (tone === "eligible") return CheckCircle2;
    if (tone === "warn" || tone === "error") return AlertTriangle;
    if (tone === "ineligible") return XCircle;
    return ShieldCheck;
  })();

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border bg-card/80 backdrop-blur-md p-6 sm:p-8 shadow-lg"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h3 className="text-xl sm:text-2xl font-bold font-display text-center">
            Check Gift Eligibility
          </h3>
        </div>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Enter your X username to see if your account can receive X Premium right now.
        </p>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">@</span>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="username"
            autoComplete="off"
            spellCheck={false}
            aria-label="X username"
            className="w-full rounded-full border bg-background/60 pl-9 pr-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition"
          />
        </div>

        <div className="mt-4 min-h-[1px]" aria-live="polite">
          {state.kind === "loading" && (
            <div className="flex items-center gap-2 rounded-xl border px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Checking your account…
            </div>
          )}

          {state.kind === "error" && (
            <div className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${toneStyles.error}`}>
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{state.message}</span>
            </div>
          )}

          {result && (
            <motion.div
              key={result.reason + result.message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`rounded-xl border px-4 py-4 text-sm ${toneStyles[tone] ?? ""}`}
            >
              <div className="flex items-start gap-2">
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${state.kind === "loading" ? "animate-spin" : ""}`} />
                <div className="space-y-2">
                  <p className="font-medium leading-snug">{result.message}</p>
                  {result.tip && <p className="opacity-80 leading-snug">{result.tip}</p>}
                  {tone === "eligible" && (
                    <motion.a
                      href={buildTelegramLink(handle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-block mt-1"
                    >
                      <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-gold">
                        <Send className="w-4 h-4 mr-2" />
                        Eligible — Order Now
                      </Button>
                    </motion.a>
                  )}
                  {tone === "warn" && (
                    <p className="opacity-80">
                      You can still message us on Telegram — we will verify your account manually.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {state.kind === "idle" && (
            <p className="text-xs text-muted-foreground text-center">
              Tip: use the username from your profile URL (x.com/username) — not your display name.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
