"use client";
import { useMemo, useState } from "react";
import { Download, Search, Trash2 } from "lucide-react";

const statuses = ["new", "contacted", "qualified", "closed"];
const fmt = (date) => new Date(date).toLocaleString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function LeadsTable({ initial }) {
  const [leads, setLeads] = useState(initial);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);

  const shown = useMemo(() => {
    const normalized = query.toLowerCase();
    return leads.filter((lead) =>
      (filter === "all" || lead.status === filter) &&
      (!normalized || [lead.name, lead.email, lead.interest, lead.message].join(" ").toLowerCase().includes(normalized))
    );
  }, [leads, query, filter]);

  async function update(id, patch) {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        window.alert("Could not update this enquiry.");
        return;
      }
      const { item } = await res.json();
      setLeads((current) => current.map((lead) => lead._id === id ? item : lead));
    } catch {
      window.alert("Could not reach the server. Please try again.");
    }
  }

  async function remove(lead) {
    if (!window.confirm("Delete this enquiry permanently?")) return;
    try {
      const res = await fetch(`/api/admin/leads/${lead._id}`, { method: "DELETE" });
      if (!res.ok) {
        window.alert("Could not delete this enquiry.");
        return;
      }
      setLeads((current) => current.filter((item) => item._id !== lead._id));
    } catch {
      window.alert("Could not reach the server. Please try again.");
    }
  }

  function exportCsv() {
    const columns = ["createdAt", "name", "email", "phone", "interest", "status", "message"];
    const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [
      columns.join(","),
      ...shown.map((lead) => columns.map((column) => escape(lead[column])).join(",")),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "enquiries.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={16} className="absolute left-3 top-3 text-ink/40" />
          <input className="w-full rounded-xl border border-line px-4 py-2.5 pl-9 outline-none focus:border-teal" placeholder="Search name, email or message" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search enquiries" />
        </div>
        <select className="rounded-xl border border-line px-4 py-2.5 outline-none focus:border-teal" value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter by status">
          <option value="all">All statuses</option>
          {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 transition hover:bg-mist"><Download size={16} /> Export CSV</button>
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-ink/60">No enquiries match. Contact form submissions will appear here.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {shown.map((lead) => (
            <li key={lead._id} className="rounded-2xl border border-line bg-white">
              <div className="flex flex-wrap items-center gap-3 p-4">
                <button className="min-w-0 flex-1 text-left" onClick={() => setOpen(open === lead._id ? null : lead._id)} aria-expanded={open === lead._id}>
                  <p className="font-semibold">{lead.name}</p>
                  <p className="truncate text-sm text-ink/60">{lead.type === "employer" ? "Hiring request" : lead.interest || "General enquiry"}</p>
                  <p className="text-xs text-ink/50" suppressHydrationWarning>{fmt(lead.createdAt)}</p>
                </button>
                <select className="rounded-xl border border-line px-3 py-1.5 outline-none focus:border-teal" value={lead.status} onChange={(event) => update(lead._id, { status: event.target.value })} aria-label={`Status for ${lead.name}`}>
                  {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <button onClick={() => remove(lead)} className="rounded-md p-2 text-red-600 hover:bg-red-50" aria-label={`Delete enquiry from ${lead.name}`}><Trash2 size={17} /></button>
              </div>
              {open === lead._id && (
                <div className="space-y-3 border-t border-line bg-mist p-4 text-sm">
                  <p className="whitespace-pre-wrap">{lead.message}</p>
                  <p className="text-ink/60">
                    <a className="text-teal hover:underline" href={`mailto:${lead.email}`}>{lead.email}</a>
                    {lead.phone && <> &nbsp;|&nbsp; <a className="text-teal hover:underline" href={`tel:${lead.phone}`}>{lead.phone}</a></>}
                  </p>
                  <label className="mb-2 block text-sm font-semibold" htmlFor={`notes-${lead._id}`}>Internal notes</label>
                  <textarea id={`notes-${lead._id}`} className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-teal" rows={2} defaultValue={lead.notes} onBlur={(event) => event.target.value !== (lead.notes || "") && update(lead._id, { notes: event.target.value })} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
