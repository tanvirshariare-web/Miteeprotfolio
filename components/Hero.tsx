import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const platforms = [
    "Google Voice",
    "TextNow",
    "Talkatone",
    "TextFree",
    "TextPlus",
    "Sideline",
    "Ring4"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % platforms.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 content-visibility-auto">
      {/* Tech Grid Background - Optimized opacity */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Ambient Glows - Reduced blur radius for performance */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-background/50 dark:to-background" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight will-change-transform"
        >
          Pro <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-500">Virtual</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-blue-500">
            Phone Numbers
          </span>
        </motion.h1>

        {/* Carousel - Dynamic Text Animation */}
        <div className="mb-12 flex flex-col items-center justify-center relative z-20">
             {/* Animated Container */}
             <div className="relative h-14 md:h-24 w-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={index}
                        initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0 flex items-center justify-center font-bold text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 whitespace-nowrap pb-1"
                    >
                    {platforms[index]}
                    </motion.span>
                </AnimatePresence>
             </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed px-4"
        >
          Building safe and reliable phone systems for your business and privacy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, 'services')}
            className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold shadow-lg shadow-primary/20 dark:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-xl hover:shadow-primary/40 dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 relative overflow-hidden will-change-transform"
          >
            <span className="relative z-10 flex items-center gap-2">Our Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold hover:bg-white dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all flex items-center justify-center shadow-sm dark:shadow-none"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={(e) => scrollToSection(e as any, 'services')}
      >
        <div className="p-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur hover:bg-white dark:hover:bg-black/40 transition-colors shadow-lg">
            <ChevronDown className="text-gray-600 dark:text-gray-400 w-6 h-6 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;