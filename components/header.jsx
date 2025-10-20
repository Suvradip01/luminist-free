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


export default function Header() {

    const { isLoading } = useStoreUser();
    const path = usePathname();

    if (path.includes("/editor")) {
        return null; // Hide header on editor page
    }

    return (
        <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
            {/* Center - Glass Navigation Container */}

            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-1 flex items-center justify-between gap-20">
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
                    <Unauthenticated>
                        <SignInButton>
                            <Button variant="glass" className="hidden sm:flex">Sign In</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button variant="primary">Get Started</Button>
                        </SignUpButton>
                    </Unauthenticated>
                    <Authenticated>
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
                </div>
                {isLoading && (
                    <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
                        <BarLoader width={"89%"} color="#FF00FF" />
                    </div>
                )}
            </div>
        </header>
    );
}