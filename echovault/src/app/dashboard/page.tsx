import { RecentMemories } from "@/components/features/dashboard/RecentMemories";
import Reminders from "@/components/features/dashboard/Reminders";
import TodaysInsights from "@/components/features/dashboard/TodaysInsights";
import DementiaRiskMeter from "@/components/features/shared/DementiaRiskMeter";
import { Smile } from "lucide-react";

export default function DashboardPage() {
  // TODO: Replace with actual user data fetch once auth is implemented
  const userName = "Logan"; // Placeholder until user data is available
  const mood = "Reflective"; // Placeholder until mood detection is implemented

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName} :) </h1>
          <p className="flex items-center gap-2 mt-1 text-brand-deep-blue/70">
            {/* <span>Your current mood seems to be <span className="font-semibold">{mood}</span>.</span> */}
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Risk Meter - Spans 2 columns */}
        <div className="md:col-span-2">
          <DementiaRiskMeter />
        </div>
        
        {/* Today's Insights - Spans 2 columns */}
        <div className="md:col-span-2">
          <TodaysInsights />
        </div>
        
        {/* Recent Memories - Spans 3 columns */}
        <div className="md:col-span-3">
          <RecentMemories />
        </div>
        <div className="md:col-span-1 md:row-span-1">
          <Reminders />
        </div>
        
        {/* Reminders - Spans 1 column, full height */}
      </div>
    </div>
  );
}
