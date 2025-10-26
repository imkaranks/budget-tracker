"use client";

import { motion } from "framer-motion";

interface BudgetItemSkeletonProps {
  count?: number;
}

export const BudgetItemSkeleton = ({ count = 3 }: BudgetItemSkeletonProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-card border border-border rounded-lg p-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-6 w-20 bg-muted rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-muted rounded-full" />
            <div className="flex justify-between">
              <div className="h-3 w-16 bg-muted rounded" />
              <div className="h-3 w-16 bg-muted rounded" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
