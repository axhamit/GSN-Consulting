import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServiceGrid from "@/components/ServiceGrid";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import WhyUs from "@/components/WhyUs";
import Marquee from "@/components/Marquee";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";

const Title = ({ children, sub }) => (
  <Reveal className="mb-10 text-center">
    <h2 className="text-3xl font-bold md:text-4xl">{children}</h2>
    {sub && <p className="mx-auto mt-3 max-w-xl text-ink/70">{sub}</p>}
  </Reveal>
);

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <section className="container-x py-20">
        <Title sub="Hiring and consulting under one roof.">What we do</Title>
        <ServiceGrid />
      </section>
      <section className="bg-white py-20">
        <div className="container-x"><Title sub="From brief to joining, in four steps.">How a hire works</Title><Process /></div>
      </section>
      <section className="container-x py-20"><WhyUs /></section>
      <section className="bg-white py-20">
        <div className="container-x"><Title sub="We hire across sectors.">Industries we serve</Title><Industries /></div>
      </section>
      <Marquee />
      <section className="container-x py-20"><Title>What clients say</Title><Testimonials /></section>
      <section className="bg-white py-20">
        <div className="container-x"><Title>Common questions</Title><FAQ /></div>
      </section>
      <CTA />
    </>
  );
}
