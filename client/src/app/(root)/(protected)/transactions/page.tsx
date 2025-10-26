"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionListWithFilters } from "@/components/TransactionListWithFilters";

export default function TransactionsPage() {
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

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
              <h1 className="text-4xl font-bold">Transactions</h1>
              <p className="text-muted-foreground mt-2">
                Manage your income and expenses
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

          {/* Add Transaction Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-card border border-border rounded-lg max-w-md p-6 w-full"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Add New Transaction</h2>
                    <button
                      onClick={() => setShowForm(false)}
                      className="text-muted-foreground hover:text-foreground transition"
                    >
                      ✕
                    </button>
                  </div>
                  <TransactionForm
                    onSuccess={() => {
                      setShowForm(false);
                      setRefreshList(!refreshList);
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Transaction Button */}
          <motion.button
            onClick={() => setShowForm(true)}
            className="mb-8 px-6 py-3 bg-primary hover:bg-primary-dark hover:text-white text-primary-foreground rounded-lg font-medium transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={showForm}
          >
            + Add Transaction
          </motion.button>

          {/* Transactions List */}
          <TransactionListWithFilters refreshTrigger={refreshList} />
        </div>
      </motion.div>
    </div>
  );
}
