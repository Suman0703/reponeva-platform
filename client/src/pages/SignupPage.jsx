import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import signupImg from "../assets/signup.jpg";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import AuthCard from "../components/auth/AuthCard";
import FormInput from "../components/auth/FormInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import Divider from "../components/auth/Divider";
import OAuthButton from "../components/auth/OAuthButton";

function GoogleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.67-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.12-1.44.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}
function GithubIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
        </svg>
    );
}

export default function SignupPage() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function update(field) {
        return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await api.post("/auth/register", form);
            setUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthCard image={signupImg} imageAlt="Join RepoNeva">
            <h1 className="font-display font-bold text-2xl text-text mb-1">
                Create your account
            </h1>
            <p className="text-muted text-sm mb-5">  
                Start discovering repos that fit you.
            </p>

           <form onSubmit={handleSubmit} className="space-y-3">
                <FormInput label="Name" icon={User} value={form.name} onChange={update("name")} required />
                <FormInput label="Email address" icon={Mail} type="email" value={form.email} onChange={update("email")} required />
                <FormInput label="Password" icon={Lock} type="password" value={form.password} onChange={update("password")} minLength={6} required />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <PrimaryButton type="submit" loading={loading}>
                    Create Account
                </PrimaryButton>
            </form>

            <Divider />

            <div className="space-y-2">
                <OAuthButton provider="google" icon={<GoogleIcon />} label="Continue with Google" />
                <OAuthButton provider="github" icon={<GithubIcon />} label="Continue with GitHub" />
            </div>

            <p className="text-center text-muted text-sm mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-accent hover:underline">
                    Log in
                </a>
            </p>
        </AuthCard>
    );
}