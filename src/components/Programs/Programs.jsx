"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HeartPulse,
  GraduationCap,
  BriefcaseBusiness,
  Palette,
  Users,
  ShieldCheck,
  HandCoins,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

import { getAreas } from "@/lib/api/areas";

gsap.registerPlugin(ScrollTrigger);

const areaMeta = {
  education: {
    icon: GraduationCap,
    accent: "rgba(212, 175, 55, 0.35)",
  },

  "skill-development": {
    icon: BriefcaseBusiness,
    accent: "rgba(224, 178, 88, 0.35)",
  },

  healthcare: {
    icon: HeartPulse,
    accent: "rgba(232, 168, 72, 0.35)",
  },

  "art-culture": {
    icon: Palette,
    accent: "rgba(226, 188, 96, 0.35)",
  },

  "human-rights": {
    icon: ShieldCheck,
    accent: "rgba(212, 178, 100, 0.35)",
  },

  livelihood: {
    icon: HandCoins,
    accent: "rgba(198, 160, 90, 0.35)",
  },
};

const layoutClasses = [
  "lg:col-span-7 lg:row-span-2 min-h-[620px]",
  "lg:col-span-5 min-h-[300px]",
  "lg:col-span-5 min-h-[300px]",
  "lg:col-span-4 min-h-[420px]",
  "lg:col-span-4 min-h-[420px]",
  "lg:col-span-4 min-h-[420px]",
];

export default function Programs() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const gridRef = useRef(null);
  const progressRef = useRef(null);

  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  /*
   * Fetch areas from API
   */
  useEffect(() => {
    let cancelled = false;

    async function loadAreas() {
      try {
        setLoading(true);
        setError(null);

        const data = await getAreas();

        if (!cancelled) {
          setAreas(data);
        }
      } catch (err) {
        console.error("Failed to load areas:", err);

        if (!cancelled) {
          setError("Unable to load our areas of work.");
          setAreas([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAreas();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  /*
   * Scroll entrance animations
   */
  useLayoutEffect(() => {
    if (loading || !areas.length) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".program-card");

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 70,
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 80,
      });

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
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.7",
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
          "-=0.45",
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
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, areas.length]);

  /*
   * Card hover animation
   */
  const handleCardEnter = (event) => {
    const card = event.currentTarget;

    const image = card.querySelector(".program-image");
    const overlay = card.querySelector(".program-overlay");
    const content = card.querySelector(".program-content");
    const icon = card.querySelector(".program-icon");
    const arrow = card.querySelector(".program-arrow");
    const line = card.querySelector(".program-line");
    const glow = card.querySelector(".program-glow");

    gsap.to(image, {
      scale: 1.08,
      duration: 1.1,
      ease: "power3.out",
    });

    gsap.to(overlay, {
      opacity: 0.55,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(content, {
      y: -12,
      duration: 0.55,
      ease: "power3.out",
    });

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

    gsap.to(line, {
      width: 64,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(glow, {
      opacity: 1,
      scale: 1.15,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (event) => {
    const card = event.currentTarget;

    const image = card.querySelector(".program-image");
    const overlay = card.querySelector(".program-overlay");
    const content = card.querySelector(".program-content");
    const icon = card.querySelector(".program-icon");
    const arrow = card.querySelector(".program-arrow");
    const line = card.querySelector(".program-line");
    const glow = card.querySelector(".program-glow");

    gsap.to(image, {
      scale: 1,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(overlay, {
      opacity: 0.72,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(content, {
      y: 0,
      duration: 0.55,
      ease: "power3.out",
    });

    gsap.to(icon, {
      scale: 1,
      rotate: 0,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(arrow, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(line, {
      width: 32,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(glow, {
      opacity: 0.6,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 text-[#1A1712] md:px-12 md:py-36 lg:px-20"
      style={{
        background:
          "linear-gradient(180deg, #F0E9DA 0%, #EAE0CC 45%, #E4D9C0 100%)",
      }}
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.32) 0%, rgba(212,175,55,0) 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-20 h-[500px] w-[500px] rounded-full opacity-30 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(180,100,50,0.25) 0%, rgba(180,100,50,0) 70%)",
        }}
      />

      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1A1712 0.7px, transparent 0.7px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* Header */}
        <div className="mb-20 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p
              ref={eyebrowRef}
              className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[#7A5C16]"
            >
              <span className="h-px w-8 bg-[#B38B2E]" />
              Areas of Work
            </p>

            <h2
              ref={headingRef}
              className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.045em] md:text-6xl lg:text-8xl"
            >
              Where we focus,
              <br />
              <span className="text-[#756852]">and why it matters.</span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p
              ref={descriptionRef}
              className="max-w-md text-base leading-7 text-[#62594B] md:text-lg md:leading-8"
            >
              From education and healthcare to human rights, culture, skills,
              and livelihoods, our work is designed around the needs of people
              and communities.
            </p>

            {!loading && areas.length > 0 && (
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#1A1712]/15">
                  <div
                    ref={progressRef}
                    className="h-full w-full origin-left bg-[#B38B2E]"
                  />
                </div>

                <span className="shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-[#756852]">
                  {String(areas.length).padStart(2, "0")} Areas
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`min-h-[320px] animate-pulse overflow-hidden bg-[#DCD0B9]/60 ${
                  layoutClasses[index] ?? "lg:col-span-4"
                }`}
              >
                <div className="h-full w-full bg-gradient-to-br from-[#D8CCB4] via-[#E3D9C4] to-[#CEC0A5]" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex min-h-[320px] flex-col items-center justify-center border border-[#1A1712]/10 bg-[#E8DDC8]/60 px-6 text-center">
            <p className="mb-5 text-sm text-[#62594B]">{error}</p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="inline-flex items-center gap-2 border border-[#1A1712]/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B38B2E] hover:bg-[#B38B2E] hover:text-white"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && areas.length === 0 && (
          <div className="flex min-h-[320px] items-center justify-center border border-[#1A1712]/10 bg-[#E8DDC8]/60 px-6 text-center">
            <p className="text-sm text-[#62594B]">
              No areas of work are available at the moment.
            </p>
          </div>
        )}

        {/* Areas */}
        {!loading && !error && areas.length > 0 && (
          <div
            ref={gridRef}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-12"
          >
            {areas.map((area, index) => {
              const meta = areaMeta[area.slug] ?? {
                icon: Users,
                accent: "rgba(212, 175, 55, 0.3)",
              };

              const Icon = meta.icon;

              return (
                <Link
                  key={area.id}
                  href={`/areas/${area.slug}`}
                  className={`program-card group relative block min-h-[320px] overflow-hidden ${
                    layoutClasses[index] ?? "lg:col-span-4 min-h-[420px]"
                  }`}
                  onMouseEnter={handleCardEnter}
                  onMouseLeave={handleCardLeave}
                >
                  {/* Image */}
                  {area.image ? (
                    <img
                      src={area.image}
                      alt={area.title}
                      className="program-image absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="program-image absolute inset-0 bg-[#29251F]" />
                  )}

                  {/* Dark image overlay */}
                  <div
                    className="program-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20"
                    style={{
                      opacity: 0.72,
                    }}
                  />

                  {/* Accent glow */}
                  <div
                    className="program-glow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-[90px]"
                    style={{
                      background: meta.accent,
                    }}
                  />

                  {/* Border */}
                  <div className="pointer-events-none absolute inset-0 border border-white/15 transition-colors duration-500 group-hover:border-[#D4AF37]/50" />

                  {/* Card content */}
                  <div className="program-content relative z-10 flex h-full min-h-[320px] flex-col justify-between p-7 text-white md:p-9">
                    {/* Top */}
                    <div className="flex items-start justify-between">
                      <div className="program-icon flex h-12 w-12 items-center justify-center border border-white/20 bg-black/20 backdrop-blur-md">
                        <Icon size={20} strokeWidth={1.7} />
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="program-arrow flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md">
                          <ArrowUpRight size={19} strokeWidth={1.7} />
                        </span>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div>
                      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-[#E0B94F]">
                        {area.tag}
                      </p>

                      <h3 className="max-w-2xl text-3xl font-medium leading-[1] tracking-[-0.035em] md:text-4xl">
                        {area.title}
                      </h3>

                      <p className="mt-4 max-w-xl text-sm leading-6 text-white/65 md:text-base">
                        {area.excerpt}
                      </p>

                      <div className="program-line mt-6 h-px w-8 bg-[#D4AF37]" />

                      <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 group-hover:text-white/70">
                        Explore area
                        <ArrowUpRight size={13} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Footer statement */}
        {!loading && !error && areas.length > 0 && (
          <div className="mt-20 grid gap-8 border-t border-[#1A1712]/15 pt-8 md:grid-cols-2 md:items-end">
            <p className="max-w-xl text-sm leading-7 text-[#62594B]">
              Every area is rooted in a simple principle: meaningful change
              begins when people have the opportunity, resources, and support to
              shape their own future.
            </p>

            <div className="flex items-center gap-4 md:justify-end">
              <span className="text-xs uppercase tracking-[0.2em] text-[#756852]">
                People
              </span>

              <span className="h-1 w-1 rounded-full bg-[#B38B2E]" />

              <span className="text-xs uppercase tracking-[0.2em] text-[#756852]">
                Opportunity
              </span>

              <span className="h-1 w-1 rounded-full bg-[#B38B2E]" />

              <span className="text-xs uppercase tracking-[0.2em] text-[#756852]">
                Impact
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
