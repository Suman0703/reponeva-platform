import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "AI Search", path: "/ai-search" },
  { label: "About", path: "/about" },
];

function NavLink({ label, path, isActive }) {
  return (
    <Link
      to={path}
      className={`relative text-sm transition-colors group ${
        isActive ? "text-text" : "text-muted hover:text-text"
      }`}
    >
      {label}
      {/* Underline is always rendered, just toggled between "already
          shown" (active page) and "grows on hover" (inactive page) —
          one element doing both jobs instead of two separate styles */}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // A slightly more opaque/blurred bar once the page has scrolled past the
  // hero — gives the navbar a bit more visual weight over dense content
  // (like the Explore grid) while staying subtle at the very top of a page.
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        scrolled
          ? "bg-bg/85 border-border-c"
          : "bg-bg/60 border-border-c/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg text-text">
          RepoNeva
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(function (link) {
            return (
              <NavLink
                key={link.label}
                label={link.label}
                path={link.path}
                isActive={location.pathname === link.path}
              />
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
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
              <Link
                to="/login"
                className="text-sm text-muted hover:text-text transition-colors"
              >
                Login
              </Link>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -1 }}
                onClick={() => navigate("/explore")}
                className="px-4 py-2 rounded-lg bg-accent text-black text-sm font-medium"
              >
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
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={isActive ? "text-accent" : "text-muted hover:text-text"}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-border-c">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Hi, {user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-sm text-muted hover:text-text transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted hover:text-text transition-colors"
                >
                  Login
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/explore");
                  }}
                  className="px-4 py-2 rounded-lg bg-accent text-black text-sm font-medium text-center"
                >
                  Explore Projects
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}