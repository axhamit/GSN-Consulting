import ServiceGrid from "@/components/ServiceGrid";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export const metadata = { title: "Services | GSN Consulting" };

export default function Services() {
  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-x">
          <h1 className="text-4xl font-extrabold md:text-5xl">Services</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">Hiring and consulting, for technology and business teams.</p>
        </div>
      </section>
      <div className="container-x py-16"><ServiceGrid /></div>
      <section className="bg-white py-16"><div className="container-x"><h2 className="mb-8 text-3xl font-bold">Our process</h2><Process /></div></section>
      <section className="container-x py-16"><h2 className="mb-8 text-3xl font-bold">Industries</h2><Industries /></section>
      <section className="bg-white py-16"><div className="container-x"><FAQ /></div></section>
      <CTA />
    </>
  );
}
