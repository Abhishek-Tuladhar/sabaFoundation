"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const quoteRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          y: 70,
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
        }
      );

      gsap.fromTo(
        contentRef.current.children,
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
            trigger: contentRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        quoteRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
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
      id="founder"
      className="relative overflow-hidden bg-black px-6 py-24 text-cream md:px-12 md:py-32 lg:px-20 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Section label */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            Founder & Chairman
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-24">
          {/* Founder image */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-gold/10 blur-[100px]" />

            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                ref={imageRef}
                src="/Images/Dr Saba.png"
                alt="Dr. Malini Saba"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            {/* Name */}
            <h2 className="text-6xl font-medium leading-[0.82] tracking-[-0.06em] text-cream md:text-8xl">
              Dr.
              <br />
              Malini
              <br />
              <span className="text-gold">Saba.</span>
            </h2>

            {/* Biography */}
            <div className="mt-12 max-w-3xl space-y-6 text-base leading-8 text-cream/65 md:text-lg">
              <p>
                <strong className="font-medium text-cream">
                  Dr. Malini Saba
                </strong>{" "}
                is a visionary leader and philanthropist, with over 32 years of
                corporate accomplishments as the founder and chairman of Saba
                Group.
              </p>

              <p>
                In 2002, she founded the{" "}
                <strong className="font-medium text-cream">
                  Saba Family Foundation
                </strong>{" "}
                to honor her father and uplift underserved communities
                globally.
              </p>

              <p>
                The foundation focuses on empowering marginalized women and
                children by providing access to essential medical services,
                education, and economic stability.
              </p>

              <p>
                Driven by her mission to improve the lives of{" "}
                <strong className="font-medium text-cream">
                  one billion people
                </strong>
                , Dr. Saba&apos;s foundation promotes nutrition, healthcare,
                education, arts, and human rights awareness.
              </p>

              <p>
                The foundation&apos;s impact is magnified through partnerships
                with globally respected organizations like the Bill Clinton
                Foundation, Stanford Medical Centre, CRY, Women Refugee
                Commission, and more, ensuring sustainable solutions to
                socio-economic challenges worldwide.
              </p>
            </div>

            {/* Quote */}
            <div
              ref={quoteRef}
              className="mt-14 border-t border-cream/15 pt-8"
            >
              <p className="max-w-3xl text-2xl leading-tight tracking-[-0.02em] text-cream md:text-4xl">
                “Success isn&apos;t measured by wealth or recognition; it&apos;s
                measured by how many lives you have touched positively along
                the way.”
              </p>

              <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/40">
                <span className="h-px w-10 bg-gold" />
                Dr. Malini Saba
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-3">
              <div className="border border-cream/10 px-5 py-4">
                <p className="text-2xl text-gold">32+</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  Years of leadership
                </p>
              </div>

              <div className="border border-cream/10 px-5 py-4">
                <p className="text-2xl text-gold">2002</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/40">
                  Foundation established
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#philosophy"
              className="group mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream"
            >
              Discover her philosophy

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                <ArrowUpRight size={15} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}