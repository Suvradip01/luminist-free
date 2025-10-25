"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FlipWords } from "./AnimatedText";
import { TypingText } from "./TypingText";
import { Crop, Paintbrush, Scaling, Wand2 } from "lucide-react";

const HeroSection = () => {
    const [textVisible, setTextVisible] = useState(false);
    const [demoHovered, setDemoHovered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setTextVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10 px-6">
                <div
                    className={`transition-all duration-1000 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-orange-400 via-pink-600 to-orange-400 bg-clip-text text-transparent animate-pulse">
                            Create
                        </span>
                        <br />
                        <FlipWords
                            words={["Limitless", "Epic", "Iconic"]}
                            className="text-white text-7xl font-bold"
                        />

                    </h1>

                    <TypingText
                        text="Effortlessly edit & enhance your photos with smart AI tools for flawless results."
                        className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
                    />


                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <Link href="/dashboard">
                            <Button variant="tertiary" size="xl">
                                Start Crafting
                            </Button>
                        </Link>
                    </div>
                </div>
                {/* 3D Demo Interface */}
                <div
                    className={`relative max-w-5xl mx-auto transition-all duration-1000 ${textVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-20"
                        }`}
                    style={{ perspective: "2000px" }}
                >
                    <div
                        className={`relative transition-all duration-700 ease-out ${demoHovered ? "scale-105" : ""}`}
                        onMouseEnter={() => setDemoHovered(true)}
                        onMouseLeave={() => setDemoHovered(false)}
                        style={{
                            transformStyle: "preserve-3d",
                            transform: demoHovered ? "rotateX(5deg) rotateY(-5deg)" : "rotateX(0deg) rotateY(0deg)"
                        }}
                    >
                        {/* Enhanced Glow effect with multiple layers */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-60 animate-pulse"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-amber-500/10 rounded-3xl blur-2xl opacity-40 animate-pulse" style={{ animationDelay: "0.5s" }}></div>

                        {/* Outer glass container */}
                        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/30 rounded-3xl p-1 shadow-2xl">
                            {/* Inner container with premium gradient */}
                            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 relative overflow-hidden">
                                {/* Animated background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-50"></div>
                                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Header with Sequential Animated Traffic Lights */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex space-x-3">
                                            {/* Red Light */}
                                            <div className="relative group">
                                                <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-0 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
                                                <div className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-lg shadow-red-500/50 transition-all hover:scale-125 animate-pulse relative z-10" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
                                                <div className="absolute inset-0 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
                                            </div>
                                            {/* Yellow Light */}
                                            <div className="relative group">
                                                <div className="absolute inset-0 bg-yellow-500 rounded-full blur-md opacity-0 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                                                <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50 transition-all hover:scale-125 animate-pulse relative z-10" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                                                <div className="absolute inset-0 w-3.5 h-3.5 bg-yellow-500 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                                            </div>
                                            {/* Green Light */}
                                            <div className="relative group">
                                                <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-0 animate-pulse" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
                                                <div className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-lg shadow-green-500/50 transition-all hover:scale-125 animate-pulse relative z-10" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
                                                <div className="absolute inset-0 w-3.5 h-3.5 bg-green-500 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
                                            </div>
                                        </div>
                                        <div className="relative group cursor-pointer">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-xl opacity-50 animate-pulse group-hover:opacity-70 transition-opacity"></div>
                                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                            <div className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold text-xl tracking-widest animate-pulse px-3 py-1">
                                                LUMINIST
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tools Grid */}
                                    <div className="grid grid-cols-4 gap-5 mb-8">
                                        {[
                                            {
                                                Icon: Crop,
                                                label: "Crop",
                                                gradient: "from-blue-500 via-cyan-400 to-teal-400",
                                                shadow: "shadow-blue-500/50",
                                                hoverGlow: "group-hover:shadow-blue-500"
                                            },
                                            {
                                                Icon: Scaling,
                                                label: "Resize",
                                                gradient: "from-purple-500 via-pink-500 to-rose-400",
                                                shadow: "shadow-purple-500/50",
                                                hoverGlow: "group-hover:shadow-purple-500"
                                            },
                                            {
                                                Icon: Paintbrush,
                                                label: "Adjust",
                                                gradient: "from-orange-500 via-amber-400 to-yellow-400",
                                                shadow: "shadow-orange-500/50",
                                                hoverGlow: "group-hover:shadow-orange-500"
                                            },
                                            {
                                                Icon: Wand2,
                                                label: "AI Tools",
                                                gradient: "from-emerald-500 via-green-400 to-teal-400",
                                                shadow: "shadow-emerald-500/50",
                                                hoverGlow: "group-hover:shadow-emerald-500"
                                            },
                                        ].map((tool, index) => (
                                            <div
                                                key={index}
                                                className={`group relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.03] rounded-3xl p-7 text-center transition-all duration-700 ease-out cursor-pointer border border-white/30 hover:border-white/60 hover:scale-[1.15] hover:-translate-y-3 ${tool.shadow} hover:shadow-2xl ${tool.hoverGlow}`}
                                                style={{
                                                    transformStyle: "preserve-3d",
                                                    transform: demoHovered ? `translateZ(${30 + index * 15}px) rotateY(${index * 2}deg)` : "translateZ(0px)",
                                                    transitionDelay: `${index * 75}ms`
                                                }}
                                                title={tool.label}
                                            >
                                                {/* Multi-layer animated background */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-40 rounded-3xl transition-all duration-700 blur-2xl scale-90 group-hover:scale-110`}></div>
                                                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-all duration-700`}></div>

                                                {/* Rotating border gradient */}
                                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} rounded-3xl blur-sm animate-spin-slow`} style={{ animationDuration: '3s' }}></div>
                                                </div>

                                                {/* Shine sweep effect */}
                                                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                                </div>

                                                {/* Icon container with 3D effect */}
                                                <div className="relative mb-4 flex justify-center items-center h-12">
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-30 blur-xl rounded-full transition-all duration-500 scale-75 group-hover:scale-150`}></div>
                                                    <tool.Icon
                                                        className={`relative w-10 h-10 transition-all duration-700 ease-out group-hover:scale-125 group-hover:rotate-[360deg] text-gray-300 group-hover:text-white drop-shadow-lg group-hover:drop-shadow-2xl`}
                                                        strokeWidth={2}
                                                        style={{
                                                            filter: 'drop-shadow(0 0 20px currentColor)',
                                                        }}
                                                    />
                                                </div>

                                                {/* Label with gradient on hover */}
                                                <div className={`relative text-sm font-bold text-gray-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${tool.gradient} transition-all duration-500 tracking-wider uppercase`}>
                                                    {tool.label}
                                                </div>

                                                {/* Floating particle effects */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                                    <div className={`absolute top-3 right-3 w-1.5 h-1.5 bg-gradient-to-r ${tool.gradient} rounded-full animate-ping`}></div>
                                                    <div className={`absolute bottom-3 left-3 w-1.5 h-1.5 bg-gradient-to-r ${tool.gradient} rounded-full animate-ping`} style={{ animationDelay: "0.3s" }}></div>
                                                    <div className={`absolute top-1/2 left-3 w-1 h-1 bg-gradient-to-r ${tool.gradient} rounded-full animate-ping`} style={{ animationDelay: "0.6s" }}></div>
                                                    <div className={`absolute top-3 left-1/2 w-1 h-1 bg-gradient-to-r ${tool.gradient} rounded-full animate-ping`} style={{ animationDelay: "0.9s" }}></div>
                                                </div>

                                                {/* Corner accents */}
                                                <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    <div className={`absolute top-2 left-2 w-3 h-0.5 bg-gradient-to-r ${tool.gradient} rounded-full`}></div>
                                                    <div className={`absolute top-2 left-2 w-0.5 h-3 bg-gradient-to-b ${tool.gradient} rounded-full`}></div>
                                                </div>
                                                <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                    <div className={`absolute bottom-2 right-2 w-3 h-0.5 bg-gradient-to-r ${tool.gradient} rounded-full`}></div>
                                                    <div className={`absolute bottom-2 right-2 w-0.5 h-3 bg-gradient-to-b ${tool.gradient} rounded-full`}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Canvas Preview - Enhanced */}
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-rose-600 to-violet-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                                        <div
                                            className="relative w-full h-64 bg-gradient-to-br from-orange-500 via-pink-600 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden border border-white/20 group-hover:border-white/40 transition-all duration-500"
                                            style={{
                                                transformStyle: "preserve-3d",
                                                transform: demoHovered ? "translateZ(30px)" : "translateZ(0px)"
                                            }}
                                        >
                                            {/* Animated shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                            {/* Grid pattern overlay */}
                                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                                            {/* Floating orbs */}
                                            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                                            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>

                                            <div className="relative z-10 text-white font-bold text-2xl tracking-wider drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                                Your Canvas
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;