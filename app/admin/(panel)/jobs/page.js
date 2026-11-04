import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import JobsManager from "@/components/admin/JobsManager";

export const dynamic = "force-dynamic";

export default async function JobsAdmin({ searchParams }) {
  await connectDB();
  const items = JSON.parse(JSON.stringify(await Job.find().sort({ createdAt: -1 }).lean()));
  return (
    <div className="max-w-4xl">
      <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal">Hiring workspace</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink">Job openings</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60">Create and update the roles shown on your public jobs page. Hide a position to close applications without deleting its details.</p>
      </div>
      <JobsManager initial={items} createOnLoad={searchParams?.new === "1"} />
    </div>
  );
}
