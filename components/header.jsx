"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useStoreUser } from "./hooks/use-store-users";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import { LayoutDashboard } from "lucide-react";

export default function Header() {
    const { isLoading } = useStoreUser();
    const path = usePathname();

    if (path.includes("/editor")) {
        return null; // Hide header on editor page
    }

    return (
        <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap w-[50%] max-w-5xl">
            {/* Center - Glass Navigation Container */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-1 flex items-center justify-between gap-8 w-full">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="Pixxel Logo"
                        className="min-w-24 object-cover"
                        width={96}
                        height={24}
                    />
                </Link>

                {path === "/" && (
                    <div className="hidden md:flex space-x-8 flex-1 justify-center">
                        {[
                            { href: "#features", label: "Features" },
                            { href: "#pricing", label: "Pricing" },
                            { href: "#contact", label: "Contact" },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative group text-white font-medium transition-all duration-300"
                            >
                                {/* Text animation */}
                                <span className="transition-all duration-300 ease-out group-hover:text-purple-500 group-hover:scale-110 inline-block transform">
                                    {item.label}
                                </span>

                                {/* Animated underline */}
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-400 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Auth Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <Authenticated>
                        <Link href="/dashboard">
                            <Button variant="glass" className="hidden sm:flex">
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="hidden md:flex">Dashboard</span>
                            </Button>
                        </Link>

                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 rounded-lg border border-white/20",
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
                            <Button variant="glass" className="hidden sm:flex">
                                Sign In
                            </Button>
                        </SignInButton>

                        <SignUpButton>
                            <Button variant="primary">Get Started</Button>
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
    );
}