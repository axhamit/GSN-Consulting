import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import ApplicationsTable from "@/components/admin/ApplicationsTable";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  await connectDB();
  const items = JSON.parse(JSON.stringify(await Application.find().select("-resume").sort({ createdAt: -1 }).lean()));
  return (
    <div className="max-w-6xl">
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal">Recruitment workspace</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink">Applications</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60">Review candidate profiles, download resumes, and update each applicant&apos;s progress through your hiring pipeline.</p>
      </div>
      <ApplicationsTable initial={items} />
    </div>
  );
}
