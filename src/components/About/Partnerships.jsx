"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  // =========================================================
  // ROW 1
  // =========================================================
  {
    name: "Delhi Sikh Gurdwara Management Committee (DSGMC)",
    logo: "/Images/partners/DSGMC Logo.png",
    url: "https://www.dsgmc.in/",
  },
  {
    name: "European Antibullying Network (EAN)",
    logo: "/Images/partners/AntiBullyingLogo.png",
    url: "https://www.antibullying.eu/",
  },
  {
    name: "Beverly Hills Education Foundation (BHEF)",
    logo: "/Images/partners/BHEF_Logo_New.avif",
    url: "https://www.bhef.org/",
  },
  {
    name: "Andy Vargas Foundation (AVF)",
    logo: "/Images/partners/Andy Vargas Foundation.png",
    url: "https://andyvargasfoundation.org/",
  },
  {
    name: "Concern Worldwide",
    logo: "/Images/partners/ConcernWorldwide.png",
    url: "https://www.concern.net/",
  },
  {
    name: "Comfy Care12",
    logo: "/Images/partners/ComfyCare.avif",
    url: "https://www.comfycare12.net/",
  },

  // =========================================================
  // ROW 2
  // =========================================================
  {
    name: "GOONJ – A Voice, An Effort",
    logo: "/Images/partners/Goonj Logo.png",
    url: "https://goonj.org/",
  },
  {
    name: "Columbia University – Institute for the Study of Human Rights (ISHR)",
    logo: "/Images/partners/ISHRLogo.webp",
    url: "https://www.humanrightscolumbia.org/",
  },
  {
    name: "Kailash Satyarthi Children's Foundation",
    logo: "/Images/partners/SatyarthiLogo.png",
    url: "https://satyarthi.org.in/",
  },
  {
    name: "Latin American Association",
    logo: "/Images/partners/logolaa.png",
    url: "https://thelaa.org/",
  },
  {
    name: "Labor Community Services – Los Angeles",
    logo: "/Images/partners/LCSLogo.webp",
    url: "https://launionaflcio.org/labor-community-services/",
  },
  {
    name: "Ashoka",
    logo: null,
    fallback: "ashoka",
    url: "https://www.ashoka.org/",
  },

  // =========================================================
  // ROW 3
  // =========================================================
  {
    name: "Save the Children",
    logo: "/Images/partners/SavetheChildren.png",
    url: "https://www.savethechildren.net/",
  },
  {
    name: "Stanford Medicine",
    logo: null,
    fallback: "stanford",
    url: "https://med.stanford.edu/",
  },
  {
    name: "International Brotherhood of Teamsters",
    logo: "/Images/partners/International Brotherhood of Teamsters.png",
    url: "https://teamster.org/",
  },
  {
    name: "Teams to End Poverty – UNDP",
    logo: "/Images/partners/UNDP.webp",
    url: "https://www.undp.org/",
  },
  {
    name: "Gente Unida – A Human Rights Border Coalition",
    logo: "/Images/partners/GenteUnidaLogo.png",
    url: "https://genteunida.org/",
  },
  {
    name: "Say Yes for Children",
    logo: "/Images/partners/SayYesForChildren.png",
    url: "#",
  },

  // =========================================================
  // ROW 4
  // =========================================================
  {
    name: "YUVA",
    logo: "/Images/partners/yuva logo.png",
    url: "https://yuvaindia.org/",
  },
  {
    name: "Mother Teresa Foundation, Thanjavur",
    logo: "/Images/partners/MotherTeresaLogo.png",
    url: "#",
  },
  {
    name: "The Nabha Foundation",
    logo: "/Images/partners/NabhaFoundation.png",
    url: "#",
  },
  {
    name: "Mobile Creches – Nurturing Childhood, Sowing Change",
    logo: "/Images/partners/MobileCreches.gif",
    url: "https://www.mobilecreches.org/",
  },
  {
    name: "LAC+USC Medical Center",
    logo: "/Images/partners/Los_Angeles_County+USC_Medical_Center_Healthcare_Network_logo.png",
    url: "https://dhs.lacounty.gov/lacusc/",
  },
  {
    name: "The Kalgidhar Trust",
    logo: "/Images/partners/KalgidharTrust.png",
    url: "https://www.kalgidhartrust.org/",
  },

  // =========================================================
  // ROW 5
  // =========================================================
  {
    name: "George Lopez Foundation",
    logo: "/Images/partners/GoergeLopez.webp",
    url: "#",
  },
  {
    name: "Hilda L. Solis – Los Angeles County Supervisor, First District",
    logo: "/Images/partners/HILDA.png",
    url: "https://hildalsolis.org/",
  },
  {
    name: "CARE",
    logo: null,
    fallback: "care",
    url: "https://www.care.org/",
  },
  {
    name: "Robin Hood Army",
    logo: "/Images/partners/RobinHoodArmy.png",
    url: "https://robinhoodarmy.com/",
  },
  {
    name: "NetAid",
    logo: "/Images/partners/netaid.png",
    url: "#",
  },
  {
    name: "RMHC – Ronald McDonald House Charities",
    logo: "/Images/partners/RMHC.png",
    url: "https://rmhc.org/",
  },
];

function PartnerFallback({ type }) {
  if (type === "ashoka") {
    return (
      <div
        className="
          flex items-center gap-3
          text-cream/80
          transition-colors duration-500
          group-hover:text-black
        "
      >
        <span className="text-5xl font-semibold leading-none tracking-[-0.08em]">
          a
        </span>

        <span className="text-lg font-medium tracking-[-0.02em]">ashoka</span>
      </div>
    );
  }

  if (type === "stanford") {
    return (
      <div
        className="
          flex flex-col
          text-cream/80
          transition-colors duration-500
          group-hover:text-black
        "
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.18em]">
          Stanford
        </span>

        <span className="mt-1 text-2xl font-semibold leading-none tracking-[-0.04em]">
          MEDICINE
        </span>
      </div>
    );
  }

  if (type === "care") {
    return (
      <div
        className="
          flex items-center gap-3
          text-cream/80
          transition-colors duration-500
          group-hover:text-black
        "
      >
        <span
          className="
            flex h-11 w-11 items-center justify-center
            rounded-full border-2 border-current
            text-[10px] font-bold uppercase
            tracking-[0.08em]
          "
        >
          CARE
        </span>

        <span className="text-xl font-semibold tracking-[-0.03em]">CARE</span>
      </div>
    );
  }

  return null;
}

export default function Partnerships() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // -----------------------------------------------------
      // Heading animation
      // -----------------------------------------------------
      gsap.fromTo(
        headingRef.current,
        {
          y: 50,
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
            once: true,
          },
        },
      );

      // -----------------------------------------------------
      // Partner cards animation
      // -----------------------------------------------------
      gsap.fromTo(
        gridRef.current.children,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-black
        px-6
        py-24
        text-cream
        md:px-12
        md:py-32
        lg:px-20
        lg:py-40
      "
    >
      <div className="mx-auto max-w-[1500px]">
        {/* ===================================================
            HEADING
        =================================================== */}
        <div
          ref={headingRef}
          className="
            grid
            gap-10
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-end
          "
        >
          {/* Left */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full
                  border border-gold/30
                  text-gold
                "
              >
                <Handshake size={17} strokeWidth={1.5} />
              </span>

              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-gold
                "
              >
                Our Network
              </span>
            </div>

            <p
              className="
                max-w-xs
                text-sm
                leading-6
                text-cream/35
              "
            >
              Working together with organizations that share our commitment to
              creating meaningful and lasting change.
            </p>
          </div>

          {/* Right */}
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
              Our
              <br />
              <span className="text-gold">Partners.</span>
            </h2>

            <p
              className="
                mt-8
                max-w-2xl
                text-base
                leading-7
                text-cream/50
                md:text-lg
              "
            >
              Through collaboration with respected organizations and
              institutions, the foundation extends its reach and strengthens its
              work across communities around the world.
            </p>
          </div>
        </div>

        {/* ===================================================
            PARTNERS GRID
        =================================================== */}
        <div
          ref={gridRef}
          className="
            mt-20
            grid
            grid-cols-1
            border-l
            border-t
            border-cream/10
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {partners.map((partner, index) => {
            const isLinked = partner.url && partner.url !== "#";

            return (
              <a
                key={partner.name}
                href={isLinked ? partner.url : undefined}
                target={isLinked ? "_blank" : undefined}
                rel={isLinked ? "noopener noreferrer" : undefined}
                onClick={(event) => {
                  if (!isLinked) {
                    event.preventDefault();
                  }
                }}
                aria-label={
                  isLinked ? `Visit ${partner.name}` : `${partner.name} partner`
                }
                className="
                  group
                  relative
                  flex
                  min-h-[230px]
                  flex-col
                  overflow-hidden
                  border-b
                  border-r
                  border-cream/10
                  bg-black
                  p-7
                  text-cream
                  transition-all
                  duration-500
                  ease-out

                  hover:bg-cream
                  hover:text-black

                  md:p-9
                "
              >
                {/* -------------------------------------------------
                    TOP ROW
                ------------------------------------------------- */}
                <div className="flex items-start justify-between">
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      text-gold
                      transition-colors
                      duration-500
                      group-hover:text-black/40
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-cream/15
                      text-cream
                      transition-all
                      duration-500
                      ease-out

                      group-hover:border-black/20
                      group-hover:text-black
                    "
                  >
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="
                        transition-transform
                        duration-500
                        ease-out
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </span>
                </div>

                {/* -------------------------------------------------
                    LOGO
                ------------------------------------------------- */}
                <div
                  className="
                    mt-7
                    flex
                    h-16
                    w-full
                    max-w-[220px]
                    items-center
                  "
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="
                        max-h-16
                        max-w-full
                        object-contain
                        object-left
                        opacity-70
                        grayscale

                        transition-all
                        duration-500
                        ease-out

                        group-hover:opacity-100
                        group-hover:grayscale-0
                      "
                    />
                  ) : (
                    <PartnerFallback type={partner.fallback} />
                  )}
                </div>

                {/* -------------------------------------------------
                    PARTNER NAME
                ------------------------------------------------- */}
                <div className="mt-auto pt-6">
                  <h3
                    className="
                      max-w-sm
                      text-xl
                      leading-tight
                      tracking-[-0.02em]
                      text-cream/80

                      transition-colors
                      duration-500

                      group-hover:text-black

                      md:text-2xl
                    "
                  >
                    {partner.name}
                  </h3>
                </div>

                {/* -------------------------------------------------
                    HOVER ACCENT
                ------------------------------------------------- */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-black/20

                    transition-all
                    duration-500
                    ease-out

                    group-hover:w-full
                  "
                />
              </a>
            );
          })}
        </div>

        {/* ===================================================
            BOTTOM STATEMENT
        =================================================== */}
        <div
          className="
            mt-12
            flex
            flex-col
            justify-between
            gap-6
            border-t
            border-cream/10
            pt-8
            md:flex-row
            md:items-center
          "
        >
          <p
            className="
              max-w-xl
              text-sm
              leading-6
              text-cream/35
            "
          >
            Partnerships allow ideas, resources, and expertise to come together
            in service of communities and causes.
          </p>

          <span
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-cream/30
            "
          >
            Collaboration · Impact · Change
          </span>
        </div>
      </div>
    </section>
  );
}
