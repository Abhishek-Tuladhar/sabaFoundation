"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe2, MoveUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function BillionLives() {
  const sectionRef = useRef(null);
  const numberRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        numberRef.current,
        {
          y: 120,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        textRef.current.children,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
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
      className="relative overflow-hidden border-y border-black/10 bg-[#F0E9DA] px-6 py-28 text-black md:px-12 md:py-40 lg:px-20"
    >
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="mb-16 flex items-center justify-between border-b border-black/10 pb-5">
          <div className="flex items-center gap-3">
            <Globe2 size={17} />
            <span className="text-xs uppercase tracking-[0.25em]">
              The Billion Lives Mission
            </span>
          </div>

          <span className="hidden text-xs uppercase tracking-[0.2em] text-black/40 md:block">
            One mission / Global impact
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div>
            <p
              ref={numberRef}
              className="text-[clamp(5rem,17vw,17rem)] font-medium leading-[0.72] tracking-[-0.08em]"
            >
              1B<span className="text-[#D4AF37]">+</span>
            </p>

            <p className="mt-8 max-w-xl text-sm uppercase tracking-[0.25em] text-black/50 md:text-base">
              Lives we aim to impact
            </p>
          </div>

          <div ref={textRef}>
            <p className="text-2xl leading-tight tracking-[-0.025em] md:text-4xl">
              A global ambition rooted in local action.
            </p>

            <p className="mt-6 max-w-lg text-base leading-7 text-black/60">
              Saba Family Foundation brings together philanthropic initiatives
              with a shared purpose: creating opportunities, strengthening
              communities, and improving lives around the world.
            </p>

            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
              <MoveUpRight size={16} className="text-[#D4AF37]" />
              One shared purpose
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}