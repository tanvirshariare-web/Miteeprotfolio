import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MessageCircle, Briefcase, Star, X, Layers, ArrowRight, Smartphone, Mail, Globe, Zap } from 'lucide-react';
import { GoogleVoiceIcon, TextNowIcon, GmailIcon, TalkatoneIcon, TextFreeIcon, TextPlusIcon, TextMeIcon, DingtoneIcon, Ring4Icon, SidelineIcon } from './BrandIcons';

interface Product {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  status: 'Available' | 'Limited' | 'Sold Out';
  tags: string[];
  popular?: boolean;
}

// Updated Product Inventory
const products: Product[] = [
  // --- Google Voice Services ---
  {
    id: 'gv-legacy',
    title: 'Google Voice (2014–2017)',
    description: 'Rare legacy accounts. High trust score, perfect for long-term business use.',
    icon: GoogleVoiceIcon,
    category: 'google-voice',
    status: 'Available',
    tags: ['Legacy', '2014-2017'],
    popular: true
  },
  {
    id: 'gv-mid',
    title: 'Google Voice (2018–2021)',
    description: 'Established accounts from the transition era. Stable and reliable.',
    icon: GoogleVoiceIcon,
    category: 'google-voice',
    status: 'Available',
    tags: ['Stable', '2018-2021'],
  },
  {
    id: 'gv-modern',
    title: 'Google Voice (2022–2025)',
    description: 'Modern verified accounts. Clean history, ready for marketing.',
    icon: GoogleVoiceIcon,
    category: 'google-voice',
    status: 'Available',
    tags: ['Modern', '2022-2025'],
  },
  {
    id: 'gv-new',
    title: 'New Google Voice',
    description: 'Freshly minted accounts. Latest verification protocols.',
    icon: GoogleVoiceIcon,
    category: 'google-voice',
    status: 'Available',
    tags: ['Fresh', 'New'],
  },

  // --- Gmail Services ---
  {
    id: 'gmail-standard',
    title: 'Gmail (New & Old)',
    description: 'Aged and Fresh Gmail accounts. Verified and secure for general use.',
    icon: GmailIcon,
    category: 'gmail',
    status: 'Available',
    tags: ['Aged', 'Fresh'],
  },
  {
    id: 'gmail-iphone',
    title: 'iPhone Mix GV Mail',
    description: 'Specialized iOS-created accounts. Higher durability on Apple devices.',
    icon: GmailIcon,
    category: 'gmail',
    status: 'Available',
    tags: ['iOS Created', 'High Trust'],
    popular: true
  },

  // --- TextNow Services ---
  {
    id: 'tn-app',
    title: 'TextNow – App Login',
    description: 'Optimized for mobile application usage with persistent sessions.',
    icon: TextNowIcon,
    category: 'textnow',
    status: 'Available',
    tags: ['App', 'Mobile'],
  },
  {
    id: 'tn-phone',
    title: 'TextNow – Phone Login',
    description: 'Verified via real carrier numbers for maximum reliability.',
    icon: TextNowIcon,
    category: 'textnow',
    status: 'Available',
    tags: ['Carrier Verified', 'Phone'],
    popular: true
  },
  {
    id: 'tn-web',
    title: 'TextNow – Web Login',
    description: 'Browser-based accounts perfect for desktop management.',
    icon: TextNowIcon,
    category: 'textnow',
    status: 'Available',
    tags: ['Web', 'Desktop'],
  },

  // --- Talkatone ---
  {
    id: 'talkatone-acc',
    title: 'Talkatone Account',
    description: 'Reliable burner or permanent lines. Works well on low bandwidth.',
    icon: TalkatoneIcon,
    category: 'talkatone',
    status: 'Available',
    tags: ['Burner', 'VoIP'],
  },

  // --- TextFree ---
  {
    id: 'textfree-acc',
    title: 'TextFree Account',
    description: 'Simple and effective for short-term verification needs.',
    icon: TextFreeIcon,
    category: 'textfree',
    status: 'Available',
    tags: ['Verification', 'Simple'],
  },

  // --- TextPlus ---
  {
    id: 'textplus-free',
    title: 'TextPlus (Free)',
    description: 'Standard accounts for basic messaging and calling.',
    icon: TextPlusIcon,
    category: 'textplus',
    status: 'Available',
    tags: ['Basic', 'Free Tier'],
  },
  {
    id: 'textplus-premium',
    title: 'TextPlus (Premium)',
    description: 'Ad-free accounts with enhanced features and reliability.',
    icon: TextPlusIcon,
    category: 'textplus',
    status: 'Available',
    tags: ['Premium', 'Ad-Free'],
    popular: true
  },

  // --- TextMe ---
  {
    id: 'textme-acc',
    title: 'TextMe Account',
    description: 'Versatile messaging app accounts with international support.',
    icon: TextMeIcon,
    category: 'textme',
    status: 'Available',
    tags: ['International', 'Messaging'],
  },

  // --- Dingtone ---
  {
    id: 'dingtone-acc',
    title: 'Dingtone Account',
    description: 'Credit-based system. Excellent for specific calling needs.',
    icon: DingtoneIcon,
    category: 'dingtone',
    status: 'Available',
    tags: ['Credits', 'Calling'],
  },

  // --- Ring4 ---
  {
    id: 'ring4-acc',
    title: 'Ring4 Business',
    description: 'Professional business lines. Second phone number for work.',
    icon: Ring4Icon,
    category: 'ring4',
    status: 'Available',
    tags: ['Business', 'Professional'],
    popular: true
  },

  // --- Sideline ---
  {
    id: 'sideline-acc',
    title: 'Sideline Account',
    description: 'Carrier-grade reliability. The index for your business communication.',
    icon: SidelineIcon,
    category: 'sideline',
    status: 'Available',
    tags: ['Enterprise', 'Carrier-Grade'],
  },
];

interface CategoryConfig {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  accent: string;
  glow: string;
}

const categories: CategoryConfig[] = [
  {
    id: 'google-voice',
    title: 'Google Voice Services',
    description: 'Legacy (2014-2017), Mid-Era, and New 2026 accounts.',
    icon: GoogleVoiceIcon,
    color: 'emerald',
    gradient: 'from-emerald-400 to-emerald-600',
    accent: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    glow: 'bg-emerald-500/10'
  },
  {
    id: 'gmail',
    title: 'Gmail Services',
    description: 'New & Old Gmails and iPhone Mix GV Mail accounts.',
    icon: GmailIcon,
    color: 'red',
    gradient: 'from-red-500 to-rose-600',
    accent: 'bg-red-500/10 text-red-500 border-red-500/20',
    glow: 'bg-red-500/10'
  },
  {
    id: 'textnow',
    title: 'TextNow Services',
    description: 'App, Phone, and Web Login verified accounts.',
    icon: TextNowIcon,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600',
    accent: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    glow: 'bg-purple-500/10'
  },
  {
    id: 'talkatone',
    title: 'Talkatone',
    description: 'Reliable burner or permanent lines.',
    icon: TalkatoneIcon,
    color: 'sky',
    gradient: 'from-sky-400 to-blue-500',
    accent: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
    glow: 'bg-sky-500/10'
  },
  {
    id: 'textfree',
    title: 'TextFree',
    description: 'Simple verification solutions.',
    icon: TextFreeIcon,
    color: 'violet',
    gradient: 'from-violet-400 to-purple-500',
    accent: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
    glow: 'bg-violet-500/10'
  },
  {
    id: 'textplus',
    title: 'TextPlus',
    description: 'Free and Premium tier accounts.',
    icon: TextPlusIcon,
    color: 'lime',
    gradient: 'from-lime-400 to-green-500',
    accent: 'bg-lime-500/10 text-lime-500 border-lime-500/20',
    glow: 'bg-lime-500/10'
  },
  {
    id: 'textme',
    title: 'TextMe',
    description: 'International messaging accounts.',
    icon: TextMeIcon,
    color: 'cyan',
    gradient: 'from-cyan-400 to-blue-500',
    accent: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
    glow: 'bg-cyan-500/10'
  },
  {
    id: 'dingtone',
    title: 'Dingtone',
    description: 'Credit-based calling accounts.',
    icon: DingtoneIcon,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    accent: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    glow: 'bg-blue-500/10'
  },
  {
    id: 'ring4',
    title: 'Ring4',
    description: 'Professional business lines.',
    icon: Ring4Icon,
    color: 'orange',
    gradient: 'from-orange-400 to-red-500',
    accent: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    glow: 'bg-orange-500/10'
  },
  {
    id: 'sideline',
    title: 'Sideline',
    description: 'Carrier-grade enterprise solutions.',
    icon: SidelineIcon,
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    accent: 'bg-green-500/10 text-green-500 border-green-500/20',
    glow: 'bg-green-500/10'
  },
];

interface ServicesProps {
  openDashboard: () => void;
}

const CategoryModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    category: CategoryConfig; 
    items: Product[]; 
    openDashboard: () => void 
}> = ({ isOpen, onClose, category, items, openDashboard }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
          case 'Available': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
          case 'Limited': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
          case 'Sold Out': return 'bg-red-500/10 text-red-500 border-red-500/20';
          default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={onClose}
                className="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md" 
            />
            
            <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white dark:bg-[#0f172a] rounded-[2rem] shadow-2xl border border-gray-200 dark:border-white/10 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
                            <category.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Premium verified {category.title}</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-3 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
                    <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${category.glow} rounded-full blur-[100px] pointer-events-none`} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="group relative flex flex-col p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300"
                                >
                                    {item.popular && (
                                        <div className="absolute -top-3 -right-3 z-20">
                                            <span className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                                                <Star size={10} fill="currentColor" /> POPULAR
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500 bg-transparent">
                                            <item.icon className="w-full h-full" />
                                        </div>
                                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Available' ? 'bg-emerald-500' : item.status === 'Limited' ? 'bg-amber-500' : 'bg-red-500'}`} />
                                            {item.status}
                                        </span>
                                    </div>

                                    <div className="mb-6 flex-grow">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md border border-gray-200 dark:border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <button
                                            onClick={() => { onClose(); openDashboard(); }}
                                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                        >
                                            <ShoppingCart size={16} />
                                            Buy
                                        </button>
                                        <a
                                            href="#contact"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onClose();
                                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-semibold text-sm hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
                                        >
                                            <MessageCircle size={16} />
                                            Chat
                                        </a>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-500 dark:text-gray-400">Inventory coming soon for this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Services: React.FC<ServicesProps> = ({ openDashboard }) => {
  const [activeModalCategory, setActiveModalCategory] = useState<CategoryConfig | null>(null);

  return (
    <section id="services" className="py-24 relative bg-gray-50 dark:bg-black/20 transition-colors overflow-hidden content-visibility-auto">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Header */}
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-6 shadow-sm dark:shadow-none"
          >
             <Briefcase className="w-4 h-4 text-secondary" />
             <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-widest">Premium Inventory</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Assets</span>
          </motion.h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Select a category below to view specific products and pricing.
          </p>
        </div>

        {/* --- MAIN GRID --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
            {categories.map((cat, idx) => (
                    <motion.div
                    key={cat.id}
                    layout
                    onClick={() => setActiveModalCategory(cat)}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={`group relative flex flex-col p-6 rounded-[2rem] bg-gradient-to-br from-white to-gray-50 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer overflow-hidden min-h-[320px]`}
                    >
                        {/* Dynamic Border Hover */}
                        <div className={`absolute inset-0 border-2 border-transparent rounded-[2rem] group-hover:border-${cat.color}-500/30 transition-colors pointer-events-none`} />

                        {/* Glow */}
                        <div className={`absolute top-0 right-0 w-32 h-32 ${cat.glow} rounded-full blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center overflow-hidden shadow-lg border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                                <cat.icon className="w-full h-full" />
                            </div>
                            
                            {/* "Available" Badge with Pulsing Effect */}
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Available
                            </span>
                        </div>

                        <div className="mb-6 relative z-10 flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all">
                            {cat.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                {cat.description}
                            </p>
                        </div>

                        <div className="mt-auto relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex -space-x-2">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-[#0f172a] bg-gray-100 dark:bg-white/10 flex items-center justify-center text-[8px] text-gray-500 font-bold">
                                            <Layers size={10} />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                                    {products.filter(p => p.category === cat.id).length} Products
                                </span>
                            </div>
                            
                            <div className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-xs flex items-center justify-center gap-2 group-hover:shadow-lg transition-all group-hover:-translate-y-0.5">
                                View Options <ArrowRight size={14} />
                            </div>
                        </div>
                    </motion.div>
            ))}
            </AnimatePresence>
        </motion.div>
      </div>

      {/* Category Modal */}
      <AnimatePresence>
          {activeModalCategory && (
              <CategoryModal 
                  isOpen={!!activeModalCategory} 
                  onClose={() => setActiveModalCategory(null)} 
                  category={activeModalCategory}
                  items={products.filter(p => p.category === activeModalCategory.id)} 
                  openDashboard={openDashboard}
              />
          )}
      </AnimatePresence>

    </section>
  );
};

export default Services;