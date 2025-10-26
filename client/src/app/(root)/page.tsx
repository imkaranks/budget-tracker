"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div
        className="min-h-screen py-16 flex flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Take Control of Your <span className="text-primary">Finances</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4/5 mx-auto text-balance">
            Track your income and expenses, set budgets, and achieve your
            financial goals with our intuitive budget tracker.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {[
            {
              title: "Track Transactions",
              desc: "Monitor all your income and expenses in one place",
            },
            {
              title: "Set Budgets",
              desc: "Create monthly budgets and stay on track",
            },
            {
              title: "Visualize Data",
              desc: "See your spending patterns with beautiful charts",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-card border border-border rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-4 flex-col sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="/register"
            className="px-8 py-3 bg-primary hover:bg-primary-dark hover:text-white text-primary-foreground rounded-lg font-medium transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-card border border-border hover:bg-background rounded-lg font-medium transition"
          >
            Sign In
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
