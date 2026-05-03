import { Event, User } from '../types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  role: 'organizer',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  interests: ['Music', 'Tech', 'Art']
};

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Neon Pulse: Summer Festival',
    description: 'Experience the ultimate summer music festival under the stars. Featuring top DJs and live bands from across the globe.',
    category: 'Music',
    location: 'Central Park, New York',
    date: '2025-07-15',
    time: '18:00',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/95d86085-93e8-4fee-a535-b17a879c0139/music-festival-hero-2e0ce8f7-1777810274166.webp',
    organizerId: 'u1',
    organizerName: 'Pulsar Events',
    ticketTiers: [
      { id: 't1', name: 'General Admission', price: 85, capacity: 5000, remaining: 1200 },
      { id: 't2', name: 'VIP Experience', price: 250, capacity: 500, remaining: 45 }
    ],
    tags: ['Festival', 'Summer', 'Live Music'],
    status: 'published',
    featured: true
  },
  {
    id: 'e2',
    title: 'DevSummit 2025: AI Frontiers',
    description: 'The premier conference for AI developers and enthusiasts. Join us for deep dives into LLMs, computer vision, and the future of engineering.',
    category: 'Tech',
    location: 'Moscone Center, San Francisco',
    date: '2025-09-10',
    time: '09:00',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/95d86085-93e8-4fee-a535-b17a879c0139/tech-conference-230f9d28-1777810273926.webp',
    organizerId: 'u2',
    organizerName: 'TechFlow',
    ticketTiers: [
      { id: 't3', name: 'Standard Pass', price: 499, capacity: 2000, remaining: 800 },
      { id: 't4', name: 'Workshop Bundle', price: 799, capacity: 500, remaining: 120 }
    ],
    tags: ['AI', 'Development', 'Networking'],
    status: 'published',
    featured: true
  },
  {
    id: 'e3',
    title: 'Taste of the World',
    description: 'A culinary journey featuring street food from 50+ countries. Bring your appetite for a global gastronomic adventure.',
    category: 'Food',
    location: 'Hyde Park, London',
    date: '2025-06-20',
    time: '11:00',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/95d86085-93e8-4fee-a535-b17a879c0139/food-festival-f2f85004-1777810273442.webp',
    organizerId: 'u3',
    organizerName: 'Global Eats',
    ticketTiers: [
      { id: 't5', name: 'Entry + 5 Tokens', price: 35, capacity: 3000, remaining: 1500 },
      { id: 't6', name: 'Unlimited Tasting', price: 120, capacity: 200, remaining: 10 }
    ],
    tags: ['Foodie', 'Family Friendly', 'Culture'],
    status: 'published'
  },
  {
    id: 'e4',
    title: 'Metropolis Nightlife: Neon Nights',
    description: 'The cities most exclusive electronic party. Immersive light shows and world-class acoustics.',
    category: 'Nightlife',
    location: 'Vanguard Club, Berlin',
    date: '2025-08-05',
    time: '22:00',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/95d86085-93e8-4fee-a535-b17a879c0139/nightlife-party-c7a5000d-1777810274770.webp',
    organizerId: 'u1',
    organizerName: 'Pulsar Events',
    ticketTiers: [
      { id: 't7', name: 'Late Bird', price: 45, capacity: 1000, remaining: 300 }
    ],
    tags: ['Party', 'Techno', 'Nightlife'],
    status: 'published'
  },
  {
    id: 'e5',
    title: 'Hoops Classic: City Finals',
    description: 'Witness the local champions battle it out in the most anticipated basketball game of the year.',
    category: 'Sports',
    location: 'Madison Square Garden, New York',
    date: '2025-05-30',
    time: '19:30',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/95d86085-93e8-4fee-a535-b17a879c0139/sports-event-1b41a7e0-1777810273427.webp',
    organizerId: 'u4',
    organizerName: 'City Sports League',
    ticketTiers: [
      { id: 't8', name: 'Courtside', price: 450, capacity: 50, remaining: 5 },
      { id: 't9', name: 'Standard Seating', price: 65, capacity: 18000, remaining: 4000 }
    ],
    tags: ['Basketball', 'Competition', 'Live Sports'],
    status: 'published'
  },
  {
    id: 'e6',
    title: 'Modern Perspectives Art Expo',
    description: 'Exploring the intersection of digital art and physical sculpture. A curated collection from emerging modern artists.',
    category: 'Art',
    location: 'MoMA, New York',
    date: '2025-10-12',
    time: '10:00',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/95d86085-93e8-4fee-a535-b17a879c0139/art-exhibition-fa13d4cb-1777810273919.webp',
    organizerId: 'u5',
    organizerName: 'Curator Collective',
    ticketTiers: [
      { id: 't10', name: 'Free Admission', price: 0, capacity: 1000, remaining: 250 }
    ],
    tags: ['Art', 'Museum', 'Modern'],
    status: 'published'
  }
];