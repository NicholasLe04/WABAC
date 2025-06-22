import VocabularyChart from "@/components/features/analytics/VocabularyChart";
import EmotionChart from "@/components/features/analytics/EmotionChart";
import RecallChart from "@/components/features/analytics/RecallChart";
import RepeatedQuestions from "@/components/features/analytics/RepeatedQuestions";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Cognitive Analytics</h1>
        <p className="mt-1 text-brand-deep-blue/70">
          Visualize your memory and emotional trends over time.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <VocabularyChart />
        <EmotionChart />
        <RecallChart />
        <RepeatedQuestions />
      </div>
    </div>
  );
}
