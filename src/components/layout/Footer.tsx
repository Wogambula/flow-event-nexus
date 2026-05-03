import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-violet-400 bg-clip-text text-transparent">
              Ventify
            </span>
            <p className="mt-4 text-sm leading-relaxed">
              The discovery engine for real-world experiences. Find your flow, connect with communities, and create unforgettable memories.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Browse Events</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Create an Event</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Support Center</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Music & Festivals</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Tech & Business</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Food & Drink</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Sports & Wellness</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> 123 Event St, New York, NY</li>
              <li className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +1 (555) 000-0000</li>
              <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> hello@ventify.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Ventify Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;