"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const NamedEntityRecognitionChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const currentUser = JSON.parse(userJson);
        try {
          const response = await fetch(`/api/analytics/namedEntities?userId=${currentUser.id}`);
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
        <CardTitle>Named Entity Mentions</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
        {loading ? <p>Loading chart...</p> :
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-card-border)" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)' }} />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-secondary)' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--rounded-input)',
                color: 'var(--color-text-primary)'
              }}
            />
            <Bar dataKey="value" fill="var(--color-accent-blue)" radius={[0, 4, 4, 0]} />
          </BarChart>
          }
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default NamedEntityRecognitionChart; 