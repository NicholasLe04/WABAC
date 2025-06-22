"use client";

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const VocabularyChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const currentUser = JSON.parse(userJson);
        try {
          const response = await fetch(`/api/analytics/vocabulary?userId=${currentUser.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setData(result);
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
      <CardHeader>
        <CardTitle>Vocabulary Richness Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {loading ? <p>Loading chart...</p> : 
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent-blue)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-accent-blue)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-card-border)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--rounded-input)',
                color: 'var(--color-text-primary)'
              }}
            />
            <Area type="monotone" dataKey="value" stroke="var(--color-accent-blue)" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
          }
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default VocabularyChart; 