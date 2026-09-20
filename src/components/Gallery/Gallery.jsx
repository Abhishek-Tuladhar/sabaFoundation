"use client";

import Reveal from "@/components/Reveal/Reveal";
import { galleryImages, galleryVideos } from "@/app/lib/gallery/gallery";

export default function Gallery() {
  return (
    <section className="bg-ink px-8 py-24 text-cream md:px-16 md:py-32">
      <Reveal>
        <p className="mb-4 text-center text-sm uppercase tracking-widest text-gold">
          Video & Photo Gallery
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="mb-16 text-center font-display text-3xl md:text-5xl">
          Our Work in Action
        </h2>
      </Reveal>

      <Reveal
        stagger
        className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {galleryVideos.map((video) => (
          <div
            key={video.id}
            className="aspect-video overflow-hidden rounded-lg"
          >
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              loading="lazy"
              allowFullScreen
            />
          </div>
        ))}
      </Reveal>

      <Reveal
        stagger
        className="grid grid-cols-2 gap-4 md:grid-cols-3"
      >
        {galleryImages.map((img) => (
          <div
            key={img.src}
            className="group aspect-square overflow-hidden rounded-lg"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-110"
            />
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.2} className="mt-12 text-center">
        <a
          href="/gallery"
          className="inline-block border border-cream px-6 py-3 transition-colors duration-300 hover:bg-cream hover:text-ink"
        >
          View Full Gallery
        </a>
      </Reveal>
    </section>
  );
}
