import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, X } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "The Google Voice setup was perfect. It worked perfectly with our business tools, and stopping spam saved us hours every week.",
    author: "Elena Rodriguez",
    role: "Director, NexGen Logistics",
    rating: 5
  },
  {
    id: 2,
    content: "I had trouble with TextNow while traveling. The SIM card help and fixing guide were lifesavers. Very professional service.",
    author: "Marcus Chen",
    role: "Digital Nomad",
    rating: 5
  },
  {
    id: 3,
    content: "Security was our main goal. The 2-step verification setup and privacy focus were exactly what we needed. A true expert.",
    author: "Sarah Jenkins",
    role: "CTO, SecureNet Solutions",
    rating: 5
  },
  {
    id: 4,
    content: "Fast, reliable, and ready for the future. Moving from our old system to this new phone setup was smooth.",
    author: "David Miller",
    role: "Founder, TechFlow Startups",
    rating: 5
  },
  {
    id: 5,
    content: "The privacy advice was great. I now have a completely separate phone setup for my important business calls.",
    author: "Michael Chang",
    role: "Privacy Advocate",
    rating: 5
  },
  {
    id: 6,
    content: "Great support during our move to Google Workspace. The voice setup was done quickly with no issues.",
    author: "Amanda Torres",
    role: "Director, Tech Leads Inc",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) {
      const timer = setInterval(() => {
        handleNext();
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, isModalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-white dark:bg-white/5 transition-colors">
       {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Stories</span>
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Card Area */}
          <div className="relative min-h-[400px] md:min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex"
              >
                <div className="w-full flex flex-col justify-center items-center text-center p-8 md:p-12 rounded-3xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-xl dark:shadow-2xl">
                    
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6">
                        <Quote className="w-8 h-8 text-secondary" />
                    </div>
                    
                    <div className="flex gap-1 mb-6">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        ))}
                    </div>

                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 font-light italic mb-8 leading-relaxed max-w-2xl">
                        "{testimonials[currentIndex].content}"
                    </p>

                    <div className="mt-auto">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{testimonials[currentIndex].author}</h4>
                        <p className="text-primary text-sm font-medium tracking-wide uppercase">{testimonials[currentIndex].role}</p>
                    </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-8 mt-8">
            <div className="flex justify-center items-center gap-6">
                <button 
                    onClick={handlePrev}
                    className="p-3 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-primary/50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all transform hover:scale-110 z-20 cursor-pointer shadow-sm dark:shadow-none"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex gap-3 z-20">
                    {testimonials.slice(0, 5).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                idx === currentIndex ? 'w-8 bg-gradient-to-r from-primary to-secondary' : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                            }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>

                <button 
                    onClick={handleNext}
                    className="p-3 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-primary/50 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all transform hover:scale-110 z-20 cursor-pointer shadow-sm dark:shadow-none"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {testimonials.length > 5 && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2 rounded-full border border-gray-300 dark:border-white/10 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors z-20 cursor-pointer"
                >
                    View All Stories ({testimonials.length})
                </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Testimonials Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            >
                <div className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 bg-white/80 dark:bg-black/40 backdrop-blur-xl z-10">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">All Client Stories</h3>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.map((t) => (
                                <div key={t.id} className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-primary/20 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group shadow-sm dark:shadow-none">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 italic">
                                        "{t.content}"
                                    </p>
                                    <div className="flex items-center gap-3 mt-auto">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-gray-900 dark:text-white font-bold text-sm">
                                            {t.author.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-gray-900 dark:text-white font-semibold text-sm">{t.author}</div>
                                            <div className="text-gray-500 text-xs">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;