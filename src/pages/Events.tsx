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
import { ExternalLink } from "lucide-react";



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
      <Card className="overflow-hidden transition-transform transform hover:scale-105 h-full flex flex-col">
        {event.image_url && (
            <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-48 object-cover"
            />
        )}
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>
            {new Date(event.date).toLocaleDateString()}
            {event.location && ` • ${event.location}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <p className="text-muted-foreground mb-4">{event.description}</p>
          <Button variant="outline" className="w-full" onClick={() => navigate(`/events/${event.id}/resources`)}>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
