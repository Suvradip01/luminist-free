"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const DemoInterface = () => {
    const [demoHovered, setDemoHovered] = useState(false);
    const [textVisible, setTextVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setTextVisible(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const tools = [
        { icon: "✂️", label: "Crop" },
        { icon: "📐", label: "Resize" },
        { icon: "🎨", label: "Adjust" },
        { icon: "🤖", label: "AI Tools" },
    ];

    return (
        <motion.div
            className="relative max-w-4xl mx-auto"
            style={{ perspective: "1200px" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 40 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <motion.div
                className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 transform-gpu`}
                whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: 5,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.2)",
                }}
                transition={{ type: "spring", stiffness: 100, damping: 12 }}
                onMouseEnter={() => setDemoHovered(true)}
                onMouseLeave={() => setDemoHovered(false)}
            >
                <motion.div
                    className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 min-h-96"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-gray-400 text-sm font-medium">Luminist</div>
                    </div>

                    {/* Tools */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {tools.map((tool, index) => (
                            <motion.div
                                key={index}
                                className="backdrop-blur-lg bg-white/5 rounded-xl p-4 text-center cursor-pointer"
                                whileHover={{
                                    scale: 1.15,
                                    backgroundColor: "rgba(255,255,255,0.15)",
                                    boxShadow: "0 10px 20px rgba(255,255,255,0.2)",
                                }}
                                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                                title={tool.label}
                            >
                                <div className="text-2xl mb-1">{tool.icon}</div>
                                <div className="text-xs text-gray-400 font-semibold">{tool.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Canvas */}
                    <div className="flex items-center justify-center">
                        <motion.div
                            className="w-full h-48 bg-gradient-to-r from-orange-500 via-pink-600 to-orange-400 rounded-2xl shadow-2xl shadow-pink-500/50 flex items-center justify-center text-white font-bold text-xl select-none"
                            whileHover={{
                                scale: 1.03,
                                rotateZ: 1,
                                boxShadow: "0 30px 50px rgba(255,105,180,0.4)",
                            }}
                            transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        >
                            Your Canvas
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
