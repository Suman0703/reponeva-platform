import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHero from "../components/AboutHero";
import MissionStats from "../components/MissionStats";
import HowToUseSection from "../components/HowToUseSection";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";

export default function AboutPage() {
  return (
    <div className="bg-bg min-h-screen overflow-x-hidden">
      <Navbar />
      <AboutHero />
      <MissionStats />
      <HowToUseSection />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </div>
  );
}