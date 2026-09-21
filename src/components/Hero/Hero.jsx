"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const glassRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Image entrance
      tl.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 1.08,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.8,
        }
      )

        // Main content
        .fromTo(
          contentRef.current.children,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
          },
          "-=1"
        )

        // Glass card
        .fromTo(
          glassRef.current,
          {
            opacity: 0,
            y: 25,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
          },
          "-=0.6"
        );

      // Slow image movement
      gsap.to(imageRef.current, {
        scale: 1.04,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Ambient glow
      gsap.to(glowRef.current, {
        x: 80,
        y: -40,
        duration: 9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Mouse parallax
      const handleMouseMove = (event) => {
        const x =
          (event.clientX / window.innerWidth - 0.5) * 2;

        const y =
          (event.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(imageRef.current, {
          x: x * 8,
          y: y * 6,
          duration: 1.4,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(glassRef.current, {
          x: x * 3,
          y: y * 2,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#0b0b0b] text-white"
    >
      {/* =====================================================
          FULLSCREEN IMAGE
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src="https://sabafamilyfoundation.com/storage/slider/1746697933.jpg"
          alt="Saba Family Foundation community work"
          className="absolute inset-[-3%] h-[106%] w-[106%] object-cover"
        />

        {/* Dark gradient - NOT an opaque overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/10" />

        {/* Bottom readability */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Soft warm glow */}
        <div
          ref={glowRef}
          className="absolute -right-[15%] -top-[20%] h-[60vw] w-[60vw] rounded-full bg-[#c99a62]/20 blur-[130px]"
        />
      </div>

      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(255,255,255,0.22) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.18) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "25% 100%, 100% 25%",
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1500px] items-center px-6 pb-28 pt-20 sm:px-10 lg:px-14">
        <div
          ref={contentRef}
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-10 bg-[#d5b06c]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/65">
              Transforming lives since 2002
            </p>
          </div>

          {/* Main heading */}
          <h1 className="max-w-5xl font-display text-[clamp(3.5rem,8vw,8rem)] font-normal leading-[0.88] tracking-[-0.055em]">
            Creating
            <br />
            <span className="text-[#d5b06c]">
              possibilities.
            </span>
            <br />
            Changing lives.
          </h1>

          {/* Description + glass card */}
          <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-end">
            <p className="max-w-lg text-sm leading-7 text-white/65 sm:text-base">
              We work alongside communities to expand access to
              education, healthcare, nutrition, and opportunity —
              helping create a more sustainable future for
              generations to come.
            </p>

            {/* Small glass CTA */}
            <div
              ref={glassRef}
              className="w-fit rounded-2xl border border-white/20 bg-white/[0.09] p-2 shadow-2xl backdrop-blur-xl"
            >
              <a
                href="/about-us"
                className="group flex items-center gap-5 rounded-xl bg-white px-5 py-3.5 text-xs font-medium text-[#111] transition-all duration-300 hover:bg-[#d5b06c]"
              >
                <span>Discover our story</span>

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/5 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION BAR
      ===================================================== */}

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto max-w-[1500px] px-6 pb-5 sm:px-10 lg:px-14">
          <div className="flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-4 sm:flex sm:gap-10 lg:gap-16">
              <Stat
                value="2002"
                label="Established"
              />

              <Stat
                value="1B+"
                label="Impact goal"
              />

              <Stat
                value="4"
                label="Continents"
              />

              <Stat
                value="20+"
                label="Years of service"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   NAV ITEM
============================================================= */

function NavItem({ href, children }) {
  return (
    <a
      href={href}
      className="rounded-full px-4 py-2 text-[10px] text-white/55 transition-all duration-300 hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}

/* =============================================================
   STAT
============================================================= */

function Stat({ value, label }) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-xl tracking-tight text-white sm:text-2xl">
          {value}
        </span>

        <span className="h-1 w-1 rounded-full bg-[#d5b06c]" />
      </div>

      <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/40">
        {label}
      </p>
    </div>
  );
}