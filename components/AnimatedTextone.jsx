"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedWords = ({
    words = ["Without Limits"],
    duration = 3000,
    className,
    animationStyle = "wave"
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

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

    const wordVariants = {
        wave: {
            initial: { opacity: 0, y: 20, rotateX: -90 },
            animate: { opacity: 1, y: 0, rotateX: 0 },
            exit: { opacity: 0, y: -20, rotateX: 90, scale: 0.8, filter: "blur(8px)" }
        },
        bounce: {
            initial: { opacity: 0, scale: 0, rotate: -180 },
            animate: { opacity: 1, scale: 1, rotate: 0 },
            exit: { opacity: 0, scale: 0, rotate: 180, y: -30 }
        },
        flip: {
            initial: { opacity: 0, rotateY: 90, scale: 0.5 },
            animate: { opacity: 1, rotateY: 0, scale: 1 },
            exit: { opacity: 0, rotateY: -90, scale: 0.5, filter: "blur(6px)" }
        },
        rotate: {
            initial: { opacity: 0, rotate: 45, scale: 0.3 },
            animate: { opacity: 1, rotate: 0, scale: 1 },
            exit: { opacity: 0, rotate: -45, scale: 0.3, x: 100 }
        },
        elastic: {
            initial: { opacity: 0, scaleX: 0, x: -50 },
            animate: { opacity: 1, scaleX: 1, x: 0 },
            exit: { opacity: 0, scaleX: 0, x: 50, filter: "blur(4px)" }
        },
        slide: {
            initial: { opacity: 0, x: -100, skewX: -10 },
            animate: { opacity: 1, x: 0, skewX: 0 },
            exit: { opacity: 0, x: 100, skewX: 10, filter: "blur(5px)" }
        }
    };

    const letterVariants = {
        wave: (index) => ({
            initial: { opacity: 0, y: 20, filter: "blur(8px)" },
            animate: {
                opacity: 1,
                y: [20, -5, 0],
                filter: "blur(0px)",
                transition: {
                    delay: index * 0.04,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }
            }
        }),
        bounce: (index) => ({
            initial: { opacity: 0, scale: 0, y: -20 },
            animate: {
                opacity: 1,
                scale: [0, 1.3, 1],
                y: [-20, 10, 0],
                transition: {
                    delay: index * 0.05,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                }
            }
        }),
        flip: (index) => ({
            initial: { opacity: 0, rotateX: -90, z: -50 },
            animate: {
                opacity: 1,
                rotateX: 0,
                z: 0,
                transition: {
                    delay: index * 0.06,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                }
            }
        }),
        rotate: (index) => ({
            initial: { opacity: 0, rotate: 180, scale: 0 },
            animate: {
                opacity: 1,
                rotate: [180, -10, 0],
                scale: [0, 1.2, 1],
                transition: {
                    delay: index * 0.03,
                    duration: 0.7,
                    ease: "backOut"
                }
            }
        }),
        elastic: (index) => ({
            initial: { opacity: 0, scaleY: 0, y: 20 },
            animate: {
                opacity: 1,
                scaleY: [0, 1.4, 0.9, 1.1, 1],
                y: 0,
                transition: {
                    delay: index * 0.05,
                    duration: 0.8,
                    ease: "easeOut"
                }
            }
        }),
        slide: (index) => ({
            initial: { opacity: 0, x: -30, rotateZ: -15 },
            animate: {
                opacity: 1,
                x: 0,
                rotateZ: 0,
                transition: {
                    delay: index * 0.04,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 180,
                    damping: 18
                }
            }
        })
    };

    const currentVariant = wordVariants[animationStyle] || wordVariants.wave;
    const currentLetterVariant = letterVariants[animationStyle] || letterVariants.wave;

    return (
        <span className={className} style={{ display: "inline-block", position: "relative" }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentWord + currentWordIndex}
                    initial={currentVariant.initial}
                    animate={currentVariant.animate}
                    exit={currentVariant.exit}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        duration: 0.5
                    }}
                    style={{
                        display: "inline-block",
                        transformOrigin: "center center",
                        perspective: "1000px"
                    }}
                >
                    {currentWord.split("").map((letter, index) => {
                        const variant = currentLetterVariant(index);
                        return (
                            <motion.span
                                key={letter + index}
                                initial={variant.initial}
                                animate={variant.animate}
                                className="inline-block"
                                style={{
                                    transformOrigin: "center center",
                                    perspective: "1000px"
                                }}
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        );
                    })}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};