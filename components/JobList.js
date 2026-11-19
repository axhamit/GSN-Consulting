"use client";
import { useState } from "react";
import Link from "next/link";

export default function JobList({ initial = [] }) {
  const [jobs] = useState(initial);
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");

  const types = ["All", ...new Set(jobs.map((job) => job.type))];
  const shown = jobs.filter(
    (j) => (type === "All" || j.type === type) &&
      `${j.title} ${j.type}`.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {types.map((t) => (
          <button key={t} onClick={() => setType(t)} aria-pressed={type === t}
            className={`rounded-xl px-4 py-2 transition ${type === t ? "bg-brandBlue font-semibold text-white shadow-md shadow-brandBlue/20" : "border border-line hover:border-brandBlue/40 hover:bg-mist"}`}>{t}</button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search job title"
          aria-label="Search job title" className="min-w-[220px] flex-1 rounded-xl border border-line px-4 py-2 outline-none focus:border-teal" />
      </div>
      <ul className="mt-6 grid gap-4">
        {shown.map((j) => (
          <li key={j._id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5">
            <div>
              <h3 className="text-lg font-bold">{j.title}</h3>
              <p className="text-gray-600">
                {[j.type, j.location, j.experience].filter(Boolean).join(" · ")}
              </p>
              {j.skills && (
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-semibold">Skills:</span> {j.skills}
                </p>
              )}
              {j.salary && (
                <p className="mt-1 text-sm text-gray-500">
                  <span className="font-semibold">Salary:</span> {j.salary}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{j.description}</p>
            </div>
            <Link href={`/apply?job=${encodeURIComponent(j._id)}`} className="rounded-xl bg-brandBlue px-4 py-2 font-semibold text-white shadow-md shadow-brandBlue/20 transition hover:bg-navy">Apply</Link>
          </li>
        ))}
        {shown.length === 0 && <li className="text-gray-500">No jobs match. Clear the search or choose All.</li>}
      </ul>
    </div>
  );
}
