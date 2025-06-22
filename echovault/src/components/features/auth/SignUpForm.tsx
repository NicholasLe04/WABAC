"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Something went wrong.');
    } else {
      setMessage("Registration successful! You will be redirected to login.");
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-card-bg rounded-card shadow-card backdrop-blur-lg border border-card-border">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary">Create an Account</h2>
        <p className="mt-2 text-text-secondary">Start your journey with EchoVault.</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white/50 border border-card-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/50 border border-card-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-text-secondary">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/50 border border-card-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </form>
      <div className="text-sm text-center">
        <p className="text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent-blue hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm; 