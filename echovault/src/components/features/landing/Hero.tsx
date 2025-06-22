import { Button } from "@/components/ui/Button";
import { Mic, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-accent-blue to-text-primary text-transparent bg-clip-text">
        Talk to Your Memory.
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-text-secondary">
        A voice-first memory companion that helps you reflect, remember, and detect cognitive changes early.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button size="lg">
          Try EchoVault <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button size="lg" variant="outline">
          <Mic className="mr-2 w-5 h-5" /> How it works
        </Button>
      </div>
    </section>
  );
};

export default Hero; 