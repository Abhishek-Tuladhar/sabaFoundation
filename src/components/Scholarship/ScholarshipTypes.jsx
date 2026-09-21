"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import { scholarshipTypes } from "@/lib/scholarship/scholarship";

gsap.registerPlugin(ScrollTrigger);

export default function ScholarshipTypes() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll("[data-card]"),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
      className="bg-[#E4D9C0] px-6 py-24 text-black md:px-12 md:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
              How we support students
            </p>

            <h2 className="mt-5 max-w-lg text-4xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
              Three pathways.
              <br />
              <span className="text-black/30">One purpose.</span>
            </h2>
          </div>

          <div className="border-t border-black/15">
            {scholarshipTypes.map((item) => (
              <article
                key={item.number}
                data-card
                className="group grid gap-6 border-b border-black/15 py-8 md:grid-cols-[70px_1fr_auto] md:items-start md:py-10"
              >
                <span className="text-[10px] tracking-[0.2em] text-black/30">
                  {item.number}
                </span>

                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55 md:text-base">
                    {item.description}
                  </p>
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}