import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, AlertTriangle, Wifi, Server, Shield, RefreshCw, Globe, Zap, Cpu } from 'lucide-react';
import { GoogleVoiceIcon, TextNowIcon, TalkatoneIcon, Ring4Icon, SidelineIcon } from './BrandIcons';

interface Platform {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'maintenance';
  successRate: string;
  latency: number;
  icon: any;
  trend: number[]; // Array of numbers for sparkline
}

const platforms: Platform[] = [
  { id: 'gv-new', name: 'Google Voice', status: 'operational', successRate: '99.9%', latency: 24, icon: GoogleVoiceIcon, trend: [40, 60, 55, 70, 65, 80, 85, 90, 88, 95] },
  { id: 'textnow', name: 'TextNow Portal', status: 'operational', successRate: '98.8%', latency: 45, icon: TextNowIcon, trend: [60, 55, 65, 60, 70, 75, 70, 85, 90, 92] },
  { id: 'talkatone', name: 'Talkatone App', status: 'operational', successRate: '97.5%', latency: 82, icon: TalkatoneIcon, trend: [50, 45, 60, 55, 65, 60, 70, 75, 80, 85] },
  { id: 'ring4', name: 'Ring4 Business', status: 'operational', successRate: '99.9%', latency: 18, icon: Ring4Icon, trend: [80, 85, 82, 88, 90, 92, 95, 94, 98, 99] },
  { id: 'sideline', name: 'Sideline / Index', status: 'operational', successRate: '96.4%', latency: 65, icon: SidelineIcon, trend: [70, 65, 75, 70, 80, 75, 85, 80, 88, 90] },
];

const Sparkline: React.FC<{ data: number[], color: string }> = ({ data, color }) => {
    // Simple logic to create an SVG path from data
    const max = 100;
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (val / max) * 100; // Invert Y
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 100 100" className="w-full h-12 overflow-visible preserve-3d">
            <defs>
                <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" className={color} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" className={color} />
                </linearGradient>
            </defs>
            {/* Fill Area */}
            <path d={`M0,100 ${points.split(' ').map(p => `L${p}`).join(' ')} L100,100 Z`} fill={`url(#gradient-${color})`} className={color} />
            {/* Stroke Line */}
            <path d={`M${points.split(' ').join(' L')}`} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" className={color} />
        </svg>
    );
};

const PlatformStatus: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-emerald-500';
      case 'degraded': return 'text-amber-500';
      case 'maintenance': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gray-50 dark:bg-[#030712] transition-colors border-y border-gray-200 dark:border-white/5">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Status Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {platforms.map((platform, idx) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group p-5 rounded-2xl bg-white dark:bg-[#0f172a]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 shadow-lg dark:shadow-none overflow-hidden"
            >
              {/* Top Row */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-900 dark:text-white border border-gray-100 dark:border-white/5 group-hover:scale-105 transition-transform">
                       <platform.icon className="w-5 h-5" />
                   </div>
                   <div className="flex flex-col">
                       <span className="font-bold text-sm text-gray-900 dark:text-white leading-tight">{platform.name}</span>
                       <span className={`text-[10px] uppercase font-bold tracking-wider ${getStatusColor(platform.status)} flex items-center gap-1 mt-0.5`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                          {platform.status}
                       </span>
                   </div>
                </div>
              </div>

              {/* Sparkline Visualization */}
              <div className="h-16 mb-4 relative opacity-80 group-hover:opacity-100 transition-opacity">
                 <Sparkline 
                    data={platform.trend} 
                    color={platform.status === 'operational' ? 'text-emerald-500' : 'text-amber-500'} 
                 />
                 {/* Scanning Line Effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent w-full h-full -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </div>

              {/* Data Footer */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                 <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-mono mb-1">Success</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white leading-none flex items-center gap-1">
                        {platform.successRate}
                        <Zap size={12} className="text-yellow-500 fill-yellow-500" />
                    </span>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 uppercase font-mono mb-1">Latency</span>
                    <span className={`text-lg font-bold leading-none flex items-center gap-1 ${platform.latency < 50 ? 'text-emerald-500' : 'text-yellow-500'}`}>
                        {platform.latency}
                        <span className="text-[10px] font-normal text-gray-500">ms</span>
                        <Wifi size={12} className="opacity-50" />
                    </span>
                 </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Bottom System Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
                 { label: 'Active Nodes', value: '48/48', icon: Server, color: 'text-blue-500' },
                 { label: 'Carrier API', value: 'Connected', icon: CheckCircle, color: 'text-emerald-500' },
                 { label: 'Database', value: 'Synced', icon: Cpu, color: 'text-violet-500' },
                 { label: 'Threat Lvl', value: 'Low', icon: AlertTriangle, color: 'text-gray-500' },
             ].map((stat, i) => (
                 <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-100/50 dark:bg-white/5 border border-transparent dark:border-white/5">
                     <stat.icon size={16} className={stat.color} />
                     <div className="flex flex-col leading-none">
                         <span className="text-[10px] uppercase text-gray-500 dark:text-gray-400 font-bold">{stat.label}</span>
                         <span className="text-xs font-mono text-gray-900 dark:text-white mt-1">{stat.value}</span>
                     </div>
                 </div>
             ))}
        </div>

      </div>
    </section>
  );
};

export default PlatformStatus;