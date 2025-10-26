"use client";

import { motion } from "framer-motion";

export const SummaryCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
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
          <div className="h-4 w-24 bg-muted rounded mb-4" />
          <div className="h-8 w-32 bg-muted rounded" />
        </motion.div>
      ))}
    </div>
  );
};
