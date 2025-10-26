"use client";

import { motion } from "framer-motion";

export const ChartSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <motion.div
        className="h-8 w-32 bg-muted rounded mb-6"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex items-end gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
            }}
          >
            <motion.div
              className="flex-1 bg-muted rounded"
              style={{ height: `${Math.random() * 100 + 40}px` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
