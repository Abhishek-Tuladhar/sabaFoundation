"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Mail } from "lucide-react";

export default function ContactInfo() {
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
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Intro */}
          <div data-reveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />

              <span className="text-[10px] uppercase tracking-[0.3em] text-black/45">
                Contact Saba Family Foundation
              </span>
            </div>

            <h2 className="max-w-xl text-5xl font-medium leading-[0.95] tracking-[-0.045em] md:text-7xl">
              Every meaningful
              <br />
              <span className="text-black/35">conversation starts</span>
              <br />
              somewhere.
            </h2>

            <p className="mt-8 max-w-lg text-base leading-7 text-black/55 md:text-lg">
              Whether you want to learn more about our work, explore a
              collaboration, or simply reach out, we welcome the conversation.
            </p>
          </div>

          {/* Contact details */}
          <div
            data-reveal
            className="flex flex-col justify-end border-t border-black/15 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"
          >
            <p className="mb-8 text-[10px] uppercase tracking-[0.25em] text-black/40">
              Our Contact Information
            </p>

            <a
              href="mailto:admin@sabafamilyfoundation.com"
              className="group flex items-center justify-between border-b border-black/15 py-6"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-colors duration-300 group-hover:border-gold group-hover:bg-gold">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-black/40">
                    Email Us
                  </p>

                  <p className="text-lg tracking-[-0.02em] md:text-xl">
                    admin@sabafamilyfoundation.com
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}