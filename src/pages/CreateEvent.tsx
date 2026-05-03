import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Upload, MapPin, 
  Calendar as CalendarIcon, Clock, Tag, Plus, 
  Trash2, Info, CheckCircle2, Wand2 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

interface CreateEventProps {
  onNavigate: (page: string) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    time: '',
    capacity: '',
    tags: [] as string[],
    image: null as File | null,
    tiers: [{ id: '1', name: 'General Admission', price: 0, capacity: 100 }]
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handlePublish = () => {
    toast.success('Event published successfully!', {
      description: 'Your event is now live on Ventify and open for bookings.',
    });
    onNavigate('dashboard');
  };

  const steps = [
    { id: 1, title: 'Basics', description: 'Essential details' },
    { id: 2, title: 'Schedule', description: 'Date & Location' },
    { id: 3, title: 'Tickets', description: 'Pricing & Capacity' },
    { id: 4, title: 'Review', description: 'Go live' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-zinc-50 dark:bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => onNavigate('dashboard')} className="mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" /> Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Event</h1>
            <p className="text-muted-foreground">Turn your vision into an unforgettable experience.</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0"></div>
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= s.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white dark:bg-zinc-900 text-muted-foreground border-2 border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {step > s.id ? <CheckCircle2 className="h-6 w-6" /> : s.id}
              </div>
              <div className="hidden sm:block mt-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {s.title}
              </div>
            </div>
          ))}
        </div>

        {/* Form Steps */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Event Title</label>
                    <Input 
                      placeholder="e.g. Neon Pulse Festival" 
                      className="h-12"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Category</label>
                      <Select onValueChange={(v) => setFormData({...formData, category: v})}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Music">Music</SelectItem>
                          <SelectItem value="Tech">Tech</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Art">Art</SelectItem>
                          <SelectItem value="Food">Food</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Visibility</label>
                      <Select defaultValue="public">
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public (Visible to everyone)</SelectItem>
                          <SelectItem value="private">Private (Invite only)</SelectItem>
                          <SelectItem value="unlisted">Unlisted (Link access)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Description</label>
                    <Textarea 
                      placeholder="Tell people what to expect..." 
                      className="min-h-[150px] resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="p-10 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                    <div className="bg-zinc-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <h4 className="font-bold mb-1">Upload Event Banner</h4>
                    <p className="text-sm text-muted-foreground">Recommended size: 1600x900px</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Date</label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="date" className="pl-10 h-12" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Start Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input type="time" className="pl-10 h-12" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Location Type</label>
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1 h-12 font-bold border-indigo-200 bg-indigo-50/30 text-indigo-600">Physical Venue</Button>
                      <Button variant="outline" className="flex-1 h-12 font-bold">Online Event</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Venue Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="Enter street address, city" className="pl-10 h-12" />
                    </div>
                  </div>
                  <Card className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                    <CardContent className="p-4 flex gap-3">
                      <Info className="h-5 w-5 text-indigo-500 shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Accurate location helps users find your event through discovery filters. 
                        Make sure the address is clear and searchable.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Ticket Tiers</h3>
                    <Button variant="outline" size="sm" onClick={() => {
                      const newTiers = [...formData.tiers, { id: Date.now().toString(), name: 'New Tier', price: 0, capacity: 50 }];
                      setFormData({...formData, tiers: newTiers});
                    }}>
                      <Plus className="h-4 w-4 mr-2" /> Add Tier
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.tiers.map((tier, index) => (
                      <div key={tier.id} className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 relative">
                        {index > 0 && (
                          <button 
                            className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                            onClick={() => {
                              const newTiers = formData.tiers.filter(t => t.id !== tier.id);
                              setFormData({...formData, tiers: newTiers});
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Tier Name</label>
                            <Input defaultValue={tier.name} className="h-10" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Price ($)</label>
                            <Input type="number" defaultValue={tier.price} className="h-10" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Capacity</label>
                            <Input type="number" defaultValue={tier.capacity} className="h-10" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold flex items-center">
                      <Tag className="h-4 w-4 mr-2" /> Event Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {['Concert', 'Workshop', 'Networking', 'Outdoor'].map(tag => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Input placeholder="Add tag and press enter..." className="h-12" />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div className="text-center mb-10">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wand2 className="h-10 w-10 text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold">Review Your Event</h3>
                    <p className="text-muted-foreground">Almost there! Review your details before publishing.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                      <div className="flex gap-6">
                        <div className="w-32 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-lg shrink-0 overflow-hidden">
                           <div className="w-full h-full flex items-center justify-center text-zinc-400">Preview</div>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{formData.title || 'Untitled Event'}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">{formData.description || 'No description provided.'}</p>
                          <div className="flex gap-4 mt-2 text-xs font-medium">
                            <span className="flex items-center text-indigo-600"><CalendarIcon className="h-3 w-3 mr-1" /> July 15, 2025</span>
                            <span className="flex items-center text-indigo-600"><MapPin className="h-3 w-3 mr-1" /> New York, NY</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="text-[10px] uppercase text-muted-foreground mb-1">Total Capacity</div>
                        <div className="font-bold text-xl">250 People</div>
                      </div>
                      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="text-[10px] uppercase text-muted-foreground mb-1">Ticket Tiers</div>
                        <div className="font-bold text-xl">{formData.tiers.length} Tiers</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl text-amber-800 dark:text-amber-300">
                    <Info className="h-5 w-5 shrink-0" />
                    <p className="text-xs leading-relaxed">
                      By clicking publish, you agree to Ventify's Terms of Service and Event Guidelines. 
                      Your event will be visible immediately.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                {step > 1 && (
                  <Button variant="outline" size="lg" className="flex-1 h-12" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 4 ? (
                  <Button size="lg" className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700" onClick={nextStep}>
                    Continue <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Button size="lg" className="flex-1 h-12 bg-green-600 hover:bg-green-700" onClick={handlePublish}>
                    Publish Event
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;