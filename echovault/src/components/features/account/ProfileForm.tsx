"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const ProfileForm = () => {
  const [user, setUser] = useState<any>(null);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const currentUser = JSON.parse(userJson);
      setUser(currentUser);
      setPhone(currentUser.phone || '');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile.');
      }

      // Update local storage with the new user data
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      setMessage('Profile updated successfully!');
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2 bg-black/5 border border-card-border rounded-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-text-secondary">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g., +1 555-555-5555"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 bg-white/50 border border-card-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
             <p className="text-xs text-text-secondary">Used for notifications and account recovery.</p>
          </div>
          <div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
          {message && <p className="text-sm text-accent-blue">{message}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm; 