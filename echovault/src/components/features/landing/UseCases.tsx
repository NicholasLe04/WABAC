import { User, Users, ShieldCheck } from "lucide-react";

const useCases = [
  {
    icon: User,
    title: "For Self-Reflection",
    description: "Understand your own mind better. Reflect on your thoughts, feelings, and the stories you tell.",
  },
  {
    icon: Users,
    title: "For Early Detection",
    description: "Proactively monitor cognitive health. Share trends with a doctor for early dementia detection and peace of mind.",
  },
  {
    icon: ShieldCheck,
    title: "For Caregiving",
    description: "Stay connected to a loved one's mental state. Get gentle alerts on cognitive changes from a distance.",
  },
];

const UseCases = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold">A Companion for Every Journey</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-text-secondary">
          Whether for yourself, a family member, or a patient, WABAC provides support.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="p-8 rounded-card bg-card-bg shadow-card flex flex-col items-center text-center backdrop-blur-lg border border-card-border">
              <div className="bg-accent-blue text-white rounded-full p-4">
                <useCase.icon className="w-10 h-10" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{useCase.title}</h3>
              <p className="mt-2 text-text-secondary">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases; 