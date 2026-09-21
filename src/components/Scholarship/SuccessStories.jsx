"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { successStories } from "@/lib/scholarship/scholarship";

gsap.registerPlugin(ScrollTrigger);

export default function SuccessStories() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll("[data-story]"),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
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
      className="bg-[#F0E9DA] px-6 py-24 text-black md:px-12 md:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
            Success Stories
          </p>

          <h2 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl">
            The impact continues
            <span className="text-black/30"> long after the award.</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {successStories.map((story, index) => (
            <article
              key={story.name}
              data-story
              className="border-t border-black/15 pt-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-black/30">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-[9px] uppercase tracking-[0.2em] text-black/35">
                  {story.institution}
                </span>
              </div>

              <blockquote className="mt-12 text-2xl font-medium leading-[1.15] tracking-[-0.03em] md:text-3xl">
                “{story.quote}”
              </blockquote>

              <div className="mt-10 border-t border-black/10 pt-5">
                <p className="text-sm font-medium">{story.name}</p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-black/40">
                  {story.field}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}