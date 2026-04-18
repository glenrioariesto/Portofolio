"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/10 backdrop-blur-[2px] z-[9999]">
      <motion.div
        className="h-full bg-gradient-to-r from-amber-400 via-amber-600 to-amber-900 origin-left shadow-[0_0_10px_rgba(217,119,6,0.5)]"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ScrollProgress;
