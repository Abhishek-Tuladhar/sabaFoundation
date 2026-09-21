"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { getScholarshipData } from "@/lib/api/scholarship";

gsap.registerPlugin(ScrollTrigger);

export default function Scholars() {
  const sectionRef = useRef(null);
  const [scholars, setScholars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScholars() {
      try {
        const data = await getScholarshipData();
        setScholars(data.pastScholars);
      } catch (error) {
        console.error("Failed to fetch scholarship data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchScholars();
  }, []);

  useLayoutEffect(() => {
    if (!scholars.length) return;

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
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [scholars]);

  return (
    <section
      ref={sectionRef}
      className="bg-black px-6 py-24 text-cream md:px-12 md:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
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
            Meet students whose educational journeys have been supported through
            the foundation&apos;s scholarship program.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-h-[360px] animate-pulse bg-[#080808] p-7 md:p-10"
              >
                <div className="h-3 w-8 bg-white/10" />

                <div className="mt-12 flex items-center gap-5">
                  <div className="h-16 w-16 shrink-0 rounded-full bg-white/10" />

                  <div>
                    <div className="h-6 w-40 bg-white/10" />
                    <div className="mt-3 h-3 w-48 bg-white/10" />
                  </div>
                </div>

                <div className="mt-10 h-20 max-w-xl bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {/* SCHOLARS */}
        {!loading && scholars.length > 0 && (
          <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            {scholars.map((scholar, index) => (
              <article
                key={scholar.id}
                data-scholar
                className="
                  group
                  bg-[#080808]
                  p-7
                  transition-colors
                  duration-500
                  hover:bg-[#101010]
                  md:p-10
                "
              >
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <span className="text-[10px] tracking-[0.2em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-cream/20">
                    Scholar
                  </span>
                </div>

                {/* SCHOLAR INFO */}
                <div className="mt-12 flex items-center gap-5">
                  {/* PROFILE IMAGE */}
                  <div
                    className="
                      relative
                      h-16
                      w-16
                      shrink-0
                      overflow-hidden
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      md:h-20
                      md:w-20
                    "
                  >
                    <Image
                      src={scholar.image}
                      alt={`${scholar.name} — scholarship recipient`}
                      fill
                      sizes="80px"
                      className="
                        object-cover
                        grayscale
                        transition-all
                        duration-700
                        group-hover:scale-105
                        group-hover:grayscale-0
                      "
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                      {scholar.name}
                    </h3>

                    <p className="mt-2 max-w-md text-[10px] uppercase tracking-[0.2em] text-gold">
                      {scholar.university}
                    </p>
                  </div>
                </div>

                {/* QUOTE */}
                <blockquote className="mt-10 max-w-xl border-l border-gold/30 pl-5 text-lg leading-8 text-cream/55 md:pl-6 md:text-xl">
                  “{scholar.description}”
                </blockquote>

                {/* BOTTOM DETAIL */}
                <div className="mt-10 border-t border-white/10 pt-5">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-cream/20">
                    Scholarship Recipient
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && scholars.length === 0 && (
          <div className="border border-white/10 bg-[#080808] px-6 py-16 text-center">
            <p className="text-sm text-cream/40">
              Past scholar information is currently unavailable.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
