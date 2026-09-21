"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeft } from "lucide-react";

export default function BlogArticle({ blog }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={sectionRef}
      className="overflow-hidden bg-black text-cream"
    >
      {/* Article hero */}
      <section className="px-6 pb-20 pt-36 md:px-12 md:pb-24 lg:px-20 lg:pt-44">
        <div className="mx-auto max-w-[1300px]">
          <div ref={contentRef}>
            {/* Back */}
            <Link
              href="/blogs"
              className="group mb-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-gold"
            >
              <ArrowLeft
                size={15}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to stories
            </Link>

            {/* Label */}
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Foundation Journal
            </p>

            {/* Title */}
            <h1 className="mt-6 max-w-6xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
              {blog.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative aspect-[16/9] overflow-hidden bg-[#111] md:aspect-[2/1]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
        <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-[0.3fr_1fr] lg:gap-24">
          {/* Meta */}
          <aside>
            <div className="sticky top-32 border-t border-cream/10 pt-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30">
                Article
              </p>

              <p className="mt-3 text-sm leading-6 text-cream/50">
                Saba Family Foundation
              </p>

              <div className="mt-8 h-px w-10 bg-gold" />
            </div>
          </aside>

          {/* Content */}
          <article
            className="
              prose
              prose-invert
              max-w-none

              prose-p:text-cream/65
              prose-p:text-base
              prose-p:leading-8
              md:prose-p:text-lg

              prose-a:text-gold
              prose-a:no-underline
              hover:prose-a:underline

              prose-h2:mt-16
              prose-h2:text-3xl
              prose-h2:font-medium
              prose-h2:tracking-[-0.03em]
              prose-h2:text-cream
              md:prose-h2:text-4xl

              prose-h3:mt-14
              prose-h3:text-2xl
              prose-h3:font-medium
              prose-h3:text-cream

              prose-strong:text-cream
              prose-em:text-cream/80

              prose-li:text-cream/65
            "
            dangerouslySetInnerHTML={{
              __html: blog.description,
            }}
          />
        </div>
      </section>

      {/* Back to blogs */}
      <section className="border-t border-cream/10 px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-cream/60 transition-colors hover:text-gold"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-black">
              <ArrowLeft size={15} />
            </span>

            All stories
          </Link>
        </div>
      </section>
    </main>
  );
}