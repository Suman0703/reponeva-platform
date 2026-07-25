import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useCountdown } from "../hooks/useCountdown";
import AuthCard from "../components/auth/AuthCard";
import FormInput from "../components/auth/FormInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import Divider from "../components/auth/Divider";
import OAuthButton from "../components/auth/OAuthButton";
import OtpInput from "../components/auth/OtpInput";

// Google's "G" logo as inline SVG — avoids pulling in a whole icon pack
// just for one brand mark that Lucide doesn't include.
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

export default function LoginPage() {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [step, setStep] = useState("email"); // "email" | "otp"
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const expiry = useCountdown(300);   // 5 min, matches backend OTP_TTL_MS
    const cooldown = useCountdown(30);  // matches backend RESEND_COOLDOWN_MS

    async function handleSendOtp(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await api.post("/auth/send-otp", { email });
            setStep("otp");
            expiry.start();
            cooldown.start();
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyOtp(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await api.post("/auth/verify-otp", { email, otp });
            setUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid code");
            setOtp("");
        } finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        setError("");
        try {
            await api.post("/auth/send-otp", { email });
            expiry.start();
            cooldown.start();
            setOtp("");
        } catch (err) {
            setError(err.response?.data?.message || "Could not resend code");
        }
    }

    const minutes = String(Math.floor(expiry.seconds / 60)).padStart(2, "0");
    const secs = String(expiry.seconds % 60).padStart(2, "0");

    return (
        <AuthCard>
            {step === "email" ? (
                <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h1 className="font-display font-bold text-2xl text-text mb-1">
                        Welcome back
                    </h1>
                    <p className="text-muted text-sm mb-6">
                        Log in to continue discovering repos.
                    </p>

                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <FormInput
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <PrimaryButton type="submit" loading={loading}>
                            <Mail size={16} /> Continue with Email
                        </PrimaryButton>
                    </form>

                    <Divider />

                    <div className="space-y-3">
                        <OAuthButton provider="google" icon={<GoogleIcon />} label="Continue with Google" />
                        <OAuthButton provider="github" icon={<GithubIcon />} label="Continue with GitHub" />
                    </div>

                    <p className="text-center text-muted text-sm mt-6">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-accent hover:underline">
                            Sign up
                        </a>
                    </p>
                </motion.div>
            ) : (
                <motion.div key="otp" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="font-display font-bold text-2xl text-text mb-1">
                        Enter your code
                    </h1>
                    <p className="text-muted text-sm mb-6">
                        We sent a 6-digit code to <span className="text-text">{email}</span>
                    </p>

                    <form
                        onSubmit={handleVerifyOtp}
                        className="space-y-6"
                    >
                        <OtpInput value={otp} onChange={setOtp} error={error} />

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted font-mono">
                                {expiry.seconds > 0 ? `Expires in ${minutes}:${secs}` : "Code expired"}
                            </span>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={cooldown.seconds > 0}
                                className="text-accent disabled:text-muted disabled:cursor-not-allowed"
                            >
                                {cooldown.seconds > 0 ? `Resend in ${cooldown.seconds}s` : "Resend code"}
                            </button>
                        </div>

                        <PrimaryButton type="submit" loading={loading} disabled={otp.length < 6}>
                            Verify & Continue
                        </PrimaryButton>
                    </form>
                </motion.div>
            )}
        </AuthCard>
    );
}