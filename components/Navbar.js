"use client";
import Link from "next/link";
import Image from "next/image";
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
        Hiring for IT and non-IT roles across Global. Call +91 8217735799
      </div>
      <div className="container-x flex h-[72px] items-center justify-between md:h-20">
        <Link href="/" aria-label="GSN Consulting home" className="shrink-0">
          <Image
            src="/logo/logo.png"
            alt="GSN Consulting"
            width={1672}
            height={941}
            priority
            sizes="(max-width: 640px) 112px, 132px"
            className="h-auto w-[112px] sm:w-[132px]"
          />
        </Link>
        <nav className="hidden gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={`relative font-medium hover:text-teal ${path === l.href ? "text-teal" : ""}`}>{l.label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="btn btn-primary hidden !py-2 md:inline-flex">Hire talent</Link>
        <button className="rounded-lg p-2 text-2xl text-brandBlue transition hover:bg-brandBlue/10 focus-visible:outline-brandBlue md:hidden" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen(!open)}>
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
