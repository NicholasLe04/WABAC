"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Bell } from 'lucide-react';

interface Reminder {
  id: number;
  user_id: string;
  text: string;
  time: string;
}

const UpcomingReminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const currentUser = JSON.parse(userJson);
        try {
          // Fetch all reminders and filter on the client
          const response = await fetch(`/api/reminders`);
          if (!response.ok) {
            throw new Error('Failed to fetch reminders');
          }
          const allReminders = await response.json();
          const userReminders = allReminders.filter((r: Reminder) => r.user_id === currentUser.id);
          setReminders(userReminders);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <p>Loading reminders...</p>
          ) : reminders.length > 0 ? (
            reminders.map((reminder) => (
              <div key={reminder.id} className="flex items-start gap-3">
                <Bell className="w-5 h-5 mt-1 text-accent-blue" />
                <div>
                  <p className="font-medium">{reminder.text}</p>
                  <p className="text-sm text-text-secondary">{reminder.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-secondary">No upcoming reminders.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingReminders; 