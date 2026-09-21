"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { scholarshipImpact } from "@/lib/scholarship/scholarship";

gsap.registerPlugin(ScrollTrigger);

export default function ScholarshipImpact() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll("[data-stat]"),
        {
          y: 40,
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
      className="bg-black px-6 py-24 text-cream md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
            Education in numbers
          </p>

          <h2 className="mt-5 text-4xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
            A foundation built around
            <span className="text-cream/30"> measurable impact.</span>
          </h2>
        </div>

        <div className="grid border-l border-t border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {scholarshipImpact.map((stat) => (
            <div
              key={stat.label}
              data-stat
              className="border-b border-r border-white/10 px-6 py-10 md:px-8 md:py-12 lg:px-8"
            >
              <span className="block text-5xl font-medium tracking-[-0.05em] text-gold md:text-6xl">
                {stat.value}
              </span>

              <span className="mt-5 block text-[10px] uppercase tracking-[0.25em] text-cream/35">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}