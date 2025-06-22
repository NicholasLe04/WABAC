"use client";

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const ResponseSpeedChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const currentUser = JSON.parse(userJson);
        try {
          const response = await fetch(`/api/analytics/responseSpeed?userId=${currentUser.id}`);
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
        <CardTitle>Response Speed (seconds)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
        {loading ? <p>Loading chart...</p> :
          <LineChart data={data}>
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
            <Line type="monotone" dataKey="speed" stroke="var(--color-accent-blue)" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
          }
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ResponseSpeedChart;
 