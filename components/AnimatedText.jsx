"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FlipWords = ({
    words = ["Limitless", "Epic", "Iconic"],
    duration = 3000, // faster transition (was 3000)
    className,
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    // Go to next word automatically
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

    // Get longest word for stable width
    const maxWord = useMemo(
        () => words.reduce((a, b) => (a.length > b.length ? a : b), ""),
        [words]
    );

    return (
        <span
            className={className}
            style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                minWidth: `${maxWord.length}ch`,
                height: "1.2em",
                overflow: "hidden",
                textAlign: "center",
            }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentWord + currentWordIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                        opacity: 0,
                        y: -20,
                        scale: 1.1,
                        filter: "blur(4px)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 160,
                        damping: 14,
                        duration: 0.1, // quicker motion
                    }}
                    style={{
                        position: "absolute",
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    {currentWord.split("").map((letter, index) => (
                        <motion.span
                            key={letter + index}
                            initial={{
                                opacity: 0,
                                y: 10,
                                scale: 0.8,
                                filter: "blur(3px)",
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                            }}
                            transition={{
                                delay: index * 0.03, // slightly faster per letter
                                duration: 0.2,
                                type: "spring",
                                stiffness: 180,
                                damping: 10,
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
