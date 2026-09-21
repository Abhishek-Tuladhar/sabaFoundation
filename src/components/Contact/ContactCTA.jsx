"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function ContactCTA() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.children,
        {
          y: 35,
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
      className="bg-cream px-6 py-24 text-black md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="border-t border-black/15 pt-8">
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-black/40">
            Let&apos;s Work Together
          </p>

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <h2 className="max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl lg:text-8xl">
              One conversation
              <br />
              can begin a
              <span className="text-gold"> movement.</span>
            </h2>

            <a
              href="mailto:admin@sabafamilyfoundation.com"
              className="
                group
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-black
                text-cream
                transition-all
                duration-300
                hover:bg-gold
                hover:text-black
                md:h-20
                md:w-20
              "
              aria-label="Email Saba Family Foundation"
            >
              <ArrowUpRight
                size={22}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}