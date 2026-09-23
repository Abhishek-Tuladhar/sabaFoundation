"use client";

import Link from "next/link";
import {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/SabaFamilyF",
    icon: FaXTwitter,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sabafamilyfoundation",
    icon: FaFacebook,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@sabafamilyfoundation",
    icon: FaYoutube,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/sabafamilyfoundation/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/saba-family-foundation-95b67a223",
    icon: FaLinkedin,
  },
];

const CONTACT_EMAIL = "admin@sabafamilyfoundation.com";

export default function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        {/* Main Footer */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
              Contact
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="
                group
                inline-flex
                items-center
                gap-3
                text-sm
                leading-6
                text-white/60
                transition-colors
                duration-300
                hover:text-[#D4AF37]
              "
            >
              <span
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.03]
                  text-white/70
                  transition-all
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:border-[#D4AF37]/60
                  group-hover:bg-[#D4AF37]
                  group-hover:text-black
                  group-hover:shadow-[0_8px_25px_rgba(212,175,55,0.18)]
                "
              >
                <HiOutlineMail
                  size={17}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </span>

              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Social Media */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37] md:text-right">
              Follow Us
            </p>

            <div className="flex items-center gap-2 md:justify-end">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="
                      group
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      bg-white/[0.03]
                      text-white/70
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#D4AF37]/60
                      hover:bg-[#D4AF37]
                      hover:text-black
                      hover:shadow-[0_8px_25px_rgba(212,175,55,0.18)]
                    "
                  >
                    <Icon
                      size={17}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gold Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

        {/* Copyright */}
        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white/45">
            © 2026{" "}
            <Link
              href="https://www.sabafamilyfoundation.com/"
              className="
                font-medium
                text-[#D4AF37]
                transition-colors
                duration-300
                hover:text-[#E8C96A]
              "
            >
              Saba Family Foundation
            </Link>
            , All Right Reserved.
          </p>

          <p className="text-xs uppercase tracking-[0.15em] text-white/35">
            Saba Family Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}
