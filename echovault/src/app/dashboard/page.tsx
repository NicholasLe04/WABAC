import MemoryTags from "@/components/features/dashboard/MemoryTags";
import RecentCalls from "@/components/features/dashboard/RecentCalls";
import Reminders from "@/components/features/dashboard/Reminders";
import TodaysInsights from "@/components/features/dashboard/TodaysInsights";
import { Smile } from "lucide-react";

export default function DashboardPage() {
  const userName = "Alex"; // Placeholder user name
  const mood = "Reflective"; // Placeholder mood

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
          <p className="flex items-center gap-2 mt-1 text-brand-deep-blue/70">
            <Smile className="w-5 h-5 text-yellow-500" />
            <span>Your current mood seems to be <span className="font-semibold">{mood}</span>.</span>
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <RecentCalls />
          <Reminders />
        </div>
        <div className="space-y-8">
          <MemoryTags />
          <TodaysInsights />
        </div>
      </div>
    </div>
  );
}
