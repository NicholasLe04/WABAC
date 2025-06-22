"use client";

import { useEffect, useState } from "react";
import { Phone, Smile, Meh, Frown } from "lucide-react";
import type { LucideProps } from "lucide-react";

interface Call {
  id: number;
  date: string;
  summary: string;
  emotion: string;
  icon: string;
  color: string;
}

const iconMap: { [key: string]: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> } = {
  Smile,
  Meh,
  Frown,
};

const RecentCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalls = async () => {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const currentUser = JSON.parse(userJson);
        try {
          const response = await fetch(`/api/dashboard/calls?userId=${currentUser.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch calls');
          }
          const data = await response.json();
          setCalls(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchCalls();
  }, []);

  return (
    <div className="p-6 bg-card-bg rounded-card shadow-card backdrop-blur-lg border border-card-border">
      <h2 className="text-2xl font-bold">Recent Calls</h2>
      <div className="mt-4 space-y-4">
        {loading ? (
          <p>Loading calls...</p>
        ) : calls.length > 0 ? (
          calls.map((call) => {
            const IconComponent = iconMap[call.icon];
            return (
              <div key={call.id} className="p-4 rounded-lg bg-accent-blue/5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 font-semibold">
                    <Phone className="w-5 h-5" />
                    <span>{call.date}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${call.color}`}>
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    <span>{call.emotion}</span>
                  </div>
                </div>
                <p className="mt-2 text-text-secondary">{call.summary}</p>
              </div>
            );
          })
        ) : (
          <p>No recent calls found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentCalls; 