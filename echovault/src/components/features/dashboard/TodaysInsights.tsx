"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Lightbulb } from 'lucide-react';

interface Insight {
  id: string;
  userId: string;
  insight: string;
  date: string;
}

export default function TodaysInsights() {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/dashboard/insights');
        if (!response.ok) {
          throw new Error('Failed to fetch insights');
        }
        const data = await response.json();
        setInsight(data);
        console.log('Loaded latest insight:', data);
      } catch (error) {
        console.error('Error fetching insights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <Card className="h-full">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold">Today's Insight</h3>
        </div>
        {loading ? (
          <p>Loading insight...</p>
        ) : insight ? (
          <div className="flex-grow">
            <p className="text-brand-deep-blue">{insight.insight}</p>
            <p className="text-sm text-brand-deep-blue/70 mt-2">
              {new Date(insight.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        ) : (
          <p className="text-brand-deep-blue/70">No insights available.</p>
        )}
      </div>
    </Card>
  );
}