"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  HeartHandshake,
  Sprout,
} from "lucide-react";

import { aboutBeliefs } from "@/lib/about/about";

gsap.registerPlugin(ScrollTrigger);

const icons = [Compass, HeartHandshake, Sprout];

export default function AboutBeliefs() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".belief-card",
        {
          y: 50,
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
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              What We Believe
            </p>
          </div>

          <h2 className="max-w-4xl text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-cream md:text-6xl">
            The principles behind{" "}
            <span className="text-cream/35">the work.</span>
          </h2>
        </div>

        <div className="grid border-l border-t border-cream/10 md:grid-cols-3">
          {aboutBeliefs.map((belief, index) => {
            const Icon = icons[index];

            return (
              <article
                key={belief.number}
                className="belief-card group relative min-h-[400px] border-b border-r border-cream/10 p-7 transition-colors duration-500 hover:bg-[#080808] md:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-[0.2em] text-gold">
                    {belief.number}
                  </span>

                  <Icon
                    size={24}
                    strokeWidth={1.4}
                    className="text-cream/40 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-gold"
                  />
                </div>

                <div className="absolute bottom-9 left-7 right-7 md:left-9 md:right-9">
                  <h3 className="max-w-sm text-3xl font-medium leading-tight tracking-[-0.03em] text-cream">
                    {belief.title}
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-cream/45">
                    {belief.description}
                  </p>

                  <div className="mt-7 h-px w-12 bg-gold transition-all duration-500 group-hover:w-24" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}