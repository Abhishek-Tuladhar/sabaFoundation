import ContactHero from "@/components/Contact/ContactHero";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";
import ContactCTA from "@/components/Contact/ContactCTA";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Saba Family Foundation to learn more about our initiatives, partnerships, scholarship program, and opportunities to connect.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactCTA />
    </main>
  );
}