import Team from "@/components/Team";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import CTA from "@/components/CTA";

export const metadata = { title: "About | GSN Consulting" };

export default function About() {
  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-x max-w-3xl">
          <h1 className="text-4xl font-extrabold md:text-5xl">About GSN Consulting</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/80">
            We are a hiring and consulting firm that works across IT and non-IT roles. Our recruiters have worked inside the teams they hire for, so briefs are short and shortlists are accurate.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Replace this text with your real story, founding year and mission.
          </p>
        </div>
      </section>
      <div className="pb-10"><Stats /></div>
      <section className="container-x py-16"><h2 className="mb-8 text-3xl font-bold">Our leadership</h2><Team /></section>
      <section className="container-x py-10"><WhyUs /></section>
      <CTA />
    </>
  );
}
