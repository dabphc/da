import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Instagram } from "lucide-react";

interface WorkItem {
  id: number;
  category: "Events" | "Designs" | "Workshops";
  image: string;
  name: string;
  instaLink: string;
}

// Use direct paths for public folder images
const workItems: WorkItem[] = [
  { id: 1, category: "Designs", image: "/images/active/1.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 2, category: "Events", image: "/images/active/2.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 3, category: "Designs", image: "/images/active/3.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 4, category: "Events", image: "/images/active/4.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 5, category: "Workshops", image: "/images/active/5.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 6, category: "Events", image: "/images/active/6.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 7, category: "Events", image: "/images/active/7.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 8, category: "Events", image: "/images/active/8.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 9, category: "Events", image: "/images/active/9.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 10, category: "Events", image: "/images/active/10.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 11, category: "Workshops", image: "/images/active/11.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 12, category: "Workshops", image: "/images/active/12.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 13, category: "Workshops", image: "/images/active/13.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 14, category: "Workshops", image: "/images/active/14.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
  { id: 15, category: "Designs", image: "/images/active/15.webp", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
   { id: 16, category: "Designs", image: "/images/active/16.png", name: "Ranjit", instaLink: "https://www.instagram.com/_ranjit_choudhary_/" },
];

const categories = ["All", "Events", "Designs", "Workshops"] as const;

const Work = () => {
  const [activeFilter, setActiveFilter] = useState<
    (typeof categories)[number]
  >("All");

  const filteredItems =
    activeFilter === "All"
      ? workItems
      : workItems.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-12 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Our Work
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A collection of our creative projects, events, and workshops spanning
          over a decade of design excellence.
        </p>
      </section>

      <section className="px-6 pb-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`filter-btn ${
                  activeFilter === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="work-card group break-inside-avoid mb-6 relative overflow-hidden rounded-lg"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <a
                    href={item.instaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <span className="text-white font-semibold">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;