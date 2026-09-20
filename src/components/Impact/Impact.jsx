"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const without = [
  "Families without access to basic healthcare or education.",
  "Communities cut off from economic opportunity.",
  "Talented students unable to afford schooling.",
];

const withFoundation = [
  "Scholarships and skill programs that open real career paths.",
  "Healthcare outreach that reaches underserved regions directly.",
  "Local partnerships that put decision-making in the community's hands.",
];

/* ---------- Icons ---------- */
function CrossIcon({ className }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M5.5 5.5l5 5M10.5 5.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path
        d="M5 8.2l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Impact Item ---------- */
function ImpactItem({ children, variant = "muted", index }) {
  const isPositive = variant === "positive";
  const itemRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = itemRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(glow, { x, y, duration: 0.5, ease: "power2.out" });
    gsap.to(glow, { opacity: isPositive ? 0.22 : 0.1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`impact-item group relative flex gap-5 overflow-hidden rounded-xl px-4 py-6 transition-colors duration-500 ${
        isPositive ? "hover:bg-gold/[0.05]" : "hover:bg-white/[0.04]"
      }`}
    >
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full opacity-0"
        style={{
          background: isPositive
            ? "radial-gradient(circle, rgba(212,175,55,0.9) 0%, rgba(212,175,55,0) 70%)"
            : "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* Left accent bar */}
      <span
        className={`absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 transition-all duration-500 ease-out group-hover:h-3/5 ${
          isPositive ? "bg-gold" : "bg-white/50"
        }`}
      />

      {/* Icon */}
      <div
        className={`relative mt-1 shrink-0 transition-all duration-500 group-hover:scale-110 ${
          isPositive ? "text-gold" : "text-white/35"
        }`}
      >
        {isPositive ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CrossIcon className="h-4 w-4" />
        )}
      </div>

      {/* Content */}
      <div className="relative flex-1">
        <p
          className={`max-w-md text-[15px] leading-7 transition-all duration-500 md:text-[17px] ${
            isPositive
              ? "text-cream/90 group-hover:text-white"
              : "text-cream/55 group-hover:text-cream/85"
          }`}
        >
          {children}
        </p>
      </div>

      {/* Index badge */}
      <span
        className={`impact-number relative mt-1 shrink-0 self-start font-mono text-[10px] tracking-widest opacity-60 ${
          isPositive ? "text-gold" : "text-white/45"
        }`}
      >
        /{String(index).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ---------- Animated Counter ---------- */
function AnimatedCounter({ target, label, color }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = String(Math.round(obj.val)).padStart(2, "0");
          }
        },
      });
    });
    return () => ctx.revert();
  }, [target]);

  return (
    <div className="flex items-baseline gap-2">
      <span
        ref={ref}
        className={`font-display text-5xl leading-none tracking-tight md:text-6xl ${color}`}
      >
        00
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>
    </div>
  );
}

/* ---------- Main Section ---------- */
export default function Impact() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const challengeRef = useRef(null);
  const responseRef = useRef(null);
  const dividerRef = useRef(null);
  const bottomRef = useRef(null);
  const topLineRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const challengeItems = gsap.utils.toArray(
        challengeRef.current?.querySelectorAll(".impact-item")
      );
      const responseItems = gsap.utils.toArray(
        responseRef.current?.querySelectorAll(".impact-item")
      );
      const challengeHeader = challengeRef.current?.querySelector(
        ".impact-column-header"
      );
      const responseHeader = responseRef.current?.querySelector(
        ".impact-column-header"
      );

      // Split heading into words
      const heading = headingRef.current;
      if (heading) {
        const text = heading.innerHTML;
        heading.innerHTML = text.replace(
          /(<span[^>]*>.*?<\/span>|[^\s]+)/g,
          '<span class="inline-block overflow-hidden align-bottom"><span class="inline-block word-inner">$1</span></span>'
        );
      }

      // Initial states
      gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
      gsap.set(headingRef.current.querySelectorAll(".word-inner"), {
        yPercent: 110,
        opacity: 0,
      });
      gsap.set([challengeHeader, responseHeader], { opacity: 0, y: 25 });
      gsap.set([...challengeItems, ...responseItems], { opacity: 0, y: 30 });
      gsap.set(bottomRef.current, { opacity: 0, y: 25 });
      gsap.set(topLineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(dividerRef.current, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(topLineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
      })
        .to(
          eyebrowRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.6"
        )
        .to(
          headingRef.current.querySelectorAll(".word-inner"),
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .to(
          [challengeHeader, responseHeader],
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out" },
          "-=0.5"
        )
        .to(
          dividerRef.current,
          { scaleY: 1, duration: 1.2, ease: "power3.inOut" },
          "-=0.7"
        )
        .to(
          challengeItems,
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out" },
          "-=0.85"
        )
        .to(
          responseItems,
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out" },
          "-=0.6"
        )
        .to(
          bottomRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.35"
        );

      // Scroll-driven progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax orbs
      gsap.to(".impact-orb-1", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".impact-orb-2", {
        y: 60,
        x: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-24 text-cream md:px-12 md:py-32 lg:px-20"
    >
      {/* Background orbs — brighter for true black */}
      <div
        className="impact-orb-1 pointer-events-none absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full opacity-[0.09] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 1) 0%, rgba(212, 175, 55, 0) 70%)",
        }}
      />
      <div
        className="impact-orb-2 pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 1) 0%, rgba(212, 175, 55, 0) 70%)",
        }}
      />

      {/* Grid pattern — stronger on black */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Vignette for focus */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-8xl">
        {/* Scroll progress bar */}
        <div className="absolute -top-6 left-0 h-px w-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-gold/50"
          />
        </div>

        {/* Top line — bright gold fading out */}
        <div
          ref={topLineRef}
          className="mb-12 h-px w-full bg-gradient-to-r from-gold via-gold/50 to-transparent"
        />

        {/* Header */}
        <div className="mb-20 grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <div>
            <div
              ref={eyebrowRef}
              className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-gold"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              Why our work matters
            </div>

            <h2
              ref={headingRef}
              className="max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[76px]"
            >
              Turning overlooked needs into{" "}
              <span className="text-gold">lasting change.</span>
            </h2>
          </div>

          <div className="max-w-sm md:justify-self-end">
            <div className="mb-4 h-px w-10 bg-white/25" />
            <p className="text-sm leading-7 text-cream/60">
              Real change starts by understanding the barriers people face —
              then working with communities to create meaningful opportunities.
            </p>
          </div>
        </div>

        {/* Comparison panel */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
          <div className="grid md:grid-cols-2">
            {/* Challenge */}
            <div ref={challengeRef} className="p-6 py-10 md:p-10 md:py-14">
              <div className="impact-column-header mb-10 flex items-start justify-between gap-6">
                <div>
                  <AnimatedCounter
                    target={1}
                    label="Challenge"
                    color="text-white/25"
                  />
                  <h3 className="mt-4 text-xl font-medium tracking-tight text-cream/85">
                    The barrier
                  </h3>
                </div>
                <span className="pt-1 text-right text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Without support
                </span>
              </div>

              <div className="space-y-1">
                {without.map((item, index) => (
                  <ImpactItem key={item} index={index + 1} variant="muted">
                    {item}
                  </ImpactItem>
                ))}
              </div>
            </div>

            {/* Center divider */}
            <div
              ref={dividerRef}
              className="absolute bottom-6 left-1/2 top-6 hidden w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:block"
            />

            {/* Response */}
            <div
              ref={responseRef}
              className="border-t border-white/[0.08] p-6 py-10 md:border-t-0 md:p-10 md:py-14"
            >
              <div className="impact-column-header mb-10 flex items-start justify-between gap-6">
                <div>
                  <AnimatedCounter
                    target={2}
                    label="Response"
                    color="text-gold"
                  />
                  <h3 className="mt-4 text-xl font-medium tracking-tight text-white">
                    The response
                  </h3>
                </div>
                <span className="pt-1 text-right text-[10px] uppercase tracking-[0.18em] text-gold/70">
                  With Saba Family Foundation
                </span>
              </div>

              <div className="space-y-1">
                {withFoundation.map((item, index) => (
                  <ImpactItem key={item} index={index + 1} variant="positive">
                    {item}
                  </ImpactItem>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div
          ref={bottomRef}
          className="flex flex-col gap-6 pt-10 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-2xl text-sm leading-7 text-cream/50">
            We focus on practical, community-led initiatives designed to
            create opportunities that continue beyond a single campaign.
          </p>

          <div className="flex shrink-0 items-center gap-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-cream/45">
              Long-term impact
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}