import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Bell, Search, PlusCircle, LayoutDashboard, Ticket as TicketIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { MOCK_USER } from '../../lib/mock-data';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn] = useState(true); // Mock login state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Explore', id: 'explore' },
    { label: 'Categories', id: 'categories' },
    { label: 'Trending', id: 'trending' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('landing')}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Ventify
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id === 'explore' ? 'events' : 'landing')}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                  currentPage === item.id ? 'text-indigo-600' : 'text-foreground/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search events..." 
                className="pl-8 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-indigo-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onNavigate('create')}
                  title="Create Event"
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all">
                      <AvatarImage src={MOCK_USER.avatar} />
                      <AvatarFallback>{MOCK_USER.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate('tickets')}>
                      <TicketIcon className="mr-2 h-4 w-4" />
                      My Tickets
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate('profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => onNavigate('auth')}>Log in</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => onNavigate('auth')}>Sign up</Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id === 'explore' ? 'events' : 'landing');
                  setIsMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted w-full text-left"
              >
                {item.label}
              </button>
            ))}
            {isLoggedIn && (
              <>
                <button
                  onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted w-full text-left"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { onNavigate('create'); setIsMobileMenuOpen(false); }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted w-full text-left"
                >
                  Create Event
                </button>
              </>
            )}
            {!isLoggedIn && (
              <div className="pt-4 pb-3 border-t border-muted">
                <Button className="w-full bg-indigo-600" onClick={() => onNavigate('auth')}>Sign up</Button>
                <Button variant="outline" className="w-full mt-2" onClick={() => onNavigate('auth')}>Log in</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;