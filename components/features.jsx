"use client";
import { useState } from "react";
import { Crop, Paintbrush, Scaling, Wand2, Eraser, Maximize2 } from "lucide-react";

// Custom hook placeholder - replace with your actual hook
const useIntersectionObserver = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [node, setNode] = useState(null);

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
    }, { threshold: 0.1 });

    if (node) {
        observer.observe(node);
    }

    return [setNode, isVisible];
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0, index }) => {
    const [ref, isVisible] = useIntersectionObserver();
    const [isHovered, setIsHovered] = useState(false);

    // Color schemes matching your website's vibrant aesthetic
    const colorSchemes = [
        { bg: "from-cyan-400/20 to-blue-500/20", icon: "from-cyan-400 to-blue-500", glow: "cyan-400", text: "text-cyan-400" },
        { bg: "from-purple-400/20 to-pink-500/20", icon: "from-purple-400 to-pink-500", glow: "purple-400", text: "text-purple-400" },
        { bg: "from-orange-400/20 to-red-500/20", icon: "from-orange-400 to-red-500", glow: "orange-400", text: "text-orange-400" },
        { bg: "from-green-400/20 to-emerald-500/20", icon: "from-green-400 to-emerald-500", glow: "green-400", text: "text-green-400" },
        { bg: "from-pink-400/20 to-rose-500/20", icon: "from-pink-400 to-rose-500", glow: "pink-400", text: "text-pink-400" },
        { bg: "from-yellow-400/20 to-orange-500/20", icon: "from-yellow-400 to-orange-500", glow: "yellow-400", text: "text-yellow-400" },
    ];

    const colors = colorSchemes[index % colorSchemes.length];

    return (
        <div
            ref={ref}
            className={`relative group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            style={{ transitionDelay: `${delay}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Outer glow effect */}
            <div className={`absolute -inset-[1px] bg-gradient-to-r ${colors.icon} rounded-3xl opacity-0 blur-xl transition-all duration-500 ${isHovered ? "opacity-60" : ""}`} />

            {/* Card container */}
            <div className={`relative backdrop-blur-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-3xl p-8 transition-all duration-500 cursor-pointer overflow-hidden ${isHovered ? "transform scale-[1.02] -translate-y-2 border-slate-600/50 shadow-2xl" : ""
                }`}>
                {/* Animated gradient mesh background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />

                {/* Shine sweep effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 ${isHovered ? "translate-x-full" : ""}`} />

                {/* Animated dots pattern */}
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }} />

                {/* Icon with advanced animations */}
                <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.icon} transition-all duration-500 ${isHovered ? "rotate-6 scale-110 shadow-2xl" : "rotate-0 scale-100"
                        }`}>
                        {/* Pulsing ring */}
                        <div className={`absolute inset-0 rounded-2xl border-2 border-white/40 transition-all duration-700 ${isHovered ? "scale-[1.3] opacity-0" : "scale-100 opacity-100"
                            }`} />

                        {/* Secondary glow ring */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.icon} blur-md transition-all duration-500 ${isHovered ? "opacity-60 scale-110" : "opacity-0 scale-90"
                            }`} />

                        <Icon className={`relative w-10 h-10 text-white transition-all duration-500 ${isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
                            }`} strokeWidth={2} />
                    </div>
                </div>

                {/* Title with gradient effect */}
                <h3 className={`relative text-xl font-bold mb-3 transition-all duration-300 ${isHovered ? `bg-gradient-to-r ${colors.icon} bg-clip-text text-transparent` : "text-white"
                    }`}>
                    {title}
                </h3>

                {/* Description */}
                <p className="relative text-gray-400 leading-relaxed transition-colors duration-300">
                    {description}
                </p>

                {/* Bottom gradient bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.icon} transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                    }`} />

                {/* Corner accent with animation */}
                <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl ${colors.icon} rounded-full blur-2xl transition-all duration-700 ${isHovered ? "scale-150 opacity-20" : "scale-100 opacity-0"
                    }`} />

                {/* Particle effects */}
                {isHovered && [...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full bg-${colors.glow}`}
                        style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animation: `particle-float ${2 + Math.random()}s ease-out forwards`,
                            animationDelay: `${i * 0.1}s`,
                            opacity: 0
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// Features Section Component
const FeaturesSection = () => {
    const features = [
        {
            icon: Crop,
            title: "Smart Crop & Resize",
            description:
                "Interactive cropping with aspect ratio constraints and intelligent resizing that preserves image quality across any dimension.",
        },
        {
            icon: Paintbrush,
            title: "Color & Light Adjustment",
            description:
                "Professional-grade brightness, contrast, saturation controls with real-time preview and auto-enhance capabilities.",
        },
        {
            icon: Eraser,
            title: "AI Background Removal",
            description:
                "Remove or replace backgrounds instantly using advanced AI that detects complex edges and fine details with precision.",
        },
        {
            icon: Wand2,
            title: "AI Content Editor",
            description:
                "Edit images with natural language prompts. Remove objects, change elements, or add new content using generative AI.",
        },
        {
            icon: Maximize2,
            title: "Image Extender",
            description:
                "Expand your canvas in any direction with AI-powered generative fill that seamlessly blends new content with existing images.",
        },
        {
            icon: Scaling,
            title: "AI Upscaler",
            description:
                "Enhance image resolution up to 4x using AI upscaling technology that preserves details and reduces artifacts.",
        },
    ];

    return (
        <section className="py-20" id="features">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-600 to-orange-400 bg-clip-text text-transparent mb-6">
                        Powerful AI Features
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Everything you need to create, edit, and enhance images with
                        professional-grade tools powered by cutting-edge AI technology.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} index={index} delay={index * 100} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes particle-float {
                    0% { opacity: 0; transform: translateY(0) scale(0); }
                    50% { opacity: 1; }
                    100% { opacity: 0; transform: translateY(-30px) scale(1); }
                }
            `}</style>
        </section>
    );
};

export default FeaturesSection;