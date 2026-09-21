"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  UserRound,
} from "lucide-react";

import { getTestimonials } from "@/lib/api/testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const featuredRef = useRef(null);

  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*
   * =========================================================
   * FETCH TESTIMONIALS
   * =========================================================
   */

  useEffect(() => {
    let cancelled = false;

    async function fetchTestimonials() {
      try {
        setLoading(true);
        setError(null);

        const data = await getTestimonials();

        if (!cancelled) {
          setTestimonials(data);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error("Testimonials API error:", error);

        if (!cancelled) {
          setError("Unable to load testimonials.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchTestimonials();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * =========================================================
   * ACTIVE TESTIMONIAL
   * =========================================================
   */

  const activeTestimonial = testimonials[activeIndex];

  /*
   * =========================================================
   * NAVIGATION
   * =========================================================
   */

  const goToNext = () => {
    if (!testimonials.length) return;

    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );
  };

  const goToPrevious = () => {
    if (!testimonials.length) return;

    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };

  /*
   * =========================================================
   * KEYBOARD NAVIGATION
   * =========================================================
   */

  useEffect(() => {
    function handleKeyDown(event) {
      if (!testimonials.length) return;

      if (event.key === "ArrowRight") {
        goToNext();
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [testimonials.length]);

  /*
   * =========================================================
   * SECTION INTRO ANIMATION
   * =========================================================
   */

  useLayoutEffect(() => {
    if (loading || !testimonials.length) return;

    const ctx = gsap.context(() => {
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

      gsap.set(featuredRef.current, {
        opacity: 0,
        y: 60,
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
          "-=0.35",
        )
        .to(
          introRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .to(
          featuredRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.35",
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [loading, testimonials.length]);

  /*
   * =========================================================
   * TESTIMONIAL TRANSITION
   * =========================================================
   */

  useEffect(() => {
    if (!activeTestimonial || !featuredRef.current) return;

    const content = featuredRef.current.querySelector(
      ".testimonial-content",
    );

    if (!content) return;

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 18,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      },
    );
  }, [activeIndex, activeTestimonial]);

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-black
        px-6
        py-28
        text-cream
        md:px-12
        md:py-36
        lg:px-20
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Left gold glow */}
        <div
          className="
            absolute
            -left-48
            top-1/4
            h-[650px]
            w-[650px]
            rounded-full
            bg-[radial-gradient(circle,rgba(212,175,55,0.055),transparent_70%)]
            blur-3xl
          "
        />

        {/* Right white glow */}
        <div
          className="
            absolute
            -right-48
            bottom-0
            h-[550px]
            w-[550px]
            rounded-full
            bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_70%)]
            blur-3xl
          "
        />

        {/* Center glow */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[450px]
            w-[450px]
            -translate-x-1/2
            rounded-full
            bg-[radial-gradient(circle,rgba(212,175,55,0.02),transparent_70%)]
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            mb-16
            grid
            gap-10
            lg:grid-cols-[1fr_360px]
            lg:items-end
          "
        >
          {/* Heading */}
          <div>
            <div
              ref={eyebrowRef}
              className="
                mb-7
                flex
                items-center
                gap-4
              "
            >
              <span className="h-px w-12 bg-gold" />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-gold
                "
              >
                Voices
              </span>

              <span
                className="
                  font-mono
                  text-[10px]
                  text-cream/20
                "
              >
                COMMUNITY STORIES
              </span>
            </div>

            <h2
              ref={headingRef}
              className="
                max-w-5xl
                font-display
                text-5xl
                leading-[0.94]
                tracking-tight
                md:text-7xl
                lg:text-[90px]
              "
            >
              Stories from
              <br />
              <span className="text-cream/30">
                the people we serve.
              </span>
            </h2>
          </div>

          {/* Introduction */}
          <div ref={introRef}>
            <div
              className="
                mb-5
                flex
                h-10
                w-10
                items-center
                justify-center
                border
                border-gold/25
                bg-gold/5
                text-gold
              "
            >
              <Quote
                size={17}
                strokeWidth={1.3}
              />
            </div>

            <p
              className="
                max-w-sm
                text-sm
                leading-7
                text-cream/40
              "
            >
              Hear directly from the people, partners, and
              communities whose lives have been touched by the
              Foundation&apos;s work.
            </p>
          </div>
        </div>

        {/* =====================================================
            LOADING STATE
        ===================================================== */}

        {loading && (
          <div
            className="
              relative
              h-[500px]
              overflow-hidden
              border
              border-white/10
              bg-[#080808]
              md:h-[540px]
            "
          >
            {/* Shimmer */}
            <div
              className="
                absolute
                inset-0
                -translate-x-full
                animate-[shimmer_1.8s_infinite]
                bg-gradient-to-r
                from-transparent
                via-white/[0.025]
                to-transparent
              "
            />

            <div
              className="
                relative
                flex
                h-full
                flex-col
                justify-between
                p-7
                md:p-10
                lg:p-14
              "
            >
              {/* Top */}
              <div className="flex justify-between">
                <div className="h-3 w-20 animate-pulse bg-white/5" />

                <div className="h-3 w-12 animate-pulse bg-white/5" />
              </div>

              {/* Quote */}
              <div className="max-w-4xl space-y-4">
                <div className="h-10 w-[95%] animate-pulse bg-white/5 md:h-14" />
                <div className="h-10 w-[85%] animate-pulse bg-white/5 md:h-14" />
                <div className="h-10 w-[60%] animate-pulse bg-white/5 md:h-14" />
              </div>

              {/* Bottom */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="h-12 w-12 animate-pulse rounded-full bg-white/5" />

                <div className="space-y-2">
                  <div className="h-3 w-28 animate-pulse bg-white/5" />
                  <div className="h-2 w-20 animate-pulse bg-white/5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            ERROR STATE
        ===================================================== */}

        {!loading && error && (
          <div
            className="
              flex
              min-h-[420px]
              flex-col
              items-center
              justify-center
              border
              border-white/10
              bg-[#080808]
              px-6
              text-center
            "
          >
            <div
              className="
                mb-5
                flex
                h-12
                w-12
                items-center
                justify-center
                border
                border-gold/20
                bg-gold/5
                text-gold
              "
            >
              <Quote
                size={18}
                strokeWidth={1.3}
              />
            </div>

            <p className="mb-2 text-sm text-cream/70">
              We couldn&apos;t load the stories.
            </p>

            <p
              className="
                max-w-sm
                text-xs
                leading-6
                text-cream/30
              "
            >
              There was a problem connecting to the
              Foundation&apos;s testimonial service.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-7
                border
                border-white/10
                px-5
                py-3
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-cream/60
                transition-all
                duration-300
                hover:border-gold/40
                hover:bg-gold
                hover:text-black
              "
            >
              Try again
            </button>
          </div>
        )}

        {/* =====================================================
            FEATURED TESTIMONIAL
        ===================================================== */}

        {!loading &&
          !error &&
          testimonials.length > 0 &&
          activeTestimonial && (
            <div ref={featuredRef}>
              {/* Top metadata */}
              <div
                className="
                  mb-5
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/10
                  pt-5
                "
              >
                <div className="flex items-center gap-3">
                  <UserRound
                    size={15}
                    className="text-gold"
                    strokeWidth={1.3}
                  />

                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      text-cream/40
                    "
                  >
                    Voices from the community
                  </span>
                </div>

                <span
                  className="
                    font-mono
                    text-[10px]
                    text-cream/25
                  "
                >
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              {/* Main testimonial */}
              <article
                className="
                  group
                  relative
                  min-h-[500px]
                  overflow-hidden
                  border
                  border-white/10
                  bg-[#080808]
                  transition-colors
                  duration-500
                  hover:border-gold/20
                  md:min-h-[540px]
                "
              >
                {/* Gold glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-40
                    -top-40
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[radial-gradient(circle,rgba(212,175,55,0.10),transparent_70%)]
                    opacity-60
                    blur-3xl
                    transition-transform
                    duration-1000
                    group-hover:scale-110
                  "
                />

                {/* Secondary glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-48
                    -left-32
                    h-[400px]
                    w-[400px]
                    rounded-full
                    bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_70%)]
                    blur-3xl
                  "
                />

                {/* Large decorative quote */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    right-8
                    top-0
                    font-display
                    text-[180px]
                    leading-none
                    text-gold/[0.055]
                    transition-all
                    duration-700
                    group-hover:text-gold/[0.08]
                    md:right-14
                    md:text-[240px]
                  "
                >
                  &quot;
                </div>

                {/* Content */}
                <div
                  key={activeTestimonial.id}
                  className="
                    testimonial-content
                    relative
                    flex
                    min-h-[500px]
                    flex-col
                    justify-between
                    p-7
                    md:min-h-[540px]
                    md:p-10
                    lg:p-14
                  "
                >
                  {/* Card top */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          font-mono
                          text-[9px]
                          tracking-[0.2em]
                          text-cream/20
                        "
                      >
                        {String(activeIndex + 1).padStart(2, "0")}
                      </span>

                      <span className="h-px w-10 bg-gold/50" />

                      <span
                        className="
                          text-[9px]
                          uppercase
                          tracking-[0.2em]
                          text-cream/25
                        "
                      >
                        Community voice
                      </span>
                    </div>

                    <Quote
                      size={19}
                      strokeWidth={1.1}
                      className="
                        text-gold/50
                        transition-colors
                        duration-500
                        group-hover:text-gold
                      "
                    />
                  </div>

                  {/* Quote */}
                  <div className="max-w-5xl py-14 md:py-16">
                    <p
                      className="
                        font-display
                        text-3xl
                        leading-[1.12]
                        tracking-tight
                        text-cream/90
                        md:text-5xl
                        lg:text-[58px]
                      "
                    >
                      &quot;{activeTestimonial.quote}&quot;
                    </p>
                  </div>

                  {/* Author */}
                  <div
                    className="
                      flex
                      flex-col
                      gap-6
                      border-t
                      border-white/10
                      pt-6
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <div
                        className="
                          relative
                          h-12
                          w-12
                          shrink-0
                          overflow-hidden
                          rounded-full
                          border
                          border-white/10
                          bg-white/5
                        "
                      >
                        {activeTestimonial.image ? (
                          <img
                            src={activeTestimonial.image}
                            alt=""
                            loading="lazy"
                            className="
                              h-full
                              w-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-110
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                              text-gold
                            "
                          >
                            <UserRound
                              size={17}
                              strokeWidth={1.2}
                            />
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <div>
                        <p className="text-sm text-cream/80">
                          {activeTestimonial.name}
                        </p>

                        <p
                          className="
                            mt-1
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-cream/25
                          "
                        >
                          Community voice
                        </p>
                      </div>
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={goToPrevious}
                        aria-label="Previous testimonial"
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          border
                          border-white/10
                          text-cream/40
                          transition-all
                          duration-300
                          hover:border-gold/40
                          hover:bg-gold
                          hover:text-black
                          focus:outline-none
                          focus:ring-1
                          focus:ring-gold/50
                        "
                      >
                        <ArrowLeft
                          size={16}
                          strokeWidth={1.3}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={goToNext}
                        aria-label="Next testimonial"
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          border
                          border-white/10
                          text-cream/40
                          transition-all
                          duration-300
                          hover:border-gold/40
                          hover:bg-gold
                          hover:text-black
                          focus:outline-none
                          focus:ring-1
                          focus:ring-gold/50
                        "
                      >
                        <ArrowRight
                          size={16}
                          strokeWidth={1.3}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Gold bottom line */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-full
                    origin-left
                    bg-gold
                    transition-transform
                    duration-700
                  "
                />
              </article>

              {/* =================================================
                  TESTIMONIAL NAVIGATION
              ================================================= */}

              <div
                className="
                  mt-6
                  flex
                  flex-col
                  gap-6
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >
                {/* Progress */}
                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2
                    overflow-x-auto
                    pb-1
                  "
                  role="tablist"
                  aria-label="Testimonials"
                >
                  {testimonials.map((testimonial, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        key={testimonial.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Show testimonial ${index + 1}`}
                        onClick={() => goToTestimonial(index)}
                        className="
                          group
                          flex
                          shrink-0
                          items-center
                          gap-2
                          py-2
                          focus:outline-none
                          focus:ring-1
                          focus:ring-gold/50
                        "
                      >
                        <span
                          className={`
                            font-mono
                            text-[9px]
                            tracking-[0.15em]
                            transition-colors
                            duration-300
                            ${
                              isActive
                                ? "text-gold"
                                : "text-cream/20 group-hover:text-cream/50"
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`
                            block
                            h-px
                            transition-all
                            duration-500
                            ${
                              isActive
                                ? "w-12 bg-gold"
                                : "w-5 bg-white/10 group-hover:w-8 group-hover:bg-white/30"
                            }
                          `}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Keyboard hint */}
                <div
                  className="
                    hidden
                    items-center
                    gap-3
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-cream/20
                    lg:flex
                  "
                >
                  <span>Use</span>

                  <span className="border border-white/10 px-2 py-1">
                    ←
                  </span>

                  <span className="border border-white/10 px-2 py-1">
                    →
                  </span>

                  <span>to navigate</span>
                </div>
              </div>
            </div>
          )}

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {!loading &&
          !error &&
          testimonials.length === 0 && (
            <div
              className="
                flex
                min-h-[420px]
                flex-col
                items-center
                justify-center
                border
                border-white/10
                bg-[#080808]
                px-6
                text-center
              "
            >
              <div
                className="
                  mb-5
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  border
                  border-white/10
                  text-cream/30
                "
              >
                <Quote
                  size={18}
                  strokeWidth={1.3}
                />
              </div>

              <p className="text-sm text-cream/40">
                No testimonials are available at the moment.
              </p>
            </div>
          )}
      </div>
    </section>
  );
}