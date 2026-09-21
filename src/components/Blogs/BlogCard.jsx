"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function BlogCard({ blog, featured = false, onOpen }) {
  return (
    <article
      onClick={() => onOpen(blog)}
      className={`group cursor-pointer ${
        featured ? "grid gap-8 lg:grid-cols-[1.45fr_0.55fr] lg:items-end" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-[#111] ${
          featured ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 70vw"
              : "(max-width: 1024px) 50vw, 33vw"
          }
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Number */}
        <div className="absolute left-5 top-5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
            #{String(blog.id).padStart(2, "0")}
          </span>
        </div>

        {/* Arrow */}
        <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        {/* Featured label */}
        {featured && (
          <div className="absolute bottom-5 left-5">
            <span className="border border-white/20 bg-black/40 px-3 py-2 text-[9px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
              Featured story
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={featured ? "lg:pb-1" : "pt-5"}>
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-gold" />

          <span className="text-[9px] uppercase tracking-[0.28em] text-cream/35">
            Foundation Journal
          </span>
        </div>

        <h2
          className={`mt-4 font-medium leading-[1.02] tracking-[-0.04em] text-cream transition-colors duration-300 group-hover:text-gold ${
            featured ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl"
          }`}
        >
          {blog.title}
        </h2>

        {featured && (
          <p className="mt-5 max-w-xl text-sm leading-7 text-cream/40 md:text-base">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[9px] uppercase tracking-[0.25em] text-cream/25">
            Click to read
          </span>

          <span className="text-[10px] text-cream/20">
            {String(blog.id).padStart(2, "0")}
          </span>
        </div>
      </div>
    </article>
  );
}
