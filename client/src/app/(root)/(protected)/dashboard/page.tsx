"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { TransactionList } from "@/components/TransactionList";
import { SummaryCards } from "@/components/SummaryCards";
import { IncomeExpenseChart } from "@/components/IncomeExpenseChart";
import { ExpenseChart } from "@/components/ExpenseChart";
import { PageTransition } from "@/components/PageTransition";

export default function DashboardPage() {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const router = useRouter();
  const [refreshTransactions, setRefreshTransactions] = useState(false);

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
    <PageTransition>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                  Welcome back, {user?.name || user?.email}
                </p>
              </motion.div>
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/transactions"
                  className="px-4 py-2 bg-card border border-border hover:bg-background rounded-lg transition"
                >
                  Manage Transactions
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-danger hover:bg-danger/80 text-white rounded-lg transition"
                >
                  Logout
                </button>
              </motion.div>
            </div>

            {/* Summary Cards */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <SummaryCards />
            </motion.div>

            {/* Charts */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <IncomeExpenseChart />
              <ExpenseChart />
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-bold mb-6">Recent Transactions</h2>
              <TransactionList refresh={refreshTransactions} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
