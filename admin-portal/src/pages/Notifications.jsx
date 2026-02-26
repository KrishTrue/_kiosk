import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Plus, 
  Clock, 
  Trash2, 
  ChevronRight, 
  Loader2, 
  AlertCircle,
  Megaphone,
  Info,
  RefreshCw,
  Search
} from 'lucide-react';


const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/announcement/all');
      setNotifications(response.data.announcements || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Unable to sync with the campus announcement server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this bulletin? This will hide it from all kiosks instantly.")) return;
    try {
      await axios.delete(`/api/announcement/delete/${id}`);
      fetchNotifications();
    } catch (err) {
      alert("Administrative override failed.");
    }
  };

  const filteredNotifications = notifications.filter(n => 
    n.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="ml-72 mt-24 h-[calc(100vh-6rem)] flex flex-col items-center justify-center bg-slate-50/20">
      <Loader2 size={40} className="text-[#002b5c] animate-spin mb-4" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Establishing Secure Feed Connection</p>
    </div>
  );

  return (
    <div className="ml-72 mt-24 h-[calc(100vh-6rem)] flex flex-col font-sans bg-[#fcfdfe] overflow-hidden">
      <header className="px-12 py-10 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Megaphone className="text-[#002b5c]" size={20} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Campus Broadcast System</span>
          </div>
          <h1 className="text-4xl font-black text-[#002b5c] tracking-tight">Bulletin Board</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#002b5c] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold text-[#002b5c] focus:outline-none focus:ring-4 focus:ring-[#002b5c]/5 transition-all w-64"
            />
          </div>

          <button 
            onClick={() => navigate('/create-notifications')}
            className="flex items-center gap-3 bg-[#002b5c] text-white px-8 py-4 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-blue-900/20 active:scale-95 transition-all"
          >
            <Plus size={20} />
            CREATE BULLETIN
          </button>
          
          <button 
            onClick={fetchNotifications}
            className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-[#002b5c] transition-colors active:scale-90"
          >
            <RefreshCw size={22} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-slate-50/10">
        {error ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="p-8 bg-red-50 rounded-full mb-6">
              <AlertCircle size={60} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Sync Failure</h3>
            <p className="text-slate-500 font-medium mb-8">{error}</p>
            <button 
              onClick={fetchNotifications}
              className="px-10 py-4 bg-[#002b5c] text-white rounded-2xl font-black active:scale-95 transition-all"
            >
              Retry Connection
            </button>
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {filteredNotifications.map((item) => (
              <div 
                key={item._id}
                onClick={() => navigate(`/notification/${item._id}`)}
                className="group relative bg-white p-10 rounded-[44px] flex items-center gap-10 shadow-sm border border-slate-100 hover:border-[#002b5c]/20 hover:shadow-2xl hover:shadow-[#002b5c]/5 transition-all duration-500"
              >
                <div className="absolute left-0 top-10 bottom-10 w-2 rounded-r-full bg-[#002b5c] opacity-20 group-hover:opacity-100 transition-opacity" />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight group-hover:text-[#002b5c] transition-colors truncate pr-8">
                      {item.subject}
                    </h3>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                      <Clock size={14} />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-slate-500 text-lg leading-relaxed font-medium line-clamp-2">
                    {item.message}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-5 bg-red-50 text-red-400 rounded-3xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-lg shadow-red-500/10 active:scale-90"
                    title="Delete Notification"
                  >
                    <Trash2 size={24} />
                  </button>
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-[#002b5c] group-hover:bg-[#002b5c] group-hover:text-white transition-all shadow-inner">
                    <ChevronRight size={32} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center grayscale opacity-30 text-center">
            <div className="p-12 bg-slate-50 rounded-full mb-6">
              <Bell size={120} strokeWidth={0.5} />
            </div>
            <h3 className="text-3xl font-black text-[#002b5c] tracking-widest uppercase">Feed Empty</h3>
            <p className="text-lg font-medium text-slate-400 mt-2">No active announcements are being broadcasted.</p>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #f1f5f9; 
          border-radius: 20px; 
          border: 2px solid white;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
      `}</style>
    </div>
  );
};

export default Notifications;