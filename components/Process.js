import { process as steps } from "@/lib/data";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <ol className="grid gap-6 md:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 120}>
          <li className="relative rounded-xl bg-mist p-6">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display font-bold text-white">{i + 1}</span>
            <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
            <p className="mt-1 text-ink/75">{s.text}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
