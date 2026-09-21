"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Scholarship", href: "/scholarship" },
  { label: "Areas of Work", href: "/#programs" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Blogs", href: "/blogs" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-b border-white/10 bg-black/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div
          className="
            mx-auto
            flex
            h-[76px]
            w-full
            max-w-[1440px]
            items-center
            justify-between
            px-4
            sm:h-[82px]
            sm:px-6
            md:px-10
            lg:px-16
          "
        >
          {/* =================================================
    LOGO
================================================== */}

          <Link
            href="/"
            className="group relative z-[60] flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="
      relative
      flex
      h-12
      items-center
      rounded-lg
      bg-white/90
      px-2
      shadow-[0_4px_24px_rgba(0,0,0,0.25)]
      ring-1
      ring-white/20
      backdrop-blur-sm
      transition-all
      duration-500
      group-hover:bg-white
      sm:h-14
      sm:px-2.5
      md:h-14
      md:px-3
    "
            >
              <Image
                src="/Images/SabaFamilyLogo.png"
                alt="Saba Family Foundation"
                width={220}
                height={56}
                priority
                className="
        h-full
        w-auto
        object-contain
        transition-opacity
        duration-500
        group-hover:opacity-80
      "
              />
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav className="hidden items-center lg:flex">
            <div
              className="
                flex
                items-center
                gap-1
                rounded-full
                border
                border-white/10
                bg-black/30
                px-2
                py-2
                backdrop-blur-md
              "
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group
                    relative
                    px-3
                    py-2.5
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.14em]
                    text-cream/50
                    transition-colors
                    duration-300
                    hover:text-cream
                    xl:px-4
                  "
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Hover pill */}
                  <span
                    className="
                      absolute
                      inset-0
                      -z-0
                      scale-90
                      rounded-full
                      bg-white/[0.05]
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:scale-100
                      group-hover:opacity-100
                    "
                  />

                  {/* Hover line */}
                  <span
                    className="
                      absolute
                      bottom-1
                      left-1/2
                      h-px
                      w-0
                      -translate-x-1/2
                      bg-gold
                      transition-all
                      duration-300
                      group-hover:w-4
                    "
                  />
                </Link>
              ))}
            </div>
          </nav>

          {/* =================================================
              DESKTOP CONNECT
          ================================================== */}

          <Link
            href="/contact"
            className="
              group
              hidden
              items-center
              gap-4
              border
              border-gold
              bg-gold
              px-4
              py-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-black
              transition-all
              duration-500
              hover:bg-transparent
              hover:text-gold
              lg:flex
              xl:px-5
            "
          >
            <span>Let&apos;s Connect</span>

            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                border
                border-black/20
                transition-all
                duration-500
                group-hover:border-gold
              "
            >
              <ArrowUpRight
                size={13}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-500
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </span>
          </Link>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              relative
              z-[60]
              flex
              h-11
              w-11
              items-center
              justify-center
              border
              border-white/15
              bg-black/30
              text-cream
              backdrop-blur-md
              transition-all
              duration-300
              hover:border-gold
              hover:text-gold
              lg:hidden
            "
          >
            <span
              className={`
                absolute
                transition-all
                duration-300
                ${
                  menuOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }
              `}
            >
              <Menu size={19} strokeWidth={1.5} />
            </span>

            <span
              className={`
                absolute
                transition-all
                duration-300
                ${
                  menuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }
              `}
            >
              <X size={19} strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-40
          bg-black
          transition-all
          duration-700
          lg:hidden
          ${
            menuOpen
              ? "pointer-events-auto visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className={`
              absolute
              -right-40
              top-20
              h-[500px]
              w-[500px]
              rounded-full
              bg-[radial-gradient(circle,rgba(212,175,55,0.10),transparent_70%)]
              blur-3xl
              transition-all
              duration-1000
              ${menuOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"}
            `}
          />

          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(115deg,rgba(255,255,255,0.015),transparent_40%,rgba(212,175,55,0.02))]
            "
          />
        </div>

        {/* Menu content */}
        <div
          className="
            relative
            flex
            h-full
            flex-col
            justify-between
            overflow-y-auto
            px-5
            pb-6
            pt-28
            sm:px-6
            sm:pb-8
            sm:pt-32
            md:px-12
          "
        >
          {/* =================================================
              NAVIGATION
          ================================================== */}

          <nav>
            <p className="mb-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-gold sm:mb-8">
              <span className="h-px w-8 bg-gold" />
              Navigation
            </p>

            <div className="flex flex-col">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    py-3.5
                    sm:py-4
                  "
                >
                  <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                    <span className="shrink-0 font-mono text-[9px] text-cream/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        truncate
                        font-display
                        text-2xl
                        text-cream/70
                        transition-all
                        duration-300
                        group-hover:translate-x-2
                        group-hover:text-cream
                        sm:text-3xl
                        md:text-4xl
                      "
                    >
                      {item.label}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.2}
                    className="
                      ml-4
                      shrink-0
                      text-cream/20
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-gold
                      sm:h-5
                      sm:w-5
                    "
                  />
                </Link>
              ))}
            </div>
          </nav>

          {/* =================================================
              BOTTOM
          ================================================== */}

          <div className="mt-10 border-t border-white/10 pt-5 sm:pt-6">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="
                group
                flex
                items-center
                justify-between
                border
                border-gold/40
                bg-gold
                px-4
                py-4
                text-black
                transition-all
                duration-500
                hover:bg-transparent
                hover:text-gold
                sm:px-5
                sm:py-5
              "
            >
              <div className="min-w-0">
                <p className="text-[8px] uppercase tracking-[0.25em] opacity-60 sm:text-[9px]">
                  Start a conversation
                </p>

                <p className="mt-1 font-display text-lg sm:text-xl">
                  Let&apos;s Connect
                </p>
              </div>

              <ArrowUpRight
                size={19}
                strokeWidth={1.2}
                className="
                  ml-4
                  shrink-0
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </Link>

            <div className="mt-5 flex items-center justify-between gap-4 sm:mt-6">
              <p className="truncate text-[8px] uppercase tracking-[0.2em] text-cream/25 sm:text-[9px]">
                Saba Family Foundation
              </p>

              <p className="shrink-0 font-mono text-[8px] text-cream/20 sm:text-[9px]">
                © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
