import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Why Us", href: "/#about" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    // If the link is just to the root path
    if (href === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/"); // Use navigate for internal routing
      }
      return;
    }
    
    // If the link is an anchor to a section on the home page (e.g., "/#about")
    if (href.startsWith("/#")) {
      const elementId = href.replace("/#", "");
      if (location.pathname === "/") {
        // If already on the home page, just scroll to the element
        document.getElementById(elementId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        // If on a different page (like /services), navigate to home with the hash
        navigate('/', { hash: elementId }); // Corrected: navigate to root with hash
      }
      return;
    }

    // For any other direct routes (not currently in navLinks, but good for future proofing)
    navigate(href);
  };

  return (
    <header className="fixed top-4 left-4 right-4 z-50 glass rounded-2xl">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center glow-border">
              <span className="text-primary font-display font-bold text-lg glow-text">TC</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-foreground text-sm tracking-wider">TEXAS CASTRO</p>
              <p className="text-xs text-muted-foreground tracking-widest">LANDSCAPING</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-muted-foreground hover:text-primary font-medium transition-colors rounded-lg hover:bg-primary/10"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="default"
              className="border-primary/30 hover:bg-primary/10 hover:border-primary/50"
              asChild
            >
              <a href="tel:8328899786">
                <Phone className="w-4 h-4 mr-2" />
                (832) 889-9786
              </a>
            </Button>
            <Button
              variant="cta"
              size="default"
              onClick={() => handleNavClick("/#contact")}
            >
              Free Estimate
            </Button>
          </div>

          {/* Mobile Call Button & Menu */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 hover:bg-primary/10 hover:border-primary/50"
              asChild
            >
              <a href="tel:8328899786">
                <Phone className="w-4 h-4 mr-1" />
                Call Us
              </a>
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-muted-foreground hover:text-primary font-medium py-3 px-4 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="outline"
                size="lg"
                className="mt-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                asChild
              >
                <a href="tel:8328899786">
                  <Phone className="w-4 h-4 mr-2" />
                  (832) 889-9786
                </a>
              </Button>
              <Button
                variant="cta"
                size="lg"
                className="mt-2"
                onClick={() => handleNavClick("/#contact")}
              >
                Get Free Estimate
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;