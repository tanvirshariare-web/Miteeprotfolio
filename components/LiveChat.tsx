import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, ShieldCheck, Clock } from 'lucide-react';
import { ChatMessage, User as UserType } from '../types';

interface LiveChatProps {
  currentUser: UserType;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  chatPartnerName?: string; // If admin, this is the user's name. If user, this is "Admin".
}

const LiveChat: React.FC<LiveChatProps> = ({ currentUser, messages, onSendMessage, chatPartnerName = "Admin" }) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAdmin = currentUser.role === 'admin';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black/20 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-inner">
      {/* Header */}
      <div className={`p-4 border-b border-gray-200 dark:border-white/5 flex items-center justify-between transition-colors duration-500 bg-white dark:bg-white/5`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isAdmin ? 'bg-secondary' : 'bg-primary'}`}>
               {isAdmin ? <User className="text-white" size={20} /> : <ShieldCheck className="text-white" size={20} />}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-black rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
                {isAdmin ? chatPartnerName : 'VoIP Support'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAdmin ? 'User Inquiry' : 'Typically replies in 5m'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50 dark:bg-slate-950/50" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            // Determine if the message is from the "current viewer" or the "other party"
            const isMe = msg.senderId === currentUser.id;
            
            if (msg.isSystem) {
                return (
                    <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center my-4">
                        <span className="bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                            {msg.text}
                        </span>
                    </motion.div>
                )
            }

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm relative group ${
                    isMe
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-white dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-transparent'
                  }`}
                >
                  {msg.text}
                  <span className={`text-[10px] block mt-1 text-right opacity-50 ${isMe ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-600">
                <Clock className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm">Start the conversation...</p>
             </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-white dark:bg-white/5 border-t border-gray-200 dark:border-white/5 flex gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className={`p-3 rounded-xl transition-all ${
            inputText.trim() 
            ? 'bg-primary text-white hover:bg-primary/80'
            : 'bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-gray-500'
          }`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default LiveChat;