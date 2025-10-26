"use client";

import { motion } from "framer-motion";

export const BudgetCardSkeleton = () => {
  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-32 bg-muted-foreground rounded-lg animate-pulse" />
        <div className="h-10 w-24 bg-muted-foreground rounded-lg animate-pulse" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-muted-foreground rounded-lg">
            <div className="h-4 w-12 bg-card rounded mb-2 animate-pulse" />
            <div className="h-8 w-20 bg-card rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="h-4 w-32 bg-muted-foreground rounded mb-2 animate-pulse" />
        <div className="w-full h-3 bg-muted-foreground rounded-full animate-pulse" />
      </div>

      <div className="p-4 bg-muted-foreground rounded-lg h-12 animate-pulse" />
    </motion.div>
  );
};
