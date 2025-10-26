"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Transaction } from "@/types";
import { transactionService } from "@/services/transactions";
import { TransactionFilters } from "./TransactionFilters";
import { TransactionModal } from "./TransactionModal";
import { TransactionListSkeleton } from "./skeletons/TransactionListSkeleton";

export const TransactionListWithFilters = ({
  refreshTrigger,
}: {
  refreshTrigger?: boolean;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await transactionService.getTransactions({
          ...filters,
          page,
          limit,
        });
        setTransactions(data.transactions);
        setTotal(data.total);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [page, limit, filters, refreshKey]);

  useEffect(() => {
    if (refreshTrigger !== undefined) {
      setRefreshKey((prev) => prev + 1);
    }
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      try {
        await transactionService.deleteTransaction(id);
        setTransactions(transactions.filter((t) => t.id !== id));
      } catch (err) {
        console.error("Failed to delete transaction:", err);
      }
    }
  };

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleSuccess = () => {
    console.log(refreshKey);
    setRefreshKey((prev) => prev + 1);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };

  // if (loading && transactions.length === 0) {
  //   return <TransactionListSkeleton count={5} />;
  // }

  return (
    <div>
      <TransactionFilters onFilterChange={handleFilterChange} />

      {loading && transactions.length === 0 ? (
        <TransactionListSkeleton count={5} />
      ) : (
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-lg">
              No transactions found
            </div>
          ) : (
            <>
              {transactions.map((tx, idx) => (
                <motion.div
                  key={tx.id}
                  className="p-4 bg-card border border-border rounded-lg flex justify-between items-center hover:border-primary transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex-1">
                    <p className="font-medium">
                      {tx.description || "No description"}
                    </p>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{tx.category?.name}</span>
                      <span>{new Date(tx.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p
                      className={`font-semibold text-lg ${
                        tx.type === "income" ? "text-success" : "text-danger"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        // onClick={() => setEditingId(tx.id)}
                        onClick={() => handleEditClick(tx)}
                        className="px-3 py-1 bg-primary hover:bg-primary-dark hover:text-white text-primary-foreground rounded text-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="px-3 py-1 bg-danger hover:bg-danger/80 text-white rounded text-sm transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Pagination */}
              {total > limit && (
                <div className="flex justify-between items-center mt-6 p-4 bg-card border border-border rounded-lg">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-background border border-border rounded-lg disabled:opacity-50 hover:bg-card transition"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {Math.ceil(total / limit)} ({total} total)
                  </span>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= Math.ceil(total / limit)}
                    className="px-4 py-2 bg-background border border-border rounded-lg disabled:opacity-50 hover:bg-card transition"
                  >
                    Next
                  </button>
                </div>
              )}

              <TransactionModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                transaction={selectedTransaction || undefined}
                onSuccess={handleSuccess}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
