import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";

interface WorkItem {
  id: number;
  title: string;
  category: "Events" | "Designs" | "Workshops";
  image: string;
  description: string;
}

const workItems: WorkItem[] = [
  {
    id: 1,
    title: "Abstract Design Poster",
    category: "Designs",
    image: work1,
    description: "Modern creative design with geometric shapes",
  },
  {
    id: 2,
    title: "Nightlife Event Poster",
    category: "Events",
    image: work2,
    description: "Bold typography for creative workshop",
  },
  {
    id: 3,
    title: "Brand Identity Showcase",
    category: "Designs",
    image: work3,
    description: "Minimalist branding materials",
  },
  {
    id: 4,
    title: "Photography Exhibition",
    category: "Events",
    image: work4,
    description: "Gallery event poster with artistic layout",
  },
  {
    id: 5,
    title: "Digital Art Workshop",
    category: "Workshops",
    image: work5,
    description: "Futuristic cyberpunk design workshop",
  },
  {
    id: 6,
    title: "Summer Music Festival",
    category: "Events",
    image: work1,
    description: "Outdoor music festival branding and poster design",
  },
  {
    id: 7,
    title: "Tech Conference 2023",
    category: "Events", 
    image: work2,
    description: "Annual technology conference branding package",
  },
  {
    id: 8,
    title: "Art Gallery Opening",
    category: "Events",
    image: work3,
    description: "Contemporary art gallery exhibition launch",
  },
  {
    id: 9,
    title: "Fashion Week Runway",
    category: "Events",
    image: work4,
    description: "Fashion week runway show visual identity",
  },
  {
    id: 10,
    title: "Food Festival Branding",
    category: "Events",
    image: work5,
    description: "Local food festival complete branding solution",
  },
  {
    id: 11,
    title: "Typography Workshop",
    category: "Workshops",
    image: work1,
    description: "Advanced typography design masterclass",
  },
  {
    id: 12,
    title: "UI/UX Design Sprint",
    category: "Workshops",
    image: work2,
    description: "Intensive 3-day design thinking workshop",
  },
  {
    id: 13,
    title: "Logo Design Masterclass",
    category: "Workshops",
    image: work3,
    description: "Professional logo design techniques and process",
  },
  {
    id: 14,
    title: "Print Design Workshop",
    category: "Workshops",
    image: work4,
    description: "Traditional and modern print design methods",
  },
  {
    id: 15,
    title: "Corporate Identity Suite",
    category: "Designs",
    image: work5,
    description: "Complete corporate branding and identity system",
  }
];

const categories = ["All", "Events", "Designs", "Workshops"] as const;

const Work = () => {
  const [activeFilter, setActiveFilter] = useState<typeof categories[number]>("All");

  const filteredItems = activeFilter === "All" 
    ? workItems 
    : workItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our Work
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of our creative projects, events, and workshops spanning over a decade of design excellence. From corporate branding to cultural events, we bring ideas to life.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-6 pb-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Pinterest-style Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                className="work-card group break-inside-avoid mb-6"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className={`overflow-hidden ${
                  // Vary image heights for masonry effect
                  index % 5 === 0 ? 'h-80' : 
                  index % 5 === 1 ? 'h-60' : 
                  index % 5 === 2 ? 'h-96' : 
                  index % 5 === 3 ? 'h-72' : 'h-64'
                }`}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
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

export default Work;