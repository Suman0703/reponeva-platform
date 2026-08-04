import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreatorHero from "../components/CreatorHero";
import CreatorTimeline from "../components/CreatorTimeline";
import CreatorSkills from "../components/CreatorSkills";
import CreatorProjects from "../components/CreatorProjects";
import CreatorContact from "../components/CreatorContact";

export default function CreatorPage() {
  return (
    <div className="bg-bg min-h-screen overflow-x-hidden">
      <Navbar />
      <CreatorHero />
      <CreatorTimeline />
      <CreatorSkills />
      <CreatorProjects />
      <CreatorContact />
      <Footer />
    </div>
  );
}