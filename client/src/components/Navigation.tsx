"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export const Navigation = () => {
  const pathname = usePathname();

  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => pathname === path;

  const navItems = isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/transactions", label: "Transactions" },
        { href: "/categories", label: "Categories" },
        { href: "/budget", label: "Budget" },
      ]
    : [];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Budget Tracker
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`pb-2 border-b-2 transition ${
                    isActive(item.href)
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
