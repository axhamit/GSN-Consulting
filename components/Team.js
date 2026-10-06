import { team } from "@/lib/data";
import Reveal from "./Reveal";

export default function Team() {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
      {team.map((m, i) => (
        <Reveal key={m.name} delay={i * 100}>
          <div className="card text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-teal to-navy font-display text-2xl font-bold text-white">{m.initials}</div>
            <h3 className="mt-4 font-bold">{m.name}</h3>
            <p className="text-sm text-ink/70">{m.role}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
