"use client";
import { useMemo, useState } from "react";
import { Download, Search, Trash2, FileDown, ExternalLink } from "lucide-react";

const statuses = ["new", "screening", "shortlisted", "placed", "rejected"];
const fmt = (d) => new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function ApplicationsTable({ initial }) {
  const [apps, setApps] = useState(initial);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);

  const shown = useMemo(() => {
    const s = q.toLowerCase();
    return apps.filter((a) => (filter === "all" || a.status === filter) &&
      (!s || [a.name, a.email, a.jobTitle, a.currentCompany].join(" ").toLowerCase().includes(s)));
  }, [apps, q, filter]);

  async function update(id, patch) {
    const res = await fetch(`/api/admin/applications/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    if (res.ok) {
      const { item } = await res.json();
      setApps((p) => p.map((a) => (a._id === id ? { ...a, ...JSON.parse(JSON.stringify(item)), resume: undefined } : a)));
    } else alert("Could not update this application.");
  }

  async function remove(id) {
    if (!confirm("Delete this application and its resume permanently?")) return;
    const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
    if (res.ok) setApps((p) => p.filter((a) => a._id !== id));
  }

  function exportCsv() {
    const cols = ["createdAt", "jobTitle", "name", "email", "phone", "experience", "currentCompany", "noticePeriod", "resumeUrl", "status"];
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [cols.join(","), ...shown.map((a) => cols.map((c) => esc(a[c])).join(","))].join("\n");
    const el = document.createElement("a");
    el.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    el.download = "applications.csv";
    el.click();
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pl-9 outline-none focus:border-blue-500" placeholder="Search name, email, job or company" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search applications" />
        </div>
        <select className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-500" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
          <option value="all">All statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={exportCsv} className="rounded-xl border border-gray-200 px-4 py-2.5 transition hover:bg-gray-100"><Download size={16} /> Export CSV</button>
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">No applications match. Candidate submissions from the jobs page will appear here.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {shown.map((a) => (
            <li key={a._id} className="rounded-2xl border border-gray-200 bg-white">
              <div className="flex flex-wrap items-center gap-3 p-4">
                <button className="min-w-0 flex-1 text-left" onClick={() => setOpen(open === a._id ? null : a._id)} aria-expanded={open === a._id}>
                  <p className="font-semibold">{a.name} <span className="font-normal text-gray-500">{a.experience && `, ${a.experience}`}</span></p>
                  <p className="truncate text-sm text-gray-500">{a.jobTitle}</p>
                  <p className="text-xs text-gray-400" suppressHydrationWarning>{fmt(a.createdAt)}</p>
                </button>
                {a.hasResume && <a href={`/api/admin/applications/${a._id}/resume`} className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs transition hover:bg-gray-100" aria-label={`Download resume of ${a.name}`}><FileDown size={15} /> Resume</a>}
                {a.resumeUrl && <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs transition hover:bg-gray-100"><ExternalLink size={15} /> Link</a>}
                <select className="rounded-xl border border-gray-200 px-4 py-1.5 outline-none focus:border-blue-500" value={a.status} onChange={(e) => update(a._id, { status: e.target.value })} aria-label={`Status for ${a.name}`}>
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => remove(a._id)} className="rounded-md p-2 text-red-600 hover:bg-red-50" aria-label={`Delete application from ${a.name}`}><Trash2 size={17} /></button>
              </div>
              {open === a._id && (
                <div className="space-y-3 border-t border-gray-200 bg-gray-50 p-4 text-sm">
                  <p className="text-gray-500">
                    <a className="text-blue-600 hover:underline" href={`mailto:${a.email}`}>{a.email}</a> &nbsp;|&nbsp; <a className="text-blue-600 hover:underline" href={`tel:${a.phone}`}>{a.phone}</a>
                  </p>
                  <p className="text-gray-500">Current company: <span className="text-gray-700">{a.currentCompany || "n/a"}</span>, notice period: <span className="text-gray-700">{a.noticePeriod || "n/a"}</span></p>
                  {a.message && <p className="whitespace-pre-wrap">{a.message}</p>}
                  <label className="mb-2 block text-sm font-medium" htmlFor={`an-${a._id}`}>Internal notes</label>
                  <textarea id={`an-${a._id}`} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500" rows={2} defaultValue={a.notes} onBlur={(e) => e.target.value !== (a.notes || "") && update(a._id, { notes: e.target.value })} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
