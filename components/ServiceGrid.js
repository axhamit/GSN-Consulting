import { services } from "@/lib/data";
import Reveal from "./Reveal";

export default function ServiceGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Reveal key={s.title} delay={i * 80}>
          <article className="card h-full">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-teal/10 text-2xl">{s.icon}</span>
            <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-ink/75">{s.text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
