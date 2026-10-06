"use client";
import { useState } from "react";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f, i) => (
        <div key={f.q} className="rounded-xl border border-line bg-white">
          <button className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
            aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {f.q}
            <span className={`text-xl text-teal transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <p className="overflow-hidden px-5 text-ink/75"><span className="block pb-5">{f.a}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}
