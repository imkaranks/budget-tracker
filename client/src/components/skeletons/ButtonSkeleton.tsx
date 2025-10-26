"use client";

import { motion } from "framer-motion";

interface ButtonSkeletonProps {
  width?: string;
  count?: number;
}

export const ButtonSkeleton = ({
  width = "w-32",
  count = 1,
}: ButtonSkeletonProps) => {
  return (
    <div className="flex gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`${width} h-10 bg-muted rounded-lg`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};
