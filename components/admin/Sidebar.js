"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Briefcase, FileText, Inbox, LayoutDashboard, LogOut, Loader2 } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/leads", label: "Enquiries", icon: Inbox },
];

export default function Sidebar({ email }) {
  const path = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setSigningOut(true);
    setError("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("Could not sign out. Please try again.");
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      setError(err.message || "Could not reach the server. Please try again.");
      setSigningOut(false);
    }
  }

  return (
    <aside className="relative z-10 border-b border-line bg-white md:sticky md:top-0 md:flex md:h-screen md:w-64 md:shrink-0 md:flex-col md:border-b-0 md:border-r">
      <Link href="/admin" className="flex items-center gap-3 px-5 py-5">
        <span>
          <Image
            src="/logo/logo.png"
            alt="GSN Consulting"
            width={1672}
            height={941}
            sizes="128px"
            className="h-auto w-[128px]"
          />
          <span className="mt-0.5 block text-xs text-ink/55">Admin workspace</span>
        </span>
      </Link>

      <div className="px-5 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/40">Workspace</div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0" aria-label="Admin">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? path === href : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`group flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active ? "bg-ink text-white shadow-md shadow-ink/10" : "text-ink/65 hover:bg-mist hover:text-ink"
              }`}
            >
              <Icon size={18} className={active ? "text-teal" : "text-ink/45 group-hover:text-teal"} />
              {label}
              {active && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-teal md:block" />}
            </Link>
          );
        })}
      </nav>

      <div className="hidden flex-1 md:block" />
      {error && <p className="mx-4 mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">{error}</p>}

      <div className="hidden border-t border-line p-4 md:block">
        <a href="/" target="_blank" rel="noopener noreferrer" className="mb-4 flex items-center justify-between rounded-xl bg-mist px-3 py-2.5 text-sm font-semibold text-ink/75 transition hover:bg-teal/10 hover:text-teal">
          View website <ArrowUpRight size={16} />
        </a>
        <p className="truncate text-xs text-ink/55" title={email}>{email}</p>
        <button onClick={logout} disabled={signingOut} className="mt-3 flex items-center gap-2 text-sm font-semibold text-red-600 transition hover:text-red-700 disabled:opacity-60">
          {signingOut ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
      <div className="flex items-center justify-between px-4 pb-3 md:hidden">
        <span className="max-w-[65%] truncate text-xs text-ink/55">{email}</span>
        <button onClick={logout} disabled={signingOut} className="flex items-center gap-2 py-1 text-sm font-semibold text-red-600 disabled:opacity-60">
          {signingOut ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
