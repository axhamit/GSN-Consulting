import { industries } from "@/lib/data";
import Reveal from "./Reveal";

export default function Industries() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {industries.map((x, i) => (
        <Reveal key={x.name} delay={i * 50}>
          <div className="card flex items-center gap-3 !p-4">
            <span className="text-3xl">{x.icon}</span>
            <span className="font-semibold">{x.name}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
