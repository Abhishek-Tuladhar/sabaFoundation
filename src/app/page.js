import Hero from "@/components/Hero/Hero";
import Impact from "@/components/Impact/Impact";
import Programs from "@/components/Programs/Programs";
import Partners from "@/components/Partners/Partners";
import Testimonials from "@/components/Testimonials/Testimonials";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Impact />
      <Programs />
      <Partners />
      <Testimonials />
      <Footer />
    </main>
  );
}