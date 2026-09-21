"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

export default function BlogHero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[75vh] items-end overflow-hidden bg-black px-6 pb-16 pt-32 text-cream md:px-12 md:pb-20 lg:px-20"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <div ref={contentRef}>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">
            Stories & Insights
          </p>

          <h1 className="max-w-6xl text-6xl font-medium leading-[0.86] tracking-[-0.06em] md:text-8xl lg:text-[10rem]">
            Ideas that
            <br />
            <span className="text-gold">create impact.</span>
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 border-t border-cream/15 pt-6 md:flex-row md:items-end">
            <p className="max-w-xl text-base leading-7 text-cream/50 md:text-lg">
              Explore stories, conversations, initiatives, and perspectives
              from the Saba Family Foundation and its global work.
            </p>

            <a
              href="#stories"
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/70"
            >
              Explore stories

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                <ArrowDown
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}