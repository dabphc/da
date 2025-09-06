const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Designer Anonymous</h3>
          <p className="text-muted-foreground">
            A creative design club at BITS Pilani Hyderabad Campus.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <a href="#work" className="hover:text-accent transition-colors">Work</a>
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </div>
          <div className="pt-8 text-xs text-muted-foreground">
            © 2024 Designer Anonymous BPHC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;