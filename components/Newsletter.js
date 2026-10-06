"use client";
import { useState } from "react";

export default function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex max-w-md gap-2">
      <input type="email" required placeholder="Your email" aria-label="Email for job alerts"
        className="w-full rounded-md bg-white/10 px-4 py-2 text-white placeholder:text-white/50" />
      <button className="btn bg-amber !py-2 text-ink hover:bg-white">{done ? "Subscribed" : "Subscribe"}</button>
    </form>
  );
}
