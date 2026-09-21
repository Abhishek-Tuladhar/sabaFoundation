"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://sabafamilyfoundation.com/api/v1";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const sectionRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelector("[data-form]"),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (status === "error") {
      setStatus("idle");
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Unable to send your message. (${response.status})`,
        );
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setStatus("error");
      setError(
        error.message ||
          "Something went wrong while sending your message. Please try again.",
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="bg-black px-6 py-24 text-cream md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <div
          data-form
          className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24"
        >
          {/* Left */}
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-gold">
              Send Us a Message
            </p>

            <h2 className="max-w-md text-5xl font-medium leading-[0.9] tracking-[-0.05em] md:text-6xl">
              Tell us
              <br />
              what&apos;s
              <br />
              <span className="text-gold">on your mind.</span>
            </h2>

            <p className="mt-8 max-w-sm text-sm leading-6 text-cream/45">
              Share your question, idea, or collaboration opportunity with our
              team.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-cream/40"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  disabled={status === "submitting"}
                  className="
                    w-full
                    border-b
                    border-white/20
                    bg-transparent
                    px-0
                    py-4
                    text-base
                    text-cream
                    outline-none
                    placeholder:text-cream/20
                    transition-colors
                    focus:border-gold
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-cream/40"
                >
                  Your Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  disabled={status === "submitting"}
                  className="
                    w-full
                    border-b
                    border-white/20
                    bg-transparent
                    px-0
                    py-4
                    text-base
                    text-cream
                    outline-none
                    placeholder:text-cream/20
                    transition-colors
                    focus:border-gold
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-cream/40"
              >
                Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                required
                disabled={status === "submitting"}
                className="
                  w-full
                  border-b
                  border-white/20
                  bg-transparent
                  px-0
                  py-4
                  text-base
                  text-cream
                  outline-none
                  placeholder:text-cream/20
                  transition-colors
                  focus:border-gold
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-3 block text-[9px] uppercase tracking-[0.25em] text-cream/40"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                disabled={status === "submitting"}
                className="
                  w-full
                  resize-none
                  border-b
                  border-white/20
                  bg-transparent
                  px-0
                  py-4
                  text-base
                  text-cream
                  outline-none
                  placeholder:text-cream/20
                  transition-colors
                  focus:border-gold
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <div className="border border-red-400/20 bg-red-400/5 px-4 py-3">
                <p className="text-xs leading-5 text-red-300">{error}</p>
              </div>
            )}

            {/* Success */}
            {status === "success" && (
              <div className="flex items-start gap-3 border border-gold/20 bg-gold/5 px-4 py-3">
                <Check size={16} className="mt-0.5 shrink-0 text-gold" />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                    Message Sent
                  </p>

                  <p className="mt-1 text-xs leading-5 text-cream/55">
                    Thank you for reaching out. Your message has been submitted
                    successfully.
                  </p>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="
                group
                inline-flex
                items-center
                gap-4
                border
                border-cream/25
                px-6
                py-4
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-cream
                transition-all
                duration-300
                hover:border-gold
                hover:bg-gold
                hover:text-black
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:border-cream/25
                disabled:hover:bg-transparent
                disabled:hover:text-cream
              "
            >
              {status === "submitting" ? (
                <>
                  Sending
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
                    <Loader2 size={14} className="animate-spin" />
                  </span>
                </>
              ) : status === "success" ? (
                <>
                  Message Sent
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
                    <Check size={14} />
                  </span>
                </>
              ) : (
                <>
                  Send Message
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
                    <ArrowUpRight
                      size={14}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
