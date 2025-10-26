"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { BudgetCard } from "@/components/BudgetCard";
import { BudgetChart } from "@/components/BudgetChart";

export default function BudgetPage() {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">Budget Management</h1>
              <p className="text-muted-foreground mt-2">
                Set and track your monthly budget
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-card border border-border hover:bg-background rounded-lg transition"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-danger hover:bg-danger/80 text-white rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Budget Card and Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BudgetCard onUpdate={() => setRefreshKey((prev) => prev + 1)} />
            <BudgetChart refreshKey={refreshKey} />
          </div>

          {/* Budget Tips */}
          <motion.div
            className="mt-8 bg-card border border-border rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Budget Tips</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>
                  Set a realistic budget based on your income and expenses
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Review your spending regularly to stay on track</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>
                  Categorize your expenses to identify spending patterns
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Adjust your budget monthly based on actual spending</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
