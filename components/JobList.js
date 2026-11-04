"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  const types = ["All", ...new Set(jobs.map((job) => job.type))];
  const shown = jobs.filter(
    (j) => (type === "All" || j.type === type) &&
      `${j.title} ${j.type}`.toLowerCase().includes(q.toLowerCase())
  );
  if (loading) return <p className="text-gray-500">Loading jobs...</p>;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {types.map((t) => (
          <button key={t} onClick={() => setType(t)} aria-pressed={type === t}
            className={`rounded-xl px-4 py-2 transition ${type === t ? "bg-blue-600 text-white" : "border border-gray-200 hover:bg-gray-100"}`}>{t}</button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search job title"
          aria-label="Search job title" className="min-w-[220px] flex-1 rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-blue-500" />
      </div>
      <ul className="mt-6 grid gap-4">
        {shown.map((j) => (
          <li key={j._id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5">
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
            <Link href={`/apply?job=${encodeURIComponent(j._id)}`} className="rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">Apply</Link>
          </li>
        ))}
        {shown.length === 0 && <li className="text-gray-500">No jobs match. Clear the search or choose All.</li>}
      </ul>
    </div>
  );
}
