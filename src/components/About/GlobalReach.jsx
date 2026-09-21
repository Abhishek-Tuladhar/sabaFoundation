"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe2 } from "lucide-react";

import { globalRegions } from "@/lib/about/about";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalReach() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".region-item",
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F0E9DA] px-6 py-24 text-black md:px-12 md:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-black/50">
          <Globe2 size={16} />
          Global Reach
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="max-w-5xl text-5xl font-medium leading-[0.88] tracking-[-0.055em] md:text-8xl">
              Four continents.
              <br />
              <span className="text-black/30">One shared purpose.</span>
            </h2>
          </div>

          <div className="lg:pt-4">
            <p className="max-w-lg text-lg leading-8 text-black/60">
              The foundation's work reaches communities across multiple
              regions, connecting local initiatives with a broader commitment
              to human development and opportunity.
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-black/15">
          {globalRegions.map((region, index) => (
            <div
              key={region}
              className="region-item group flex items-center justify-between border-b border-black/15 py-7 md:py-9"
            >
              <div className="flex items-center gap-6">
                <span className="text-xs text-black/30">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-2xl font-medium tracking-[-0.02em] md:text-4xl">
                  {region}
                </h3>
              </div>

              <div className="h-2 w-2 rounded-full bg-[#D4AF37] transition-transform duration-300 group-hover:scale-[2]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}