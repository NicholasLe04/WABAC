import SignUpForm from "@/components/features/auth/SignUpForm";
import { BrainCircuit } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand-lavender to-brand-soft-beige p-4">
      <div className="flex items-center gap-2 mb-8 text-brand-deep-blue">
        <BrainCircuit className="w-10 h-10" />
        <span className="text-3xl font-bold">EchoVault</span>
      </div>
      <SignUpForm />
    </div>
  );
} 