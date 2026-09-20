"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HeartPulse,
  GraduationCap,
  Utensils,
  BriefcaseBusiness,
  Palette,
  Users,
  ArrowUpRight,
  MoveUpRight,
} from "lucide-react";

import { programs } from "@/app/lib/programs/programs";

gsap.registerPlugin(ScrollTrigger);

const programMeta = {
  Healthcare: {
    icon: HeartPulse,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=90",
    accent: "rgba(212, 175, 55, 0.35)",
  },
  Education: {
    icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=90",
    accent: "rgba(224, 178, 88, 0.35)",
  },
  Nutrition: {
    icon: Utensils,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=90",
    accent: "rgba(232, 168, 72, 0.35)",
  },
  "Economic Opportunity": {
    icon: BriefcaseBusiness,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=90",
    accent: "rgba(198, 160, 90, 0.35)",
  },
  "Arts & Culture": {
    icon: Palette,
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1600&q=90",
    accent: "rgba(226, 188, 96, 0.35)",
  },
  "Community Development": {
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=90",
    accent: "rgba(212, 178, 100, 0.35)",
  },
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=90",
];

export default function Programs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const eyebrowRef = useRef(null);
  const descriptionRef = useRef(null);
  const gridRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".program-card");

      gsap.set(eyebrowRef.current, { opacity: 0, y: 25 });
      gsap.set(headingRef.current, { opacity: 0, y: 70 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 });
      gsap.set(cards, { opacity: 0, y: 80 });
      gsap.set(progressRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      entrance
        .to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .to(
          headingRef.current,
          { opacity: 1, y: 0, duration: 1.1, ease: "power4.out" },
          "-=0.4"
        )
        .to(
          descriptionRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.7"
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.45"
        );

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          end: "bottom 35%",
          scrub: 1,
        },
      });

      cards.forEach((card) => {
        const image = card.querySelector(".program-image");
        const overlay = card.querySelector(".program-overlay");
        const content = card.querySelector(".program-content");
        const icon = card.querySelector(".program-icon");
        const arrow = card.querySelector(".program-arrow");
        const line = card.querySelector(".program-line");
        const glow = card.querySelector(".program-glow");

        const enter = () => {
          gsap.to(image, { scale: 1.08, duration: 1.1, ease: "power3.out" });
          gsap.to(overlay, { opacity: 0.55, duration: 0.6, ease: "power2.out" });
          gsap.to(content, { y: -12, duration: 0.55, ease: "power3.out" });
          gsap.to(icon, {
            scale: 1.08,
            rotate: -5,
            duration: 0.45,
            ease: "power3.out",
          });
          gsap.to(arrow, {
            x: 5,
            y: -5,
            duration: 0.4,
            ease: "power3.out",
          });
          gsap.to(line, { width: 64, duration: 0.5, ease: "power3.out" });
          gsap.to(glow, {
            opacity: 1,
            scale: 1.15,
            duration: 0.8,
            ease: "power2.out",
          });
        };

        const leave = () => {
          gsap.to(image, { scale: 1, duration: 1, ease: "power3.out" });
          gsap.to(overlay, { opacity: 0.72, duration: 0.6, ease: "power2.out" });
          gsap.to(content, { y: 0, duration: 0.55, ease: "power3.out" });
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.45,
            ease: "power3.out",
          });
          gsap.to(arrow, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
          gsap.to(line, { width: 32, duration: 0.5, ease: "power3.out" });
          gsap.to(glow, {
            opacity: 0.6,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);
        card._enter = enter;
        card._leave = leave;
      });

      return () => {
        cards.forEach((card) => {
          card.removeEventListener("mouseenter", card._enter);
          card.removeEventListener("mouseleave", card._leave);
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 text-[#1A1712] md:px-12 md:py-36 lg:px-20"
      style={{
        background:
          "linear-gradient(180deg, #F0E9DA 0%, #EAE0CC 45%, #E4D9C0 100%)",
      }}
    >
      {/* --------------------------------
          Ambient background (warm, soft)
      -------------------------------- */}
      <div className="pointer-events-none absolute inset-0">
        {/* Warm gold glow — top left */}
        <div
          className="absolute -left-40 top-10 h-[620px] w-[620px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.22), transparent 65%)",
          }}
        />

        {/* Soft terracotta — bottom right */}
        <div
          className="absolute -right-56 bottom-0 h-[700px] w-[700px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(196,120,72,0.18), transparent 65%)",
          }}
        />

        {/* Subtle diagonal sheen */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.6) 0%, transparent 40%, rgba(212,175,55,0.08) 100%)",
          }}
        />

        {/* Fine grain / paper texture via radial dots */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(26,23,18,0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* --------------------------------
            Section header
        -------------------------------- */}
        <div className="mb-20">
          <div ref={eyebrowRef} className="mb-7 flex items-center gap-4">
            <span className="h-px w-12 bg-[#B8942E]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8A6D1E]">
              Areas of Work
            </span>
            <span className="font-mono text-[10px] text-[#1A1712]/40">
              06 / 06
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <h2
              ref={headingRef}
              className="max-w-5xl font-display text-5xl leading-[0.96] tracking-tight text-[#1A1712] md:text-7xl lg:text-[92px]"
            >
              Where we focus,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #B8942E 0%, #D4AF37 45%, #8A6D1E 100%)",
                }}
              >
                and why it matters.
              </span>
            </h2>

            <p
              ref={descriptionRef}
              className="max-w-sm text-sm leading-7 text-[#1A1712]/60 lg:pb-2"
            >
              From healthcare and education to culture and opportunity, our
              work is designed around the needs of people and communities.
            </p>
          </div>
        </div>

        {/* --------------------------------
            Progress line
        -------------------------------- */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 overflow-hidden bg-[#1A1712]/10">
            <div
              ref={progressRef}
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, #B8942E, #D4AF37, #8A6D1E)",
              }}
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#1A1712]/40">
            Our focus
          </span>
        </div>

        {/* --------------------------------
            Program grid
        -------------------------------- */}
        <div
          ref={gridRef}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-12"
        >
          {programs.map((program, index) => {
            const meta = programMeta[program.title] || {};
            const Icon = meta.icon || Users;

            const image =
              program.image ||
              meta.image ||
              fallbackImages[index % fallbackImages.length];

            const layout =
              index === 0
                ? "lg:col-span-7 lg:row-span-2"
                : index === 4
                  ? "lg:col-span-7"
                  : "lg:col-span-5";

            const height =
              index === 0
                ? "min-h-[620px]"
                : index === 4
                  ? "min-h-[500px]"
                  : "min-h-[430px]";

            return (
              <article
                key={program.title}
                className={`program-card group relative overflow-hidden rounded-2xl ${layout} ${height}`}
                style={{
                  background: "#0F0D0A",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 40px -20px rgba(26,23,18,0.35)",
                }}
              >
                {/* Image */}
                <img
                  src={image}
                  alt=""
                  className="program-image absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />

                {/* Cinematic gradient — lighter at top, deep at bottom
                    (keeps image visible, still legible text) */}
                <div
                  className="program-overlay absolute inset-0 opacity-72"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,13,10,0.05) 0%, rgba(15,13,10,0.15) 30%, rgba(15,13,10,0.55) 65%, rgba(15,13,10,0.94) 100%)",
                  }}
                />

                {/* Warm gold wash from top-right */}
                <div
                  className="program-glow pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-60 blur-3xl"
                  style={{
                    background: `radial-gradient(circle, ${
                      meta.accent || "rgba(212,175,55,0.35)"
                    }, transparent 70%)`,
                  }}
                />

                {/* Inner ring highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

                {/* Top row */}
                <div className="absolute left-6 right-6 top-6 flex items-start justify-between md:left-8 md:right-8 md:top-8">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="program-icon flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors duration-300 group-hover:border-[#D4AF37]/70 group-hover:bg-[#D4AF37]/20">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="program-content absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                  <div
                    className="program-line mb-5 h-px w-8 transition-colors"
                    style={{
                      background:
                        "linear-gradient(90deg, #D4AF37, rgba(212,175,55,0))",
                    }}
                  />

                  <div className="flex items-end justify-between gap-6">
                    <div className="max-w-2xl">
                      <h3 className="mb-3 font-display text-3xl leading-[1.05] tracking-tight text-white md:text-4xl">
                        {program.title}
                      </h3>

                      <p className="max-w-xl text-sm leading-6 text-white/75 md:text-[15px]">
                        {program.description}
                      </p>
                    </div>

                    <div className="program-arrow hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0F0D0A] sm:flex">
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Directional cue */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
                  <MoveUpRight
                    size={13}
                    className="text-white/30 transition-colors duration-300 group-hover:text-[#D4AF37]"
                    strokeWidth={1.3}
                  />
                </div>

                {/* Outer ring on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-700 group-hover:ring-[#D4AF37]/60" />

                {/* Gold underline sweep */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
                  style={{
                    background:
                      "linear-gradient(90deg, #B8942E, #D4AF37, #F0D97A, #D4AF37, #B8942E)",
                  }}
                />
              </article>
            );
          })}
        </div>

        {/* --------------------------------
            Footer
        -------------------------------- */}
        <div className="mt-16 flex flex-col gap-5 border-t border-[#1A1712]/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-6 text-[#1A1712]/50">
            Every program is rooted in a simple principle: meaningful change
            begins with understanding what communities need.
          </p>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8942E] shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#1A1712]/45">
              People · Opportunity · Impact
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}