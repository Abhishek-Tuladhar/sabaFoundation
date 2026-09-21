"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          y: 80,
          scale: 1.08,
        },
        {
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      gsap.fromTo(
        contentRef.current.children,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
        <div className="relative">
          <div className="absolute -left-10 top-1/4 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />

          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              ref={imageRef}
              src="/Images/Dr Saba.png"
              alt="Saba Family Foundation community work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          <div className="absolute -bottom-5 -right-5 border border-gold/40 bg-black px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              Since 2002
            </p>
          </div>
        </div>

        <div ref={contentRef}>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">
            Our Story
          </p>

          <h2 className="max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-cream md:text-7xl">
            A foundation built around{" "}
            <span className="text-cream/40">action.</span>
          </h2>

          <div className="mt-10 max-w-2xl space-y-6 text-base leading-8 text-cream/65 md:text-lg">
            <p>
              Founded in 2002 by Dr. Malini Saba, Saba Family Foundation was
              created around a simple belief: meaningful change begins when
              people have access to the opportunities they need to build better
              lives.
            </p>

            <p>
              The foundation supports initiatives across education, healthcare,
              nutrition, human rights, livelihood, skill development, and art
              and culture, working with communities and organizations around the
              world.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4 border-t border-cream/10 pt-6">
            <span className="h-px w-12 bg-gold" />

            <span className="text-xs uppercase tracking-[0.2em] text-cream/40">
              Creating opportunities across borders
            </span>

            <ArrowUpRight size={15} className="text-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
