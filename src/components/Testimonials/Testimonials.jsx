"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Quote, UserRound, ArrowUpRight } from "lucide-react";

import { testimonials } from "@/app/lib/testimonials/testimonials";

export default function Testimonials() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".testimonial-card");

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 60,
      });

      gsap.set(introRef.current, {
        opacity: 0,
        y: 25,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 70,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      timeline
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
            duration: 1,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .to(
          introRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power4.out",
          },
          "-=0.35"
        );

      cards.forEach((card) => {
        const quote = card.querySelector(".testimonial-quote");
        const icon = card.querySelector(".testimonial-icon");
        const arrow = card.querySelector(".testimonial-arrow");
        const line = card.querySelector(".testimonial-line");
        const glow = card.querySelector(".testimonial-glow");

        const enter = () => {
          gsap.to(card, {
            y: -8,
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(quote, {
            x: 6,
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(icon, {
            scale: 1.08,
            rotate: -4,
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
            scaleX: 1,
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

        const leave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(quote, {
            x: 0,
            duration: 0.5,
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
            scaleX: 0.25,
            duration: 0.5,
            ease: "power3.out",
          });

          gsap.to(glow, {
            opacity: 0.35,
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
      className="relative overflow-hidden bg-black px-6 py-28 text-cream md:px-12 md:py-36 lg:px-20"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_68%)] blur-3xl" />

        <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_70%)] blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.012),transparent_35%,rgba(212,175,55,0.018))]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-20 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div
              ref={eyebrowRef}
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-gold" />

              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
                Testimonials
              </span>

              <span className="font-mono text-[10px] text-cream/20">
                VOICES / 01
              </span>
            </div>

            <h2
              ref={headingRef}
              className="max-w-5xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-[88px]"
            >
              Voices from
              <br />
              <span className="text-cream/30">
                the communities we serve.
              </span>
            </h2>
          </div>

          <div ref={introRef}>
            <div className="mb-5 flex h-10 w-10 items-center justify-center border border-gold/25 bg-gold/5 text-gold">
              <Quote size={17} strokeWidth={1.3} />
            </div>

            <p className="max-w-sm text-sm leading-7 text-cream/40">
              The most meaningful measure of our work is the difference it
              makes in the lives of the people and communities we work with.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div
          ref={cardsRef}
          className="grid gap-5 lg:grid-cols-2"
        >
          {testimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="testimonial-card group relative min-h-[440px] overflow-hidden border border-white/10 bg-[#080808] p-8 transition-colors duration-500 md:p-10 lg:p-12"
            >
              {/* Card glow */}
              <div
                className="testimonial-glow pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-35 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)",
                }}
              />

              {/* Number */}
              <div className="relative mb-12 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.25em] text-cream/25">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className="testimonial-icon flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.025] text-gold"
                >
                  <Quote size={18} strokeWidth={1.3} />
                </div>
              </div>

              {/* Large decorative quote */}
              <div className="pointer-events-none absolute right-8 top-20 font-serif text-[180px] leading-none text-white/[0.025]">
                “
              </div>

              {/* Quote */}
              <div className="relative flex min-h-[230px] flex-col justify-between">
                <p className="testimonial-quote max-w-2xl font-display text-2xl leading-[1.3] tracking-tight text-cream/90 transition-colors duration-500 group-hover:text-cream md:text-3xl">
                  “{testimonial.quote}”
                </p>

                {/* Author */}
                <div className="mt-12">
                  <div className="mb-5 relative h-px w-full bg-white/10">
                    <div className="testimonial-line absolute left-0 top-0 h-px w-16 origin-left scale-x-25 bg-gold" />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-cream/40">
                        <UserRound
                          size={16}
                          strokeWidth={1.2}
                        />
                      </div>

                      <div>
                        <cite className="not-italic text-sm font-medium text-cream/75">
                          {testimonial.name}
                        </cite>

                        <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-cream/25">
                          Community voice
                        </p>
                      </div>
                    </div>

                    <div className="testimonial-arrow flex h-9 w-9 items-center justify-center border border-white/10 text-cream/25 transition-colors duration-300 group-hover:border-gold/50 group-hover:text-gold">
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.2}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover border */}
              <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-gold/30" />

              {/* Bottom gold line */}
              <div className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" />
            </article>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-xs leading-6 text-cream/30">
            Every story represents a person, a family, or a community whose
            experience helps shape the work ahead.
          </p>

          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_rgba(212,175,55,0.55)]" />

            <span className="text-[9px] uppercase tracking-[0.25em] text-cream/25">
              Listening · Learning · Acting
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}