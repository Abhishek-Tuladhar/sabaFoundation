import AboutHero from "@/components/About/AboutHero";
import AboutStory from "@/components/About/AboutStory";
import BillionLives from "@/components/About/BillionLives";
import AboutBeliefs from "@/components/About/AboutBeliefs";
import FoundationImpact from "@/components/About/FoundationImpact";
import Founder from "@/components/About/Founder";
import GlobalReach from "@/components/About/GlobalReach";
import Partnerships from "@/components/About/Partnerships";
import CompanyPartners from "@/components/About/CompanyPartners";
import AboutCTA from "@/components/About/AboutCTA";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Saba Family Foundation, its mission, global initiatives, partnerships, and commitment to improving lives through education, healthcare, livelihoods, arts and culture, and human rights.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <main className="overflow-hidden bg-black text-cream">
      <AboutHero />
      <AboutStory />
      <BillionLives />
      <AboutBeliefs />
      <FoundationImpact />
      <Founder />
      <GlobalReach />
      <Partnerships />
      <CompanyPartners />
      <AboutCTA />
    </main>
  );
}
