import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";
const SHEET_ID = "1kU-7S_Er5mc5BRsPEme9FXhWVdGzrNqXCyk-ScyHxH8";

const schema = z.object({
  xHandle: z.string().trim().regex(/^[A-Za-z0-9_]{1,15}$/),
  contact: z.string().trim().min(2).max(100),
  status: z.string().trim().max(50).optional(),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return json({ error: "Invalid input" }, 400);
    const { xHandle, contact, status } = parsed.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SHEETS_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    if (!LOVABLE_API_KEY || !SHEETS_KEY) return json({ error: "Server not configured" }, 500);

    // Prefix with ' so Sheets never treats user text as a formula
    const safe = (s: string) => (/^[=+\-@]/.test(s) ? `'${s}` : s);
    const row = [
      new Date().toISOString(),
      `https://x.com/${xHandle}`,
      safe(contact),
      status ?? "not_eligible",
    ];

    const res = await fetch(
      `${GATEWAY_URL}/spreadsheets/${SHEET_ID}/values/A:D:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": SHEETS_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      },
    );
    if (!res.ok) {
      const details = await res.text();
      console.error(`Sheets append failed [${res.status}]: ${details}`);
      return json({ error: "Could not save", status: res.status, details }, 502);
    }
    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ error: "Unexpected error" }, 500);
  }
});
