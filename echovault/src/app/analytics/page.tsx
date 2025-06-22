import AccuracyChart from "@/components/features/analytics/AccuracyChart";
import VocabularyComplexityChart from "@/components/features/analytics/VocabularyComplexityChart";
import MemoriesReviewedChart from "@/components/features/analytics/MemoriesReviewedChart";
import ForgottenMemoriesChart from "@/components/features/analytics/ForgottenMemoriesChart";
import DementiaRiskMeter from "@/components/features/shared/DementiaRiskMeter";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Memory Performance</h1>
        <p className="mt-1 text-brand-deep-blue/70">
          Track your memory and cognitive performance over time.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-fr">
        {/* Risk Meter - Spans 2 columns */}
        {/* <div className="md:col-span-2 h-full">
          <DementiaRiskMeter />
        </div> */}
        
        {/* Accuracy Chart - Spans 2 columns */}
        <div className="md:col-span-2 h-full">
          <AccuracyChart />
        </div>
        
        {/* Vocabulary Complexity - Spans 2 columns */}
        <div className="md:col-span-2 h-full">
          <VocabularyComplexityChart />
        </div>
        
        {/* Memories Reviewed - Spans 2 columns */}
        <div className="md:col-span-2 h-full">
          <MemoriesReviewedChart />
        </div>
        
        {/* Forgotten Memories - Spans full width for emphasis */}
        <div className="md:col-span-2 h-full">
          <ForgottenMemoriesChart />
        </div>
      </div>
    </div>
  );
}
