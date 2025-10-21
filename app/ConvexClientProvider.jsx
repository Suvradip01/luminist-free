"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({ children }) {
    const { isLoaded } = useAuth();

    // 🧠 Wait until Clerk finishes loading before rendering ConvexProvider
    if (!isLoaded) {
        return (
            <div className="flex h-screen items-center justify-center text-gray-500">
                Loading authentication...
            </div>
        );
    }

    return (
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    );
}
