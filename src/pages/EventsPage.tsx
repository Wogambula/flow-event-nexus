import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, MapPin, Calendar, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import EventCard from '../components/events/EventCard';
import { MOCK_EVENTS } from '../lib/mock-data';
import { EventCategory } from '../types';

interface EventsPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialParams?: any;
}

const CATEGORIES: EventCategory[] = ['Music', 'Tech', 'Sports', 'Nightlife', 'Art', 'Food', 'Education'];

const EventsPage: React.FC<EventsPageProps> = ({ onNavigate, initialParams }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>(initialParams?.category || 'All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-zinc-50 dark:bg-background">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Discover Experiences</h1>
          <p className="text-muted-foreground">Browse through the best events happening around you.</p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search by name, artist, or venue..." 
              className="pl-10 h-12 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Button 
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              className={selectedCategory === 'All' ? 'bg-indigo-600' : ''}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </Button>
            {CATEGORIES.map(cat => (
              <Button 
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={selectedCategory === cat ? 'bg-indigo-600' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="h-12 px-5 hidden md:flex"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Grid */}
          <div className="flex-1">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                    >
                      <EventCard 
                        event={event} 
                        onClick={(id) => onNavigate('event-details', { id })}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No events found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
                <Button 
                  variant="link" 
                  className="mt-4 text-indigo-600"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar - Desktop Only for now */}
          <div className="hidden lg:block w-72">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 sticky top-24">
              <h3 className="font-bold mb-4 flex items-center"><Filter className="h-4 w-4 mr-2" /> Refine Search</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City or region" className="pl-8 h-10 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" size="sm" className="justify-start text-xs font-normal">
                      <Calendar className="h-3 w-3 mr-2" /> Today
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start text-xs font-normal">
                      <Calendar className="h-3 w-3 mr-2" /> This Weekend
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start text-xs font-normal">
                      <Calendar className="h-3 w-3 mr-2" /> This Month
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline" className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30">Free</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30">$</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30">$$</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30">$$$</Badge>
                  </div>
                </div>

                <Button className="w-full bg-indigo-600">Apply Filters</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;