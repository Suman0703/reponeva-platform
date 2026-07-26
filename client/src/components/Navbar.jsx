import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "AI Search", path: "/ai-search" },
  { label: "About", path: "#" },
];

// Pulled out as its own component instead of an inline arrow-returning-JSX
// inside .map(). Same visual result, but avoids nesting a JSX return
// directly inside a one-line arrow function, and makes each nav link
// individually easy to inspect/debug.
function NavLink({ label, path }) {
  return (
    <Link
      to={path}
      className="relative text-sm text-muted hover:text-text transition-colors group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-bg/60 border-b border-border-c">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display font-bold text-lg text-text">
          RepoNeva
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(function (link) {
            return <NavLink key={link.label} label={link.label} path={link.path} />;
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg hover:bg-surface transition-colors"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-muted" />
            ) : (
              <Moon size={18} className="text-muted" />
            )}
          </button>
          {user ? (
            <>
              <span className="text-sm text-muted">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="text-sm text-muted hover:text-text transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-muted hover:text-text transition-colors">
                Login
              </Link>
              <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-2 rounded-lg bg-accent text-black text-sm font-medium">
                Explore Projects
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-bg border-t border-border-c px-6 py-4 flex flex-col gap-4"
        >
          {links.map(function (link) {
            return (
              <Link
                key={link.label}
                to={link.path}
                className="text-muted hover:text-text"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <button onClick={toggleTheme} className="text-left text-muted">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </motion.div>
      )}
    </nav>
  );
}