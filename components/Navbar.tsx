import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronRight, LayoutDashboard, LogIn, Briefcase, Shield, Clock, Home, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  openDashboard: () => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ openDashboard, isLoggedIn, onLoginClick, userName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Services', href: '#services', icon: Briefcase, description: 'Explore our catalog' },
    { name: 'Experience', href: '#experience', icon: Clock, description: 'Our history & timeline' },
    { name: 'Trust', href: '#trust', icon: Shield, description: 'Why choose us' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? 'bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-lg dark:shadow-2xl'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left Side: Logo */}
          <div className="flex items-center gap-6 relative z-50">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Phone className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  VoIP<span className="text-secondary">.Expert</span>
                  </span>
              </div>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative group px-1 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              
              {isLoggedIn ? (
                 <button
                    onClick={openDashboard}
                    className="ml-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold flex items-center gap-2 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                >
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                        {userName?.charAt(0)}
                    </div>
                    Dashboard
                </button>
              ) : (
                <button
                    onClick={onLoginClick}
                    className="ml-4 px-6 py-2 rounded-full bg-white text-black font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-transform hover:-translate-y-0.5"
                >
                    <LogIn size={16} />
                    Login
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                        <X size={24} />
                    </motion.div>
                ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                        <Menu size={24} />
                    </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#030712] md:hidden flex flex-col pt-24 px-6 h-[100dvh]"
          >
            {/* Cyber Gradient Orbs */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="flex flex-col space-y-4 relative z-10 flex-1 overflow-y-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.1 }}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="group flex items-center justify-between px-5 py-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/30 active:scale-[0.98] transition-all shadow-lg backdrop-blur-md"
                >
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors text-gray-400">
                          <link.icon size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-white tracking-wide">{link.name}</span>
                        <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{link.description}</span>
                      </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                </motion.a>
              ))}
              
              <div className="h-px w-full bg-white/10 my-2" />

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                    if (isLoggedIn) {
                         openDashboard();
                    } else {
                        onLoginClick();
                    }
                    setIsOpen(false);
                }}
                className="group flex items-center justify-between px-5 py-5 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/50 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                        {isLoggedIn ? <LayoutDashboard size={20} /> : <LogIn size={20} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-white">{isLoggedIn ? 'Client Dashboard' : 'Login to Portal'}</span>
                        <span className="text-xs text-gray-400">{isLoggedIn ? 'Access your account' : 'Secure client access'}</span>
                    </div>
                </div>
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                    <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </motion.button>
            </div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-auto pb-10 text-center relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 mb-3">
                    <Zap size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Premium System</span>
                </div>
                <p className="text-gray-600 text-xs">Designed for 2026 • VoIP Expert</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;