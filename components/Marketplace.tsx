import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Smartphone, Star, Layers, Globe, Briefcase, MessageSquare, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { MarketItem } from '../types';
import { GoogleVoiceIcon, TextNowIcon, GmailIcon, TalkatoneIcon, Ring4Icon, SidelineIcon, TextPlusIcon, TextFreeIcon, DingtoneIcon, TextMeIcon, GVSetupIcon } from './BrandIcons';

interface MarketplaceProps {
  onContactSeller?: (message: string) => void;
  items: MarketItem[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ onContactSeller, items }) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'gv' | 'apps' | 'biz' | 'services'>('all');

  const handleRequest = (item: MarketItem) => {
    if (onContactSeller) {
      onContactSeller(`Request ID: ${item.id}\nI would like to purchase the ${item.type}: "${item.number}" listed for $${item.price}.\nPlease provide payment details.`);
    }
  };

  const filteredItems = items.filter(item => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'gv') return ['Google Voice', 'Gmail/iPhone', 'GV Setup'].includes(item.type);
    if (categoryFilter === 'apps') return ['TextNow', 'Talkatone', 'TextFree', 'TextPlus', 'TextMe', 'Dingtone'].includes(item.type);
    if (categoryFilter === 'biz') return ['Ring4', 'Sideline'].includes(item.type);
    if (categoryFilter === 'services') return ['Other'].includes(item.type);
    return true;
  });

  const getItemIcon = (type: string, className = "w-full h-full") => {
    switch (type) {
      case 'Google Voice': return <GoogleVoiceIcon className={className} />;
      case 'GV Setup': return <GVSetupIcon className={className} />;
      case 'Gmail/iPhone': return <GmailIcon className={className} />;
      case 'TextNow': return <TextNowIcon className={className} />;
      case 'Talkatone': return <TalkatoneIcon className={className} />;
      case 'Ring4': return <Ring4Icon className={className} />;
      case 'Sideline': return <SidelineIcon className={className} />;
      case 'TextPlus': return <TextPlusIcon className={className} />;
      case 'TextFree': return <TextFreeIcon className={className} />;
      case 'Dingtone': return <DingtoneIcon className={className} />;
      case 'TextMe': return <TextMeIcon className={className} />;
      case 'Other': return <Briefcase size={24} className={className + " p-2 text-gray-500"} />;
      default: return <Smartphone size={24} className={className + " p-2 text-gray-500"} />;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'Google Voice': return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'GV Setup': return 'bg-slate-100 dark:bg-slate-500/20 text-slate-600 dark:text-slate-400';
      case 'Gmail/iPhone': return 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400';
      case 'TextNow': return 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400';
      case 'Talkatone': return 'bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400';
      case 'Ring4': return 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400';
      case 'Sideline': return 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400';
      case 'TextPlus': return 'bg-lime-100 dark:bg-lime-500/20 text-lime-600 dark:text-lime-400';
      case 'TextFree': return 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400';
      default: return 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 p-1 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingCart className="text-secondary" /> Service Catalog
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-500" />
                Admin Verified • Secure Request System
            </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'all', label: 'All Items', icon: Layers },
              { id: 'gv', label: 'Google Voice', icon: GoogleVoiceIcon },
              { id: 'apps', label: 'App Numbers', icon: Globe },
              { id: 'biz', label: 'Business Lines', icon: Briefcase },
              { id: 'services', label: 'Services', icon: GVSetupIcon },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                  categoryFilter === cat.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white'
                    : 'bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                }`}
              >
                {cat.id === 'gv' ? <GoogleVoiceIcon className="w-3 h-3" /> : <cat.icon size={14} className={cat.id === 'services' ? 'w-3 h-3' : ''} />}
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-5 rounded-2xl border backdrop-blur-md relative overflow-hidden group flex flex-col ${
                  item.status === 'sold' 
                  ? 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 opacity-60' 
                  : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-primary/50 shadow-sm hover:shadow-lg dark:shadow-none'
                }`}
              >
                {item.status === 'sold' && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-sm">
                      <span className="px-4 py-2 bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/50 rounded-lg font-bold uppercase tracking-wider transform -rotate-12">
                        Sold Out
                      </span>
                    </div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl overflow-hidden ${getItemColor(item.type)} transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
                    {getItemIcon(item.type, "w-full h-full")}
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5">
                    {/* Available Badge */}
                    {item.status === 'available' && (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        Available
                      </span>
                    )}

                    <div className="flex gap-0.5 bg-gray-50 dark:bg-white/5 px-1.5 py-0.5 rounded-lg">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={10} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1" title={item.number}>
                  {item.number}
                </h3>
                
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-200 dark:border-white/5">{item.type}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded border border-gray-200 dark:border-white/5">
                      Year {item.year}
                    </span>
                    {item.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/20">
                          {tag}
                      </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <div className="flex-1">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">${item.price}</span>
                  </div>
                  
                  <button
                    onClick={() => onContactSeller?.(`Hi, I have a question about the ${item.type}: "${item.number}".`)}
                    className="p-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                    title="Ask Question"
                  >
                    <MessageSquare size={18} />
                  </button>

                  <button
                    disabled={item.status === 'sold' || item.buyEnabled === false}
                    onClick={() => handleRequest(item)}
                    className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${
                         item.buyEnabled === false 
                         ? 'bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed'
                         : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-xl'
                    }`}
                  >
                    {item.buyEnabled === false ? <Lock size={16}/> : <ArrowRight size={16} />}
                    {item.buyEnabled === false ? 'Unavailable' : 'Buy Now'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Marketplace;