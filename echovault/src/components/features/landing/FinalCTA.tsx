import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>
        <p className="mt-4 text-lg max-w-xl mx-auto text-brand-deep-blue/70">
          Begin your path to self-reflection and cognitive wellness today. It starts with a simple conversation.
        </p>
        <div className="mt-8">
          <Button size="lg">
            Try EchoVault for Free <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA; 