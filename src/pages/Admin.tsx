import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, RefreshCw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Row = {
  id: string;
  x_handle: string;
  contact: string;
  status: string;
  notes: string | null;
  contacted_at: string | null;
  created_at: string;
};

function AuthForm() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data, error } =
      mode === "in"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
    setBusy(false);
    if (error) return toast.error(error.message);
    if (mode === "up" && !data.session) toast.success("Check your email to confirm your account.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border bg-card p-6 shadow-lg">
        <h1 className="text-2xl font-bold font-display text-center">Admin {mode === "in" ? "Sign in" : "Sign up"}</h1>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
          className="w-full rounded-lg border bg-background px-3 py-2" />
        <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
          className="w-full rounded-lg border bg-background px-3 py-2" />
        <Button type="submit" className="w-full" disabled={busy}>
          {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {mode === "in" ? "Sign in" : "Create account"}
        </Button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm text-muted-foreground hover:underline">
          {mode === "in" ? "No account yet? Sign up" : "Have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ session }: { session: Session }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "contacted">("all");
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    supabase.from("user_roles").select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle()
      .then(({ data }) => {
        setIsAdmin(!!data);
        if (data) load();
      });
  }, [session.user.id]);

  const update = async (id: string, patch: Partial<Row>) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
    const { error } = await supabase.from("submissions").update(patch).eq("id", id);
    if (error) { toast.error(error.message); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    setRows((r) => r.filter((x) => x.id !== id));
    const { error } = await supabase.from("submissions").delete().eq("id", id);
    if (error) { toast.error(error.message); load(); }
  };

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows.filter((r) =>
      (filter === "all" || r.status === filter) &&
      (!s || r.x_handle.toLowerCase().includes(s) || r.contact.toLowerCase().includes(s) || (r.notes ?? "").toLowerCase().includes(s)));
  }, [rows, filter, q]);

  const today = new Date().toDateString();
  const stats = {
    total: rows.length,
    new: rows.filter((r) => r.status === "new").length,
    contacted: rows.filter((r) => r.status === "contacted").length,
    today: rows.filter((r) => new Date(r.created_at).toDateString() === today).length,
  };

  const signOut = () => supabase.auth.signOut();

  if (isAdmin === null) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!isAdmin)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
        <p className="text-lg">This account doesn't have admin access.</p>
        <Button variant="outline" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold font-display">Admin Panel</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={load}><RefreshCw className="w-4 h-4 mr-2" />Refresh</Button>
            <Button variant="outline" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[["Total", stats.total], ["New", stats.new], ["Contacted", stats.contacted], ["Today", stats.today]].map(([l, v]) => (
            <div key={l} className="rounded-xl border bg-card p-4">
              <p className="text-sm text-muted-foreground">{l}</p>
              <p className="text-3xl font-bold font-display">{v}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search username, contact, notes…"
              className="w-full rounded-lg border bg-background pl-9 pr-3 py-2" />
          </div>
          <div className="flex gap-2">
            {(["all", "new", "contacted"] as const).map((f) => (
              <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize">{f}</Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>
        ) : shown.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No submissions found.</p>
        ) : (
          <div className="space-y-3">
            {shown.map((r) => (
              <div key={r.id} className={`rounded-xl border bg-card p-4 space-y-3 ${r.status === "contacted" ? "opacity-70" : ""}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <a href={`https://x.com/${r.x_handle}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">@{r.x_handle}</a>
                    <p className="text-sm">Contact: <span className="font-medium">{r.contact}</span>
                      {r.contact.startsWith("@") && (
                        <a href={`https://t.me/${r.contact.slice(1)}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-primary hover:underline">Open Telegram</a>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted {new Date(r.created_at).toLocaleString()}
                      {r.contacted_at && ` · Contacted ${new Date(r.contacted_at).toLocaleString()}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full border ${r.status === "contacted" ? "border-primary text-primary" : "border-gold text-gold"}`}>{r.status}</span>
                    <Button size="sm" variant={r.status === "contacted" ? "outline" : "default"}
                      onClick={() => update(r.id, r.status === "contacted"
                        ? { status: "new", contacted_at: null }
                        : { status: "contacted", contacted_at: new Date().toISOString() })}>
                      {r.status === "contacted" ? "Mark as new" : "Mark contacted"}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)} aria-label="Delete"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
                <textarea defaultValue={r.notes ?? ""} placeholder="Notes…" rows={1}
                  onBlur={(e) => e.target.value !== (r.notes ?? "") && update(r.id, { notes: e.target.value })}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  return session ? <Dashboard session={session} /> : <AuthForm />;
}
