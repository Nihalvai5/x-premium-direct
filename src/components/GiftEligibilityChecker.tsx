import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Loader2, Send, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

function IneligibleSubmitForm({ handle }: { handle: string }) {
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = contact.trim();
    if (value.length < 2 || value.length > 100) return;
    setStatus("sending");
    const { error } = await supabase.functions.invoke("submit-ineligible", {
      body: { xHandle: handle, contact: value },
    });
    setStatus(error ? "error" : "done");
  };

  if (status === "done") {
    return (
      <div className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-emerald-600 dark:text-emerald-400">
        ✅ Submitted! We’ll check your account and message you on Telegram soon.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-3 space-y-2 rounded-lg border bg-background/60 p-3 text-foreground">
      <p className="text-sm font-medium">
        Submit your Telegram username or phone number — we’ll check your account and contact you when it’s eligible.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          maxLength={100}
          required
          placeholder="@telegram_username or +8801XXXXXXXXX"
          aria-label="Telegram username or phone number"
          className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/60"
        />
        <Button type="submit" size="sm" disabled={status === "sending"} className="rounded-full">
          {status === "sending" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
          Submit
        </Button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-600 dark:text-red-400">Couldn’t submit. Please try again or message us on Telegram.</p>
      )}
    </form>
  );
}

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

// Shown in red whenever the checker says an account can't receive a gift right now.
const NOT_ELIGIBLE_LINES = [
  "1️⃣ If the account is already verified on X, this will not work. After the verification period ends, you can cancel the subscription and try again - please wait until then.",
  "2️⃣ If you change your X name, profile, password, device login, profile & cover edits within 72 hours before ordering, your account may become not eligible - so it’s better not to make any changes.",
  "👉 Note: If your account is not eligible, message me again after 1–3 days; it should become eligible.",
];

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
  const [months, setMonths] = useState<3 | 6>(6);
  const abortRef = useRef<AbortController | null>(null);
  const reqIdRef = useRef(0);

  // Pre-filled Telegram order message; the checked account's profile link
  // and the buyer's chosen plan are inserted so they don't have to type them.
  const buildTelegramLink = (username: string, planMonths: 3 | 6) => {
    const h = normalizeHandle(username);
    const message =
      `1%EF%B8%8F%E2%83%A3%20My%20X%20profile%20link:%20https://x.com/${encodeURIComponent(h)}` +
      `%0A2%EF%B8%8F%E2%83%A3%20Months:%20${planMonths}%20Months` +
      `%0A3%EF%B8%8F%E2%83%A3%20Payment:%20` +
      `%0A%0AI%20checked%20the%20website%20and%20my%20account%20is%20eligible.`;
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
                  {tone === "ineligible" ? (
                    <>
                      <p className="font-semibold leading-snug text-red-600 dark:text-red-400">
                        (Your account is not eligible)
                      </p>
                      <div className="space-y-2">
                        {NOT_ELIGIBLE_LINES.map((line) => (
                          <p key={line} className="leading-snug text-red-600 dark:text-red-400">
                            {line}
                          </p>
                        ))}
                      </div>
                      <IneligibleSubmitForm handle={normalizeHandle(handle)} />
                    </>

                  ) : (
                    <>
                      <p className="font-medium leading-snug">{result.message}</p>
                      {result.tip && <p className="opacity-80 leading-snug">{result.tip}</p>}
                    </>
                  )}
                  {tone === "eligible" && (
                    <div className="mt-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium opacity-80">Choose your plan:</span>
                        {([3, 6] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMonths(m)}
                            aria-pressed={months === m}
                            className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                              months === m
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background/60 text-foreground border-border hover:border-primary/60"
                            }`}
                          >
                            {m} Months — ${m === 3 ? 5 : 8}
                          </button>
                        ))}
                      </div>
                      <motion.a
                        href={buildTelegramLink(handle, months)}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-block"
                      >
                        <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-gold">
                          <Send className="w-4 h-4 mr-2" />
                          Eligible — Order Now
                        </Button>
                      </motion.a>
                    </div>
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
