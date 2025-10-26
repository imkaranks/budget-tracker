"use client"

import { motion } from "framer-motion"

interface SkeletonLoaderProps {
  count?: number
  height?: string
  width?: string
  className?: string
}

export const SkeletonLoader = ({
  count = 1,
  height = "h-12",
  width = "w-full",
  className = "",
}: SkeletonLoaderProps) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`${width} ${height} bg-card rounded-lg mb-4`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      ))}
    </div>
  )
}
