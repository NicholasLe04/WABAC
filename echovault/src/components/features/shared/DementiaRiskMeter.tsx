"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Brain } from 'lucide-react';

interface PerformanceMetrics {
  id: string;
  userId: string;
  date: string;
  accuracyPercentage: number;
  vocabularyComplexity: number;
  forgottenMemoriesCount: number;
  totalMemoriesReviewed: number;
}

const DementiaRiskMeter = () => {
  const [riskScore, setRiskScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const currentUser = JSON.parse(userJson);
        try {
          const response = await fetch(`/api/analytics/performance?days=7`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result: PerformanceMetrics[] = await response.json();
          
          // Calculate risk score based on recent performance
          if (result.length > 0) {
            const latestMetrics = result[result.length - 1];
            
            // Calculate risk score (0-10)
            // Factors:
            // 1. Accuracy percentage (lower = higher risk)
            // 2. Vocabulary complexity (lower = higher risk)
            // 3. Forgotten memories ratio (higher = higher risk)
            
            const accuracyRisk = (100 - latestMetrics.accuracyPercentage) / 10; // 0-10
            const vocabularyRisk = (1 - latestMetrics.vocabularyComplexity) * 10; // 0-10
            const forgottenRatio = (latestMetrics.forgottenMemoriesCount / latestMetrics.totalMemoriesReviewed) * 10;
            
            const score = Math.round((accuracyRisk + vocabularyRisk + forgottenRatio) / 3);
            setRiskScore(Math.min(Math.max(score, 0), 10)); // Ensure between 0-10
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getColorClass = (score: number) => {
    if (score <= 3) return 'bg-green-500';
    if (score <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-brand-primary" />
          <h3 className="text-xl font-bold">Cognitive Health Risk</h3>
        </div>
        {loading ? (
          <p>Calculating risk score...</p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{riskScore}</div>
              <div className="text-sm text-brand-deep-blue/70">
                Risk Level<br />
                (0-10 scale)
              </div>
            </div>
            <div className="h-3 rounded-full bg-gray-200">
              <div 
                className={`h-full rounded-full transition-all ${getColorClass(riskScore)}`}
                style={{ width: `${(riskScore / 10) * 100}%` }}
              />
            </div>
            <p className="text-sm text-brand-deep-blue/70">
              {riskScore <= 3 ? 'Low risk - Keep up the good work!' :
               riskScore <= 6 ? 'Moderate risk - Consider more memory exercises.' :
               'High risk - Please consult with a healthcare professional.'}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DementiaRiskMeter; 