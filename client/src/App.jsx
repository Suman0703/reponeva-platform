import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useAuth } from "./context/AuthContext";
import LoadingScreen from "./components/LoadingScreen";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthCallback from "./pages/AuthCallback";
import ExplorePage from "./pages/ExplorePage";
import AiSearchPage from "./pages/AiSearchPage";
import AboutPage from "./pages/AboutPage";
import CreatorPage from "./pages/CreatorPage";
import LoginPromptModal from "./components/auth/LoginPromptModal";

function App() {
  const { loading } = useAuth();

  // AuthContext's initial /me check is the one moment every single visit
  // genuinely has "nothing to show yet" — showing the badge here instead
  // of a blank white flash covers app boot specifically.
  if (loading) {
    return (
      <AnimatePresence>
        <LoadingScreen />
      </AnimatePresence>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/ai-search" element={<AiSearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/creator" element={<CreatorPage />} />
      </Routes>
      <LoginPromptModal />
    </>
  );
}

export default App;