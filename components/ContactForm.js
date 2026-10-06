"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  }

  const field = "mt-1 w-full rounded-md border border-line bg-white px-4 py-2";
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label>Full name<input name="name" required className={field} /></label>
      <label>Email<input name="email" type="email" required className={field} /></label>
      <label>Phone<input name="phone" className={field} /></label>
      <label>I am a
        <select name="who" className={field}>
          <option>Company looking to hire</option>
          <option>Candidate looking for a job</option>
          <option>Need consulting</option>
        </select>
      </label>
      <label>Role or topic<input name="role" defaultValue={params.get("role") || ""} className={field} /></label>
      <label>Message<textarea name="message" rows={4} required className={field} /></label>
      <button className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      {status === "done" && <p role="status" className="text-teal">Message sent. We reply within one working day.</p>}
      {status === "error" && <p role="alert" className="text-red-600">Could not send. Check your details and try again.</p>}
    </form>
  );
}
