import Link from "next/link";
import { company } from "@/lib/data";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-extrabold">GSN <span className="text-teal">Consulting</span></p>
          <p className="mb-5 mt-3 max-w-sm text-white/70">Hiring and consulting for IT and non-IT teams. Get new openings in your inbox.</p>
          <Newsletter />
        </div>
        <div className="flex flex-col gap-2 text-white/80">
          <p className="mb-1 font-bold text-white">Company</p>
          <Link href="/services">Services</Link><Link href="/jobs">Open jobs</Link>
          <Link href="/about">About</Link><Link href="/contact">Contact</Link>
        </div>
        <div className="space-y-1 text-white/80">
          <p className="mb-1 font-bold text-white">Reach us</p>
          <p><a href={`mailto:${company.email}`}>{company.email}</a></p>
          <p>{company.phone}</p><p>{company.address}</p>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </p>
    </footer>
  );
}
