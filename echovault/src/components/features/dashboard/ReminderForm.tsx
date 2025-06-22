"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ReminderFormProps {
  onReminderAdded: () => void;
}

export function ReminderForm({ onReminderAdded }: ReminderFormProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: "2", // TODO: Replace with actual user ID from auth
          title,
          date: date || new Date().toISOString(),
          notes
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reminder');
      }

      // Clear form
      setTitle('');
      setDate('');
      setNotes('');
      
      // Notify parent to refresh reminders
      onReminderAdded();
    } catch (error) {
      console.error('Error creating reminder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Reminder title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="datetime-local"
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <Textarea
          placeholder="Additional notes (optional)"
          value={notes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
          className="w-full"
          rows={3}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Adding...' : 'Add Reminder'}
      </Button>
    </form>
  );
} 