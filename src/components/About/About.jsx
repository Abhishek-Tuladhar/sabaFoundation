"use client";

import Reveal from "@/components/Reveal/Reveal";

const highlights = [
  "Global Reach",
  "Education Empowerment",
  "Women's Empowerment",
  "Healthcare Access",
  "Global Alliances",
];

export default function About() {
  return (
    <section className="bg-cream px-8 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-widest text-gold">
            About Us
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mb-8 font-display text-3xl leading-snug md:text-5xl">
            Founded in 2002 by Dr. Malini Saba, the Foundation exists to
            improve lives across South and Southeast Asia, South America,
            Africa, and the United States.
          </h2>
        </Reveal>

        <Reveal stagger delay={0.2}>
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {highlights.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/20 px-5 py-2 text-sm text-ink/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/about-us"
              className="border border-ink px-6 py-3 transition-colors duration-300 ease-expo-out hover:bg-ink hover:text-cream"
            >
              About Us
            </a>

            <a
              href="/contact"
              className="bg-gold px-6 py-3 text-cream transition-opacity duration-300 hover:opacity-90"
            >
              Contact Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
