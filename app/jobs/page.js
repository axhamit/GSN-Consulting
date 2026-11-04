import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import JobList from "@/components/JobList";

export const metadata = { title: "Open jobs | GSN Consulting" };
export const revalidate = 60;

export default async function Jobs() {
  await connectDB();
  const jobs = JSON.parse(JSON.stringify(await Job.find({ visible: true }).sort({ createdAt: -1 }).lean()));

  return (
    <>
      <section className="bg-navy py-16 text-white">
        <div className="container-x">
          <h1 className="text-4xl font-extrabold md:text-5xl">Open jobs</h1>
          <p className="mt-3 text-lg text-white/80">Browse IT, Non-IT and Integrated Facility Management roles, then apply in one click. We never charge candidates.</p>
        </div>
      </section>
      <div className="container-x py-12"><JobList initial={jobs} /></div>
    </>
  );
}
