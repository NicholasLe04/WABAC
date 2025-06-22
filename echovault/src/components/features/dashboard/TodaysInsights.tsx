"use client";

import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";

interface Insight {
    user_id: string;
    insight: string;
}

const TodaysInsights = () => {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchInsights = async () => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const currentUser = JSON.parse(userJson);
          try {
            const response = await fetch(`/api/dashboard/insights?userId=${currentUser.id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch insights');
            }
            const data = await response.json();
            setInsights(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      };
      fetchInsights();
    }, []);

  return (
    <div className="p-6 bg-card-bg rounded-card shadow-card backdrop-blur-lg border border-card-border">
      <h2 className="text-2xl font-bold mb-4">Today's Insights</h2>
      <div className="space-y-3">
      {loading ? (
          <p>Loading insights...</p>
        ) : insights.length > 0 ? (
            insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 mt-1 text-accent-yellow" />
            <p className="text-text-secondary">{insight.insight}</p>
          </div>
            ))
        ) : (
          <p>No insights for today.</p>
        )}
      </div>
    </div>
  );
};

export default TodaysInsights;