"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', score: 85 },
  { name: 'Feb', score: 88 },
  { name: 'Mar', score: 82 },
  { name: 'Apr', score: 86 },
  { name: 'May', score: 84 },
  { name: 'Jun', score: 80 },
  { name: 'Jul', score: 78 },
];

const RecallChart = () => {
  return (
    <div className="p-6 bg-white/40 rounded-card shadow-card backdrop-blur-lg border border-white/20">
      <h3 className="text-xl font-bold mb-4">Recall Consistency Score</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[70, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#10B981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecallChart; 