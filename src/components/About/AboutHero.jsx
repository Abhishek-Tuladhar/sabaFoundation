"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function AboutHero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        imageRef.current,
        {
          scale: 1.15,
        },
        {
          scale: 1,
          duration: 1.8,
        },
      )
        .fromTo(
          contentRef.current.children,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
          },
          "-=1.1",
        )
        .fromTo(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left",
          },
          {
            scaleX: 1,
            duration: 0.9,
          },
          "-=0.6",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92svh] overflow-hidden bg-black"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <div ref={imageRef} className="absolute inset-0 scale-[1.15]">
          <Image
            src="https://sabafamilyfoundation.com/storage/slider/1747376060.png"
            alt="Saba Family Foundation"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(212,175,55,0.14),transparent_32%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[92svh] flex-col justify-end px-6 pb-10 md:px-12 md:pb-14 lg:px-20 lg:pb-16">
        <div ref={contentRef} className="mx-auto w-full max-w-[1500px]">
          <div className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-cream/60">
            <span className="text-gold">About the Foundation</span>
            <span className="h-px w-12 bg-gold/60" />
            <span>2002 — Present</span>
          </div>

          <h1 className="max-w-6xl text-[clamp(3.8rem,9vw,9rem)] font-medium leading-[0.84] tracking-[-0.055em] text-cream">
            Building a world
            <br />
            where <span className="text-gold">opportunity</span>
            <br />
            knows no borders.
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-7 text-cream/70 md:text-lg">
              Saba Family Foundation works across education, healthcare, human
              rights, livelihood, skill development, and art & culture to create
              opportunities for underserved communities.
            </p>

            <a
              href="#story"
              className="group flex w-fit items-center gap-3 text-xs uppercase tracking-[0.22em] text-cream"
            >
              Explore our story
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>

          <div ref={lineRef} className="mt-10 h-px w-full bg-gold/50" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-6 z-20 hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-cream/40 md:flex">
        <span>Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
