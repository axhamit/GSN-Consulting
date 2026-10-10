"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/jobs", label: "Open jobs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-white"}`}>
      <div className="bg-ink py-1.5 text-center text-xs text-white/80">
        Hiring for IT and non-IT roles across India. Call +91 8217735799
      </div>
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal text-white">G</span>
          GSN <span className="font-medium text-teal">Consulting</span>
        </Link>
        <nav className="hidden gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`relative font-medium hover:text-teal ${path === l.href ? "text-teal" : ""}`}>{l.label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn-primary hidden !py-2 md:inline-flex">Hire talent</Link>
        <button className="text-2xl md:hidden" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-line bg-white md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-5 py-3 font-medium">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
