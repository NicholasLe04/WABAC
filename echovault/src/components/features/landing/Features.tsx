import { GanttChart, Smile, Map, Activity } from "lucide-react";

const features = [
  {
    icon: GanttChart,
    title: "Memory Timeline",
    description: "Visualize your memories over time. See how different topics and people connect across your conversations.",
  },
  {
    icon: Smile,
    title: "Emotion Insights",
    description: "Track your emotional state and see how it evolves. Understand the sentiments connected to your memories.",
  },
  {
    icon: Map,
    title: "Recall Map",
    description: "Explore a visual map of your most frequently mentioned people, places, and things. Discover what's on your mind.",
  },
  {
    icon: Activity,
    title: "Cognitive Trends",
    description: "Monitor cognitive indicators like vocabulary richness and recall consistency to detect changes early.",
  },
];

const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold">Powerful Features, Simply Presented</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-text-secondary">
          WABAC provides deep insights through a calm, intuitive interface.
        </p>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-card bg-card-bg shadow-card flex flex-col items-center text-center backdrop-blur-lg border border-card-border">
              <div className="bg-accent-blue/10 rounded-full p-4">
                <feature.icon className="w-10 h-10 text-accent-blue" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 