import Hero from "@/components/features/landing/Hero";
import HowItWorks from "@/components/features/landing/HowItWorks";
import Features from "@/components/features/landing/Features";
import UseCases from "@/components/features/landing/UseCases";
import DataPrivacy from "@/components/features/landing/DataPrivacy";
import Testimonials from "@/components/features/landing/Testimonials";
import FinalCTA from "@/components/features/landing/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <UseCases />
      <DataPrivacy />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
