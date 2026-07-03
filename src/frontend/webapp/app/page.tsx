import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AcademySection from "@/components/AcademySection";
import StatsSection from "@/components/StatsSection";
import MovementSection from "@/components/MovementSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a2f4a] via-[#0f1a28] to-[#0a0f18]">
      

      <HeroSection />

      <AcademySection />

      <StatsSection />

      <MovementSection />
    </div>
  );
}

