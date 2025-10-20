"use client";
import React from "react";
import { motion } from "framer-motion";

export const TypingText = ({ text, className }) => {
    return (
        <p className={className}>
            {text.split("").map((char, index) => (
                <motion.span
                    key={char + index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.05 }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char} {/* preserve spaces */}
                </motion.span>
            ))}
        </p>
    );
};
