import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

// Added "About the Creator" to the links array below
const links = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "AI Search", path: "/ai-search" },
  { label: "About", path: "/about" },
  { label: "About the Creator", path: "/creator" },
];

function NavLink({ label, path, isActive }) {
  return (
    <Link to={path} className="relative px-1 py-2 group">
      <span
        className={`text-sm font-medium tracking-wide transition-colors ${isActive ? "text-text" : "text-muted group-hover:text-text"
          }`}
      >
        {label}
      </span>
      {/* Underline is a real Motion element with layoutId — it physically
          slides between links on click, same sliding-capsule technique
          used for the category pills, instead of a static CSS underline. */}
      {isActive && (
        <motion.span
          layoutId="active-nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevents the page behind the mobile menu from scrolling while it's
  // open — without this, a long page can scroll underneath the overlay,
  // which feels broken on touch devices specifically.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 ${scrolled
            ? "bg-bg/85 border-border-c py-0"
            : "bg-bg/50 border-border-c/40 py-1"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — subtle hover lift gives it a premium, tactile feel
              instead of sitting completely static */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-9 w-9 rounded-full overflow-hidden border border-border-c/60 bg-surface flex items-center justify-center shrink-0"
            >
              <img
                src={logo}
                alt="RepoNova logo"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <span className="font-display font-bold text-lg text-text tracking-tight">
              RepoNova
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {links.map((link) => (
              <NavLink
                key={link.label}
                label={link.label}
                path={link.path}
                isActive={location.pathname === link.path}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/bookmarks"
                  aria-label="Bookmarks"
                  className="text-muted hover:text-text transition-colors"
                >
                  
                  <Bookmark size={18} />
                </Link>
                <span className="text-sm text-muted">
                  Hi, <span className="text-text font-medium">{user.name}</span>
                </span>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ y: -1 }}
                  onClick={logout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-c text-sm text-muted hover:text-text hover:border-red-400/30 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm text-muted hover:text-text transition-colors"
                >
                  Login
                </Link>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ y: -1 }}
                  onClick={() => navigate("/explore")}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-accent to-accent-purple text-black text-sm font-semibold shadow-[0_0_20px_rgba(46,230,166,0.25)]"
                >
                  Explore Projects
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-text z-[70] relative"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Full mobile menu — a real slide-in panel + backdrop, not a
          dropdown. Rendered outside the nav bar's own stacking context
          via fixed positioning, so it correctly overlays the whole page. */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-surface/95 backdrop-blur-xl border-l border-border-c z-[65] md:hidden flex flex-col"
            >
              <div className="h-16 flex items-center px-6 border-b border-border-c">
                <span className="font-display font-bold text-lg text-text">
                  Menu
                </span>
              </div>

              <div className="flex-1 flex flex-col px-6 py-8 gap-1">
                {links.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between py-3.5 text-lg font-medium border-b border-border-c/60 transition-colors ${isActive ? "text-accent" : "text-text"
                          }`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="px-6 py-6 border-t border-border-c">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <span className="text-sm text-muted">
                      Signed in as <span className="text-text font-medium">{user.name}</span>
                    </span>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-border-c text-text font-medium"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-3 rounded-full border border-border-c text-text font-medium text-center"
                    >
                      Login
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/explore");
                      }}
                      className="w-full py-3 rounded-full bg-gradient-to-r from-accent to-accent-purple text-black font-semibold"
                    >
                      Explore Projects
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}