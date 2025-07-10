import HeroSection from "@/components/ui/features/homePage/HeroSection";
import ProblemSection from "@/components/ui/features/homePage/ProblemSection";
import SolutionSection from "@/components/ui/features/homePage/SolutionSection";
import TargetAudience from "@/components/ui/features/homePage/TargetAudience";
import FeaturesSection from "@/components/ui/features/homePage/FeaturesSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        <HeroSection />

        {/* Problem Section */}
        <ProblemSection />

        {/* Solution Section */}
        <SolutionSection />

        {/* Target Audience */}
        <TargetAudience />

        {/* Features Section */}
        <FeaturesSection />
      </main>
    </div>
  );
}
