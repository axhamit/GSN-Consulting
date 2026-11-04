"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ShieldCheck } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) return setError(json.error || "Could not sign in.");
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-5 py-12">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-5 rounded-2xl border border-line bg-white p-8 shadow-xl shadow-ink/5 sm:p-10">
        <div className="mb-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal font-display text-xl font-extrabold text-white">G</span>
            <div>
              <p className="font-display text-xl font-bold">GSN <span className="text-teal">Consulting</span></p>
              <p className="text-sm text-ink/60">Administrator portal</p>
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-ink/60">Sign in to manage your website and enquiries.</p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" required className="w-full rounded-xl border border-line px-4 py-3 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/15" autoComplete="username" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold" htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required className="w-full rounded-xl border border-line px-4 py-3 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/15" autoComplete="current-password" />
        </div>
        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
        <button className="btn btn-primary w-full !rounded-xl" disabled={busy}>
          {busy ? <Loader2 className="animate-spin" size={16} /> : "Sign in"}
        </button>
        <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-ink/50"><ShieldCheck size={14} /> Secure admin access</p>
        <Link href="/" className="block text-center text-sm font-semibold text-teal hover:underline">Back to website</Link>
      </form>
    </div>
  );
}
