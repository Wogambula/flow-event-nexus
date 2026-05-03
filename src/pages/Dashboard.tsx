import React, { useState } from 'react';
import { 
  LayoutDashboard, Ticket as TicketIcon, Calendar, 
  Settings, User as UserIcon, LogOut, Search,
  TrendingUp, Users, DollarSign, Plus, CheckCircle2,
  Clock, MapPin, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { MOCK_EVENTS, MOCK_USER } from '../lib/mock-data';
import { motion } from 'framer-motion';

interface DashboardProps {
  onNavigate: (page: string, params?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<'user' | 'organizer'>(MOCK_USER.role as 'user' | 'organizer');

  const userTickets = [
    { id: 'tk1', event: MOCK_EVENTS[0], tier: 'VIP Experience', date: '2025-07-15', status: 'valid', qr: 'VZ-129-XP' },
    { id: 'tk2', event: MOCK_EVENTS[1], tier: 'Standard Pass', date: '2025-09-10', status: 'valid', qr: 'VZ-883-AI' }
  ];

  const organizerStats = [
    { label: 'Total Revenue', value: '$45,280', icon: DollarSign, color: 'text-green-500', trend: '+12.5%' },
    { label: 'Tickets Sold', value: '1,240', icon: TicketIcon, color: 'text-blue-500', trend: '+8.2%' },
    { label: 'Avg. Attendance', value: '94%', icon: Users, color: 'text-purple-500', trend: '+1.5%' },
    { label: 'Active Events', value: '4', icon: Calendar, color: 'text-indigo-500', trend: '0%' }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-zinc-50 dark:bg-background">
      <div className="container mx-auto px-4">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Hello, {MOCK_USER.name}</h1>
            <p className="text-muted-foreground">Manage your experiences and events from one place.</p>
          </div>
          <div className="flex gap-2 p-1 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 w-fit">
            <Button 
              variant={role === 'user' ? 'default' : 'ghost'} 
              size="sm"
              className={role === 'user' ? 'bg-indigo-600' : ''}
              onClick={() => setRole('user')}
            >
              User
            </Button>
            <Button 
              variant={role === 'organizer' ? 'default' : 'ghost'} 
              size="sm"
              className={role === 'organizer' ? 'bg-indigo-600' : ''}
              onClick={() => setRole('organizer')}
            >
              Organizer
            </Button>
          </div>
        </div>

        {role === 'organizer' ? (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {organizerStats.map((stat) => (
                <Card key={stat.label} className="border-zinc-200 dark:border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="text-green-500 bg-green-500/10 border-green-500/20">
                        {stat.trend}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Hosted Events */}
              <Card className="lg:col-span-2 border-zinc-200 dark:border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>My Hosted Events</CardTitle>
                    <CardDescription>Performance of your currently active events.</CardDescription>
                  </div>
                  <Button size="sm" className="bg-indigo-600" onClick={() => onNavigate('create')}>
                    <Plus className="h-4 w-4 mr-2" /> New Event
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_EVENTS.slice(0, 3).map((event) => (
                      <div 
                        key={event.id}
                        className="flex items-center p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
                        onClick={() => onNavigate('event-details', { id: event.id })}
                      >
                        <img src={event.image} className="w-16 h-12 rounded-lg object-cover mr-4" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold truncate">{event.title}</h4>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" /> {event.date}
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-6 mx-8">
                          <div className="text-center">
                            <div className="text-sm font-bold">128</div>
                            <div className="text-[10px] text-muted-foreground uppercase">Sold</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold">$10.2k</div>
                            <div className="text-[10px] text-muted-foreground uppercase">Revenue</div>
                          </div>
                        </div>
                        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/10 border-none">Active</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates on your platform interactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { type: 'purchase', text: 'Sarah M. purchased a VIP ticket', time: '2 mins ago' },
                      { type: 'rsvp', text: 'New RSVP for "Taste of the World"', time: '1 hour ago' },
                      { type: 'payout', text: 'Payout of $4,200 initiated', time: '5 hours ago' },
                      { type: 'review', text: '5-star review from David K.', time: 'Yesterday' }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium">{item.text}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6">View All Logs</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="border-zinc-200 dark:border-zinc-800">
                <CardContent className="p-4 flex flex-col gap-2">
                  <Button variant="secondary" className="justify-start bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 border-none">
                    <LayoutDashboard className="h-4 w-4 mr-3" /> Overview
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <TicketIcon className="h-4 w-4 mr-3" /> My Tickets
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <Calendar className="h-4 w-4 mr-3" /> Saved Events
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <TrendingUp className="h-4 w-4 mr-3" /> Recommendations
                  </Button>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2"></div>
                  <Button variant="ghost" className="justify-start">
                    <Settings className="h-4 w-4 mr-3" /> Settings
                  </Button>
                  <Button variant="ghost" className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                    <LogOut className="h-4 w-4 mr-3" /> Logout
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Upcoming Tickets */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <TicketIcon className="h-5 w-5 mr-2 text-indigo-500" /> Your Upcoming Tickets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userTickets.map((ticket) => (
                    <Card key={ticket.id} className="overflow-hidden border-zinc-200 dark:border-zinc-800 group">
                      <div className="flex">
                        <div className="w-2 bg-indigo-500"></div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <Badge className="mb-2 bg-zinc-100 dark:bg-zinc-800 text-foreground hover:bg-zinc-100 border-none">
                                {ticket.tier}
                              </Badge>
                              <h3 className="font-bold text-lg line-clamp-1">{ticket.event.title}</h3>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-mono font-bold text-muted-foreground">ID: {ticket.qr}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2 text-indigo-500" /> {ticket.date}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2 text-indigo-500" /> {ticket.event.location}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center text-xs font-medium text-green-500">
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Active Ticket
                            </div>
                            <Button size="sm" variant="outline" className="text-xs">
                              View QR Code
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recommended for You */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-amber-500" /> Recommended for You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_EVENTS.slice(3, 5).map((event) => (
                    <div 
                      key={event.id}
                      className="flex items-center p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-all cursor-pointer group"
                      onClick={() => onNavigate('event-details', { id: event.id })}
                    >
                      <img src={event.image} className="w-24 h-24 rounded-xl object-cover mr-4" />
                      <div className="flex-1 min-w-0">
                        <Badge variant="secondary" className="mb-1 text-[10px]">{event.category}</Badge>
                        <h4 className="font-bold truncate group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {event.date}
                        </div>
                        <div className="text-sm font-bold text-indigo-600 mt-2">
                          {event.ticketTiers[0].price === 0 ? 'FREE' : `From $${event.ticketTiers[0].price}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;