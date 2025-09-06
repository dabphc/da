import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Designer Anonymous</h3>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <Link to="/work" className="nav-link hover:text-accent transition-colors">Work</Link>
                      <Link to="/about" className="nav-link hover:text-accent transition-colors">About</Link>
                      <Link to="/contact" className="nav-link hover:text-accent transition-colors">Contact</Link>
          </div>
          <div className="pt-8 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Designer Anonymous BPHC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;