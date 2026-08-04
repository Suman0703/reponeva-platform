import { motion } from "motion/react";
import { Mail, ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import NetworkBackground from "./NetworkBackground";
import profilePhoto from "../assets/profile.png";

export default function CreatorHero() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 opacity-60 pointer-events-none">
                <NetworkBackground />
            </div>
            <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-[auto_1fr] gap-10 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-40 h-40 md:w-52 md:h-52 mx-auto"
                >
                    {/* Gradient ring frame — same visual language as BrandBadge,
              placeholder avatar sits inside it until a real photo arrives */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ background: "conic-gradient(from 0deg, #2EE6A6, #A78BFA, #2EE6A6)" }}
                    />
                    <div className="absolute inset-[4px] rounded-full bg-bg" />
                    <div className="absolute inset-2 rounded-full bg-surface border border-border-c flex items-center justify-center overflow-hidden">
                        {/* Swap this span for <img src={profilePhoto} .../> once the
                real photo is ready — sized/positioned identically */}
                        <img src={profilePhoto} alt="Suman" className="w-full h-full object-cover" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <span className="text-accent font-mono text-sm">
                        Meet the builder
                    </span>
                    <h1 className="font-display font-bold text-3xl md:text-5xl text-text mt-2 leading-tight">
                        Hi, I'm Suman —{" "}
                        <span className="text-accent">I built RepoNova.</span>
                    </h1>
                    <p className="text-muted mt-4 text-lg leading-relaxed max-w-xl">
                        B.Tech CSE student focused on the MERN stack and Generative AI. I
                        got tired of scrolling through awesome-lists, so I built the tool
                        I actually wanted.
                    </p>

                    <div className="flex items-center gap-3 mt-6">
                        <motion.a
                            whileHover={{ y: -2 }}
                            href="#"
                            aria-label="GitHub"
                            className="w-10 h-10 rounded-full border border-border-c flex items-center justify-center text-muted hover:text-text hover:border-accent/40 transition-colors"
                        >
                            <FaGithub size={17} />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -2 }}
                            href="#"
                            aria-label="LinkedIn"
                            className="w-10 h-10 rounded-full border border-border-c flex items-center justify-center text-muted hover:text-text hover:border-accent/40 transition-colors"
                        >
                            <FaLinkedin size={17} />
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -2 }}
                            href="#"
                            aria-label="Email"
                            className="w-10 h-10 rounded-full border border-border-c flex items-center justify-center text-muted hover:text-text hover:border-accent/40 transition-colors"
                        >
                            <Mail size={17} />
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
            >
                <ArrowDown size={18} />
            </motion.div>
        </section>
    );
}