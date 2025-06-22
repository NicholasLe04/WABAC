"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/Card';

interface PerformanceMetrics {
  id: string;
  userId: string;
  date: string;
  accuracyPercentage: number;
  vocabularyComplexity: number;
  forgottenMemoriesCount: number;
  totalMemoriesReviewed: number;
}

const MemoriesReviewedChart = () => {
  const [data, setData] = useState<PerformanceMetrics[]>([]);
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
          const result = await response.json();
          // Sort by date ascending (oldest to newest)
          const sortedData = [...result].sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          setData(sortedData);
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

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Memories Reviewed</h3>
        {loading ? (
          <p>Loading data...</p>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value: number) => [value, 'Memories']}
              />
              <Bar 
                dataKey="totalMemoriesReviewed" 
                fill="#10B981" 
                name="Memories"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </Card>
  );
};

export default MemoriesReviewedChart; 