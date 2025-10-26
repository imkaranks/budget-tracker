"use client";

import { motion } from "framer-motion";

interface CategoryItemSkeletonProps {
  count?: number;
}

export const CategoryItemSkeleton = ({
  count = 4,
}: CategoryItemSkeletonProps) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
          }}
        >
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-muted rounded" />
            <div className="h-8 w-8 bg-muted rounded" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
