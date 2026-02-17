import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { Event, EventResource } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, FileText, Video, Link as LinkIcon } from "lucide-react";
import { getDirectImageUrl } from "@/lib/utils";

const EventResources = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [resources, setResources] = useState<EventResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        fetchData(id);
    }
  }, [id]);

  const fetchData = async (eventId: string) => {
    const { data: eventData } = await supabase.from('events').select('*').eq('id', eventId).single();
    const { data: resourceData } = await supabase.from('event_resources').select('*').eq('event_id', eventId);
    
    setEvent(eventData);
    setResources(resourceData || []);
    setLoading(false);
  };

  const getIcon = (type: string) => {
    if (type.toLowerCase().includes('video') || type.toLowerCase().includes('recording')) return <Video className="h-5 w-5 text-red-500" />;
    if (type.toLowerCase().includes('slide') || type.toLowerCase().includes('pdf')) return <FileText className="h-5 w-5 text-blue-500" />;
    return <LinkIcon className="h-5 w-5 text-green-500" />;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!event) return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Event Not Found</h1>
          <Button asChild><Link to="/events">Back to Events</Link></Button>
      </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 pt-24 pb-12 max-w-4xl">
        <Link to="/events" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 text-sm group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Events
        </Link>

        {/* Event Header */}
        <div className="mb-12">
             <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
             <p className="text-xl text-muted-foreground mb-6">{event.description}</p>
             <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{new Date(event.date).toLocaleDateString()}</span>
                {event.location && <span>• {event.location}</span>}
             </div>
        </div>

        {/* Resources Masonry Grid */}
        <div className="space-y-8">
            <h2 className="text-2xl font-bold border-b pb-4">Resources</h2>
            {resources.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {resources.map((res) => (
                        <div key={res.id} className="break-inside-avoid">
                            <Card className="hover:shadow-xl transition-all duration-300 border-border/50 group overflow-hidden bg-card/50 backdrop-blur-sm">
                                {res.image_url && (
                                    <div className="relative aspect-video overflow-hidden">
                                        <img 
                                            src={getDirectImageUrl(res.image_url)} 
                                            alt={res.title} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <p className="text-white text-xs font-medium">{res.title}</p>
                                        </div>
                                    </div>
                                )}
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-secondary/30 rounded-lg">
                                                {getIcon(res.title)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm leading-tight mb-1">{res.title}</h3>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{res.type || 'Resource'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="text-[10px] text-muted-foreground">
                                            Added {new Date(res.created_at).toLocaleDateString()}
                                        </div>
                                        <Button size="sm" variant="outline" className="h-8 rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground group-hover:border-primary/50" asChild>
                                            <a href={res.link} target="_blank" rel="noopener noreferrer">
                                                Open <ExternalLink className="ml-1.5 h-3 w-3" />
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-secondary/5">
                    <p className="text-muted-foreground italic">No resources specific to this event have been uploaded yet.</p>
                </div>
            )}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default EventResources;
