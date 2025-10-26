"use client";

import { motion } from "framer-motion";

interface FormInputSkeletonProps {
  count?: number;
}

export const FormInputSkeleton = ({ count = 4 }: FormInputSkeletonProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="space-y-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
          }}
        >
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-10 w-full bg-muted rounded-lg" />
        </motion.div>
      ))}
    </div>
  );
};
