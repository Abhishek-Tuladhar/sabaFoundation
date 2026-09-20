"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Camera,
  Images,
  Play,
  Video,
  X,
} from "lucide-react";

import {
  galleryImages,
  galleryVideos,
} from "@/app/lib/gallery/gallery";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const videoGridRef = useRef(null);
  const imageGridRef = useRef(null);

  const [activeVideo, setActiveVideo] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const videos = gsap.utils.toArray(".gallery-video");
      const images = gsap.utils.toArray(".gallery-image");

      gsap.set(eyebrowRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(headingRef.current, {
        opacity: 0,
        y: 70,
      });

      gsap.set(introRef.current, {
        opacity: 0,
        y: 30,
      });

      gsap.set(videos, {
        opacity: 0,
        y: 80,
      });

      gsap.set(images, {
        opacity: 0,
        y: 60,
      });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      intro
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
        );

      gsap.to(videos, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: videoGridRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.to(images, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: imageGridRef.current,
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-28 text-cream md:px-12 md:py-36 lg:px-20"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.07),transparent_68%)] blur-3xl" />

        <div className="absolute -bottom-64 -left-64 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_70%)] blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.012),transparent_35%,rgba(212,175,55,0.015))]" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-20 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div
              ref={eyebrowRef}
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-gold" />

              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
                Visual Archive
              </span>

              <span className="font-mono text-[10px] text-cream/20">
                01 / STORIES
              </span>
            </div>

            <h2
              ref={headingRef}
              className="max-w-5xl font-display text-5xl leading-[0.94] tracking-tight md:text-7xl lg:text-[90px]"
            >
              Our work,
              <br />
              <span className="text-cream/30">
                in action.
              </span>
            </h2>
          </div>

          <div ref={introRef}>
            <div className="mb-5 flex h-10 w-10 items-center justify-center border border-gold/25 bg-gold/5 text-gold">
              <Images size={17} strokeWidth={1.3} />
            </div>

            <p className="max-w-sm text-sm leading-7 text-cream/40">
              Explore the people, communities, campaigns, and moments behind
              the work of Saba Family Foundation.
            </p>
          </div>
        </div>

        {/* =====================================================
            VIDEOS
        ====================================================== */}

        <div className="mb-8 flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-3">
            <Video
              size={15}
              className="text-gold"
              strokeWidth={1.3}
            />

            <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40">
              Films & Stories
            </span>
          </div>

          <span className="font-mono text-[10px] text-cream/20">
            {String(galleryVideos.length).padStart(2, "0")} FILMS
          </span>
        </div>

        <div
          ref={videoGridRef}
          className="grid gap-5 lg:grid-cols-12"
        >
          {galleryVideos.map((video, index) => {
            const isFeatured = index === 0;
            const isActive = activeVideo === video.id;

            return (
              <article
                key={`${video.id}-${index}`}
                className={`gallery-video group relative overflow-hidden border border-white/10 bg-[#080808] ${
                  isFeatured
                    ? "lg:col-span-7 lg:row-span-2"
                    : "lg:col-span-5"
                }`}
              >
                <div
                  className={`relative ${
                    isFeatured
                      ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[650px]"
                      : "aspect-video"
                  }`}
                >
                  {isActive ? (
                    <>
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                        title={video.title}
                        loading="eager"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />

                      <button
                        type="button"
                        onClick={() => setActiveVideo(null)}
                        aria-label="Close video"
                        className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/70 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black"
                      >
                        <X size={16} strokeWidth={1.3} />
                      </button>
                    </>
                  ) : (
                    <>
                      {/* YouTube thumbnail */}
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-90"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.94)_100%)]" />

                      {/* Gold glow */}
                      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] opacity-50 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />

                      {/* Number */}
                      <div className="absolute left-6 top-6 flex items-center gap-3 md:left-8 md:top-8">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-cream/45">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="h-px w-8 bg-cream/20" />

                        <span className="text-[9px] uppercase tracking-[0.2em] text-cream/35">
                          Film
                        </span>
                      </div>

                      {/* Play */}
                      <button
                        type="button"
                        aria-label={`Play ${video.title}`}
                        onClick={() => setActiveVideo(video.id)}
                        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-black/35 text-cream backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-gold hover:bg-gold hover:text-black md:h-20 md:w-20"
                      >
                        <Play
                          size={22}
                          fill="currentColor"
                          strokeWidth={1}
                          className="ml-1"
                        />
                      </button>

                      {/* Video content */}
                      <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                        <div className="mb-5 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />

                        <div className="flex items-end justify-between gap-6">
                          <h3
                            className={`font-display leading-tight text-cream ${
                              isFeatured
                                ? "text-3xl md:text-5xl"
                                : "text-2xl md:text-3xl"
                            }`}
                          >
                            {video.title}
                          </h3>

                          <div className="hidden h-10 w-10 shrink-0 items-center justify-center border border-cream/20 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black sm:flex">
                            <ArrowUpRight
                              size={16}
                              strokeWidth={1.2}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Hover border */}
                <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-gold/30" />

                {/* Bottom gold line */}
                <div className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>

        {/* =====================================================
            PHOTOS
        ====================================================== */}

        <div className="mb-8 mt-28 flex items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center gap-3">
            <Camera
              size={15}
              className="text-gold"
              strokeWidth={1.3}
            />

            <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40">
              Moments
            </span>
          </div>

          <span className="font-mono text-[10px] text-cream/20">
            {String(galleryImages.length).padStart(2, "0")} IMAGES
          </span>
        </div>

        <div
          ref={imageGridRef}
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
        >
          {galleryImages.map((image, index) => {
            const featured =
              index === 0 ||
              index === 5 ||
              index === 10;

            return (
              <figure
                key={image.src}
                className={`gallery-image group relative overflow-hidden bg-[#080808] ${
                  featured
                    ? "col-span-2 aspect-[16/10] md:col-span-2 md:aspect-[16/9]"
                    : "aspect-square"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-black/10 transition-colors duration-700 group-hover:bg-black/30" />

                {/* Gold glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15),transparent_70%)] opacity-0 blur-2xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />

                {/* Image number */}
                <div className="absolute left-4 top-4 flex items-center gap-2 md:left-5 md:top-5">
                  <span className="font-mono text-[9px] tracking-widest text-white/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="h-px w-5 bg-white/25" />
                </div>

                {/* Hover icon */}
                <div className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-3 items-center justify-center border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-5 md:right-5">
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.2}
                  />
                </div>

                {/* Caption */}
                <figcaption className="absolute bottom-4 left-4 max-w-[75%] translate-y-3 text-[9px] uppercase tracking-[0.15em] text-white/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-5 md:left-5">
                  {image.alt}
                </figcaption>

                {/* Border */}
                <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-gold/40" />
              </figure>
            );
          })}
        </div>

        {/* =====================================================
            CTA
        ====================================================== */}

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-gold">
              Continue exploring
            </p>

            <p className="max-w-lg text-sm leading-6 text-cream/35">
              Discover more stories, photographs, and moments from our work
              around the world.
            </p>
          </div>

          <a
            href="/gallery"
            className="group inline-flex w-fit items-center gap-4 border border-cream/20 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-cream transition-all duration-500 hover:border-gold hover:bg-gold hover:text-black"
          >
            <span>View Full Gallery</span>

            <ArrowUpRight
              size={15}
              strokeWidth={1.2}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}