"use client";
import { useState } from "react";
import Link from "next/link";
import { jobs } from "@/lib/data";

export default function JobList() {
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");
  const shown = jobs.filter(
    (j) => (type === "All" || j.type === type) && j.title.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {["All", "IT", "Non-IT"].map((t) => (
          <button key={t} onClick={() => setType(t)} aria-pressed={type === t}
            className={`btn ${type === t ? "btn-primary" : "btn-ghost"} !py-2`}>{t}</button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search job title"
          aria-label="Search job title" className="min-w-[220px] flex-1 rounded-md border border-line bg-white px-4 py-2" />
      </div>
      <ul className="mt-6 grid gap-4">
        {shown.map((j) => (
          <li key={j.id} className="flex flex-wrap items-center justify-between gap-3 card !p-5">
            <div>
              <h3 className="text-lg font-bold">{j.title}</h3>
              <p className="text-ink/70">{j.type} · {j.location} · {j.mode} · {j.exp}</p>
            </div>
            <Link href={`/contact?role=${encodeURIComponent(j.title)}`} className="btn btn-primary !py-2">Apply</Link>
          </li>
        ))}
        {shown.length === 0 && <li className="text-ink/70">No jobs match. Clear the search or choose All.</li>}
      </ul>
    </div>
  );
}
