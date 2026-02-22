import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, Clock, RefreshCw, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface Announcement {
  _id: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


const TimeAgo = ({ date }: { date: string }) => {
  const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  if (isNaN(diff)) return null;
  let text = '';
  if (diff < 60) text = 'Just now';
  else if (diff < 3600) text = `${Math.floor(diff / 60)}m ago`;
  else if (diff < 86400) text = `${Math.floor(diff / 3600)}h ago`;
  else text = new Date(date).toLocaleDateString();
  
  return (
    <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full border border-blue-100/50">
      <Clock size={16} className="opacity-70" />
      <span className="text-xs font-black uppercase tracking-widest">{text}</span>
    </div>
  );
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAnnouncements = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/announcement/all');
      setAnnouncements(response.data.announcements || []);
    } catch (err) {
      console.error("Kiosk Announcements Fetch Error:", err);
      setError("Unable to load latest notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    const autoRefresh = setInterval(fetchAnnouncements, 300000);
    return () => clearInterval(autoRefresh);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] rounded-[50px] shadow-xl overflow-hidden border border-white/40 font-sans">
    
      <div className="p-12 pb-10 border-b border-gray-200/50 flex justify-between items-end bg-gradient-to-b from-white to-transparent">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-1 bg-blue-600 rounded-full" />
            <span className="text-blue-600 font-black text-sm tracking-[0.3em] uppercase">Campus Feed</span>
          </div>
          <h2 className="text-5xl font-black text-[#002b5c] tracking-tight leading-none">
            Latest Announcements
          </h2>
          <p className="text-gray-400 font-medium text-xl mt-3">
            Important updates for students and visitors
          </p>
        </div>
        
        <button 
          onClick={fetchAnnouncements}
          disabled={loading}
          className="p-6 bg-white border-2 border-gray-100 rounded-[30px] text-[#002b5c] shadow-lg shadow-blue-900/5 active:scale-90 active:bg-blue-50 transition-all group flex items-center justify-center"
        >
          <RefreshCw size={36} className={`${loading ? 'animate-spin text-blue-500' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-12 py-6 custom-scrollbar">
        {loading && announcements.length === 0 ? (
          <div className="space-y-10 py-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-white/60 rounded-[48px] animate-pulse border border-gray-100 relative overflow-hidden">
                 <div className="absolute left-0 top-0 w-3 h-full bg-gray-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-20">
            <div className="bg-red-50 p-12 rounded-full mb-8 shadow-inner">
              <Info size={80} className="text-red-400" />
            </div>
            <p className="text-3xl font-bold text-gray-400 mb-8">{error}</p>
            <button 
              onClick={fetchAnnouncements}
              className="px-14 py-6 bg-[#002b5c] text-white rounded-[30px] font-black text-2xl shadow-2xl shadow-blue-900/20 active:scale-95 transition-all uppercase tracking-widest"
            >
              Retry Connection
            </button>
          </div>
        ) : announcements.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
             <div className="relative mb-10">
                <div className="absolute inset-0 bg-blue-100 blur-3xl rounded-full opacity-30" />
                <Bell size={160} strokeWidth={0.5} className="relative text-[#002b5c] opacity-10" />
             </div>
             <h3 className="text-4xl font-black text-[#002b5c] opacity-40">All Caught Up</h3>
             <p className="text-2xl mt-4 text-gray-400 font-medium">No new announcements at this time</p>
          </div>
        ) : (
          <div className="space-y-10 py-6">
            {announcements.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/announcement/${item._id}`)}
                className="group relative w-full bg-white p-12 rounded-[56px] flex items-center gap-10 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-white hover:border-blue-200 hover:shadow-[0_20px_60px_-10px_rgba(0,43,92,0.1)] transition-all duration-500 active:scale-[0.97] cursor-pointer"
              >
                
                <div className="absolute left-0 top-12 bottom-12 w-2.5 rounded-r-full bg-[#002b5c] group-hover:bg-blue-600 transition-colors" />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-tight group-hover:text-[#002b5c] transition-colors">
                      {item.subject}
                    </h3>
                    <TimeAgo date={item.createdAt} />
                  </div>
                  
                  <p className="text-gray-500 text-2xl leading-relaxed font-medium line-clamp-3">
                    {item.message}
                  </p>
                </div>

                <div className="flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full group-hover:bg-[#002b5c] group-hover:text-white transition-all duration-300 shadow-inner">
                  <ChevronRight size={40} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Announcements;