"use client";

import { motion } from "framer-motion";

export const HeaderSkeleton = () => {
  return (
    <motion.div
      className="flex justify-between items-center mb-8"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
    >
      <div className="space-y-3">
        <div className="h-10 w-48 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted rounded" />
      </div>
      <div className="flex gap-4">
        <div className="h-10 w-32 bg-muted rounded" />
        <div className="h-10 w-24 bg-muted rounded" />
      </div>
    </motion.div>
  );
};
