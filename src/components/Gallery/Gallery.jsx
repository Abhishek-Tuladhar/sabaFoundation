"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowUpRight,
  Camera,
  Images,
  Play,
  RefreshCw,
  Video,
  X,
} from "lucide-react";

import { getGalleryImages, getGalleryVideos } from "@/lib/api/gallery";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const videoGridRef = useRef(null);
  const imageGridRef = useRef(null);
  const archiveRef = useRef(null);

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryVideos, setGalleryVideos] = useState([]);

  const [activeVideo, setActiveVideo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  /*
   * =========================================================
   * FETCH GALLERY
   * =========================================================
   */

  useEffect(() => {
    let cancelled = false;

    async function loadGallery() {
      try {
        setLoading(true);
        setError(null);

        const [images, videos] = await Promise.all([
          getGalleryImages(),
          getGalleryVideos(),
        ]);

        if (cancelled) return;

        setGalleryImages(images);
        setGalleryVideos(videos);
      } catch (err) {
        console.error("Failed to load gallery:", err);

        if (!cancelled) {
          setError("Unable to load the gallery.");
          setGalleryImages([]);
          setGalleryVideos([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadGallery();

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  /*
   * =========================================================
   * GSAP ENTRANCE ANIMATIONS
   * =========================================================
   */

  useLayoutEffect(() => {
    if (loading || (!galleryImages.length && !galleryVideos.length)) {
      return;
    }

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
        );

      if (videos.length) {
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
      }

      if (images.length) {
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
      }

      /*
       * Archive footer animation
       */

      if (archiveRef.current) {
        gsap.fromTo(
          archiveRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: archiveRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, galleryImages.length, galleryVideos.length]);

  /*
   * =========================================================
   * VIDEO MODAL
   * =========================================================
   */

  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeVideo]);

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-black px-6 py-28 text-cream md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mb-7 h-px w-12 bg-gold/30" />

            <div className="h-16 max-w-3xl bg-white/5 md:h-24" />

            <div className="mt-4 h-16 max-w-2xl bg-white/5 md:h-24" />

            <div className="mt-10 h-4 max-w-md bg-white/5" />
            <div className="mt-3 h-4 max-w-sm bg-white/5" />
          </div>
        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * ERROR
   * =========================================================
   */

  if (error) {
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black px-6 text-cream">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_70%)] blur-3xl" />

        <div className="relative z-10 max-w-md text-center">
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center border border-gold/20 bg-gold/5 text-gold">
            <Images size={21} strokeWidth={1.2} />
          </div>

          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold">
            Visual Archive
          </p>

          <h2 className="mb-6 font-display text-4xl tracking-tight md:text-5xl">
            The archive is temporarily unavailable.
          </h2>

          <p className="mb-8 text-sm leading-7 text-cream/40">
            We couldn&apos;t load the latest photographs and films. Please try
            again.
          </p>

          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="group inline-flex items-center gap-3 border border-cream/15 px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black"
          >
            <RefreshCw
              size={15}
              className="transition-transform duration-500 group-hover:rotate-180"
            />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  /*
   * =========================================================
   * MAIN
   * =========================================================
   */

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="relative overflow-hidden bg-black px-6 py-28 text-cream md:px-12 md:py-36 lg:px-20"
      >
        {/* =====================================================
            BACKGROUND
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0">
          {/* Main gold glow */}
          <div className="absolute left-1/2 top-0 h-[700px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.07),transparent_68%)] blur-3xl" />

          {/* Bottom glow */}
          <div className="absolute -bottom-64 -left-64 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.025),transparent_70%)] blur-3xl" />

          {/* Right glow */}
          <div className="absolute right-[-15%] top-[35%] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.035),transparent_70%)] blur-3xl" />

          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.012),transparent_35%,rgba(212,175,55,0.015))]" />

          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 0.5px, transparent 0.5px)",
              backgroundSize: "12px 12px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* =====================================================
              HEADER
          ====================================================== */}

          <div className="mb-20 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div
                ref={eyebrowRef}
                className="mb-7 flex flex-wrap items-center gap-4"
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
                <span className="text-cream/30">in action.</span>
              </h2>
            </div>

            <div ref={introRef}>
              <div className="mb-5 flex h-11 w-11 items-center justify-center border border-gold/25 bg-gold/5 text-gold">
                <Images size={18} strokeWidth={1.3} />
              </div>

              <p className="max-w-sm text-sm leading-7 text-cream/40">
                Explore the people, communities, campaigns, and moments behind
                the work of Saba Family Foundation.
              </p>
            </div>
          </div>

          {/* =====================================================
              VIDEO HEADER
          ====================================================== */}

          {galleryVideos.length > 0 && (
            <>
              <div className="mb-8 flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <Video size={15} className="text-gold" strokeWidth={1.3} />

                  <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40">
                    Films & Stories
                  </span>
                </div>

                <span className="font-mono text-[10px] text-cream/20">
                  {String(galleryVideos.length).padStart(2, "0")} FILMS
                </span>
              </div>

              {/* =====================================================
                  VIDEOS
              ====================================================== */}

              <div ref={videoGridRef} className="grid gap-5 lg:grid-cols-12">
                {galleryVideos.map((video, index) => {
                  const isFeatured = index === 0;
                  const isActive = activeVideo?.id === video.id;

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
                              src={`${video.link}${
                                video.link.includes("?") ? "&" : "?"
                              }autoplay=1&rel=0`}
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
                            {/* Thumbnail */}
                            {video.youtubeId ? (
                              <img
                                src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-90"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-[#111]" />
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.94)_100%)]" />

                            {/* Gold glow */}
                            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.16),transparent_70%)] opacity-50 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />

                            {/* Film number */}
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
                              onClick={() => setActiveVideo(video)}
                              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/30 bg-black/35 text-cream backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-gold hover:bg-gold hover:text-black md:h-20 md:w-20"
                            >
                              <Play
                                size={22}
                                fill="currentColor"
                                strokeWidth={1}
                                className="ml-1"
                              />
                            </button>

                            {/* Video information */}
                            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                              <div className="mb-5 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />

                              <div className="flex items-end justify-between gap-6">
                                <h3
                                  className={`max-w-2xl font-display leading-tight text-cream ${
                                    isFeatured
                                      ? "text-3xl md:text-5xl"
                                      : "text-2xl md:text-3xl"
                                  }`}
                                >
                                  {video.title}
                                </h3>

                                <div className="hidden h-10 w-10 shrink-0 items-center justify-center border border-cream/20 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black sm:flex">
                                  <ArrowUpRight size={16} strokeWidth={1.2} />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Hover border */}
                      <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-gold/30" />

                      {/* Gold bottom line */}
                      <div className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
                    </article>
                  );
                })}
              </div>
            </>
          )}

          {/* =====================================================
              PHOTO HEADER
          ====================================================== */}

          {galleryImages.length > 0 && (
            <>
              <div className="mb-8 mt-28 flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <Camera size={15} className="text-gold" strokeWidth={1.3} />

                  <span className="text-[10px] uppercase tracking-[0.25em] text-cream/40">
                    Moments 2 MOMENTS
                  </span>
                </div>

                <span className="font-mono text-[10px] text-cream/20">
                  {String(galleryImages.length).padStart(2, "0")} IMAGES
                </span>
              </div>

              {/* =====================================================
                  PHOTOS
              ====================================================== */}

              <div
                ref={imageGridRef}
                className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
              >
                {galleryImages.map((image, index) => {
                  const featured = index === 0 || index === 5 || index === 10;

                  return (
                    <figure
                      key={image.id}
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

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/10 transition-colors duration-700 group-hover:bg-black/30" />

                      {/* Gold glow */}
                      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15),transparent_70%)] opacity-0 blur-2xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />

                      {/* Number */}
                      <div className="absolute left-4 top-4 flex items-center gap-2 md:left-5 md:top-5">
                        <span className="font-mono text-[9px] tracking-widest text-white/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="h-px w-5 bg-white/25" />
                      </div>

                      {/* Hover action */}
                      <div className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-3 items-center justify-center border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:bottom-5 md:right-5">
                        <ArrowUpRight size={14} strokeWidth={1.2} />
                      </div>

                      {/* Border */}
                      <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-gold/40" />
                    </figure>
                  );
                })}
              </div>
            </>
          )}

          {/* =====================================================
              EMPTY STATE
          ====================================================== */}

          {!galleryImages.length && !galleryVideos.length && (
            <div className="flex min-h-[300px] items-center justify-center border border-white/10">
              <div className="text-center">
                <Images
                  size={28}
                  className="mx-auto mb-5 text-gold/60"
                  strokeWidth={1.2}
                />

                <p className="text-sm text-cream/40">
                  No gallery content is available at the moment.
                </p>
              </div>
            </div>
          )}

          {/* =====================================================
              FOOTER
          ====================================================== */}

          <div
            ref={archiveRef}
            className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-gold">
                Visual archive
              </p>

              <p className="max-w-lg text-sm leading-6 text-cream/35">
                Stories from the people, communities, and initiatives that shape
                the work of Saba Family Foundation.
              </p>
            </div>

            <div className="flex items-center gap-5 text-cream/25">
              <div className="flex items-center gap-2">
                <Video size={13} />
                <span className="font-mono text-[10px]">
                  {galleryVideos.length}
                </span>
              </div>

              <span className="h-3 w-px bg-white/10" />

              <div className="flex items-center gap-2">
                <Camera size={13} />
                <span className="font-mono text-[10px]">
                  {galleryImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VIDEO MODAL
      ========================================================== */}

      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveVideo(null);
            }
          }}
        >
          <div className="relative w-full max-w-6xl">
            {/* Close */}
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute -right-1 -top-14 z-20 flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black md:-right-12 md:top-0"
            >
              <X size={17} strokeWidth={1.2} />
            </button>

            {/* Video */}
            <div className="relative aspect-video overflow-hidden border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`${activeVideo.link}${
                  activeVideo.link.includes("?") ? "&" : "?"
                }autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video title */}
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-gold">
                  Film
                </p>

                <h3 className="font-display text-2xl text-cream md:text-3xl">
                  {activeVideo.title}
                </h3>
              </div>

              <ArrowDownRight
                size={24}
                className="hidden shrink-0 text-gold/50 md:block"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
