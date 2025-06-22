"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Brain } from 'lucide-react';

interface Memory {
  id: string;
  userId: string;
  conversation?: string;
  key_events?: string;
  createdAt?: string;
  summary?: string;
  date?: string;
}

export function RecentMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await fetch('/api/dashboard/memories');
        if (!response.ok) {
          throw new Error('Failed to fetch memories');
        }
        const data = await response.json();
        setMemories(data);
        console.log('Loaded memories:', data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  return (
    <Card className="h-full">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-brand-primary" />
          <h3 className="text-xl font-bold">Recent Memories</h3>
        </div>
        {loading ? (
          <p>Loading memories...</p>
        ) : memories.length === 0 ? (
          <p className="text-brand-deep-blue/70">No recent memories found.</p>
        ) : (
          <div className="space-y-4 flex-grow">
            {memories.map((memory) => (
              <div key={memory.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <p className="text-brand-deep-blue">
                  {memory.conversation || memory.summary || memory.key_events}
                </p>
                <p className="text-sm text-brand-deep-blue/70 mt-1">
                  {new Date(memory.date || memory.createdAt || '').toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
} 