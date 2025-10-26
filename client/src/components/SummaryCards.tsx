"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { summaryService } from "@/services/summary";
import { SkeletonLoader } from "./SkeletonLoader";

interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export const SummaryCards = () => {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const summary = await summaryService.getMonthlysSummary();
        setData(summary);
      } catch (err) {
        console.error("Failed to load summary:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <SkeletonLoader count={3} height="h-24" />;
  }

  if (!data) {
    return null;
  }

  const cards = [
    {
      title: "Total Income",
      value: data.totalIncome,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Total Expenses",
      value: data.totalExpenses,
      color: "text-danger",
      bgColor: "bg-danger/10",
    },
    {
      title: "Balance",
      value: data.balance,
      color: data.balance >= 0 ? "text-success" : "text-danger",
      bgColor: data.balance >= 0 ? "bg-success/10" : "bg-danger/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          className={`${card.bgColor} border border-border rounded-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-muted-foreground text-sm mb-2">{card.title}</p>
          <p className={`text-3xl font-bold ${card.color}`}>
            ${card.value.toFixed(2)}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
