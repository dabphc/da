import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About Designer Anonymous
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A creative design club at BITS Pilani Hyderabad Campus.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Designer Anonymous is a student-run club at BITS Pilani Hyderabad Campus, founded in 2008 with a simple belief: design is about people. Every project we undertake, every event we create, and every workshop we facilitate centers around human connection and authentic storytelling.
                </p>
                <p className="text-lg leading-relaxed">
                  Over the years, we've grown from a small collective of creatives into a recognized force in the design community on campus. But our core philosophy remains unchanged – we design for people, with people, and because of people.
                </p>
                <p className="text-lg leading-relaxed">
                  Our work spans across various disciplines including brand identity, event design, print media, and digital experiences. We believe in the power of collaboration and the magic that happens when diverse minds come together.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 rounded-lg bg-card border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Philosophy</h3>
                <p className="text-muted-foreground">
                  "Design is not just what it looks like and feels like. Design is how it works – and more importantly, how it connects people."
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">15+</div>
                  <div className="text-muted-foreground">Years of Legacy</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">100+</div>
                  <div className="text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">20+</div>
                  <div className="text-muted-foreground">Events Organized</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-muted-foreground">Workshop Attendees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every project we undertake.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Collaboration</h3>
              <p className="text-muted-foreground">
                We believe the best ideas come from working together, combining different perspectives and expertise.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Innovation</h3>
              <p className="text-muted-foreground">
                We push boundaries and explore new possibilities while respecting timeless design principles.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Authenticity</h3>
              <p className="text-muted-foreground">
                Every project reflects genuine human stories and meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;