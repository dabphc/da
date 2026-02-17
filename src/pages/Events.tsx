import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ExternalLink, Calendar, MapPin } from "lucide-react";
import { getDirectImageUrl } from "@/lib/utils";



const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });
    if (!error && data) {
      const now = new Date();
      const upcoming = data.filter(e => new Date(e.date) >= now);
      const past = data.filter(e => new Date(e.date) < now).reverse(); // Most recent past first
      setUpcomingEvents(upcoming);
      setPastEvents(past);
    }
    setLoading(false);
  };

  const EventCard = ({ event }: { event: Event }) => {
    return (
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group h-fit break-inside-avoid mb-8 border-border/50 bg-card/50 backdrop-blur-sm">
        {event.image_url && (
            <div className="relative overflow-hidden">
                <img
                src={getDirectImageUrl(event.image_url)}
                alt={event.title}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        )}
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.title}</CardTitle>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </div>
            {event.location && (
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
            {event.description}
          </p>
          <Button variant="outline" className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300" onClick={() => navigate(`/events/${event.id}/resources`)}>
            <ExternalLink className="w-4 h-4 mr-2" /> View Resources
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-24 pb-12 px-6 text-center">
        <h1 className="page-title">
          Our Events
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join us for a series of workshops, competitions, and talks designed
          to inspire and educate.
        </p>
      </section>

      <section className="px-6 pb-12">
        <div className="container mx-auto space-y-16">
          
          {/* UPCOMING EVENTS */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Upcoming & Ongoing</h2>
            {loading ? (
                <p>Loading events...</p>
            ) : upcomingEvents.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)}
                </div>
            ) : (
                <p className="text-muted-foreground italic">No upcoming events at the moment. Stay tuned!</p>
            )}
          </div>

          {/* PAST EVENTS */}
           <div>
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Past Events</h2>
            {loading ? (
                <p>Loading events...</p>
            ) : pastEvents.length > 0 ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {pastEvents.map((event) => <EventCard key={event.id} event={event} />)}
                </div>
            ) : (
                <p className="text-muted-foreground italic">No past events found.</p>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
