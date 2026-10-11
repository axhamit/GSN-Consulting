import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { company } from "@/lib/data";

export const metadata = { title: "Contact | GSN Consulting" };

export default function Contact() {
  return (
    <div className="container-x grid gap-12 py-16 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-extrabold">Contact us</h1>
        <p className="mt-3 text-lg text-ink/80">Hiring, job search or consulting: send a note and we reply in one working day.</p>
        <div className="mt-6 space-y-1">
          <p><a href={`mailto:${company.email}`}>{company.email}</a></p>
          <p>{company.phone}</p><p>{company.address}</p>
        </div>
      </div>
      <Suspense fallback={null}><ContactForm /></Suspense>
    </div>
  );
}
