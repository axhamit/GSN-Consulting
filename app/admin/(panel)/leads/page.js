import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";
import LeadsTable from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  await connectDB();
  const items = JSON.parse(JSON.stringify(await Lead.find().sort({ createdAt: -1 }).lean()));
  return (
    <div className="max-w-6xl">
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal">Client relations</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink">Enquiries</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60">Respond to website enquiries, track follow-ups, and keep internal notes with each conversation.</p>
      </div>
      <LeadsTable initial={items} />
    </div>
  );
}
