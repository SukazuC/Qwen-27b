import HeroSection from "@/components/sections/HeroSection";
import ProductWorldsSection from "@/components/sections/ProductWorldsSection";
import ElectrolyteTempleSection from "@/components/sections/ElectrolyteTempleSection";
import ComparisonArenaSection from "@/components/sections/ComparisonArenaSection";
import FounderAgoraSection from "@/components/sections/FounderAgoraSection";
import WaitlistSection from "@/components/sections/WaitlistSection";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <HeroSection />
        <ProductWorldsSection />
        <ElectrolyteTempleSection />
        <ComparisonArenaSection />
        <FounderAgoraSection />
        <WaitlistSection />
      </main>
      <SiteFooter />
    </>
  );
}
