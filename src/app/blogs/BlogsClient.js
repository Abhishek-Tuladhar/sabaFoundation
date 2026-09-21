"use client";

import { useEffect, useState } from "react";
import { ArrowDown, RefreshCw } from "lucide-react";

import BlogHero from "@/components/Blogs/BlogHero";
import BlogCard from "@/components/Blogs/BlogCard";
import BlogModal from "@/components/Blogs/BlogModal";
import { getBlogs } from "@/lib/api/blogs";

export default function BlogsClient() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadBlogs() {
    try {
      setLoading(true);
      setError(false);

      const data = await getBlogs();

      setBlogs(Array.isArray(data) ? data : []);
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

  function handleOpenBlog(blog) {
    setSelectedBlog(blog);
  }

  function handleCloseBlog() {
    setSelectedBlog(null);
  }

  return (
    <main className="overflow-hidden bg-black text-cream">
      {/* =========================================================
          HERO
      ========================================================= */}
      <BlogHero />

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1300px]">
          <div className="max-w-[1000px]">
            <p className="mb-6 text-sm uppercase tracking-[0.25em] text-gold">
              Foundation Journal
            </p>

            <h1 className="text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.05em]">
              Stories that move
              <br />
              the work forward.
            </h1>
          </div>
        </div>
      </section>

      {/* =========================================================
          STORIES
      ========================================================= */}
      <section className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          {/* Section heading */}
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">
                Latest stories
              </p>

              <h2 className="text-3xl tracking-[-0.03em] md:text-5xl">
                From the foundation
              </h2>
            </div>

            {!loading && !error && blogs.length > 0 && (
              <span className="hidden text-sm text-cream/40 md:block">
                {blogs.length} {blogs.length === 1 ? "story" : "stories"}
              </span>
            )}
          </div>

          {/* =====================================================
              LOADING
          ===================================================== */}
          {loading && (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-cream/50">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Loading stories
              </div>
            </div>
          )}

          {/* =====================================================
              ERROR
          ===================================================== */}
          {!loading && error && (
            <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
              <p className="mb-6 max-w-md text-lg leading-relaxed text-cream/60">
                We couldn&apos;t load the stories right now. Please try
                again.
              </p>

              <button
                type="button"
                onClick={loadBlogs}
                className="inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.15em] transition-colors duration-300 hover:bg-white hover:text-black"
              >
                <RefreshCw className="h-4 w-4" />
                Try again
              </button>
            </div>
          )}

          {/* =====================================================
              EMPTY
          ===================================================== */}
          {!loading && !error && blogs.length === 0 && (
            <div className="flex min-h-[350px] items-center justify-center text-center">
              <p className="text-lg text-cream/50">
                No stories are available yet.
              </p>
            </div>
          )}

          {/* =====================================================
              BLOG CONTENT
          ===================================================== */}
          {!loading && !error && featuredBlog && (
            <>
              {/* Featured article */}
              <div className="mb-20">
                <BlogCard
                  blog={featuredBlog}
                  featured
                  onOpen={handleOpenBlog}
                />
              </div>

              {/* Remaining articles */}
              {remainingBlogs.length > 0 && (
                <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
                  {remainingBlogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      onOpen={handleOpenBlog}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* =========================================================
          CLOSING STATEMENT
      ========================================================= */}
      <section className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="max-w-[900px] text-[clamp(2.5rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.05em]">
              Ideas become action.
              <br />
              Action creates change.
            </h2>

            <ArrowDown className="hidden h-8 w-8 text-gold md:block" />
          </div>
        </div>
      </section>

      {/* =========================================================
          BLOG MODAL
      ========================================================= */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={handleCloseBlog} />
      )}
    </main>
  );
}