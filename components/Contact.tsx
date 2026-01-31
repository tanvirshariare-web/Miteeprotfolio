import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-surface/50 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Let's Set Up Your <br/><span className="text-secondary">Number.</span></h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">
                Ready for a strong phone setup? Whether you need a simple Google Voice or a big business system, I'm here to help.
                </p>

                <div className="flex flex-col gap-4">
                    <a href="https://wa.me/+8801323907831" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 hover:shadow-md dark:hover:shadow-none transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 dark:bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                                <MessageCircle size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-white font-medium">WhatsApp</span>
                                <span className="text-gray-500 text-xs">Fastest Response</span>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                    </a>
                    
                    <a href="https://t.me/rolexsirNP" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 hover:shadow-md dark:hover:shadow-none transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#0088cc]/10 dark:bg-[#0088cc]/20 flex items-center justify-center text-[#0088cc]">
                                <Send size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-white font-medium">Telegram</span>
                                <span className="text-gray-500 text-xs">Direct Chat</span>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                    </a>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-black/20 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-white/5">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Name</label>
                    <div className={`relative transition-all duration-300 rounded-xl p-[1px] ${activeField === 'name' ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gray-200 dark:bg-white/10'}`}>
                        <input
                        type="text"
                        required
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none"
                        placeholder="John Doe"
                        />
                    </div>
                    </div>
                    <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                    <div className={`relative transition-all duration-300 rounded-xl p-[1px] ${activeField === 'email' ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gray-200 dark:bg-white/10'}`}>
                        <input
                        type="email"
                        required
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none"
                        placeholder="john@example.com"
                        />
                    </div>
                    </div>

                    <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Message</label>
                    <div className={`relative transition-all duration-300 rounded-xl p-[1px] ${activeField === 'message' ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gray-200 dark:bg-white/10'}`}>
                        <textarea
                            rows={4}
                            required
                            onFocus={() => setActiveField('message')}
                            onBlur={() => setActiveField(null)}
                            value={formState.message}
                            onChange={(e) => setFormState({...formState, message: e.target.value})}
                            className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-950 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none resize-none"
                            placeholder="I need help with..."
                        />
                    </div>
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className={`w-full py-4 rounded-xl font-bold transition-all transform duration-300 ${
                        submitted 
                        ? 'bg-green-500 hover:bg-green-600 scale-[1.02] text-white' 
                        : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-lg hover:-translate-y-1'
                    }`}
                    >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            Sending...
                        </span>
                    ) : submitted ? (
                        <span className="flex items-center justify-center gap-2">
                            <CheckCircle size={20} /> Message Sent
                        </span>
                    ) : (
                        'Send Message'
                    )}
                    </button>
                </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;