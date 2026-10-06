import Counter from "./Counter";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="container-x -mt-10 relative z-10">
      <div className="grid grid-cols-2 gap-6 rounded-2xl bg-white p-8 shadow-xl shadow-ink/10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl font-extrabold text-teal"><Counter value={s.value} suffix={s.suffix} /></p>
            <p className="mt-1 text-sm text-ink/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
