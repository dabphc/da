import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Auth check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const NavLinks = () => (
    <>
      <Link to="/work" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Work</Link>
      <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
      <Link to="/events" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Events</Link>
      <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity z-50 relative"
          onClick={() => setMobileMenuOpen(false)}
        >
          DA BPHC
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          {session ? (
            <Button onClick={() => navigate("/login")} variant="default" size="sm">
              Dashboard
            </Button>
          ) : (
             <Button onClick={() => navigate("/login")} variant="outline" size="sm">
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-50 relative" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
            <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95 duration-200">
                <NavLinks />
                 {session ? (
                    <Button onClick={() => { navigate("/login"); setMobileMenuOpen(false); }} className="w-40">
                    Dashboard
                    </Button>
                ) : (
                    <Button onClick={() => { navigate("/login"); setMobileMenuOpen(false); }} variant="outline" className="w-40">
                    Login
                    </Button>
                )}
            </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;