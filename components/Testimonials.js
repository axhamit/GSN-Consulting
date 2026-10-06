"use client";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div key={i} className="animate-pop">
        <p className="font-display text-4xl text-teal">“</p>
        <p className="text-xl leading-relaxed md:text-2xl">{t.text}</p>
        <p className="mt-6 font-bold">{t.name}</p>
        <p className="text-sm text-ink/60">{t.role}</p>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, n) => (
          <button key={n} onClick={() => setI(n)} aria-label={`Show testimonial ${n + 1}`}
            className={`h-2.5 rounded-full transition-all ${n === i ? "w-8 bg-teal" : "w-2.5 bg-line"}`} />
        ))}
      </div>
    </div>
  );
}
