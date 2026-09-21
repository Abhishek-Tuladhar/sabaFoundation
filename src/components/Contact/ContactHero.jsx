"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

export default function ContactHero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

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
        }
      ).fromTo(
        contentRef.current.children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
        },
        "-=1.1"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[78vh] items-end overflow-hidden bg-black text-cream"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          ref={imageRef}
          className="
            absolute
            inset-0
            bg-[url('/Images/contact-hero.jpg')]
            bg-cover
            bg-center
            bg-no-repeat
          "
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 pb-12 pt-32 md:px-12 md:pb-16 lg:px-20 lg:pb-20">
        <div className="mx-auto max-w-[1500px]">
          <div ref={contentRef}>
            {/* Eyebrow */}
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Get In Touch
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-6xl text-6xl font-medium leading-[0.86] tracking-[-0.065em] md:text-8xl lg:text-[9.5rem]">
              Let&apos;s
              <br />
              <span className="text-gold">connect.</span>
            </h1>

            {/* Bottom */}
            <div className="mt-10 grid gap-8 border-t border-white/15 pt-6 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-base leading-7 text-cream/55 md:text-lg">
                Have a question, an idea, or an opportunity to collaborate?
                We&apos;d love to hear from you.
              </p>

              <a
                href="#contact-form"
                className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-cream/70 transition-colors hover:text-gold"
              >
                Send a message

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
    </section>
  );
}