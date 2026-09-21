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
  title: "About Us | Saba Family Foundation",
  description:
    "Learn about Saba Family Foundation, its mission, philosophy, global work, and commitment to improving lives around the world.",
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
