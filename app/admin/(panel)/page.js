import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  FileText,
  Inbox,
  Plus,
  UserRound,
} from "lucide-react";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import Application from "@/models/Application";
import Lead from "@/models/Lead";

export const dynamic = "force-dynamic";

const dateLabel = (date) =>
  new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const statusClass = (status) => {
  if (status === "new") return "bg-amber-50 text-amber-800";
  if (status === "shortlisted" || status === "qualified") return "bg-teal/10 text-teal";
  if (status === "rejected" || status === "closed") return "bg-gray-100 text-gray-600";
  return "bg-brandBlue/10 text-navy";
};

export default async function Dashboard() {
  await connectDB();
  const [newApps, totalApps, openJobs, newLeads, recentApps, recentLeads] = await Promise.all([
    Application.countDocuments({ status: "new" }),
    Application.countDocuments(),
    Job.countDocuments({ visible: true }),
    Lead.countDocuments({ status: "new" }),
    Application.find().select("-resume").sort({ createdAt: -1 }).limit(5).lean(),
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);
  const attentionCount = newApps + newLeads;
  const stats = [
    { label: "Needs review", value: attentionCount, detail: `${newApps} applications · ${newLeads} enquiries`, href: "/admin/applications", icon: Inbox, color: "text-amber-700 bg-amber-50" },
    { label: "All candidates", value: totalApps, detail: "Applications received", href: "/admin/applications", icon: UserRound, color: "text-ink bg-mist" },
    { label: "Open positions", value: openJobs, detail: "Visible on your website", href: "/admin/jobs", icon: Briefcase, color: "text-teal bg-teal/10" },
    { label: "New enquiries", value: newLeads, detail: "Waiting for a follow-up", href: "/admin/leads", icon: Inbox, color: "text-teal bg-teal/10" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <header className="relative overflow-hidden rounded-3xl bg-ink px-6 py-7 text-white shadow-xl shadow-ink/10 sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute -right-14 -top-32 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-teal"><CalendarDays size={16} /> ADMIN OVERVIEW</p>
            <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Welcome to your workspace</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">Keep hiring moving. Review candidates, follow up on enquiries, and manage the roles on your website.</p>
          </div>
          <Link href="/admin/jobs?new=1" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brandBlue px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brandBlue/25 transition hover:bg-navy">
            <Plus size={17} /> Post a job
          </Link>
        </div>
      </header>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Workspace summary">
        {stats.map(({ label, value, detail, href, icon: Icon, color }) => (
          <Link key={label} href={href} className="group rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-lg hover:shadow-ink/5">
            <div className="flex items-start justify-between gap-3">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${color}`}><Icon size={20} /></span>
              <ArrowRight size={17} className="mt-1 text-ink/30 transition group-hover:translate-x-1 group-hover:text-teal" />
            </div>
            <p className="mt-5 font-display text-3xl font-bold text-ink">{value}</p>
            <p className="mt-1 font-semibold text-ink">{label}</p>
            <p className="mt-1 text-xs text-ink/55">{detail}</p>
          </Link>
        ))}
      </section>

      {attentionCount > 0 && (
        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-3 text-sm text-amber-950">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-amber-700"><Inbox size={18} /></span>
            <span><strong>{attentionCount} item{attentionCount === 1 ? "" : "s"} need your attention.</strong> Review new applications and enquiries.</span>
          </span>
          <span className="flex shrink-0 flex-wrap gap-2 pl-12 sm:pl-0">
            {newApps > 0 && <Link href="/admin/applications" className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-bold text-amber-900 transition hover:bg-amber-100">{newApps} application{newApps === 1 ? "" : "s"} <ArrowRight size={14} /></Link>}
            {newLeads > 0 && <Link href="/admin/leads" className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-bold text-amber-900 transition hover:bg-amber-100">{newLeads} enquir{newLeads === 1 ? "y" : "ies"} <ArrowRight size={14} /></Link>}
          </span>
        </div>
      )}

      <section className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Recent applications</h2>
              <p className="mt-0.5 text-xs text-ink/55">Latest candidates to join your pipeline</p>
            </div>
            <Link href="/admin/applications" className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">View all <ArrowRight size={15} /></Link>
          </div>
          {recentApps.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <FileText size={25} className="mx-auto text-ink/30" />
              <p className="mt-3 text-sm font-semibold text-ink">No applications yet</p>
              <p className="mt-1 text-xs text-ink/55">New candidate submissions will show up here.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {recentApps.map((app) => (
                <li key={String(app._id)} className="flex items-center gap-3 px-5 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal/10 text-sm font-bold text-teal">{app.name?.slice(0, 1).toUpperCase() || "?"}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{app.name}</p>
                    <p className="truncate text-xs text-ink/55">{app.jobTitle}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${statusClass(app.status)}`}>{app.status}</span>
                    <span className="text-[11px] text-ink/45">{dateLabel(app.createdAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Recent enquiries</h2>
              <p className="mt-0.5 text-xs text-ink/55">Messages from prospective clients and candidates</p>
            </div>
            <Link href="/admin/leads" className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline">View all <ArrowRight size={15} /></Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <Inbox size={25} className="mx-auto text-ink/30" />
              <p className="mt-3 text-sm font-semibold text-ink">No enquiries yet</p>
              <p className="mt-1 text-xs text-ink/55">Contact form submissions will show up here.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {recentLeads.map((lead) => (
                <li key={String(lead._id)} className="flex items-center gap-3 px-5 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal/10 text-sm font-bold text-teal">{lead.name?.slice(0, 1).toUpperCase() || "?"}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{lead.name}{lead.company ? <span className="font-normal text-ink/55"> · {lead.company}</span> : null}</p>
                    <p className="truncate text-xs text-ink/55">{lead.type === "employer" ? "Hiring request" : lead.interest || "General enquiry"}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${statusClass(lead.status)}`}>{lead.status}</span>
                    <span className="text-[11px] text-ink/45">{dateLabel(lead.createdAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-6">
        <div className="flex items-center gap-2"><CheckCircle2 size={19} className="text-teal" /><h2 className="font-display text-lg font-bold text-ink">Quick actions</h2></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Link href="/admin/jobs" className="flex items-center justify-between rounded-xl bg-mist px-4 py-3 text-sm font-semibold text-ink transition hover:bg-teal/10 hover:text-teal"><span className="flex items-center gap-2"><Briefcase size={17} /> Manage job openings</span><ArrowRight size={16} /></Link>
          <Link href="/admin/applications" className="flex items-center justify-between rounded-xl bg-mist px-4 py-3 text-sm font-semibold text-ink transition hover:bg-teal/10 hover:text-teal"><span className="flex items-center gap-2"><UserRound size={17} /> Review candidates</span><ArrowRight size={16} /></Link>
          <Link href="/admin/leads" className="flex items-center justify-between rounded-xl bg-mist px-4 py-3 text-sm font-semibold text-ink transition hover:bg-teal/10 hover:text-teal"><span className="flex items-center gap-2"><Inbox size={17} /> Follow up enquiries</span><ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
