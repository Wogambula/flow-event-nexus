export type UserRole = 'user' | 'organizer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  interests: string[];
}

export type EventCategory = 'Music' | 'Tech' | 'Sports' | 'Nightlife' | 'Art' | 'Food' | 'Education';

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  capacity: number;
  remaining: number;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  date: string;
  time: string;
  image: string;
  organizerId: string;
  organizerName: string;
  ticketTiers: TicketTier[];
  tags: string[];
  status: 'published' | 'draft' | 'cancelled';
  featured?: boolean;
}

export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  userId: string;
  tierId: string;
  tierName: string;
  price: number;
  purchaseDate: string;
  qrCode: string;
  status: 'valid' | 'used' | 'cancelled';
}

export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
}