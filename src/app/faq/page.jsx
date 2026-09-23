"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  HeartHandshake,
  Landmark,
  Users,
  Globe2,
  ShieldCheck,
  HandHeart,
  Sparkles,
} from "lucide-react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/faqs`;

function sanitizeHtml(html = "") {
  if (typeof window === "undefined") return "";

  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");

  const allowedTags = [
    "P",
    "STRONG",
    "B",
    "EM",
    "I",
    "A",
    "BR",
    "H2",
    "H3",
    "UL",
    "OL",
    "LI",
  ];

  document.body.querySelectorAll("*").forEach((element) => {
    if (!allowedTags.includes(element.tagName)) {
      element.replaceWith(...element.childNodes);
      return;
    }

    [...element.attributes].forEach((attribute) => {
      const attributeName = attribute.name.toLowerCase();

      if (
        element.tagName === "A" &&
        ["href", "target", "rel"].includes(attributeName)
      ) {
        return;
      }

      element.removeAttribute(attribute.name);
    });

    if (element.tagName === "A") {
      const href = element.getAttribute("href");

      if (!href || !/^https?:\/\//i.test(href)) {
        element.removeAttribute("href");
      } else {
        element.setAttribute("target", "_blank");
        element.setAttribute("rel", "noopener noreferrer");
      }
    }
  });

  return document.body.innerHTML;
}

const FAQ_ICONS = [
  HelpCircle,
  HeartHandshake,
  Landmark,
  Users,
  Globe2,
  ShieldCheck,
  HandHeart,
  Sparkles,
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchFAQs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch FAQs. Status: ${response.status}`);
        }

        const data = await response.json();

        if (data?.status !== "success" || !Array.isArray(data?.faqs)) {
          throw new Error("Invalid FAQ response.");
        }

        if (!isMounted) return;

        setFaqs(data.faqs);
      } catch (fetchError) {
        console.error("FAQ fetch error:", fetchError);

        if (isMounted) {
          setError(
            "We couldn't load the frequently asked questions. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchFAQs();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#090806] text-white">
      {/* Subtle editorial grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.075]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,.32) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.32) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Gold ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-220px] z-0 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#C9A24A]/10 blur-[150px]"
      />

      <div className="relative z-10">
        {/* HERO */}
        <section className="border-b border-white/[0.09]">
          <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-32">
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_360px]">
              <div className="max-w-4xl">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C9A24A]/35 bg-[#C9A24A]/[0.07] px-3.5 py-2">
                  <HelpCircle
                    size={14}
                    strokeWidth={1.6}
                    className="text-[#D7B35B]"
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D7B35B]">
                    Frequently Asked Questions
                  </span>
                </div>

                <h1 className="font-[var(--font-display)] text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-8xl">
                  Questions,
                  <br />
                  <span className="text-[#D7B35B]">answered.</span>
                </h1>
              </div>

              <div className="lg:pb-2">
                <p className="max-w-md text-base leading-7 text-white/48 sm:text-lg sm:leading-8">
                  Find answers about Saba Family Foundation, our mission,
                  programs, funding, and opportunities to get involved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="mb-10 flex items-end justify-between border-b border-white/[0.09] pb-6">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D7B35B]">
                  Explore
                </p>
                <h2 className="font-[var(--font-display)] text-3xl font-medium tracking-[-0.035em] text-white sm:text-4xl">
                  Frequently Asked Questions
                </h2>
              </div>

              {!loading && !error && faqs.length > 0 && (
                <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/30 sm:block">
                  {faqs.length} Questions
                </span>
              )}
            </div>

            {loading && (
              <div className="grid gap-px overflow-hidden border border-white/[0.09] bg-white/[0.09] md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[190px] animate-pulse bg-[#0D0C0A]"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="border border-red-400/20 bg-red-400/[0.04] p-8 sm:p-10">
                <p className="text-sm leading-6 text-white/60">{error}</p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-6 inline-flex items-center gap-2 border border-[#C9A24A]/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#D7B35B] transition-all duration-300 hover:bg-[#C9A24A] hover:text-[#090806]"
                >
                  Try Again
                  <ArrowUpRight size={14} />
                </button>
              </div>
            )}

            {!loading && !error && faqs.length === 0 && (
              <div className="border border-white/[0.09] bg-white/[0.025] p-10 text-center">
                <p className="text-sm text-white/50">
                  No frequently asked questions are available at the moment.
                </p>
              </div>
            )}

            {!loading && !error && faqs.length > 0 && (
              <div className="grid overflow-hidden border-l border-t border-white/[0.09] md:grid-cols-2">
                {faqs.map((faq, index) => {
                  const Icon = FAQ_ICONS[index % FAQ_ICONS.length];

                  return (
                    <article
                      key={faq.id}
                      className={`
                        group border-b border-r border-white/[0.09]
                        transition-colors duration-300
                        ${"bg-[#090806]/55 hover:bg-[#C9A24A]/[0.035]"}
                      `}
                    >
                      <div className="flex w-full items-start gap-5 px-6 py-7 text-left sm:px-8 sm:py-8">
                        <span
                          className="
    flex h-11 w-11 shrink-0 items-center justify-center
    border border-white/[0.13] bg-white/[0.025] text-white/45
    transition-all duration-300
    group-hover:border-[#C9A24A]/45 group-hover:text-[#D7B35B]
  "
                        >
                          <Icon size={18} strokeWidth={1.5} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D7B35B]/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="block pr-4 text-base font-semibold leading-6 text-white/88 transition-colors duration-300 group-hover:text-white sm:text-[17px]">
                            {faq.question}
                          </span>
                        </span>
                      </div>

                      {/* Answer — always visible */}
                      <div className="border-t border-[#C9A24A]/10 px-6 pb-8 pl-[86px] pr-8 pt-5 sm:px-8 sm:pl-[102px] sm:pr-10">
                        <div
                          className="
                            max-w-xl text-sm text-justify leading-7 text-white/48 sm:text-[15px]
                            [&_a]:font-medium
                            [&_a]:text-[#D7B35B]
                            [&_a]:underline
                            [&_a]:underline-offset-4
                            [&_a:hover]:text-[#F0D58B]
                            [&_strong]:font-medium
                            [&_strong]:text-white/80
                            [&_p]:mb-4
                            [&_p:last-child]:mb-0
                            [&_h2]:mb-4
                            [&_h2]:text-lg
                            [&_h2]:font-medium
                            [&_h2]:text-white
                            [&_h3]:mb-3
                            [&_h3]:text-base
                            [&_h3]:font-medium
                            [&_h3]:text-white
                            [&_ul]:my-4
                            [&_ul]:list-disc
                            [&_ul]:pl-5
                            [&_ol]:my-4
                            [&_ol]:list-decimal
                            [&_ol]:pl-5
                            [&_li]:mb-2
                          "
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(faq.answer),
                          }}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
