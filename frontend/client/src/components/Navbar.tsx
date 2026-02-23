import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(12px)"]
  );
  
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["1px solid rgba(0,0,0,0)", "1px solid rgba(0,0,0,0.05)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      style={{ backgroundColor, backdropFilter: backdropBlur, borderBottom }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center"
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer z-50">
          <img src="/logo.png" alt="Student'sVoice Logo" className="w-8 h-8 rounded-lg" />
          <span className="text-xl md:text-2xl font-display font-bold tracking-tight text-foreground">
            Student's<span className="text-primary">Voice</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection("hero")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</button>
          <button onClick={() => scrollToSection("features")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</button>
          <button onClick={() => scrollToSection("how-it-works")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">How It Works</button>
          <button onClick={() => scrollToSection("faq")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">FAQ</button>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://students-voice-bay.vercel.app" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="font-semibold text-foreground/80 hover:text-primary hover:bg-primary/5">
              Sign In
            </Button>
          </a>
          <Button onClick={() => scrollToSection("cta")} className="font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-background border-b border-border p-6 pt-24 shadow-2xl md:hidden flex flex-col gap-4"
          >
            <button onClick={() => scrollToSection("hero")} className="text-lg font-medium text-left py-2 border-b border-border/50">Home</button>
            <button onClick={() => scrollToSection("features")} className="text-lg font-medium text-left py-2 border-b border-border/50">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-lg font-medium text-left py-2 border-b border-border/50">How It Works</button>
            <button onClick={() => scrollToSection("faq")} className="text-lg font-medium text-left py-2 border-b border-border/50">FAQ</button>
            <div className="flex flex-col gap-3 mt-4">
              <a href="https://students-voice-bay.vercel.app/login" className="w-full">
                <Button variant="outline" className="w-full">Sign In</Button>
              </a>
              <Button onClick={() => scrollToSection("cta")} className="w-full">Get Started</Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
