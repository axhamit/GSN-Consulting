import Link from "next/link";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="container-x py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-navy p-10 text-white md:flex md:items-center md:justify-between md:p-14">
          <div className="absolute -right-10 -top-10 h-48 w-48 animate-blob rounded-full bg-teal/40 blur-2xl" />
          <h2 className="relative max-w-md text-3xl font-bold md:text-4xl">Tell us the role. We send profiles in 3 days.</h2>
          <Link href="/contact" className="btn relative mt-6 bg-amber text-ink hover:bg-white md:mt-0">Share your requirement</Link>
        </div>
      </Reveal>
    </section>
  );
}
