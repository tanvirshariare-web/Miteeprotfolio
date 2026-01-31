import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { History, Smartphone, Globe, ShieldCheck, ChevronDown, Zap, Calendar, Cpu, Layers } from 'lucide-react';
import { TimelineItem } from '../types';

const timelineData: TimelineItem[] = [
  {
    id: 't1',
    period: '2022 – 2025',
    title: 'New Google Voice',
    description: 'Mastering the modern interface and advanced security protocols. Implementing 2-Step Verification (2FA) for business accounts, optimizing spam filtering with AI-driven detection, and ensuring high-deliverability for VoIP systems.',
    tech: ['New GV Interface', '2FA Security', 'AI Spam Filter', 'High Deliverability'],
  },
  {
    id: 't2',
    period: '2018 – 2021',
    title: 'Mid-Era Google Voice',
    description: 'Navigating the transition from Legacy to Modern architecture. Adapted to major carrier policy changes, solved early porting restrictions, and established reliable call routing protocols during the platform migration.',
    tech: ['Material Design', 'Policy Adaptation', 'Porting Solutions', 'Carrier Routing'],
  },
  {
    id: 't3',
    period: '2014 – 2017',
    title: 'Legacy Google Voice',
    description: 'The foundation years. Expert setup of the original "Legacy" interface. Specialized in OBi hardware integration for physical lines and basic call forwarding logic for early adopters.',
    tech: ['Legacy Interface', 'OBi100/200', 'Basic Forwarding', 'Physical Integration'],
  },
];

const TimelineCard: React.FC<{ 
  item: TimelineItem; 
  index: number; 
  isLeft: boolean;
}> = ({ item, index, isLeft }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0); // Default first one open

  return (
    <div className={`flex w-full mb-16 md:mb-24 relative ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
       {/* Spacer for the other side on desktop */}
       <div className="hidden md:block w-1/2" />
       
       {/* The Dot on the line */}
       <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-slate-950 border-2 border-gray-300 dark:border-white/10 flex items-center justify-center z-20 shadow-md dark:shadow-[0_0_15px_rgba(0,0,0,0.8)]">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 ${isExpanded ? 'bg-secondary shadow-[0_0_15px_#06b6d4] scale-110' : 'bg-gray-400 dark:bg-gray-600'}`} 
          />
       </div>

       {/* Connection Line from main line to card (Mobile only) */}
       <div className="md:hidden absolute left-4 top-10 bottom-0 w-[2px] bg-gray-200 dark:bg-white/5 -z-10" />

       {/* Content Card */}
       <motion.div 
         initial={{ opacity: 0, x: isLeft ? 50 : -50, y: 20 }}
         whileInView={{ opacity: 1, x: 0, y: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.5, delay: index * 0.1 }}
         className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}
       >
         <motion.div 
            layout
            onClick={() => setIsExpanded(!isExpanded)}
            className={`cursor-pointer overflow-hidden relative rounded-2xl border transition-all duration-500 backdrop-blur-md group ${
                isExpanded 
                ? 'bg-white dark:bg-white/10 border-primary/50 shadow-xl shadow-primary/10 dark:shadow-[0_0_40px_rgba(139,92,246,0.15)]' 
                : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 shadow-lg dark:shadow-none'
            }`}
         >
             {/* Glow Effect */}
             <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none ${isExpanded ? 'opacity-100' : 'group-hover:opacity-50'}`} />

            {/* Card Header */}
            <div className="p-6 relative z-10">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                             <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                                isExpanded ? 'bg-secondary/10 dark:bg-secondary/20 text-secondary' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                             }`}>
                                <Calendar size={12} />
                                {item.period}
                             </span>
                        </div>
                        <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isExpanded ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                            {item.title}
                        </h3>
                    </div>
                    
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-2 rounded-full flex-shrink-0 transition-colors ${isExpanded ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'bg-transparent text-gray-400 group-hover:bg-gray-100 dark:group-hover:bg-white/5 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </div>
                
                {/* Preview Text (shown when collapsed) */}
                {!isExpanded && (
                    <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-sm text-gray-500 mt-2 line-clamp-2"
                    >
                        {item.description}
                    </motion.p>
                )}
            </div>

            {/* Expandable Content Body */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-6 pb-6 pt-0 relative z-10">
                             <div className="h-px w-full bg-gray-100 dark:bg-white/10 mb-4" />
                             <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-base">
                                {item.description}
                             </p>
                             
                             <div className="flex flex-wrap gap-2">
                                {item.tech.map((t) => (
                                    <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-xs font-medium text-gray-700 dark:text-primary shadow-sm">
                                        <Zap size={10} className="text-secondary" />
                                        {t}
                                    </span>
                                ))}
                             </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
         </motion.div>
       </motion.div>
    </div>
  );
}

const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  // Smooth out the scroll progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-transparent transition-colors">
      {/* Ambient Background Elements */}
      <div className="absolute top-1/4 left-0 w-full h-[500px] bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 skew-y-12 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-6 shadow-sm dark:shadow-none"
          >
             <Layers className="w-4 h-4 text-secondary" />
             <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-widest">Trust & History</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Google Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Evolution</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          >
            A decade of expertise across every version of the platform.
            <br className="hidden md:block" />
            <span className="text-sm opacity-60 mt-2 block">(Click on a year to explore details)</span>
          </motion.p>
        </div>

        <div ref={containerRef} className="relative container mx-auto px-4 sm:px-6">
          
          {/* Central Line Structure */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-white/5 rounded-full z-0">
             {/* Animated Progress Line */}
             <motion.div 
                className="w-full bg-gradient-to-b from-primary via-secondary to-primary rounded-full origin-top"
                style={{ scaleY, height: "100%" }}
             />
          </div>
          
          {/* Timeline Items */}
          <div className="relative z-10 pt-10">
            {timelineData.map((item, idx) => (
                <TimelineCard 
                    key={item.id} 
                    item={item} 
                    index={idx} 
                    isLeft={idx % 2 !== 0} 
                />
            ))}
          </div>
          
           {/* End Cap */}
           <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 bottom-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-white/10 z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-700" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;