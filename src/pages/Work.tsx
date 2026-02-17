import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Instagram } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types";
import { getDirectImageUrl } from "@/lib/utils";

const categories = ["All", "Graphic", "UI/UX", "3D"] as const;

const Work = () => {
  const [activeFilter, setActiveFilter] = useState<(typeof categories)[number]>("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const filteredItems = activeFilter === "All"
    ? projects
    : projects.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-12 px-6 text-center">
        <h1 className="page-title">
          Our Work
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A collection of our creative projects, spanning across graphic
          design, UI/UX, and 3D art.
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
                  src={getDirectImageUrl(item.image_url)}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  {item.instagram_link && (
                    <a
                      href={item.instagram_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <Instagram size={24} />
                    </a>
                  )}
                  <div className="text-right">
                    <span className="text-white font-semibold block">{item.title}</span>
                    <span className="text-white/80 text-sm">by {item.creator_name || 'Anonymous'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && !loading && (
            <p className="text-center text-muted-foreground py-12">No approved projects found in this category yet.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Work;