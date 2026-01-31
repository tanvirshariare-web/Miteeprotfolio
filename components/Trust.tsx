import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Trophy, CheckCircle, Activity, Lock, Ban, FileCheck } from 'lucide-react';
import { StatItem } from '../types';

const stats: StatItem[] = [
  { label: 'Years Experience', value: '10+', icon: Clock },
  { label: 'Platforms Mastered', value: '15+', icon: Activity },
  { label: 'Setups Done', value: '500+', icon: Trophy },
  { label: 'Secure Methods', value: '100%', icon: Shield },
];

const safetyProtocols = [
  {
    title: "Safe Setup Rule",
    description: "Only for real business and personal use. I check every request to make sure it follows the rules.",
    icon: FileCheck,
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-400/10",
    border: "border-blue-200 dark:border-blue-400/20"
  },
  {
    title: "No Spam Allowed",
    description: "I do not help with mass marketing, spam, or bad activities. Bad requests will be rejected.",
    icon: Ban,
    color: "text-red-500 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-400/10",
    border: "border-red-200 dark:border-red-400/20"
  },
  {
    title: "Privacy First",
    description: "Your passwords are safe. I don't keep logs after the job is done. Your messages stay yours.",
    icon: Lock,
    color: "text-green-500 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-400/10",
    border: "border-green-200 dark:border-green-400/20"
  }
];

const Trust: React.FC = () => {
  return (
    <section id="trust" className="py-24 relative overflow-hidden bg-white dark:bg-transparent transition-colors">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Super Reliable</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Why Trust <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Me?</span>
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed border-l-2 border-gray-200 dark:border-white/10 pl-6">
              Virtual numbers need to work. I don't just make accounts; I build systems that last. I know all the updates and rules, from the old days to the new AI tools.
            </p>
            
            <ul className="space-y-5">
              {[
                "Many years of Google Voice experience",
                "Deep knowledge of phone carrier rules",
                "Secure handling of your passwords",
                "Works great on iPhone and Android"
              ].map((item, idx) => (
                <motion.li 
                    key={idx} 
                    className="flex items-start space-x-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                >
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-500/20 transition-colors">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative group p-6 md:p-8 bg-gray-50 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl text-center hover:border-primary/30 transition-all overflow-hidden shadow-lg dark:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto bg-white dark:bg-white/10 rounded-2xl flex items-center justify-center mb-5 border border-gray-100 dark:border-white/5 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-sm">
                      <stat.icon className="text-secondary group-hover:text-primary transition-colors w-7 h-7" />
                    </div>
                    <div className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all">
                        {stat.value}
                    </div>
                    <div className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Safety Indicators Section */}
        <div className="border-t border-gray-200 dark:border-white/10 pt-16">
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Safety Rules</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">I am committed to safety and security.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {safetyProtocols.map((protocol, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                        className={`p-6 rounded-2xl bg-white dark:bg-white/5 border ${protocol.border} hover:shadow-lg dark:hover:bg-white/10 transition-all duration-300 relative overflow-hidden group shadow-sm dark:shadow-none`}
                    >
                         {/* Subtle Background Tint */}
                        <div className={`absolute inset-0 ${protocol.bg} opacity-30 dark:opacity-5 group-hover:opacity-50 dark:group-hover:opacity-10 transition-opacity`} />
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full ${protocol.bg} ${protocol.color} flex items-center justify-center mb-4 ring-1 ring-white/20 dark:ring-white/10`}>
                                <protocol.icon size={24} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{protocol.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {protocol.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;