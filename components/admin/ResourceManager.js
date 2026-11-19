"use client";
import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

export default function ResourceManager({ resource, singular, initial, fields, renderItem, emptyText, createOnLoad = false }) {
  const defaults = Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? true : f.type === "number" ? 0 : f.type === "select" ? f.options[0] : ""]));
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState(() => createOnLoad ? {} : null);
  const [form, setForm] = useState(() => createOnLoad ? defaults : {});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  function openForm(item) {
    setForm({ ...defaults, ...(item || {}) });
    setEditing(item || {});
    setError("");
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const isNew = !editing._id;
    const res = await fetch(isNew ? `/api/admin/${resource}` : `/api/admin/${resource}/${editing._id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(json.error || "Could not save.");
    const item = JSON.parse(JSON.stringify(json.item));
    setItems((p) => (isNew ? [item, ...p] : p.map((i) => (i._id === item._id ? item : i))));
    setEditing(null);
  }

  async function remove(item) {
    if (!confirm(`Delete this ${singular}? It will disappear from the website.`)) return;
    const res = await fetch(`/api/admin/${resource}/${item._id}`, { method: "DELETE" });
    if (res.ok) setItems((p) => p.filter((i) => i._id !== item._id));
    else alert("Could not delete.");
  }

  return (
    <div className="mt-6">
      {!editing && <button className="inline-flex items-center gap-2 rounded-xl bg-brandBlue px-4 py-2.5 font-semibold text-white shadow-md shadow-brandBlue/20 transition hover:bg-navy" onClick={() => openForm(null)}><Plus size={16} /> Add {singular}</button>}

      {editing && (
        <form onSubmit={save} className="mt-5 space-y-5 rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-7">
          <div className="border-b border-line pb-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal">Job management</p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink">{editing._id ? `Edit ${singular}` : `Add ${singular}`}</h2>
          </div>
          {fields.map((f) => (
            <div key={f.name}>
              {f.type === "checkbox" ? (
                <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <input type="checkbox" checked={!!form[f.name]} onChange={(e) => set(f.name, e.target.checked)} /> {f.label}
                </label>
              ) : (
                <>
                  <label className="mb-2 block text-sm font-semibold text-ink" htmlFor={`f-${f.name}`}>{f.label}{f.required && " *"}</label>
                  {f.type === "select" ? (
                    <select id={`f-${f.name}`} className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-teal" value={form[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>
                      {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea id={`f-${f.name}`} className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-teal" rows={4} required={f.required} value={form[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
                  ) : (
                    <input id={`f-${f.name}`} className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-teal" type={f.type || "text"} required={f.required} value={form[f.name] ?? ""} onChange={(e) => set(f.name, f.type === "number" ? Number(e.target.value) : e.target.value)} />
                  )}
                  {f.help && <p className="mt-1 text-xs text-gray-500">{f.help}</p>}
                </>
              )}
            </div>
          ))}
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-brandBlue px-4 py-2.5 font-semibold text-white shadow-md shadow-brandBlue/20 transition hover:bg-navy disabled:opacity-50" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={16} /> : "Save changes"}</button>
            <button type="button" className="rounded-xl border border-line px-4 py-2.5 font-semibold text-ink transition hover:bg-mist" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}

      {items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-gray-500">{emptyText}</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li key={item._id} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition hover:border-teal/40">
              <div className="min-w-0 flex-1">{renderItem(item)}</div>
              {typeof item.visible === "boolean" && <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.visible ? "bg-teal/10 text-teal" : "bg-gray-100 text-gray-500"}`}>{item.visible ? "Open" : "Hidden"}</span>}
              <button onClick={() => openForm(item)} className="rounded-lg p-2 text-ink/60 transition hover:bg-teal/10 hover:text-teal" aria-label={`Edit ${singular}`}><Pencil size={17} /></button>
              <button onClick={() => remove(item)} className="rounded-lg p-2 text-red-600 transition hover:bg-red-50" aria-label={`Delete ${singular}`}><Trash2 size={17} /></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
