"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCTA() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-cta-content",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-32 md:px-12 md:py-48 lg:px-20"
    >
      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[130px]" />

      <div className="about-cta-content relative mx-auto max-w-[1500px] text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          The work continues
        </p>

        <h2 className="mx-auto mt-7 max-w-6xl text-5xl font-medium leading-[0.86] tracking-[-0.055em] text-cream md:text-8xl">
          There is still
          <br />
          <span className="text-cream/35">more to change.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-cream/50 md:text-lg">
          Explore the areas where Saba Family Foundation is working to create
          lasting opportunities and meaningful change.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/programs"
            className="group inline-flex items-center gap-3 bg-gold px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:-translate-y-1"
          >
            Explore our work
            <ArrowUpRight size={16} />
          </a>

          <a
            href="/contact"
            className="group inline-flex items-center gap-3 border border-cream/15 px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Get involved
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
