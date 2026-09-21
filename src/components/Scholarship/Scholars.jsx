"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { scholars } from "@/lib/scholarship/scholarship";

gsap.registerPlugin(ScrollTrigger);

export default function Scholars() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll("[data-scholar]"),
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black px-6 py-24 text-cream md:px-12 md:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 flex flex-col justify-between gap-6 border-b border-white/10 pb-7 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
              Our Past Scholars
            </p>

            <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] md:text-6xl">
              Talent deserves
              <br />
              <span className="text-cream/30">an opportunity.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-cream/40">
            Meet students whose educational journeys have been supported
            through the foundation's scholarship program.
          </p>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
          {scholars.map((scholar, index) => (
            <article
              key={scholar.name}
              data-scholar
              className="group bg-[#080808] p-7 transition-colors duration-500 hover:bg-[#101010] md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] tracking-[0.2em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-[10px] uppercase tracking-[0.2em] text-cream/20">
                  Scholar
                </span>
              </div>

              <div className="mt-16">
                <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                  {scholar.name}
                </h3>

                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-gold">
                  {scholar.field}
                  {scholar.institution && ` · ${scholar.institution}`}
                </p>

                <blockquote className="mt-8 max-w-xl text-lg leading-8 text-cream/55 md:text-xl">
                  “{scholar.quote}”
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}