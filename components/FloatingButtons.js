"use client";
import { useEffect, useState } from "react";
import { company } from "@/lib/data";

export default function FloatingButtons() {
  const [top, setTop] = useState(false);
  useEffect(() => {
    const f = () => setTop(window.scrollY > 500);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {top && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
          className="grid h-12 w-12 animate-pop place-items-center rounded-full bg-ink text-white shadow-lg">↑</button>
      )}
      <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-xl text-white shadow-lg transition-transform hover:scale-110">💬</a>
    </div>
  );
}
