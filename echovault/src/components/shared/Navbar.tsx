"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrainCircuit, LayoutDashboard, BarChart3, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/account", label: "Account", icon: User },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check for user session in localStorage
    const userJson = localStorage.getItem('user');
    if (userJson) {
      setUser(JSON.parse(userJson));
    }
  }, [pathname]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push("/");
  };

  return (
    <header className="bg-card-bg/80 backdrop-blur-lg border-b border-card-border sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-text-primary">
          <BrainCircuit className="w-8 h-8" />
          <span>EchoVault</span>
        </Link>
        {user && (
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 transition-colors hover:text-text-primary ${
                    isActive ? "text-text-primary font-semibold" : "text-text-secondary"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
        <div className="flex items-center gap-4">
          {user ? (
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log out</span>
            </Button>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-btn text-sm font-medium hover:text-text-primary transition-colors">
                Login
              </Link>
              <Button onClick={() => router.push('/signup')}>
                Try EchoVault
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar; 