"use client";

import { motion } from "framer-motion";

export const TransactionListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="p-4 bg-card border border-border rounded-lg flex justify-between items-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
          }}
        >
          <div className="flex-1">
            <div className="h-4 w-32 bg-muted rounded mb-2 animate-pulse" />
            <div className="flex gap-4">
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              <div className="h-3 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-6 w-20 bg-muted rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 w-12 bg-muted rounded animate-pulse" />
              <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
