import { HelpCircle } from "lucide-react";

const questions = [
  { question: "What time is my appointment tomorrow?", count: 5, last_asked: "Yesterday" },
  { question: "Did I take my morning medication?", count: 4, last_asked: "Today" },
  { question: "Where did I put my keys?", count: 7, last_asked: "June 17, 2024" },
];

const RepeatedQuestions = () => {
  return (
    <div className="p-6 bg-white/40 rounded-card shadow-card backdrop-blur-lg border border-white/20">
      <h3 className="text-xl font-bold mb-4">Repeated Questions</h3>
      <ul className="space-y-4">
        {questions.map((q, index) => (
          <li key={index} className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 mt-1 text-brand-deep-blue/70 flex-shrink-0" />
            <div>
              <p className="font-semibold">{q.question}</p>
              <p className="text-sm text-brand-deep-blue/60">
                Asked {q.count} times. Last asked: {q.last_asked}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepeatedQuestions; 