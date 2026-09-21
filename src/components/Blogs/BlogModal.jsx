"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ArrowUpRight, X } from "lucide-react";

import { getBlog } from "@/lib/api/blogs";

export default function BlogModal({ blog, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  const [article, setArticle] = useState(blog);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadArticle() {
      try {
        setLoading(true);
        setError(false);

        const data = await getBlog(blog.slug);

        if (!cancelled) {
          setArticle(data || blog);
        }
      } catch (err) {
        console.error("Failed to load blog:", err);

        if (!cancelled) {
          setError(true);
          setArticle(blog);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      cancelled = true;
    };
  }, [blog]);

  useEffect(() => {
    if (!mounted) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [mounted]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
      );

      gsap.fromTo(
        modalRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
        },
      );
    });

    return () => ctx.revert();
  }, [mounted]);

  function handleBackdropClick(event) {
    if (event.target === overlayRef.current) {
      onClose();
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md md:p-6 lg:p-10"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
        className="relative flex h-full max-h-[94vh] w-full max-w-[1400px] flex-col overflow-hidden bg-[#0a0a0a] text-white shadow-2xl"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close article"
          className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black md:right-6 md:top-6"
        >
          <X size={18} strokeWidth={1.8} />
        </button>

        {/* Scrollable Modal Content */}
        <div
          ref={contentRef}
          data-lenis-prevent
          className="h-full overflow-y-auto overscroll-contain bg-[#0a0a0a]"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Hero */}
          <section className="relative aspect-[16/9] w-full overflow-hidden bg-[#111] md:aspect-[16/8]">
            {article?.image ? (
              <Image
                src={article.image}
                alt={article.title || "Saba Family Foundation article"}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-[#111]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0">
              <div className="px-6 pb-8 md:px-10 md:pb-10 lg:px-14 lg:pb-14">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">
                  Foundation Journal
                </p>

                <h1
                  id="blog-modal-title"
                  className="max-w-5xl text-3xl font-medium leading-[0.95] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl"
                >
                  {article?.title}
                </h1>
              </div>
            </div>
          </section>

          {/* Article */}
          <section className="bg-[#0a0a0a] px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20">
            <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[180px_1fr] lg:gap-20">
              {/* Sidebar */}
              <aside>
                <div className="border-t border-white/10 pt-4 lg:sticky lg:top-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                    Article
                  </p>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    Saba Family Foundation
                  </p>

                  <div className="mt-6 h-px w-8 bg-[#D4AF37]" />
                </div>
              </aside>

              {/* Content */}
              <div className="min-w-0">
                {loading && (
                  <div className="space-y-5">
                    <div className="h-4 w-full animate-pulse bg-white/[0.06]" />
                    <div className="h-4 w-[94%] animate-pulse bg-white/[0.06]" />
                    <div className="h-4 w-[88%] animate-pulse bg-white/[0.06]" />

                    <div className="mt-10 h-8 w-[65%] animate-pulse bg-white/[0.06]" />

                    <div className="mt-5 h-4 w-full animate-pulse bg-white/[0.06]" />
                    <div className="h-4 w-[92%] animate-pulse bg-white/[0.06]" />
                    <div className="h-4 w-[82%] animate-pulse bg-white/[0.06]" />
                  </div>
                )}

                {!loading && error && (
                  <div className="border border-white/10 bg-white/[0.02] p-8">
                    <p className="text-sm leading-7 text-white/60">
                      Unable to load the complete article. Please try again.
                    </p>

                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#D4AF37] transition-colors hover:text-white"
                    >
                      Try again
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                )}

                {!loading && !error && article && (
                  <div className="text-white">
                    <article
                      className="
          prose
          prose-invert
          max-w-none
          !text-white
          text-justify

          prose-p:!text-white/70
          prose-p:text-base
          prose-p:leading-8
          prose-p:text-justify
          md:prose-p:text-lg
          md:prose-p:leading-8

          prose-h1:!text-white
          prose-h2:!text-white
          prose-h3:!text-white
          prose-h4:!text-white

          prose-h2:mt-14
          prose-h2:mb-5
          prose-h2:text-3xl
          prose-h2:font-medium
          prose-h2:leading-tight
          prose-h2:tracking-[-0.03em]
          md:prose-h2:text-4xl

          prose-h3:mt-12
          prose-h3:mb-4
          prose-h3:text-xl
          prose-h3:font-medium
          prose-h3:leading-tight
          md:prose-h3:text-2xl

          prose-strong:!text-white
          prose-em:!text-white/80

          prose-ul:!text-white/70
          prose-ol:!text-white/70
          prose-li:!text-white/70

          prose-a:!text-[#D4AF37]
          prose-a:no-underline
          hover:prose-a:underline

          prose-blockquote:!text-white/60
          prose-blockquote:border-[#D4AF37]
        "
                      dangerouslySetInnerHTML={{
                        __html: article.description || "",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 bg-[#080808] px-6 py-8 md:px-12 lg:px-20">
            <div className="mx-auto flex max-w-[1100px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/25">
                Saba Family Foundation
              </span>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-3 self-start text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#D4AF37] md:self-auto"
              >
                Close article
                <X size={14} />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>,
    document.body,
  );
}
