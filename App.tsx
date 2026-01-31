import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceTimeline from './components/ExperienceTimeline';
import Services from './components/Services';
import Trust from './components/Trust';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import { User, Conversation, ChatMessage, MarketItem } from './types';

// Initial Mock Data
const mockConversations: Record<string, Conversation> = {
    'demo-user-1': {
        userId: 'demo-user-1',
        userName: 'Alice Smith',
        userEmail: 'alice@example.com',
        unreadCount: 2,
        lastMessageAt: new Date(Date.now() - 3600000),
        messages: [
            { id: 'm1', text: 'Hi, is the Google Voice service still available?', senderId: 'demo-user-1', timestamp: new Date(Date.now() - 7200000) },
            { id: 'm2', text: 'Yes, absolutely!', senderId: 'admin', timestamp: new Date(Date.now() - 7000000) },
            { id: 'm3', text: 'Great, I will purchase it now.', senderId: 'demo-user-1', timestamp: new Date(Date.now() - 3600000) },
        ]
    }
};

const initialMarketItems: MarketItem[] = [
  { id: '1', number: '(212) 555-0199', price: 35, type: 'Google Voice', year: 2015, status: 'available', rating: 5, tags: ['Old GV', '2014-2017'], buyEnabled: true },
  { id: '2', number: 'TextNow Account', price: 15, type: 'TextNow', year: 2026, status: 'available', rating: 4, tags: ['Web Login', 'App', 'Phone'], buyEnabled: true },
  { id: '3', number: 'GV Port-In Service', price: 50, type: 'GV Setup', year: 2026, status: 'available', rating: 5, tags: ['Service'], buyEnabled: true },
  { id: '4', number: '(310) 555-0245', price: 25, type: 'Google Voice', year: 2020, status: 'available', rating: 5, tags: ['2018-2021'], buyEnabled: true },
  { id: '5', number: 'TextPlus Premium', price: 20, type: 'TextPlus', year: 2025, status: 'available', rating: 4, tags: ['Premium', 'Ad-Free'], buyEnabled: true },
  { id: '6', number: 'Gmail + iPhone Mix', price: 45, type: 'Gmail/iPhone', year: 2026, status: 'available', rating: 5, tags: ['Bundle', 'iOS Ready'], buyEnabled: true },
  { id: '7', number: '(415) 555-0888', price: 10, type: 'Talkatone', year: 2025, status: 'available', rating: 4, tags: ['App'], buyEnabled: true },
  { id: '8', number: '(702) 555-0999', price: 60, type: 'Ring4', year: 2024, status: 'available', rating: 5, tags: ['Business'], buyEnabled: true },
  { id: '9', number: 'New GV Account', price: 12, type: 'Google Voice', year: 2026, status: 'available', rating: 5, tags: ['New GV', '2026'], buyEnabled: true },
  { id: '10', number: 'Sideline Pro', price: 55, type: 'Sideline', year: 2025, status: 'available', rating: 5, tags: ['Business', 'Pro'], buyEnabled: true },
];

const App: React.FC = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [dashboardInitialView, setDashboardInitialView] = useState<'market' | 'chat' | 'inbox' | 'services'>('market');
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  // Messaging State (Simulated Backend)
  const [conversations, setConversations] = useState<Record<string, Conversation>>(mockConversations);

  // Marketplace State
  const [marketItems, setMarketItems] = useState<MarketItem[]>(initialMarketItems);

  // Lock scroll when dashboard/modal is open
  useEffect(() => {
    if (isDashboardOpen || isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDashboardOpen, isLoginModalOpen]);

  const handleLogin = (name: string, email: string) => {
      const id = email.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
      
      const user: User = {
          id,
          name,
          email,
          role
      };
      
      setCurrentUser(user);
      setIsLoginModalOpen(false);
      
      // If logging in as a new user, ensure they have a conversation record
      if (role === 'user' && !conversations[id]) {
          setConversations(prev => ({
              ...prev,
              [id]: {
                  userId: id,
                  userName: name,
                  userEmail: email,
                  messages: [
                      { id: 'welcome', text: 'Welcome to VoIP Expert Support. How can we help you today?', senderId: 'admin', timestamp: new Date() }
                  ],
                  unreadCount: 0,
                  lastMessageAt: new Date()
              }
          }));
      }

      setIsDashboardOpen(true);
  };

  const handleLogout = () => {
      setCurrentUser(null);
      setIsDashboardOpen(false);
  };

  const handleSendMessage = (text: string, conversationId?: string) => {
      if (!currentUser) return;

      const targetConversationId = currentUser.role === 'admin' ? conversationId : currentUser.id;
      
      if (!targetConversationId) return;

      // Check if blocked
      if (currentUser.role === 'user' && blockedUsers.includes(currentUser.id)) {
          // Ideally show error toast, here we just prevent sending
          return; 
      }

      const newMessage: ChatMessage = {
          id: Date.now().toString(),
          text,
          senderId: currentUser.id,
          timestamp: new Date()
      };

      setConversations(prev => {
          const conv = prev[targetConversationId];
          if (!conv) return prev;

          return {
              ...prev,
              [targetConversationId]: {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  lastMessageAt: new Date()
              }
          };
      });

      // Simulate Auto Reply if User sends message
      if (currentUser.role === 'user' && !blockedUsers.includes(currentUser.id)) {
          setTimeout(() => {
             const reply: ChatMessage = {
                 id: (Date.now() + 1).toString(),
                 text: "Thanks for your message. An admin will be with you shortly.",
                 senderId: 'admin',
                 timestamp: new Date()
             };
             setConversations(prev => {
                const conv = prev[targetConversationId];
                return {
                    ...prev,
                    [targetConversationId]: {
                        ...conv,
                        messages: [...conv.messages, reply],
                        lastMessageAt: new Date()
                    }
                };
             });
          }, 1500);
      }
  };

  const handleContactSeller = (msgText: string) => {
      if (!currentUser) {
          setIsLoginModalOpen(true);
          return;
      }

      if (blockedUsers.includes(currentUser.id)) return;
      
      // Add system/user message to chat
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: msgText,
        senderId: currentUser.id,
        timestamp: new Date(),
        isSystem: true // Optional flag for styling
      };

      setConversations(prev => {
        const conv = prev[currentUser.id];
        return {
            ...prev,
            [currentUser.id]: {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessageAt: new Date()
            }
        };
      });

      setDashboardInitialView('chat');
      setIsDashboardOpen(true);
  };

  const handleOpenChat = () => {
    setDashboardInitialView('chat');
    if (currentUser) {
        setIsDashboardOpen(true);
    } else {
        setIsLoginModalOpen(true);
    }
  };

  // --- Admin Functions ---
  const handleAddService = (item: MarketItem) => {
      setMarketItems(prev => [item, ...prev]);
  };

  const handleUpdateService = (item: MarketItem) => {
      setMarketItems(prev => prev.map(i => i.id === item.id ? item : i));
  };

  const handleDeleteService = (id: string) => {
      setMarketItems(prev => prev.filter(i => i.id !== id));
  };

  const handleBlockUser = (userId: string) => {
      setBlockedUsers(prev => {
          if (prev.includes(userId)) {
              return prev.filter(id => id !== userId);
          }
          return [...prev, userId];
      });
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-background text-white">
      <Navbar 
        openDashboard={() => {
            setDashboardInitialView('market');
            setIsDashboardOpen(true);
        }}
        isLoggedIn={!!currentUser}
        onLoginClick={() => {
            setDashboardInitialView('market');
            setIsLoginModalOpen(true);
        }}
        userName={currentUser?.name}
      />
      
      <main>
        <Hero />
        <Services openDashboard={() => {
            setDashboardInitialView('market');
            setIsDashboardOpen(true);
        }} />
        <ExperienceTimeline />
        <Trust />
        <Testimonials />
        <Contact />
      </main>

      <footer className="py-8 bg-black/40 border-t border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 VoIP Expert Portfolio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
      
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isDashboardOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={handleOpenChat}
            className="fixed bottom-6 right-6 z-[60] p-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-300 group hover:-translate-y-1"
          >
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#030712] rounded-full z-10"></span>
            <MessageCircle className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDashboardOpen && (
          <Dashboard 
            isOpen={isDashboardOpen} 
            onClose={() => setIsDashboardOpen(false)} 
            currentUser={currentUser}
            onLoginRequest={() => {
                setIsDashboardOpen(false);
                setIsLoginModalOpen(true);
            }}
            onLogout={handleLogout}
            conversations={conversations}
            onSendMessage={handleSendMessage}
            onContactSeller={handleContactSeller}
            initialView={dashboardInitialView}
            // Admin Props
            marketItems={marketItems}
            onAddService={handleAddService}
            onUpdateService={handleUpdateService}
            onDeleteService={handleDeleteService}
            blockedUsers={blockedUsers}
            onBlockUser={handleBlockUser}
          />
        )}
        {isLoginModalOpen && (
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;