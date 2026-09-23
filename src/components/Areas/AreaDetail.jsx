"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  HandCoins,
  HeartPulse,
  Palette,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const areaMeta = {
  education: {
    icon: GraduationCap,
    label: "Empowering Futures",
  },

  "skill-development": {
    icon: BriefcaseBusiness,
    label: "Skill Development",
  },

  healthcare: {
    icon: HeartPulse,
    label: "Transforming Healthcare",
  },

  "art-culture": {
    icon: Palette,
    label: "Empowering Artistry",
  },

  "human-rights": {
    icon: ShieldCheck,
    label: "Championing Human Dignity",
  },

  livelihood: {
    icon: HandCoins,
    label: "Creating Opportunities",
  },
};

const fallbackMeta = {
  icon: Users,
  label: "Making an Impact",
};

export default function AreaDetail({ area }) {
  const pageRef = useRef(null);

  const heroRef = useRef(null);
  const heroImageRef = useRef(null);

  const iconRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const excerptRef = useRef(null);
  const scrollHintRef = useRef(null);

  const descriptionRef = useRef(null);
  const commitmentRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    if (!area) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      gsap.set(heroImageRef.current, {
        opacity: 0,
        scale: 1.08,
      });

      gsap.set(iconRef.current, {
        opacity: 0,
        scale: 0.75,
        rotate: -12,
      });

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 70,
      });

      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(excerptRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(scrollHintRef.current, {
        opacity: 0,
        y: 15,
      });

      timeline
        .to(heroImageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
        })
        .to(
          iconRef.current,
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.7,
            ease: "back.out(1.6)",
          },
          "-=0.8",
        )
        .to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.45",
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          "-=0.35",
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.55",
        )
        .to(
          excerptRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.45",
        )
        .to(
          scrollHintRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.35",
        );

      /*
       * Hero parallax
       */
      if (heroImageRef.current && heroRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 8,
          ease: "none",

          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      /*
       * Description reveal
       */
      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,

            ease: "power3.out",

            scrollTrigger: {
              trigger: descriptionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      /*
       * Commitment reveal
       */
      if (commitmentRef.current) {
        gsap.fromTo(
          commitmentRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,

            ease: "power3.out",

            scrollTrigger: {
              trigger: commitmentRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      /*
       * CTA reveal
       */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,

            ease: "power3.out",

            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [area]);

  if (!area) {
    return null;
  }

  const meta = areaMeta[area.slug] ?? fallbackMeta;
  const Icon = meta.icon;

  return (
    <main
      ref={pageRef}
      className="relative overflow-hidden bg-[#EAE0CC] text-[#1A1712]"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full opacity-30 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.32) 0%, rgba(212,175,55,0) 70%)",
          }}
        />

        <div
          className="absolute -right-40 top-[40%] h-[600px] w-[600px] rounded-full opacity-25 blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(180,100,50,0.22) 0%, rgba(180,100,50,0) 70%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1A1712 0.7px, transparent 0.7px)",
            backgroundSize: "14px 14px",
          }}
        />
      </div>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section
        ref={heroRef}
        className="relative z-10 min-h-screen overflow-hidden px-6 py-6 md:px-12 lg:px-20"
      >
        {/* Navigation */}
        <div className="relative z-30 mx-auto flex max-w-[1500px] items-center justify-between">
          <Link
            href="/#programs"
            className="group inline-flex items-center gap-3 rounded-full border border-[#1A1712]/15 bg-[#F0E9DA]/60 px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#62594B] backdrop-blur-md transition-all duration-300 hover:border-[#B38B2E]/60 hover:bg-[#F0E9DA] hover:text-[#7A5C16]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All Areas
          </Link>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="h-px w-8 bg-[#1A1712]/20" />

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#756852]">
              Saba Family Foundation
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-100px)] max-w-[1500px] items-center gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
          {/* Image */}
          <div className="relative lg:col-span-7">
            <div className="absolute -inset-3 border border-[#1A1712]/10" />

            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/10]">
              {area.image ? (
                <img
                  ref={heroImageRef}
                  src={area.image}
                  alt={area.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  ref={heroImageRef}
                  className="h-full w-full bg-[#29251F]"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-[#D4AF37]" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                    Area of Work
                  </p>

                  <p className="mt-2 text-sm text-white/90">{area.title}</p>
                </div>

                <span className="text-4xl font-light text-white/30">
                  {String(area.id ?? "").padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Floating icon */}
            <div
              ref={iconRef}
              className="absolute -bottom-7 -right-5 flex h-20 w-20 items-center justify-center border border-[#B38B2E]/40 bg-[#F0E9DA]/95 text-[#7A5C16] shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-md md:-right-7 md:h-24 md:w-24"
            >
              <Icon size={34} strokeWidth={1.35} />
            </div>
          </div>

          {/* Content */}
          <div className="relative lg:col-span-5 lg:pl-4">
            <p
              ref={eyebrowRef}
              className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[#7A5C16]"
            >
              <span className="h-px w-8 bg-[#B38B2E]" />

              {area.tag || meta.label}
            </p>

            <h1
              ref={titleRef}
              className="max-w-3xl text-6xl font-medium leading-[0.88] tracking-[-0.055em] md:text-7xl lg:text-[7rem]"
            >
              {area.title}
            </h1>

            <div className="mt-9 h-px w-20 bg-[#B38B2E]" />

            {area.subtitle && (
              <p
                ref={subtitleRef}
                className="mt-8 max-w-xl text-xl leading-8 text-[#4F493F] md:text-2xl md:leading-9"
              >
                {area.subtitle}
              </p>
            )}

            {area.excerpt && (
              <p
                ref={excerptRef}
                className="mt-6 max-w-lg text-sm leading-7 text-[#756852] md:text-base"
              >
                {area.excerpt}
              </p>
            )}

            <div ref={scrollHintRef} className="mt-12 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1A1712]/15">
                <ArrowDown
                  size={16}
                  className="animate-bounce text-[#7A5C16]"
                />
              </div>

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#756852]">
                Explore the work
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESCRIPTION
      ========================================================== */}

      {area.description && (
        <section className="relative z-10 border-t border-[#1A1712]/10 bg-[#F0E9DA] px-6 py-24 md:px-12 md:py-32 lg:px-20">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3">
                <div className="sticky top-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#7A5C16]">
                    01 / The Work
                  </p>

                  <div className="mt-5 h-px w-12 bg-[#B38B2E]" />

                  <p className="mt-5 max-w-[180px] text-xs leading-6 text-[#756852]">
                    Understanding the foundation&apos;s work and its approach to
                    creating meaningful change.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-9">
                <div
                  ref={descriptionRef}
                  className="area-content max-w-4xl text-xl leading-9 text-[#403A32] md:text-2xl md:leading-[1.8]"
                  dangerouslySetInnerHTML={{
                    __html: area.description,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          IMPACT STRIP
      ========================================================== */}

      <section className="relative z-10 overflow-hidden border-t border-[#1A1712]/10 bg-[#E4D9C0] px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-[1500px] gap-8 md:grid-cols-3">
          <div className="group border-l border-[#1A1712]/15 pl-6 transition-all duration-500 hover:border-[#B38B2E]">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#1A1712]/15 text-[#7A5C16] transition-transform duration-500 group-hover:scale-110">
              <Icon size={19} />
            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-[#756852]">
              Focus
            </p>

            <p className="mt-2 text-lg text-[#2E2A24]">{area.title}</p>
          </div>

          <div className="group border-l border-[#1A1712]/15 pl-6 transition-all duration-500 hover:border-[#B38B2E]">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#1A1712]/15 text-[#7A5C16] transition-transform duration-500 group-hover:scale-110">
              <Sparkles size={19} />
            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-[#756852]">
              Approach
            </p>

            <p className="mt-2 text-lg text-[#2E2A24]">
              People-centered impact
            </p>
          </div>

          <div className="group border-l border-[#1A1712]/15 pl-6 transition-all duration-500 hover:border-[#B38B2E]">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#1A1712]/15 text-[#7A5C16] transition-transform duration-500 group-hover:scale-110">
              <ArrowUpRight size={19} />
            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-[#756852]">
              Commitment
            </p>

            <p className="mt-2 text-lg text-[#2E2A24]">Long-term change</p>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESCRIPTION 1
      ========================================================== */}

      {area.description1 && (
        <section className="relative z-10 border-t border-[#1A1712]/10 bg-[#EAE0CC] px-6 py-24 md:px-12 md:py-32 lg:px-20">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-3">
                <div className="sticky top-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#7A5C16]">
                    02 / Our Commitment
                  </p>

                  <div className="mt-5 h-px w-12 bg-[#B38B2E]" />
                </div>
              </div>

              <div className="lg:col-span-9">
                <div
                  ref={commitmentRef}
                  className="area-content max-w-4xl text-lg leading-8 text-[#514A3F] md:text-xl md:leading-9"
                  dangerouslySetInnerHTML={{
                    __html: area.description1,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          CTA
      ========================================================== */}

      <section
        ref={ctaRef}
        className="relative z-10 overflow-hidden border-t border-[#1A1712]/10 bg-[#E4D9C0] px-6 py-24 md:px-12 md:py-32 lg:px-20"
      >
        <div
          className="pointer-events-none absolute right-[-10%] top-[-30%] h-[500px] w-[500px] rounded-full opacity-30 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0) 70%)",
          }}
        />

        <div className="relative mx-auto flex max-w-[1500px] flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#7A5C16]">
              Continue exploring
            </p>

            <h2 className="max-w-3xl text-4xl font-medium leading-[1] tracking-[-0.04em] md:text-6xl">
              Discover the other areas of our work.
            </h2>
          </div>

          <Link
            href="/#programs"
            className="group inline-flex w-fit items-center gap-4 border border-[#1A1712]/20 bg-[#F0E9DA]/40 px-7 py-4 text-xs uppercase tracking-[0.18em] backdrop-blur-sm transition-all duration-500 hover:border-[#B38B2E] hover:bg-[#B38B2E] hover:text-white"
          >
            View all areas
            <ArrowUpRight
              size={17}
              className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
