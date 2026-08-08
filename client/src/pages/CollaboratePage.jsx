import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CollabHero from "../components/CollabHero";
import WorkflowDiagram from "../components/WorkflowDiagram";
import ContributionSteps from "../components/ContributionSteps";
import ContributionGuidelines from "../components/ContributionGuidelines";
import IssuesAndFeatures from "../components/IssuesAndFeatures";
import CollabFaq from "../components/CollabFaq";
import CTASection from "../components/CTASection";

export default function CollaboratePage() {
  return (
    <div className="bg-bg min-h-screen overflow-x-hidden">
      <Navbar />
      <CollabHero />
      <WorkflowDiagram />
      <ContributionSteps />
      <ContributionGuidelines />
      <IssuesAndFeatures />
      <CollabFaq />
      <CTASection />
      <Footer />
    </div>
  );
}