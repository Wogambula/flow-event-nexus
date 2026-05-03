import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Clock, Share2, Heart, 
  ArrowLeft, CheckCircle2, Info, Users, ShieldCheck,
  Ticket as TicketIcon, Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger 
} from '../components/ui/dialog';
import { MOCK_EVENTS } from '../lib/mock-data';
import { toast } from 'sonner';

interface EventDetailsPageProps {
  onNavigate: (page: string, params?: any) => void;
  params: { id: string };
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = ({ onNavigate, params }) => {
  const event = MOCK_EVENTS.find(e => e.id === params.id) || MOCK_EVENTS[0];
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handlePurchase = () => {
    setIsBooking(true);
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      toast.success('Tickets purchased successfully!', {
        description: `You have booked ${event.ticketTiers.find(t => t.id === selectedTier)?.name} for ${event.title}.`,
      });
      onNavigate('dashboard');
    }, 2000);
  };

  return (
    <div className="pt-16 min-h-screen bg-background">
      {/* Back Button Mobile */}
      <div className="md:hidden fixed top-20 left-4 z-20">
        <Button 
          variant="secondary" 
          size="icon" 
          className="rounded-full bg-background/80 backdrop-blur-md shadow-lg"
          onClick={() => onNavigate('events')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-indigo-600 text-white mb-4">{event.category}</Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 md:gap-8 text-white/90">
              <div className="flex items-center"><Calendar className="h-5 w-5 mr-2 text-indigo-400" /> {event.date}</div>
              <div className="flex items-center"><Clock className="h-5 w-5 mr-2 text-indigo-400" /> {event.time}</div>
              <div className="flex items-center"><MapPin className="h-5 w-5 mr-2 text-indigo-400" /> {event.location}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-zinc dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl font-bold mb-4">About the Event</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {event.description}
                <br /><br />
                Join us for an unforgettable experience that brings together enthusiasts, experts, and explorers. 
                Whether you're looking to learn something new, network with like-minded individuals, or simply 
                enjoy the atmosphere, this event has something for everyone.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Highlights</h3>
              <ul className="space-y-3">
                {event.tags.map(tag => (
                  <li key={tag} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-indigo-500" /> {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Location & Venue</h2>
              <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800">
                <CardContent className="p-0">
                  <div className="h-64 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                    {/* Placeholder for Map */}
                    <div className="text-center">
                      <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground font-medium">{event.location}</p>
                      <Button variant="link" className="text-indigo-600">Open in Maps</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">The Organizer</h2>
              <div className="flex items-center p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mr-4">
                  {event.organizerName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{event.organizerName}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Host since 2022</p>
                  <Button variant="outline" size="sm">Contact Host</Button>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <div className="text-center">
                    <div className="font-bold">4.8/5</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">24</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="shadow-xl border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                  <h3 className="text-xl font-bold flex items-center">
                    <TicketIcon className="h-5 w-5 mr-2 text-indigo-500" /> 
                    Tickets & Registration
                  </h3>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-8">
                    {event.ticketTiers.map(tier => (
                      <div 
                        key={tier.id}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedTier === tier.id 
                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/10' 
                            : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                        onClick={() => setSelectedTier(tier.id)}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold">{tier.name}</span>
                          <span className="text-lg font-extrabold text-indigo-600">
                            {tier.price === 0 ? 'FREE' : `$${tier.price}`}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mb-3">{tier.description || 'Access to all main event areas.'}</div>
                        <div className="flex items-center text-[10px] font-medium text-amber-600">
                          <Zap className="h-3 w-3 mr-1" /> Only {tier.remaining} tickets left
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 font-bold"
                        disabled={!selectedTier}
                        onClick={() => document.getElementById('checkout-dialog')?.click()}
                      >
                        Book Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={`h-12 w-12 ${isSaved ? 'text-red-500 border-red-200' : ''}`}
                        onClick={() => {
                          setIsSaved(!isSaved);
                          toast(isSaved ? 'Removed from favorites' : 'Added to favorites');
                        }}
                      >
                        <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-12 w-12">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-center text-xs text-muted-foreground gap-4 py-4">
                      <div className="flex items-center"><ShieldCheck className="h-3 w-3 mr-1 text-green-500" /> Secure checkout</div>
                      <div className="flex items-center"><Users className="h-3 w-3 mr-1 text-blue-500" /> 2k+ Attending</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-start gap-4">
                <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm mb-1">Important Note</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This event is non-refundable 24 hours before the start. Please arrive at least 30 minutes before the scheduled time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Dialog Trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <button id="checkout-dialog" className="hidden" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Review your selection for {event.title}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 border-y border-zinc-100 dark:border-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Ticket Type</span>
              <span className="font-medium">{event.ticketTiers.find(t => t.id === selectedTier)?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Booking Fee</span>
              <span className="font-medium">$2.50</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-lg font-bold text-indigo-600">
                ${(event.ticketTiers.find(t => t.id === selectedTier)?.price || 0) + 2.50}
              </span>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 h-12"
              onClick={handlePurchase}
              disabled={isBooking}
            >
              {isBooking ? 'Processing...' : 'Confirm & Pay'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetailsPage;