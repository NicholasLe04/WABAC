import SignUpForm from "@/components/features/auth/SignUpForm";
import { Brain } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <div className="flex items-center gap-2 mb-8">
        <Brain className="w-10 h-10" />
        <span className="text-3xl font-bold">WABAC</span>
      </div>
      <SignUpForm />
    </div>
  );
} 