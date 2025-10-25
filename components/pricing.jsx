"use client";
import { useAuth } from '@clerk/nextjs'
import React, { useState } from 'react'
import useIntersectionObserver from './hooks/use-Intersection-Observer';
import { Button } from './ui/button';
import { toast } from 'sonner';

const PricingCard = ({
    id,
    plan,
    price,
    features,
    featured = false,
    planId,
    buttonText,
}) => {
    const [ref, isVisible] = useIntersectionObserver();
    const [isHovered, setIsHovered] = useState(false);
    const { has } = useAuth();
    // Check if user has this specific plan
    const isCurrentPlan = id ? has?.({ plan: id }) : false;

    const handlePopup = async () => {
        // If the current plan is active, no need to open checkout
        if (isCurrentPlan) return;

        try {
            // Check if Clerk is loaded
            if (window.Clerk && window.Clerk.__internal_openCheckout) {

                // Check if a user is signed in
                const user = window.Clerk.user;
                if (!user) {
                    toast.error("You must be signed in to subscribe.");
                    return;
                }

                await window.Clerk.__internal_openCheckout({
                    planId: planId,
                    planPeriod: "month",
                    subscriberType: "user",
                });
            } else {
                console.warn("Clerk checkout function not available.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Something went wrong: " + error.message);
        }
    };

    return (
        <div
            ref={ref}
            className={`backdrop-blur-lg border rounded-3xl p-8 transition-all duration-700 cursor-pointer 
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${isHovered ? "transform scale-115 rotate-1 z-10" : ""}
                ${featured
                    ? "bg-gradiant-to-b from-blue-500/20 to-purple-600/20 border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-105"
                    : "bg-white/5 border-white/10"
                }
                `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded text-sm font-bold">
                        Most Popular
                    </div>
                </div>

            )}
            <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-6">
                    ${price}
                    {price > 0 && <span className="text-lg text-gray-400">/month</span>}
                </div>
                <ul className="space-y-3 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                            <span className="text-green-400 mr-3">✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>

                <Button
                    variant={featured ? "primary" : "glass"}
                    className="w-full"
                    onClick={handlePopup}
                    disabled={isCurrentPlan || !planId}
                >
                    {isCurrentPlan ? "Current Plan" : buttonText}
                </Button>

            </div>
        </div>
    );
};


const Pricing = () => {

    const plans = [
        {
            id: "free_user",
            plan: "Free",
            price: 0,
            features: [
                "5 projects maximum",
                "15 exports per month",
                "Basic crop & resize",
                "Color adjustments",
            ],
            buttonText: "Get Started Free",
        },
        {
            id: "pro",
            plan: "Pro",
            price: 1.99,
            features: [
                "Unlimited projects",
                "Unlimited exports",
                "All Editing Tools",
                "AI Background Remover",
            ],
            featured: true,
            planId: "cplan_34Xsqx2DYKOeRVvt3w79f3UCSCS",
            buttonText: "Upgrade to Pro",
        },
    ];

    return (
        <section className="py-20" id="pricing">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6">
                        Plans {" "}
                        <span className="bg-gradient-to-r from-orange-400 via-pink-600 to-orange-400 bg-clip-text text-transparent">
                            That Fit
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join the growing community using AI to craft stunning, professional-grade images.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Pricing