"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScholarshipIntro() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll("[data-reveal]"),
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
      id="scholarship-program"
      className="bg-[#F0E9DA] px-6 py-24 text-black md:px-12 md:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div data-reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF37]" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-black/45">
                Our Scholarship Program
              </span>
            </div>
          </div>

          <div data-reveal>
            <h2 className="max-w-5xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl lg:text-7xl">
              Education should open doors,
              <span className="text-black/30">
                {" "}
                not reinforce the barriers around them.
              </span>
            </h2>

            <div className="mt-10 max-w-3xl space-y-6 text-base leading-8 text-black/60 md:text-lg">
              <p>
                The Saba Family Foundation provides scholarship support to
                deserving students who demonstrate academic excellence,
                leadership potential, and financial need.
              </p>

              <p>
                Its broader education work extends beyond scholarships to
                school construction and youth development, with the foundation
                reporting support for more than one million students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}