"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Clock3 } from "lucide-react";

export default function ScholarshipHero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statusRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        imageRef.current,
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
        },
      )
        .fromTo(
          contentRef.current.children,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=1.1",
        )
        .fromTo(
          statusRef.current,
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.5",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88vh] items-end overflow-hidden bg-black text-cream"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          ref={imageRef}
          className="
            absolute
            inset-0
            bg-black
            bg-cover
            bg-center
            bg-no-repeat
          "
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-12 pt-32 md:px-12 md:pb-16 lg:px-20 lg:pb-20">
        <div className="mx-auto max-w-[1500px]">
          <div ref={contentRef}>
            {/* Eyebrow */}
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Scholarship Program
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-6xl text-6xl font-medium leading-[0.85] tracking-[-0.065em] md:text-8xl lg:text-[9.5rem]">
              Invest in
              <br />
              <span className="text-gold">possibility.</span>
            </h1>

            {/* Bottom */}
            <div className="mt-10 grid gap-8 border-t border-white/15 pt-6 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-base leading-7 text-cream/55 md:text-lg">
                Creating access to education for talented students and helping
                turn academic potential into opportunity.
              </p>

              <a
                href="#scholarship-program"
                className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-cream/70 transition-colors hover:text-gold"
              >
                Explore the program
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                  <ArrowDown
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship Status */}
      <div
        ref={statusRef}
        className="
          absolute
          right-6
          top-28
          z-10
          md:right-12
          lg:right-20
        "
      >
        <div
          className="
            flex
            max-w-[280px]
            items-start
            gap-3
            border
            border-white/15
            bg-black/50
            px-4
            py-3
            backdrop-blur-md
            md:px-5
            md:py-4
          "
        >
          {/* Status Indicator */}
          <span className="relative mt-0.5 flex h-2.5 w-2.5 shrink-0 items-center justify-center">
            <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-white/20" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-white/60" />
          </span>

          <div>
            <div className="mb-1 flex items-center gap-2">
              <Clock3 size={11} className="text-gold" />

              <span className="text-[9px] uppercase tracking-[0.2em] text-gold">
                Applications
              </span>
            </div>

            <p className="text-[10px] uppercase tracking-[0.15em] text-white/65">
              Currently Closed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
