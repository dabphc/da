import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const members = [
  {
    name: "Ritwik Sethi",
    role: "Secretary",
  },
  {
    name: "Aanya Agarwal",
    role: "Joint Secretary",
  },
  {
    name: "Dhruv Vadadoriya",
    role: "Treasurer",
  },
  {
    name: "Sanchit Agrawal",
    role: "Social Media Head",
  },
  {
    name: "Ishan Arnepalli",
    role: "Management Head",
  },

  {
    name: "Sahil Salvee",
    role: "DoTA STuCCan",
  },

  {
    name: "Ranjit",
    role: "Web Dev Lead",
  },

  {
    name: "Jatin Reddy",
    role: "Web Dev + UI/UX",
  },

  {
    name: "Prajwal P Belgaonkar",
    role: "3D Design & Animations",
  },

  { name: "Raj Mittal", role: "Graphic Designer" },

  { name: "Daksh Tamoli", role: "Graphic Designer" },
  { name: "Yafa Rahman", role: "Graphic Designer" },
  { name: "Krish Ghorse", role: "Graphic Designer" },
  { name: "Mithil Astik", role: "Graphic Designer" },
  { name: "Parth Bansal", role: "Graphic Designer" },
  { name: "Vaibhav Saraf", role: "Events and Sponsorship Team" },
  { name: "Anagha Pillalamarri", role: "Events and Sponsorship Team" },
  { name: "Raj Parab", role: "2D Animator" },
  { name: "Mihir Kumar", role: "Events Team" },
  { name: "Larsh Vakil", role: "UI/UX Designer" },
  { name: "Atharva Digraskar", role: "Graphic Designer" },
  { name: "Rayan Das Gupta", role: "Graphic Designer" },
  { name: "Naman Yerra", role: "Events and Sponsorship Team" },
  { name: "Ishayu Joshi", role: "Events and Sponsorship Team" },
  { name: "Lavanya Deepak Agarwal", role: "Graphic Designer" },
  { name: "Avaneesh Amol Nisal", role: "3D Design and Animator" },
  { name: "Manshi Surbhi", role: "Graphic Designer" },
  { name: "Karthik Srirangapatnam", role: "Graphic Designer" },
  { name: "Sachi Sree", role: "Graphic Designer" },
  { name: "Saketh Reddy Chilakam", role: "2D Animations" },
  { name: "R Shyam Sundar", role: "Graphic Designer" },
  { name: "Vaibhav aggarwal", role: "Graphic Designer" },
  { name: "Riya Baid", role: "Graphic Designer" },
  { name: "Malhar", role: "Events and Screenings Team" },
  { name: "Abhishek Gupta", role: "Graphic Designer" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="page-title pb-3">About Designer Anonymous</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Designer's Anonymous is a dynamic design club blending graphic
            design, UI/UX design, 3D design and 2D animations. We organise
            workshops, competitions, guest lectures and portfolio reviews
            ensuring the creative growth of our members as well as promoting the
            design culture at BITS Pilani Hyderabad Campus.
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
                  Our story began with passion: to blend design disciplines with
                  creativity which meets limitless exploration. We unite graphic
                  design, UI/UX, 3D art, Photoshop, and Figma - teaching
                  integrated skills through experiences no other club strives to
                  provide.
                </p>
                <p className="text-lg leading-relaxed">
                  Through immersive events and reviews, members grow confidence,
                  sharpen creativity, and discover design mastery beyond
                  conventional boundaries.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-lg bg-card border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Our Philosophy
                </h3>
                <p className="text-muted-foreground">
                  Dedicated to design excellence, our club focuses on creativity
                  and passion.
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
              Teamwork, integrity, imagination shape our guiding principles.
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
                Connecting minds, sharing perspectives, cultivating trust,
                encouraging teamwork, expanding ideas, and continuously building
                stronger creative communities together.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Innovation</h3>
              <p className="text-muted-foreground">
                Transforming ideas, exploring possibilities, advancing design
                methods, integrating technology, inspiring originality, and
                continuously redefining creative boundaries together.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Authenticity
              </h3>
              <p className="text-muted-foreground">
                Honoring truth, expressing genuine voices, building trust,
                valuing transparency, embracing uniqueness, and continuously
                strengthening meaningful creative connections together.
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
