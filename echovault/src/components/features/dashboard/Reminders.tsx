"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

interface Reminder {
  id: number;
  title: string;
  created_at: string;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch('/api/reminders');
        if (!response.ok) {
          throw new Error('Failed to fetch reminders');
        }
        const data = await response.json();
        
        // In a real app, you would get the current user's ID
        // and filter the reminders here.
        const userJson = localStorage.getItem('user');
        if (userJson) {
            const currentUser = JSON.parse(userJson);
            const userReminders = data.filter((r: any) => r.user_id === currentUser.id);
            setReminders(userReminders);
        } else {
            // Handle case where there is no user logged in
            setReminders([]);
        }

      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  return (
    <div className="p-6 bg-white/40 rounded-card shadow-card backdrop-blur-lg border border-white/20">
      <h2 className="text-2xl font-bold mb-4">Reminders</h2>
      {loading ? (
        <p>Loading reminders...</p>
      ) : reminders.length > 0 ? (
        <ul className="space-y-3">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="flex items-start gap-2 text-brand-deep-blue/80">
              <Bell className="w-5 h-5 mt-1 text-brand-deep-blue/70 flex-shrink-0" />
              <span>{reminder.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reminders found. Your `reminders` table might be empty.</p>
      )}
    </div>
  );
};

export default Reminders; 