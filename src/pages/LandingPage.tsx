import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Zap, MapPin, Calendar, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import EventCard from '../components/events/EventCard';
import { MOCK_EVENTS } from '../lib/mock-data';
import { EventCategory } from '../types';

interface LandingPageProps {
  onNavigate: (page: string, params?: any) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const featuredEvents = MOCK_EVENTS.filter(e => e.featured);
  const categories: { name: EventCategory; icon: any; color: string }[] = [
    { name: 'Music', icon: Zap, color: 'bg-pink-500' },
    { name: 'Tech', icon: Compass, color: 'bg-blue-500' },
    { name: 'Sports', icon: Star, color: 'bg-orange-500' },
    { name: 'Nightlife', icon: Star, color: 'bg-purple-500' },
    { name: 'Art', icon: Star, color: 'bg-indigo-500' },
    { name: 'Food', icon: Star, color: 'bg-green-500' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/95d86085-93e8-4fee-a535-b17a879c0139/music-festival-hero-2e0ce8f7-1777810274166.webp" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Find Your <span className="text-indigo-500">Flow</span>. <br />
              Explore the Pulse of Your City.
            </h1>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl">
              Ventify is your gateway to the most exciting concerts, tech gatherings, and local experiences. Discover, book, and enjoy in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('events')}
              >
                Explore Events <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('create')}
              >
                Host an Event
              </Button>
            </div>

            {/* Quick Search */}
            <div className="bg-background/95 backdrop-blur-lg p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="What are you looking for?" className="pl-10 h-12 border-none shadow-none focus-visible:ring-0 text-base" />
              </div>
              <div className="md:w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Location" className="pl-10 h-12 border-none shadow-none focus-visible:ring-0 text-base" />
              </div>
              <Button className="h-12 px-6 bg-zinc-900 dark:bg-indigo-600 text-white">Search</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Events */}
      <section className="py-20 bg-background" id="trending">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
              <p className="text-muted-foreground">The hottest events everyone is talking about.</p>
            </div>
            <Button variant="ghost" className="text-indigo-600 font-semibold" onClick={() => onNavigate('events')}>
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={(id) => onNavigate('event-details', { id })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50" id="categories">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Find exactly what you're in the mood for from our diverse range of event types.</p>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer group"
                onClick={() => onNavigate('events', { category: cat.name })}
              >
                <div className={`aspect-square rounded-3xl ${cat.color} mb-4 flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl transition-all`}>
                  <cat.icon size={48} />
                </div>
                <h3 className="font-bold">{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Create Your Own Event?</h2>
              <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of organizers using Ventify to host concerts, conferences, and meetups. Powerful tools, zero hassle.
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-indigo-600 hover:bg-zinc-100 text-lg px-10 py-6 h-auto"
                onClick={() => onNavigate('create')}
              >
                Start Organizing Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;