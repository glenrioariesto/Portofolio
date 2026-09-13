"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface NumberTickerProps {
    value: number;
    suffix?: string;
    prefix?: string;
    className?: string;
    delay?: number;
    decimalPlaces?: number;
}

export function NumberTicker({
    value,
    suffix = "",
    prefix = "",
    className = "",
    delay = 0,
    decimalPlaces = 0,
}: NumberTickerProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 26,
        stiffness: 75,
    });
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                motionValue.set(value);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, delay, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${latest.toFixed(decimalPlaces)}${suffix}`;
            }
        });
    }, [springValue, decimalPlaces, prefix, suffix]);

    return (
        <span
            ref={ref}
            className={`inline-block tabular-nums tracking-tight ${className}`}
        >
            {prefix}0{suffix}
        </span>
    );
}
export default NumberTicker;
