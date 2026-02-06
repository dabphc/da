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
  { name: "Malhar", role: "Graphic Designer" },
  { name: "Abhishek Gupta", role: "Graphic Designer" },
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
            A dynamic design hub where graphic design, UI/UX, 3D art, and digital craft converge. 
            We cultivate creativity through immersive workshops, competitive challenges, expert lectures, 
            and personalized portfolio reviews—fostering creative growth beyond conventional boundaries.
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
                  Our journey began with a simple yet powerful vision: to create a space where 
                  diverse design disciplines unite and creativity knows no bounds. We saw the need 
                  for a community that transcends traditional design silos.
                </p>
                <p className="text-lg leading-relaxed">
                  Designer Anonymous brings together graphic design, UI/UX, 3D art, and digital tools 
                  like Photoshop and Figma—not as separate entities, but as interconnected disciplines. 
                  We provide integrated learning experiences that go beyond what any other club offers.
                </p>
                <p className="text-lg leading-relaxed">
                  Through hands-on workshops, competitive showcases, insightful lectures, and constructive 
                  portfolio reviews, our members build confidence, refine their craft, and discover their 
                  unique creative voice in an environment that celebrates exploration and mastery.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-lg bg-card border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Our Philosophy
                </h3>
                <p className="text-muted-foreground">
                  We are unwavering in our commitment to design excellence. Our singular focus 
                  is creativity—nurturing it, challenging it, and celebrating it in all its forms.
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
              Teamwork, integrity, and imagination form the foundation of everything we do—
              guiding principles that shape our community and creative culture.
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
                We believe in the power of collective creativity—connecting minds, sharing diverse 
                perspectives, and building trust. Through collaboration, we encourage teamwork that 
                expands ideas and strengthens our creative community.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Innovation</h3>
              <p className="text-muted-foreground">
                Innovation drives us to transform ideas into reality. We explore new possibilities, 
                advance design methodologies, integrate cutting-edge technology, and inspire originality—
                continuously redefining creative boundaries together.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Authenticity</h3>
              <p className="text-muted-foreground">
                Authenticity means honoring truth and expressing genuine voices. We build trust through 
                transparency, value uniqueness, and embrace individuality—strengthening meaningful 
                creative connections in everything we create.
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