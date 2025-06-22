"use client";

import { Button } from "@/components/ui/Button";
import { Mic, KeyRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Something went wrong.');
    } else {
      // In a real app, use a more secure session method (e.g., httpOnly cookies)
      localStorage.setItem('user', JSON.stringify(data));
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-card-bg rounded-card shadow-card backdrop-blur-lg border border-card-border">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary">Welcome Back</h2>
        <p className="mt-2 text-text-secondary">Sign in to access your dashboard.</p>
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/50 border border-card-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="#" className="font-medium text-accent-blue hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </div>
        <div className="text-sm text-center">
          <p className="text-text-secondary">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-accent-blue hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 