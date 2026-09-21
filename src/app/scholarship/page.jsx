import ScholarshipHero from "@/components/Scholarship/ScholarshipHero";
import ScholarshipIntro from "@/components/Scholarship/ScholarshipIntro";
import ScholarshipImpact from "@/components/Scholarship/ScholarshipImpact";
import ScholarshipTypes from "@/components/Scholarship/ScholarshipTypes";
import Scholars from "@/components/Scholarship/Scholars";
import SuccessStories from "@/components/Scholarship/SuccessStories";
import ScholarshipCTA from "@/components/Scholarship/ScholarshipCTA";

export const metadata = {
  title: "Scholarship Program",
  description:
    "Learn about the Saba Family Foundation scholarship program and its commitment to creating educational opportunities for students.",
  alternates: {
    canonical: "/scholarship",
  },
};

export default function ScholarshipPage() {
  return (
    <main className="overflow-hidden bg-black text-cream">
      <ScholarshipHero />
      <ScholarshipIntro />
      <ScholarshipImpact />
      <ScholarshipTypes />
      <Scholars />
      <SuccessStories />
      <ScholarshipCTA />
    </main>
  );
}