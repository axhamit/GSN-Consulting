import JobList from "@/components/JobList";

export const metadata = { title: "Open jobs | GSN Consulting" };

export default function Jobs() {
  return (
    <>
      <section className="bg-navy py-16 text-white">
        <div className="container-x">
          <h1 className="text-4xl font-extrabold md:text-5xl">Open jobs</h1>
          <p className="mt-3 text-lg text-white/80">Browse IT, Non-IT and Integrated Facility Management roles, then apply in one click. We never charge candidates.</p>
        </div>
      </section>
      <div className="container-x py-12"><JobList /></div>
    </>
  );
}
