import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-4xl font-bold">Reconnect With Your Memories</h2>
        <p className="mt-4 text-lg text-text-secondary">
          Ready to start your journey? WABAC is free to try. Get started today and discover a new way to interact with your personal history.
        </p>
        <div className="mt-8">
          <Button size="lg">
            Try WABAC for Free <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA; 