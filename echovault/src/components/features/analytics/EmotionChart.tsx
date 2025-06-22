"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Happy', count: 12, fill: '#10B981' },
  { name: 'Neutral', count: 8, fill: '#6B7280' },
  { name: 'Sad', count: 3, fill: '#3B82F6' },
  { name: 'Anxious', count: 2, fill: '#F59E0B' },
  { name: 'Confused', count: 4, fill: '#9333EA' },
];

const EmotionChart = () => {
  return (
    <div className="p-6 bg-white/40 rounded-card shadow-card backdrop-blur-lg border border-white/20">
      <h3 className="text-xl font-bold mb-4">Emotion Frequency</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionChart; 