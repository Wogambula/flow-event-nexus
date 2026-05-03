import React from 'react';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Event } from '../../types';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter } from '../ui/card';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  onClick: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const minPrice = Math.min(...event.ticketTiers.map(t => t.price));
  const isFree = minPrice === 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden h-full flex flex-col cursor-pointer group hover:shadow-xl transition-all duration-300 border-zinc-200 dark:border-zinc-800"
        onClick={() => onClick(event.id)}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className="bg-indigo-600/90 hover:bg-indigo-600 backdrop-blur-md text-white border-none">
              {event.category}
            </Badge>
            {event.featured && (
              <Badge className="bg-amber-500/90 text-white border-none">
                Featured
              </Badge>
            )}
          </div>
          <div className="absolute bottom-2 right-2">
            <div className="bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {isFree ? 'FREE' : `From $${minPrice}`}
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 flex-grow">
          <div className="flex items-center text-xs text-muted-foreground mb-2 space-x-3">
            <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {event.date}</span>
            <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {event.time}</span>
          </div>
          <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {event.description}
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1 shrink-0 text-indigo-500" />
            <span className="truncate">{event.location}</span>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-auto pt-4 border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-medium text-muted-foreground">Organized by <span className="text-foreground">{event.organizerName}</span></span>
          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-600" />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EventCard;