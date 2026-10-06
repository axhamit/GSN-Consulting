import { clients } from "@/lib/data";

export default function Marquee() {
  const list = [...clients, ...clients];
  return (
    <div className="overflow-hidden border-y border-line bg-white py-6">
      <p className="mb-4 text-center text-sm text-ink/60">Companies that hire with us</p>
      <div className="flex w-max animate-marquee gap-14">
        {list.map((c, i) => (
          <span key={i} className="font-display text-2xl font-bold text-ink/30">{c}</span>
        ))}
      </div>
    </div>
  );
}
