"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Building2, ExternalLink, RefreshCw } from "lucide-react";

import { getCompanyPartners } from "@/lib/api/company";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyPartners() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadCompanies() {
    try {
      setLoading(true);
      setError(false);

      const data = await getCompanyPartners();

      setCompanies(data);
    } catch (err) {
      console.error("Failed to load company partners:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  useLayoutEffect(() => {
    if (loading || error || !companies.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      gsap.fromTo(
        cardsRef.current?.children,
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 78%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, error, companies]);

  return (
    <section
      ref={sectionRef}
      id="company-partners"
      className="
        relative
        overflow-hidden
        bg-[#F0E9DA]
        px-6
        py-24
        text-black
        md:px-12
        md:py-32
        lg:px-20
        lg:py-40
      "
    >
      <div className="mx-auto max-w-[1500px]">
        {/* =========================
            SECTION HEADER
        ========================== */}
        <div
          ref={headingRef}
          className="
            grid
            gap-10
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-end
          "
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/15
                "
              >
                <Building2 size={17} strokeWidth={1.5} />
              </span>

              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-black/50
                "
              >
                Business Network
              </span>
            </div>

            <p className="max-w-xs text-sm leading-6 text-black/45">
              Explore the companies and ventures connected to the wider Saba
              business ecosystem.
            </p>
          </div>

          <div>
            <h2
              className="
                max-w-5xl
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.05em]
                md:text-7xl
                lg:text-8xl
              "
            >
              Company&apos;s
              <br />
              <span className="text-[#8F741C]">Partners.</span>
            </h2>

            <p
              className="
                mt-8
                max-w-2xl
                text-base
                leading-7
                text-black/55
                md:text-lg
              "
            >
              A network of companies across different industries, connected
              through shared ideas, people, opportunities, and enterprise.
            </p>
          </div>
        </div>

        {/* =========================
            LOADING STATE
        ========================== */}
        {loading && (
          <div
            className="
              mt-20
              grid
              gap-px
              bg-black/10
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  min-h-[320px]
                  animate-pulse
                  bg-[#F0E9DA]
                  p-8
                  md:p-10
                "
              >
                <div className="flex items-start justify-between">
                  <div className="h-3 w-8 bg-black/10" />

                  <div className="h-10 w-10 rounded-full bg-black/10" />
                </div>

                <div className="mt-16 h-20 w-48 bg-black/10" />

                <div className="mt-8 h-px w-8 bg-black/10" />

                <div className="mt-5 h-8 w-3/4 bg-black/10" />

                <div className="mt-4 h-3 w-1/2 bg-black/10" />
              </div>
            ))}
          </div>
        )}

        {/* =========================
            ERROR STATE
        ========================== */}
        {!loading && error && (
          <div
            className="
              mt-20
              border
              border-black/10
              bg-[#E8DFCD]
              px-6
              py-24
              text-center
              md:py-32
            "
          >
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-[#8F741C]
              "
            >
              Business Network
            </p>

            <h3
              className="
                mt-5
                text-3xl
                font-medium
                tracking-[-0.03em]
              "
            >
              Companies could not be loaded.
            </h3>

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-sm
                leading-6
                text-black/45
              "
            >
              Please try again. The company network may temporarily be
              unavailable.
            </p>

            <button
              type="button"
              onClick={loadCompanies}
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                border
                border-black/15
                px-6
                py-4
                text-[10px]
                uppercase
                tracking-[0.2em]
                transition-all
                duration-300
                hover:border-black
                hover:bg-black
                hover:text-white
              "
            >
              <RefreshCw
                size={14}
                className="
                  transition-transform
                  duration-500
                  group-hover:rotate-180
                "
              />
              Try again
            </button>
          </div>
        )}

        {/* =========================
            COMPANY CARDS
        ========================== */}
        {!loading && !error && companies.length > 0 && (
          <div
            ref={cardsRef}
            className="
              mt-20
              grid
              gap-px
              bg-black/10
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {companies.map((company, index) => (
              <a
                key={company.id}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${company.name}`}
                className="
                  group
                  relative
                  z-0
                  flex
                  min-h-[320px]
                  flex-col
                  justify-between
                  overflow-hidden
                  bg-[#F0E9DA]
                  p-8

                  transition-all
                  duration-300
                  ease-out

                  hover:z-10
                  hover:-translate-y-4
                  hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]

                  md:p-10
                "
              >
                {/* =========================
                    CARD TOP
                ========================== */}
                <div
                  className="
                    relative
                    z-10
                    flex
                    items-start
                    justify-between
                  "
                >
                  <span
                    className="
                      text-xs
                      tracking-[0.2em]
                      text-black/30
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-black/15
                      transition-colors
                      duration-300
                      group-hover:border-black/30
                    "
                  >
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.4}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </span>
                </div>

                {/* =========================
    COMPANY LOGO
========================== */}
                <div
                  className="
    relative
    z-10
    flex
    h-24
    w-full
    items-center
    justify-center
  "
                >
                  <div className="relative h-20 w-48">
                    <Image
                      src={company.image}
                      alt={`${company.name} logo`}
                      fill
                      className="
        object-contain
        object-center
        transition-transform
        duration-500
        ease-out
        group-hover:scale-[1.2]
      "
                      sizes="192px"
                    />
                  </div>
                </div>

                {/* =========================
    COMPANY INFORMATION
========================== */}
                <div className="relative z-10 text-center">
                  <div
                    className="
      mx-auto
      mb-5
      h-px
      w-8
      bg-[#D4AF37]
      transition-all
      duration-300
      group-hover:w-12
    "
                  />

                  <div className="flex flex-col items-center">
                    <div>
                      <h3
                        className="
          text-2xl
          font-medium
          leading-tight
          tracking-[-0.03em]
          md:text-3xl
        "
                      >
                        {company.name}
                      </h3>

                      {company.tagline && (
                        <p
                          className="
            mt-3
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-black/45
          "
                        >
                          {company.tagline}
                        </p>
                      )}
                    </div>

                    <ExternalLink
                      size={15}
                      strokeWidth={1.4}
                      className="
        mt-4
        text-black/30
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* =========================
            FOOTER
        ========================== */}
        {!loading && !error && companies.length > 0 && (
          <div
            className="
              mt-12
              flex
              flex-col
              gap-6
              border-t
              border-black/10
              pt-8
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <p className="max-w-xl text-sm leading-6 text-black/45">
              Different companies. Different capabilities. One connected
              ecosystem.
            </p>

            <div
              className="
                flex
                items-center
                gap-3
                text-xs
                uppercase
                tracking-[0.2em]
                text-black/40
              "
            >
              <ExternalLink size={14} strokeWidth={1.4} />
              {companies.length} Companies
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
