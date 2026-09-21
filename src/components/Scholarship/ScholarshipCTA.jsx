"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ScholarshipCTA() {
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
      className="relative overflow-hidden bg-black px-6 py-28 text-cream md:px-12 md:py-36 lg:px-20 lg:py-44"
    >
      <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1500px]">
        <div data-reveal className="max-w-5xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
            The next opportunity
          </p>

          <h2 className="mt-6 text-5xl font-medium leading-[0.88] tracking-[-0.06em] md:text-7xl lg:text-[8rem]">
            Education can
            <br />
            <span className="text-cream/30">change a life.</span>
          </h2>
        </div>

        <div
          data-reveal
          className="mt-12 flex flex-col justify-between gap-8 border-t border-white/10 pt-7 md:flex-row md:items-end"
        >
          <p className="max-w-xl text-base leading-7 text-cream/45 md:text-lg">
            The scholarship program is currently closed. Stay connected with
            the foundation for future opportunities and explore ways to support
            its wider education initiatives.
          </p>

          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-4 border border-gold bg-gold px-6 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-black transition-all duration-500 hover:bg-[#E2C14A]"
          >
            Let's Connect

            <span className="flex h-6 w-6 items-center justify-center border border-black/20">
              <ArrowUpRight
                size={13}
                strokeWidth={1.5}
                className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}