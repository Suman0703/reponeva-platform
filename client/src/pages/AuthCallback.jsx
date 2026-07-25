import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

// The backend already set the httpOnly cookie before redirecting here —
// this page's only job is to ask "who does that cookie belong to now"
// and get the app's user state in sync before sending them onward.
export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
        navigate("/");
      })
      .catch(() => {
        navigate("/login?error=oauth_failed");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <Loader2 className="animate-spin text-accent" size={32} />
    </div>
  );
}