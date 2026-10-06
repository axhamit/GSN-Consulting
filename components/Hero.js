import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-blob rounded-full bg-teal/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-80 w-80 animate-blob rounded-full bg-amber/30 blur-3xl [animation-delay:3s]" />
      <div className="container-x relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-pop">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm">Hiring and consulting, IT and non-IT</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
            Build the team your business needs, faster.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/80">
            GSN Consulting finds, screens and places engineers, analysts, sales, HR and finance professionals, and advises on how to grow your workforce.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">Hire talent</Link>
            <Link href="/jobs" className="btn btn-light">Find a job</Link>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-white/80">
            <div className="flex -space-x-2">
              {["bg-teal", "bg-amber", "bg-sky-400", "bg-rose-400"].map((c, i) => (
                <span key={i} className={`h-8 w-8 rounded-full border-2 border-navy ${c}`} />
              ))}
            </div>
            Trusted by 150+ companies
          </div>
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-md" aria-hidden="true">
          <div className="absolute left-0 top-4 w-64 animate-float rounded-xl bg-white p-4 text-ink shadow-2xl">
            <p className="text-xs font-semibold text-teal">NEW OPENING</p>
            <p className="mt-1 font-display text-lg font-bold">Senior React Developer</p>
            <p className="text-sm text-ink/70">Bengaluru · Hybrid · 4-7 yrs</p>
            <div className="mt-3 h-2 w-full rounded bg-mist"><div className="h-2 w-3/4 rounded bg-teal" /></div>
            <p className="mt-1 text-xs text-ink/60">12 profiles shortlisted</p>
          </div>
          <div className="absolute right-0 top-28 w-56 animate-float-slow rounded-xl bg-amber p-4 text-ink shadow-2xl [animation-delay:1s]">
            <p className="text-xs font-semibold">OFFER ACCEPTED</p>
            <p className="mt-1 font-display text-lg font-bold">HR Business Partner</p>
            <p className="text-sm">Mumbai · placed in 9 days</p>
          </div>
          <div className="absolute bottom-2 left-8 flex animate-float items-center gap-3 rounded-xl bg-white p-4 text-ink shadow-2xl [animation-delay:2s]">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-teal text-xl text-white">✓</span>
            <div>
              <p className="font-display font-bold">92% offers accepted</p>
              <p className="text-xs text-ink/60">Across 1,200+ placements</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
