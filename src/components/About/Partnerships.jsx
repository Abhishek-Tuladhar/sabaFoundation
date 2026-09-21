"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ngoPartners = [
  "Bill Clinton Foundation",
  "Stanford Medical Centre",
  "CRY",
  "YUVA",
  "CARE International",
  "Latin America Association",
  "Delhi Sikh Gurdwara Management Committee",
  "LAC + USC Medical Center",
  "Mother Teresa Foundation",
  "Women's Refugee Commission",
];

export default function Partnerships() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
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
        }
      );

      gsap.fromTo(
        gridRef.current.children,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-24 text-cream md:px-12 md:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Heading */}
        <div
          ref={headingRef}
          className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Handshake size={17} strokeWidth={1.5} />
              </span>

              <span className="text-xs uppercase tracking-[0.3em] text-gold">
                Our Network
              </span>
            </div>

            <p className="max-w-xs text-sm leading-6 text-cream/35">
              Working together with organizations that share our commitment to
              creating meaningful and lasting change.
            </p>
          </div>

          <div>
            <h2 className="max-w-5xl text-5xl font-medium leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-8xl">
              Our NGO&apos;s
              <br />
              <span className="text-gold">Partners.</span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-7 text-cream/50 md:text-lg">
              Through collaboration with respected organizations and
              institutions, the foundation extends its reach and strengthens
              its work across communities around the world.
            </p>
          </div>
        </div>

        {/* Partners */}
        <div
          ref={gridRef}
          className="mt-20 grid border-l border-t border-cream/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ngoPartners.map((partner, index) => (
            <div
              key={partner}
              className="group relative min-h-[150px] border-b border-r border-cream/10 p-7 transition-colors duration-500 hover:bg-cream hover:text-black md:p-9"
            >
              {/* Number */}
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold transition-colors duration-500 group-hover:text-black/50">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Name */}
              <h3 className="mt-8 max-w-xs text-xl leading-tight tracking-[-0.02em] text-cream/80 transition-colors duration-500 group-hover:text-black md:text-2xl">
                {partner}
              </h3>

              {/* Arrow */}
              <span className="absolute right-7 top-7 flex h-8 w-8 items-center justify-center rounded-full border border-cream/10 transition-all duration-500 group-hover:border-black/20 md:right-9 md:top-9">
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-12 flex flex-col justify-between gap-6 border-t border-cream/10 pt-8 md:flex-row md:items-center">
          <p className="max-w-xl text-sm leading-6 text-cream/35">
            Partnerships allow ideas, resources, and expertise to come
            together in service of communities and causes.
          </p>

          <span className="text-xs uppercase tracking-[0.25em] text-cream/30">
            Collaboration · Impact · Change
          </span>
        </div>
      </div>
    </section>
  );
}