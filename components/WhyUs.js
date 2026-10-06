import { why } from "@/lib/data";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <Reveal>
        <h2 className="text-3xl font-bold md:text-4xl">Why companies stay with GSN</h2>
        <p className="mt-4 text-lg text-ink/75">Most of our clients come back for a second and third hire. Here is why.</p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-ink p-5 text-white"><p className="font-display text-3xl font-bold">90 days</p><p className="text-sm text-white/70">Replacement guarantee</p></div>
          <div className="rounded-xl bg-amber p-5"><p className="font-display text-3xl font-bold">3 days</p><p className="text-sm">To first shortlist</p></div>
        </div>
      </Reveal>
      <div className="space-y-4">
        {why.map((w, i) => (
          <Reveal key={w.title} delay={i * 100}>
            <div className="card flex gap-4 !p-5">
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal text-sm text-white">✓</span>
              <div><h3 className="font-bold">{w.title}</h3><p className="text-ink/75">{w.text}</p></div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
