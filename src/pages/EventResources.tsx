import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { Event, EventResource } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, FileText, Video, Link as LinkIcon } from "lucide-react";

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

        {/* Resources List */}
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-4">Resources</h2>
            {resources.length > 0 ? (
                <div className="grid gap-4">
                    {resources.map((res) => (
                        <Card key={res.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-100 rounded-full">
                                        {getIcon(res.title)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{res.title}</h3>
                                        <p className="text-sm text-muted-foreground capitalize">{res.type || 'link'}</p>
                                    </div>
                                </div>
                                <Button variant="outline" asChild>
                                    <a href={res.link} target="_blank" rel="noopener noreferrer">
                                        Open <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground italic">No resources specific to this event have been uploaded yet.</p>
            )}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default EventResources;
