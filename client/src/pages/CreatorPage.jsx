import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreatorHero from "../components/CreatorHero";
import CreatorQuote from "../components/CreatorQuote";

export default function CreatorPage() {
  return (
    <div className="bg-bg min-h-screen overflow-x-hidden">
      <Navbar />
      <CreatorHero />
      <CreatorQuote />
      <Footer />
    </div>
  );
}