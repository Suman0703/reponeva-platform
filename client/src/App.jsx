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
import BookmarksPage from "./pages/BookmarksPage";
import RepoDetailPage from "./pages/RepoDetailPage";

function App() {
  const { loading } = useAuth();
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
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/repos/:githubId" element={<RepoDetailPage />} />
      </Routes>
      <LoginPromptModal />
    </>
  );
}

export default App;