import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PlatformStats from "../components/PlatformStats";
import FeaturedCategories from "../components/FeaturedCategories";
import AiFeatures from "../components/AiFeatures";
import TrendingRepos from "../components/TrendingRepos";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="bg-bg min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <PlatformStats />
      <FeaturedCategories />
      <AiFeatures />
      <TrendingRepos />
      <Footer />
    </div>
  );
}