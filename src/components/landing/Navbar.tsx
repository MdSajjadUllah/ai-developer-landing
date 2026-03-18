import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Code", href: "#code" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 py-4 transition-all duration-300"
        style={{
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(0 0% 100% / 0.06)" : "1px solid transparent",
          background: scrolled || menuOpen ? "hsl(0 0% 0% / 0.7)" : "transparent",
        }}
      >
        <motion.button
          className="text-xl font-bold font-heading tracking-widest text-foreground bg-transparent border-none cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => scrollTo("#hero")}
          aria-label="Scroll to top"
        >
          MCODE
        </motion.button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8" role="navigation">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-nav bg-transparent border-none cursor-pointer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              tabIndex={0}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        <motion.button
          className="hidden md:block px-5 py-2 rounded-full bg-foreground text-background text-sm font-medium font-nav transition-transform duration-200 hover:scale-[1.03]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Sign In
        </motion.button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-[72px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="relative flex flex-col gap-2 px-5 py-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-3 rounded-lg text-base font-nav text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 min-h-[44px] flex items-center text-left bg-transparent border-none cursor-pointer w-full"
                >
                  {link.label}
                </button>
              ))}
              <button
                className="mt-4 w-full py-3 rounded-full bg-foreground text-background text-sm font-medium font-nav min-h-[44px]"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
