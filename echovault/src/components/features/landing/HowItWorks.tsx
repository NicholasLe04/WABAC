import { PhoneCall, FileText, Brain, BarChart } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "Talk & Record",
    description: "Have a natural conversation with our AI assistant over the phone. No special apps needed.",
  },
  {
    icon: FileText,
    title: "Transcribe & Analyze",
    description: "Our system securely transcribes and analyzes your conversation for key patterns and insights.",
  },
  {
    icon: Brain,
    title: "Extract Memories",
    description: "We identify and tag important memories, people, places, and topics from your dialogue.",
  },
  {
    icon: BarChart,
    title: "Visualize Trends",
    description: "See your cognitive and emotional trends on a private, easy-to-understand dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-text-secondary">
          Four simple steps to unlock your memories and gain valuable insights.
        </p>
        <div className="mt-12 grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-card bg-card-bg shadow-card backdrop-blur-lg border border-card-border">
              <div className="bg-accent-blue text-white rounded-full p-4">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 