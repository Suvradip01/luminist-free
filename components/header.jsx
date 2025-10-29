"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useStoreUser } from "./hooks/use-store-users";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import { LayoutDashboard, Zap, Star } from "lucide-react";

export default function Header() {
    const { isLoading } = useStoreUser();
    const path = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        const timer = setInterval(() => {
            setTime(prev => prev + 0.016);
        }, 16);

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(timer);
        };
    }, []);

    if (path.includes("/editor")) {
        return null;
    }

    return (
        <>
            <header
                className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out ${scrolled ? "w-[45%] scale-95" : "w-[50%] scale-100"
                    } max-w-5xl text-nowrap`}
                style={{
                    filter: scrolled ? "drop-shadow(0 25px 50px rgba(168, 85, 247, 0.4))" : "drop-shadow(0 20px 40px rgba(236, 72, 153, 0.3))"
                }}
            >
                {/* Static gradient border (no rotation) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-black via-blue-900 to-purple-700 blur-md" />

                {/* Glass morphism container */}
                <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-1 flex items-center justify-between gap-8 w-full overflow-hidden shadow-2xl">
                    {/* Animated mesh gradient background */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 animate-gradient-x" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-gradient-y" />
                    </div>

                    {/* Logo with hover animation */}
                    <Link href="/" className="flex-shrink-0 relative group z-10">
                        {/* Pulsing ring */}
                        <div className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-75" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-lg" />
                        </div>

                        <div className="relative transform transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6">
                            <Image
                                src="/logo.png"
                                alt="Pixxel Logo"
                                className="min-w-24 object-cover filter group-hover:brightness-125 group-hover:drop-shadow-2xl transition-all duration-500"
                                width={96}
                                height={24}
                            />

                            {/* Sparkles on hover */}
                            <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                            <Star className="absolute -bottom-1 -left-1 w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" style={{ animationDelay: '0.2s' }} />
                        </div>
                    </Link>

                    {/* Center - Features Link */}
                    {path === "/" && (
                        <div className="hidden md:flex space-x-8 flex-1 justify-end z-10">
                            <Link
                                href="#features"
                                className="relative group px-8 py-3"
                            >
                                {/* 3D depth layers */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-purple-600/0 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 blur-xl" />
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/0 via-pink-600/20 to-pink-600/0 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 blur-lg" style={{ transitionDelay: '0.1s' }} />

                                {/* Electric border effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-400/50 animate-pulse-border" />
                                    <div className="absolute inset-0 rounded-2xl border-2 border-pink-400/50 animate-pulse-border" style={{ animationDelay: '0.5s' }} />
                                </div>

                                {/* Particle burst */}
                                <div className="absolute inset-0 overflow-visible">
                                    {[...Array(12)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-particle-burst"
                                            style={{
                                                left: '50%',
                                                top: '50%',
                                                animationDelay: `${i * 0.05}s`,
                                                transform: `rotate(${i * 30}deg)`,
                                            }}
                                        />
                                    ))}
                                </div>

                                <span className="relative flex items-center gap-3 text-white font-medium transition-all duration-300">
                                    <Zap className="w-4 h-4 transition-all duration-500 group-hover:text-yellow-400 group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-glow" />

                                    <span className="relative overflow-hidden">
                                        <span className="inline-block transform transition-all duration-500 group-hover:scale-110 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-orange-300 ease-out">
                                            Features
                                        </span>

                                        {/* Shimmer effect */}
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40 group-hover:animate-shimmer" />
                                    </span>

                                    <Zap className="w-4 h-4 transition-all duration-500 group-hover:text-yellow-400 group-hover:scale-125 group-hover:-rotate-12 group-hover:drop-shadow-glow" />
                                </span>

                                {/* Expanding wave underline */}
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 transition-all duration-500 ease-out group-hover:w-full rounded-full shadow-lg shadow-pink-500/50 animate-pulse-glow" />

                                {/* Corner accents */}
                                <div className="absolute -left-2 -top-2 w-4 h-4 border-t-2 border-l-2 border-purple-400 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                                <div className="absolute -right-2 -bottom-2 w-4 h-4 border-b-2 border-r-2 border-orange-400 rounded-br-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
                            </Link>
                        </div>
                    )}

                    {/* Auth Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0 z-10">
                        <Authenticated>
                            <Link href="/dashboard" className="group relative">
                                {/* Layered glow */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 animate-pulse-slow" />
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-80 blur transition-all duration-500" />

                                <Button variant="primary" className="relative hidden sm:flex transform transition-all duration-500 group-hover:scale-110">
                                    <LayoutDashboard className="h-4 w-4 mr-2 transition-all duration-500 group-hover:rotate-180 opacity-90" />
                                    <span className="hidden md:flex">Dashboard</span>
                                </Button>
                            </Link>

                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8 rounded-lg border border-white/20 transition-all duration-500 hover:border-purple-400 hover:scale-125 hover:rotate-6",
                                        userButtonPopoverCard:
                                            "shadow-xl backdrop-blur-md bg-slate-900/90 border border-white/20",
                                        userPreviewMainIdentifier: "font-semibold text-white",
                                    },
                                }}
                                afterSignOutUrl="/"
                            />
                        </Authenticated>

                        <Unauthenticated>
                            <SignInButton>
                                <div className="group relative">
                                    {/* Animated gradient glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500 animate-gradient-x" />

                                    <Button variant="glass" className="relative hidden sm:flex transform transition-all duration-500 group-hover:scale-110">
                                        Sign In
                                    </Button>
                                </div>
                            </SignInButton>

                            <SignUpButton>
                                <div className="group relative">
                                    {/* Triple layer glow */}
                                    <div className="absolute -inset-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse-slow" />
                                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-gradient-x" />

                                    <Button variant="primary" className="relative transform transition-all duration-500 group-hover:scale-125">
                                        <span className="relative z-10">Get Started</span>
                                    </Button>
                                </div>
                            </SignUpButton>
                        </Unauthenticated>
                    </div>

                    {isLoading && (
                        <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center pb-0">
                            <div className="w-[89%] max-w-[89%]">
                                <BarLoader width="100%" color="#FF00FF" />
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-20px) scale(1.1); }
                }

                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-15px) scale(1.05); }
                }

                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-25px) scale(1.15); }
                }

                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes gradient-y {
                    0%, 100% { background-position: 50% 0%; }
                    50% { background-position: 50% 100%; }
                }

                @keyframes pulse-border {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }

                @keyframes particle-burst {
                    0% { transform: translate(0, 0) scale(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(60px, 0) scale(1); opacity: 0; }
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }

                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.5; box-shadow: 0 0 10px currentColor; }
                    50% { opacity: 1; box-shadow: 0 0 20px currentColor; }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }

                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
                .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
                .animate-gradient-x { background-size: 200% 100%; animation: gradient-x 3s ease infinite; }
                .animate-gradient-y { background-size: 100% 200%; animation: gradient-y 4s ease infinite; }
                .animate-pulse-border { animation: pulse-border 2s ease-in-out infinite; }
                .animate-particle-burst { animation: particle-burst 1s ease-out; }
                .animate-shimmer { animation: shimmer 2s ease-in-out; }
                .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

                .drop-shadow-glow {
                    filter: drop-shadow(0 0 8px currentColor);
                }
            `}</style>
        </>
    );
}