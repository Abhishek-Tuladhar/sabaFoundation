"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, RefreshCw } from "lucide-react";

import BlogHero from "@/components/Blogs/BlogHero";
import BlogCard from "@/components/Blogs/BlogCard";
import BlogModal from "@/components/Blogs/BlogModal";
import { getBlogs } from "@/lib/api/blogs";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadBlogs() {
    try {
      setLoading(true);
      setError(false);

      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to load blogs:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlogs();
  }, []);

  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <main className="overflow-hidden bg-black text-cream">
      <BlogHero />

      {/* =========================================================
          INTRO
      ========================================================== */}
      <section className="relative border-t border-white/10 bg-black px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-gold" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  The Journal
                </span>
              </div>

              <h1 className="max-w-5xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] md:text-7xl lg:text-[7rem]">
                Stories that
                <br />
                <span className="text-cream/35">move the work forward.</span>
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-md text-base leading-7 text-cream/45 md:text-lg">
                Explore stories, conversations, initiatives and perspectives
                from the Saba Family Foundation and the communities it serves.
              </p>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("stories")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-cream/60 transition-colors hover:text-gold"
              >
                Explore stories
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                  <ArrowDown
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STORIES
      ========================================================== */}
      <section
        id="stories"
        className="relative bg-[#080808] px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
      >
        <div className="mx-auto max-w-[1500px]">
          {/* Section heading */}
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-white/10 pb-7 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  Latest stories
                </span>

                {!loading && blogs.length > 0 && (
                  <span className="text-[10px] text-cream/25">
                    / {String(blogs.length).padStart(2, "0")}
                  </span>
                )}
              </div>

              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] md:text-5xl">
                From the Foundation.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-cream/35">
              A closer look at the ideas, people and initiatives shaping our
              work around the world.
            </p>
          </div>

          {/* =====================================================
              LOADING
          ====================================================== */}
          {loading && (
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="animate-pulse">
                <div className="aspect-[16/10] bg-white/[0.045]" />

                <div className="mt-6 h-3 w-32 bg-white/[0.045]" />

                <div className="mt-5 h-10 w-[85%] bg-white/[0.045]" />

                <div className="mt-3 h-5 w-[65%] bg-white/[0.045]" />
              </div>

              <div className="space-y-8">
                {[1, 2].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="aspect-[4/3] bg-white/[0.045]" />

                    <div className="mt-5 h-3 w-24 bg-white/[0.045]" />

                    <div className="mt-4 h-7 w-full bg-white/[0.045]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================
              ERROR
          ====================================================== */}
          {!loading && error && (
            <div className="relative overflow-hidden border border-white/10 bg-[#0d0d0d] px-6 py-24 text-center md:py-32">
              <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gold" />

              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Something went wrong
              </p>

              <h3 className="mt-5 text-3xl font-medium tracking-[-0.03em] text-cream">
                The stories could not be loaded.
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-cream/35">
                Please try again. If the problem continues, the foundation
                journal may temporarily be unavailable.
              </p>

              <button
                type="button"
                onClick={loadBlogs}
                className="group mt-8 inline-flex items-center gap-3 border border-white/15 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black"
              >
                <RefreshCw
                  size={14}
                  className="transition-transform duration-500 group-hover:rotate-180"
                />
                Try again
              </button>
            </div>
          )}

          {/* =====================================================
              EMPTY
          ====================================================== */}
          {!loading && !error && blogs.length === 0 && (
            <div className="border border-white/10 py-28 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Foundation Journal
              </p>

              <h3 className="mt-5 text-3xl font-medium tracking-[-0.03em]">
                No stories available.
              </h3>
            </div>
          )}

          {/* =====================================================
              BLOGS
          ====================================================== */}
          {!loading && !error && featuredBlog && (
            <>
              {/* Featured story */}
              <div className="mb-20">
                <BlogCard
                  blog={featuredBlog}
                  featured
                  onOpen={setSelectedBlog}
                />
              </div>

              {/* Remaining stories */}
              {remainingBlogs.length > 0 && (
                <div>
                  <div className="mb-10 flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-cream/30">
                      More stories
                    </span>

                    <span className="h-px flex-1 bg-white/10" />
                  </div>

                  <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                    {remainingBlogs.map((blog) => (
                      <BlogCard
                        key={blog.id}
                        blog={blog}
                        onOpen={setSelectedBlog}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* =========================================================
          CLOSING STATEMENT
      ========================================================== */}
      {!loading && !error && blogs.length > 0 && (
        <section className="relative overflow-hidden bg-[#F0E9DA] px-6 py-24 text-black md:px-12 md:py-32 lg:px-20 lg:py-40">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#D4AF37]/20 blur-[120px]" />

          <div className="relative mx-auto max-w-[1500px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                  Keep reading
                </p>

                <h2 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl">
                  Change begins with
                  <br />
                  <span className="text-black/35">a story worth sharing.</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="group flex h-16 w-16 items-center justify-center rounded-full border border-black/20 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                aria-label="Back to top"
              >
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          BLOG MODAL
      ========================================================== */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </main>
  );
}
