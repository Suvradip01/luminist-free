import FeaturesSection from "@/components/features";
import HeroSection from "@/components/hero";
import Pricing from "@/components/pricing";

export default function Home() {
  const stats = [
    { label: "Images Processed", value: 10000, suffix: "+" },
    { label: "Active Users", value: 500, suffix: "+" },
    { label: "AI Transformations", value: 45000, suffix: "+" },
    { label: "User Satisfaction", value: 98, suffix: "%" },
  ];
  return (
    <div className="pt-40">
      <HeroSection />
      {/* stats */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              return (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-400 uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FeaturesSection />

      <Pricing />
    </div>
  );
}