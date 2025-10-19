"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";


export default function Header() {

    const path = usePathname();

    if (path.includes("/editor")) {
        return null; // Hide header on editor page
    }

    return (
        <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
            {/* Center - Glass Navigation Container */}

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-3 flex items-center justify-between gap-8">
                {/* Logo */}
                <Link href="/" className="mr-10 md:mr-20">
                    <Image
                        src="/logo.png"
                        alt="Pixxel Logo"
                        className="min-w-24 object-cover"
                        width={96}
                        height={24}
                    />
                </Link>

                {path === "/" && (
                    <div className="hidden md:flex space-x-6">
                        <Link
                            href="#features"
                            className="text-white font-medium transition-all duration-300 hover:text-amber-400 cursor-pointer"
                        >
                            Features
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-white font-medium transition-all duration-300 hover:text-amber-400 cursor-pointer"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#contact"
                            className="text-white font-medium transition-all duration-300 hover:text-amber-400 cursor-pointer"
                        >
                            Contact
                        </Link>
                    </div>
                )}

                <div className="flex items-center gap-3 ml-10 md:ml-20">
                    <SignedOut>
                        <SignInButton>
                            <Button variant="glass" className="hidden sm:flex">Sign In</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button variant="primary">Get Started</Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
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
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}