"use client";

import { useEffect, useRef, useState } from "react";
import { partners } from "@/app/lib/partners/partners";

export default function Partners() {
  const doubled = [...partners, ...partners];
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      className="relative overflow-hidden py-14 md:py-16"
      style={{
        // Same gradient stack as Programs — last stop (#E4D9C0) matches
        // Programs' last stop so the seam is invisible.
        background:
          "linear-gradient(180deg, #F0E9DA 0%, #EAE0CC 45%, #E4D9C0 100%)",
      }}
    >
      {/* --------------------------------
          Ambient background — identical to Programs
      -------------------------------- */}
      <div className="pointer-events-none absolute inset-0">
        {/* Warm gold glow — top left */}
        <div
          className="absolute -left-40 top-10 h-[620px] w-[620px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.28), transparent 65%)",
          }}
        />

        {/* Soft terracotta — bottom right */}
        <div
          className="absolute -right-56 bottom-0 h-[700px] w-[700px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(196,120,72,0.22), transparent 65%)",
          }}
        />

        {/* Diagonal warm sheen */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,250,235,0.35) 0%, transparent 40%, rgba(140,95,35,0.10) 100%)",
          }}
        />

        {/* Paper grain */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(42,35,24,0.10) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* --------------------------------
          Header eyebrow
      -------------------------------- */}
      <div className="relative mx-auto mb-10 flex max-w-7xl items-center justify-center gap-4 px-6">
        <span
          className="h-px w-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(138,109,30,0.6))",
          }}
        />
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#6E5410]">
          Working alongside
        </p>
        <span
          className="h-px w-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(138,109,30,0.6), transparent)",
          }}
        />
      </div>

      {/* --------------------------------
          Marquee
      -------------------------------- */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left edge fade — uses section top gradient color */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-40"
          style={{
            background:
              "linear-gradient(90deg, #F0E9DA 0%, rgba(240,233,218,0) 100%)",
          }}
        />
        {/* Right edge fade — uses section bottom gradient color */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40"
          style={{
            background:
              "linear-gradient(270deg, #E4D9C0 0%, rgba(228,217,192,0) 100%)",
          }}
        />

        <div
          ref={trackRef}
          className="flex w-max gap-4 md:gap-5"
          style={{
            animation: reducedMotion
              ? "none"
              : "partners-marquee 40s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              aria-hidden={i >= partners.length}
              className="group flex shrink-0 items-center gap-4 rounded-full border px-5 py-3 backdrop-blur-sm transition-all duration-500 md:px-6 md:py-3.5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%)",
                borderColor: "rgba(42,35,24,0.10)",
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.6) inset, 0 6px 18px -10px rgba(42,35,24,0.15)",
              }}
            >
              {/* Gold dot marker */}
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-500 group-hover:scale-125"
                style={{
                  background:
                    "linear-gradient(135deg, #8A6D1E, #C89B3C, #8A6D1E)",
                  boxShadow: "0 0 8px rgba(200,155,60,0.5)",
                }}
              />

              {/* Name */}
              <span className="whitespace-nowrap font-display text-lg tracking-tight text-[#2A2318]/65 transition-colors duration-500 group-hover:text-[#2A2318] md:text-xl">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --------------------------------
          Footer counter
      -------------------------------- */}
      <div className="relative mx-auto mt-10 flex max-w-7xl items-center justify-center gap-3 px-6">
        <span className="h-1 w-1 rounded-full bg-[#8A6D1E]/60" />
        <span className="text-[9px] uppercase tracking-[0.28em] text-[#2A2318]/40">
          {partners.length} partners · shared purpose
        </span>
        <span className="h-1 w-1 rounded-full bg-[#8A6D1E]/60" />
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes partners-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}