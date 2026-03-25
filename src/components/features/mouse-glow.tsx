"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function MouseGlow() {
    const [isHovered, setIsHovered] = useState(false);

    // Use motion values for better performance
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Add springs for smooth transition/lagged follow effect
    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isHovered) setIsHovered(true);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY, isHovered]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 1 }}
        >
            <motion.div
                className="absolute h-[600px] w-[600px] rounded-full"
                style={{
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />
        </motion.div>
    );
}
