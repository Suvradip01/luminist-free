"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FlipWords = ({ words = ["Without Limits"], duration = 3000, className }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Automatically go to next word
    const nextWord = useCallback(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, [words.length]);

    useEffect(() => {
        if (words.length > 1) {
            const timer = setTimeout(() => nextWord(), duration);
            return () => clearTimeout(timer);
        }
    }, [currentWordIndex, duration, nextWord, words.length]);

    const currentWord = words[currentWordIndex];

    return (
        <span className={className} style={{ display: "inline-block", position: "relative" }}>
            <AnimatePresence exitBeforeEnter>
                <motion.span
                    key={currentWord + currentWordIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)", scale: 1.2, position: "absolute" }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                    style={{ display: "inline-block" }}
                >
                    {currentWord.split("").map((letter, index) => (
                        <motion.span
                            key={letter + index}
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)", scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1, rotate: 0 }}
                            transition={{
                                delay: index * 0.05,
                                duration: 0.3,
                                type: "spring",
                                stiffness: 120,
                                damping: 12,
                            }}
                            className="inline-block"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};
