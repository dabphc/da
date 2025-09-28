import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const members = [
  {
    name: "Ritwik Sethi",
    role: "Sec",
  },
  {
    name: "Aanya",
    role: "jt. sec",
  },
  {
    name: "x",
    role: "Backend Developer",
  },
  {
    name: "y",
    role: "UI/UX Designer",
  },
  {
    name: "z",
    role: "Project Manager",
  },
  {
    name: "a",
    role: "Graphic Designer",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="page-title pb-3">
            About Designer Anonymous
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus lacinia odio vitae vestibulum vestibulum.
                </p>
                <p className="text-lg leading-relaxed">
                  Cras venenatis euismod malesuada. Nullam ac erat ante. Integer
                  feugiat, augue ac sollicitudin dictum, massa justo cursus
                  urna, at dictum purus elit sed felis.
                </p>
                <p className="text-lg leading-relaxed">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-lg bg-card border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Our Philosophy
                </h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque sit amet accumsan tortor.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">15+</div>
                  <div className="text-muted-foreground">Years of Legacy</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">100+</div>
                  <div className="text-muted-foreground">
                    Projects Completed
                  </div>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">20+</div>
                  <div className="text-muted-foreground">Events Organized</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-muted-foreground">
                    Workshop Attendees
                  </div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Collaboration
              </h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Innovation</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Authenticity</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                aute irure dolor in reprehenderit in voluptate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The creative minds behind Designer Anonymous.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {members.map((member) => (
              <div key={member.name} className="member-card">
                <div className="glow" />
                <div className="inner" />
                <div className="relative z-10">
                  <div className="text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </div>
                  <div className="text-muted-foreground">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;