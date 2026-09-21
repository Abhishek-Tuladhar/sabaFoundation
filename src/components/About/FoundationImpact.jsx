"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import { aboutStats } from "@/lib/about/about";

gsap.registerPlugin(ScrollTrigger);

export default function FoundationImpact() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".impact-item",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#EAE0CC] px-6 py-24 text-black md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-20 flex flex-col gap-5 border-b border-black/15 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black/50">
              Foundation Facts
            </p>

            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] md:text-6xl">
              More than numbers.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-black/55">
            A snapshot of the foundation&apos;s work and the communities reached
            through its philanthropic initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5">
          {aboutStats.map((stat, index) => (
            <div
              key={stat.label}
              className="impact-item group border-b border-black/15 p-6 first:border-l-0 lg:border-b-0 lg:border-r lg:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.2em] text-black/40">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-black/25 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>

              <div className="mt-16">
                <p className="text-6xl font-medium tracking-[-0.06em] md:text-7xl">
                  {stat.value}
                  <span className="text-[#B08A18]">{stat.suffix}</span>
                </p>

                <p className="mt-4 max-w-[150px] text-xs uppercase leading-5 tracking-[0.16em] text-black/50">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
