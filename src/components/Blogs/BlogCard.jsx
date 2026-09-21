"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function BlogCard({ blog, featured = false, onOpen }) {
  if (!blog) return null;

  function handleClick() {
    if (typeof onOpen === "function") {
      onOpen(blog);
    }
  }

  return (
    <article
      onClick={handleClick}
      className={`group cursor-pointer ${featured ? "" : "h-full"}`}
    >
      {/* =======================================================
          IMAGE
      ======================================================= */}
      <div
        className={`relative overflow-hidden bg-[#111] ${
          featured ? "aspect-[16/9] md:aspect-[2/1]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority={featured}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 90vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

        {/* Arrow */}
        <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-black opacity-0 transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      {/* =======================================================
          CONTENT
      ======================================================= */}
      <div className={`${featured ? "mt-8 max-w-[1000px]" : "mt-6"}`}>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-gold" />

          <span className="text-xs uppercase tracking-[0.2em] text-gold">
            Foundation Journal
          </span>
        </div>

        <h3
          className={`tracking-[-0.03em] text-cream transition-colors duration-300 group-hover:text-gold ${
            featured
              ? "text-3xl leading-[1.05] md:text-5xl lg:text-6xl"
              : "text-2xl leading-[1.1] md:text-3xl"
          }`}
        >
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p
            className={`mt-5 max-w-[800px] leading-relaxed text-cream/55 ${
              featured ? "text-base md:text-lg" : "text-sm md:text-base"
            }`}
          >
            {blog.excerpt}
          </p>
        )}

        <div className="mt-6 flex items-center gap-3 text-sm uppercase tracking-[0.15em] text-cream/50 transition-colors duration-300 group-hover:text-cream">
          Read story
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </article>
  );
}
