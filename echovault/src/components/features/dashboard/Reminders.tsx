"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Bell, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ReminderForm } from './ReminderForm';
import { cn } from '@/lib/utils';

interface Reminder {
  id: string;
  userId?: string;
  user_id?: string;  // Handle both formats
  title: string;
  date?: string;
  created_at?: string;
  notes?: string;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchReminders = async () => {
    try {
      const response = await fetch('/api/dashboard/reminders');
      if (!response.ok) {
        throw new Error('Failed to fetch reminders');
      }
      const data = await response.json();
      setReminders(data);
      console.log('Loaded reminders:', data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  // Filter and sort upcoming reminders
  const upcomingReminders = reminders
    .filter(reminder => {
      const reminderDate = new Date(reminder.date || reminder.created_at || '');
      return reminderDate > new Date();
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || a.created_at || '');
      const dateB = new Date(b.date || b.created_at || '');
      return dateA.getTime() - dateB.getTime();
    });

  // Function to determine if a reminder is soon (within next 30 minutes in PST)
  const isSoon = (date: string) => {
    const reminderDate = new Date(date);
    const now = new Date();
    
    // Convert both dates to PST
    const pstOptions = { timeZone: 'America/Los_Angeles' };
    const pstReminderDate = new Date(reminderDate.toLocaleString('en-US', pstOptions));
    const pstNow = new Date(now.toLocaleString('en-US', pstOptions));
    
    // Calculate minutes difference
    const minutesDiff = (pstReminderDate.getTime() - pstNow.getTime()) / (1000 * 60);
    return minutesDiff <= 30 && minutesDiff > 0;
  };

  return (
    <Card className="h-full">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-brand-primary" />
            <h3 className="text-xl font-bold">Upcoming Reminders</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowForm(!showForm)}
            className="h-8 w-8 p-0"
          >
            {showForm ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>

        {showForm && (
          <div className="mb-6">
            <ReminderForm onReminderAdded={() => {
              fetchReminders();
              setShowForm(false);
            }} />
          </div>
        )}

        {loading ? (
          <p>Loading reminders...</p>
        ) : upcomingReminders.length > 0 ? (
          <div className="space-y-4 flex-grow">
            {upcomingReminders.map((reminder) => {
              const date = reminder.date || reminder.created_at || '';
              const isReminderSoon = isSoon(date);
              
              return (
                <div 
                  key={reminder.id} 
                  className={cn(
                    "flex items-start gap-2 p-3 rounded-md transition-colors",
                    isReminderSoon && "bg-brand-primary/10 border border-brand-primary"
                  )}
                >
                  <Bell 
                    className={cn(
                      "w-5 h-5 mt-1 flex-shrink-0",
                      isReminderSoon ? "text-brand-primary animate-pulse" : "text-brand-deep-blue/70"
                    )} 
                  />
                  <div>
                    <p className={cn(
                      "text-brand-deep-blue",
                      isReminderSoon && "font-medium"
                    )}>
                      {reminder.title}
                      {isReminderSoon && (
                        <span className="ml-2 text-sm text-brand-primary font-medium">
                          (Coming up soon!)
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-brand-deep-blue/70">
                      {new Date(date).toLocaleString('en-US', {
                        timeZone: 'America/Los_Angeles',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZoneName: 'short'
                      })}
                    </p>
                    {reminder.notes && (
                      <p className="text-sm text-brand-deep-blue/60 mt-1">
                        {reminder.notes}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-brand-deep-blue/70">No upcoming reminders.</p>
        )}
      </div>
    </Card>
  );
};

export default Reminders; 