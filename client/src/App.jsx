import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthCallback from "./pages/AuthCallback";
import ExplorePage from "./pages/ExplorePage";
import LoginPromptModal from "./components/auth/LoginPromptModal";
import AiSearchPage from "./pages/AiSearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/ai-search" element={<AiSearchPage />} />
      </Routes>
      <LoginPromptModal />
    </>
  );
}

export default App;