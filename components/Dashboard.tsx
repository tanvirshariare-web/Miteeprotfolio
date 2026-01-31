import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, MessageSquare, LayoutDashboard, LogOut, ChevronRight, User as UserIcon, Settings, Plus, Trash2, Edit2, Ban, ShieldAlert, CheckCircle, DollarSign } from 'lucide-react';
import Marketplace from './Marketplace';
import LiveChat from './LiveChat';
import { User, Conversation, MarketItem } from '../types';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLoginRequest: () => void;
  onLogout: () => void;
  conversations: Record<string, Conversation>;
  onSendMessage: (text: string, conversationId?: string) => void;
  onContactSeller: (message: string) => void;
  initialView?: 'market' | 'chat' | 'inbox' | 'services';
  
  // Admin Props
  marketItems?: MarketItem[];
  onAddService?: (item: MarketItem) => void;
  onUpdateService?: (item: MarketItem) => void;
  onDeleteService?: (id: string) => void;
  blockedUsers?: string[];
  onBlockUser?: (userId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
    isOpen, 
    onClose, 
    currentUser, 
    onLoginRequest, 
    onLogout,
    conversations,
    onSendMessage,
    onContactSeller,
    initialView = 'market',
    marketItems = [],
    onAddService,
    onUpdateService,
    onDeleteService,
    blockedUsers = [],
    onBlockUser
}) => {
  const [activeView, setActiveView] = useState<'market' | 'chat' | 'inbox' | 'services'>(initialView);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  // Service Editing State
  const [isEditingService, setIsEditingService] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MarketItem>>({});

  if (!isOpen) return null;

  const isAdmin = currentUser?.role === 'admin';
  const isBlocked = currentUser && blockedUsers.includes(currentUser.id);

  // If user is not logged in, show a restricted view or prompt
  if (!currentUser) {
      return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
             <div className="bg-white dark:bg-[#0f172a] p-8 rounded-3xl text-center max-w-sm mx-4 border border-white/10">
                <LayoutDashboard className="w-12 h-12 mx-auto text-primary mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Login Required</h2>
                <p className="text-gray-400 mb-6 text-sm">You need to log in to access the Dashboard and Marketplace.</p>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={onLoginRequest}
                        className="w-full py-3 rounded-xl bg-primary text-white font-bold"
                    >
                        Login Now
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full py-3 rounded-xl bg-white/5 text-gray-400 hover:text-white"
                    >
                        Cancel
                    </button>
                </div>
             </div>
        </motion.div>
      )
  }

  // --- Admin Logic ---
  const handleAdminConversationSelect = (userId: string) => {
      setSelectedConversationId(userId);
      setActiveView('chat');
  };

  const handleEditService = (item: MarketItem) => {
      setEditingItem(item);
      setIsEditingService(true);
  };

  const handleCreateService = () => {
      setEditingItem({
          id: Date.now().toString(),
          price: 0,
          year: 2026,
          status: 'available',
          rating: 5,
          type: 'Google Voice',
          buyEnabled: true,
          tags: []
      });
      setIsEditingService(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingItem.id && onUpdateService && onAddService) {
          // Check if exists to update or add
          const exists = marketItems.find(i => i.id === editingItem.id);
          if (exists) {
              onUpdateService(editingItem as MarketItem);
          } else {
              onAddService(editingItem as MarketItem);
          }
      }
      setIsEditingService(false);
      setEditingItem({});
  };

  // --- Render ---

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-white/90 dark:bg-black/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full h-full md:max-w-7xl md:h-[85vh] bg-white dark:bg-[#030712] border border-gray-200 dark:border-white/10 md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 bg-gray-50 dark:bg-slate-900/50 border-b md:border-b-0 md:border-r border-gray-200 dark:border-white/5 p-4 md:p-6 flex flex-row md:flex-col gap-2 justify-between md:justify-start">
          
          {/* Logo / User Info Area */}
          <div className="hidden md:flex flex-col mb-6 px-2">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <LayoutDashboard className="text-white" size={18} />
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-lg">
                    {isAdmin ? 'Admin Panel' : 'Client Portal'}
                </span>
             </div>
             
             <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500">
                    <UserIcon size={16} />
                 </div>
                 <div className="flex-1 min-w-0">
                     <div className="text-sm font-bold text-gray-900 dark:text-white truncate">{currentUser.name}</div>
                     <div className="text-xs text-gray-500 truncate capitalize">{currentUser.role}</div>
                 </div>
             </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex flex-row md:flex-col gap-2 flex-1 md:flex-initial overflow-x-auto md:overflow-visible scrollbar-hide">
              {!isAdmin && (
                <button
                    onClick={() => setActiveView('market')}
                    className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeView === 'market' 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                >
                    <ShoppingBag size={20} />
                    <span>Marketplace</span>
                </button>
              )}

              {isAdmin ? (
                <>
                   <button
                   onClick={() => setActiveView('inbox')}
                   className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                     (activeView === 'inbox' || activeView === 'chat')
                     ? 'bg-secondary/10 text-secondary border border-secondary/20' 
                     : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                   }`}
                 >
                   <MessageSquare size={20} />
                   <span>Inbox ({Object.keys(conversations).length})</span>
                 </button>
                  <button
                    onClick={() => setActiveView('services')}
                    className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      activeView === 'services'
                      ? 'bg-secondary/10 text-secondary border border-secondary/20' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <Settings size={20} />
                    <span>Manage Services</span>
                  </button>
                 </>
              ) : (
                <button
                    onClick={() => setActiveView('chat')}
                    className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeView === 'chat' 
                    ? 'bg-secondary/10 text-secondary border border-secondary/20' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                >
                    <MessageSquare size={20} />
                    <span>Support Chat</span>
                </button>
              )}
          </div>
          
          <div className="mt-auto hidden md:block pt-4 border-t border-gray-200 dark:border-white/5">
               <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
               >
                   <LogOut size={20} />
                   <span>Sign Out</span>
               </button>
          </div>

          {/* Mobile Close */}
          <button
            onClick={onClose}
            className="md:hidden p-3 rounded-xl bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative h-full overflow-hidden">
          
          {/* Desktop Close Button */}
          <button 
            onClick={onClose}
            className="hidden md:flex absolute top-6 right-6 z-50 p-2 rounded-full bg-gray-100 dark:bg-black/20 hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-gray-200 dark:border-white/5 hover:border-red-200 dark:hover:border-red-500/20"
          >
            <X size={20} />
          </button>

          <div className="flex-1 p-4 md:p-8 overflow-hidden h-full">
            
            {/* --- USER VIEW: MARKETPLACE --- */}
            {(!isAdmin && activeView === 'market') && (
              <Marketplace 
                items={marketItems}
                onContactSeller={(msg) => {
                    if (isBlocked) {
                      alert("You have been blocked from making requests.");
                      return;
                    }
                    onContactSeller(msg); 
                    setActiveView('chat'); 
                }} 
              />
            )}

            {/* --- USER VIEW: CHAT --- */}
            {(!isAdmin && activeView === 'chat') && (
                isBlocked ? (
                   <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                          <Ban className="w-10 h-10 text-red-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Account Restricted</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md">
                          Your account has been blocked from sending messages or making requests due to policy violations.
                      </p>
                   </div>
                ) : (
                  <LiveChat 
                      currentUser={currentUser}
                      messages={conversations[currentUser.id]?.messages || []}
                      onSendMessage={(text) => onSendMessage(text)}
                  />
                )
            )}

            {/* --- ADMIN VIEW: INBOX --- */}
            {(isAdmin && activeView === 'inbox') && (
                <div className="h-full overflow-y-auto custom-scrollbar">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">User Conversations</h2>
                    <div className="grid gap-3">
                        {Object.values(conversations).map((conv: Conversation) => (
                            <button
                                key={conv.userId}
                                onClick={() => handleAdminConversationSelect(conv.userId)}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all text-left w-full group"
                            >
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                    {conv.userName.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between mb-1">
                                        <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                          {conv.userName}
                                          {blockedUsers.includes(conv.userId) && <span className="text-[10px] bg-red-500 text-white px-1.5 rounded">BLOCKED</span>}
                                        </h4>
                                        <span className="text-xs text-gray-500">{new Date(conv.lastMessageAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {conv.messages[conv.messages.length - 1]?.text || 'No messages'}
                                    </p>
                                </div>
                                <ChevronRight className="text-gray-400 group-hover:text-primary transition-colors" />
                            </button>
                        ))}
                        {Object.keys(conversations).length === 0 && (
                            <div className="text-center py-20 text-gray-500">No conversations yet.</div>
                        )}
                    </div>
                </div>
            )}

             {/* --- ADMIN VIEW: CHAT DETAIL --- */}
             {(isAdmin && activeView === 'chat' && selectedConversationId) && (
                 <div className="h-full flex flex-col">
                     <div className="flex items-center justify-between mb-4">
                        <button 
                            onClick={() => setActiveView('inbox')}
                            className="text-sm text-gray-500 hover:text-white flex items-center gap-1"
                        >
                            ← Back to Inbox
                        </button>
                        
                        {onBlockUser && (
                            <button 
                                onClick={() => onBlockUser(selectedConversationId)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                                    blockedUsers.includes(selectedConversationId)
                                    ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                    : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                }`}
                            >
                                {blockedUsers.includes(selectedConversationId) ? <CheckCircle size={14} /> : <Ban size={14} />}
                                {blockedUsers.includes(selectedConversationId) ? 'Unblock User' : 'Block User'}
                            </button>
                        )}
                     </div>
                     <div className="flex-1 overflow-hidden">
                        <LiveChat 
                            currentUser={currentUser}
                            messages={conversations[selectedConversationId]?.messages || []}
                            onSendMessage={(text) => onSendMessage(text, selectedConversationId)}
                            chatPartnerName={conversations[selectedConversationId]?.userName}
                        />
                     </div>
                 </div>
            )}

            {/* --- ADMIN VIEW: MANAGE SERVICES --- */}
            {(isAdmin && activeView === 'services') && (
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Services</h2>
                        <button 
                            onClick={handleCreateService}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                        >
                            <Plus size={18} /> Add New
                        </button>
                    </div>
                    
                    {isEditingService ? (
                         <div className="overflow-y-auto custom-scrollbar pr-2 pb-10">
                             <form onSubmit={handleSaveService} className="space-y-6 max-w-2xl bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                                 <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                     {editingItem.id && marketItems.find(i => i.id === editingItem.id) ? 'Edit Service' : 'New Service'}
                                 </h3>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                         <label className="text-xs font-semibold uppercase text-gray-500">Number / Title</label>
                                         <input 
                                            type="text" 
                                            required
                                            value={editingItem.number || ''}
                                            onChange={e => setEditingItem({...editingItem, number: e.target.value})}
                                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                                         />
                                     </div>
                                     <div className="space-y-2">
                                         <label className="text-xs font-semibold uppercase text-gray-500">Price</label>
                                         <div className="relative">
                                            <span className="absolute left-3 top-2 text-gray-500 font-bold">$</span>
                                            <input 
                                                type="number" 
                                                required
                                                value={editingItem.price || ''}
                                                onChange={e => setEditingItem({...editingItem, price: Number(e.target.value)})}
                                                className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg pl-6 pr-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary font-mono"
                                                placeholder="0.00"
                                            />
                                         </div>
                                     </div>
                                 </div>

                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                         <label className="text-xs font-semibold uppercase text-gray-500">Type</label>
                                         <select 
                                            value={editingItem.type || 'Google Voice'}
                                            onChange={e => setEditingItem({...editingItem, type: e.target.value as any})}
                                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                                         >
                                             <option value="Google Voice">Google Voice</option>
                                             <option value="TextNow">TextNow</option>
                                             <option value="Gmail/iPhone">Gmail/iPhone</option>
                                             <option value="GV Setup">GV Setup</option>
                                             <option value="Talkatone">Talkatone</option>
                                             <option value="Sideline">Sideline</option>
                                             <option value="Ring4">Ring4</option>
                                             <option value="TextPlus">TextPlus</option>
                                             <option value="TextFree">TextFree</option>
                                             <option value="Dingtone">Dingtone</option>
                                             <option value="TextMe">TextMe</option>
                                             <option value="Other">Other</option>
                                         </select>
                                     </div>
                                      <div className="space-y-2">
                                         <label className="text-xs font-semibold uppercase text-gray-500">Year</label>
                                          <input 
                                            type="number" 
                                            value={editingItem.year || 2026}
                                            onChange={e => setEditingItem({...editingItem, year: Number(e.target.value)})}
                                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                                         />
                                     </div>
                                 </div>

                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                         <label className="text-xs font-semibold uppercase text-gray-500">Rating (1-5)</label>
                                          <input 
                                            type="number" 
                                            min="1" max="5"
                                            value={editingItem.rating || 5}
                                            onChange={e => setEditingItem({...editingItem, rating: Number(e.target.value)})}
                                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                                         />
                                     </div>
                                     <div className="space-y-2">
                                         <label className="text-xs font-semibold uppercase text-gray-500">Tags (comma separated)</label>
                                          <input 
                                            type="text" 
                                            value={editingItem.tags?.join(', ') || ''}
                                            onChange={e => setEditingItem({...editingItem, tags: e.target.value.split(',').map(t => t.trim())})}
                                            placeholder="e.g. Rare, 2018, Verified"
                                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
                                         />
                                     </div>
                                 </div>

                                 <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase text-gray-500">Availability & Status</label>
                                    <div className="flex items-center gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={editingItem.status === 'sold'}
                                                onChange={e => setEditingItem({...editingItem, status: e.target.checked ? 'sold' : 'available'})}
                                                className="rounded border-gray-300"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Mark as Sold</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={editingItem.buyEnabled !== false}
                                                onChange={e => setEditingItem({...editingItem, buyEnabled: e.target.checked})}
                                                className="rounded border-gray-300"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">Buy Button Enabled</span>
                                        </label>
                                    </div>
                                 </div>

                                 <div className="flex items-center gap-3 pt-4">
                                     <button 
                                        type="submit"
                                        className="px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                                     >
                                         Save Changes
                                     </button>
                                     <button 
                                        type="button"
                                        onClick={() => setIsEditingService(false)}
                                        className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                                     >
                                         Cancel
                                     </button>
                                 </div>
                             </form>
                         </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="grid gap-4">
                                {marketItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 group hover:border-primary/30 transition-all">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-gray-900 dark:text-white">{item.number}</h4>
                                                {item.status === 'sold' && <span className="text-[10px] bg-red-100 text-red-600 px-2 rounded-full uppercase font-bold">Sold</span>}
                                                {item.buyEnabled === false && <span className="text-[10px] bg-gray-200 text-gray-600 px-2 rounded-full uppercase font-bold">Disabled</span>}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                <span>{item.type}</span>
                                                <span>•</span>
                                                <span>${item.price}</span>
                                                {item.tags && item.tags.length > 0 && <span className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-white/10 rounded">{item.tags.length} Tags</span>}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => handleEditService(item)}
                                                className="p-2 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary hover:border-primary/50 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button 
                                                onClick={() => onDeleteService && onDeleteService(item.id)}
                                                className="p-2 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;