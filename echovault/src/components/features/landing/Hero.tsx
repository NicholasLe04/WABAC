import { Button } from "@/components/ui/Button";
import { Mic, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-accent-blue to-text-primary text-transparent bg-clip-text">
        Because forgetting shouldn't mean losing.
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-text-secondary">
        WABAC is your personal memory companion, helping you capture, reflect, and stay connected to what matters most.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button size="lg">
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default Hero; 