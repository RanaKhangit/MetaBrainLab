"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}

const directionMap = {
  up: { y: 30, x: 0 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
};

export function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: ScrollRevealProps) {
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
