import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { 
  LifeBuoy, 
  Trash2, 
  Search, 
  Clock, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  MessageSquare,
  Cpu,
  Wifi,
  Settings,
  ChevronRight,
  ShieldAlert,
  Activity,
  History,
  ChevronDown,
  RotateCcw,
  CheckCircle
} from 'lucide-react';
import { authContext } from '../context/AuthContext';


const HelpRequests = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const {navigate}=useContext(authContext)

  const categories = [
    { value: 'all', label: 'All Reports', icon: LifeBuoy },
    { value: 'software', label: 'Software', icon: Settings, color: 'text-blue-500' },
    { value: 'hardware', label: 'Hardware', icon: Cpu, color: 'text-amber-500' },
    { value: 'network', label: 'Network', icon: Wifi, color: 'text-indigo-500' },
    { value: 'other', label: 'Other', icon: AlertCircle, color: 'text-slate-500' },
  ];

  const statusOptions = [
    { value: 'open', label: 'Open', color: 'text-red-600', bg: 'bg-red-50', dot: 'bg-red-500' },
    { value: 'in-progress', label: 'In-Progress', color: 'text-blue-600', bg: 'bg-blue-50', dot: 'bg-blue-500' },
    { value: 'resolved', label: 'Resolved', color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
    { value: 'closed', label: 'Closed', color: 'text-slate-500', bg: 'bg-slate-100', dot: 'bg-slate-400' },
  ];

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/help-ticket/all');
      setTickets(res.data.tickets || res.data || []);
    } catch (err) {
      console.error("Ticket Sync Error:", err);
      setError("Administrative database connection failure.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    setActionLoading(true);
    try {
      await axios.put(`/api/help-ticket/update-status/${id}`, { status: newStatus });
      setTickets(prev => prev.map(t => t._id === id ? { ...t, status: newStatus } : t));
    } catch (err) {
      setError("Status update failed. System synchronization error.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm permanent removal? This record will be expunged from the active registry.")) return;
    setActionLoading(true);
    try {
      await axios.delete(`/api/help-ticket/delete/${id}`);
      fetchTickets();
    } catch (err) {
      setError("Action failed. System override required.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchesSearch = t.subject?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           t.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
      const matchesStatus = selectedStatus === "all" || t.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [tickets, searchQuery, selectedCategory, selectedStatus]);

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open' || !t.status).length,
    active: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length
  }), [tickets]);

  const getStatusConfig = (status) => {
    const config = statusOptions.find(opt => opt.value === (status || 'open'));
    return config || statusOptions[0];
  };

  if (loading) return (
    <div className="ml-72 mt-24 h-[calc(100vh-6rem)] flex flex-col items-center justify-center bg-slate-50/30">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-[#002b5c] rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldAlert size={20} className="text-[#002b5c]" />
        </div>
      </div>
      <span className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] animate-pulse">Establishing Secure Uplink</span>
    </div>
  );

  return (
    <div className="ml-72 mt-24 h-[calc(100vh-6rem)] flex flex-col font-sans bg-[#f4f7fa] overflow-hidden">
      
      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
        <section className="shrink-0 grid grid-cols-4 gap-8 mb-10">
          {[
            { label: 'Total Inbound', val: stats.total, icon: MessageSquare, color: 'text-slate-600', bg: 'bg-slate-50' },
            { label: 'Awaiting Action', val: stats.open, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
            { label: 'Under Review', val: stats.active, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Archive/Resolved', val: stats.resolved, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' }
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex items-center gap-6 group transition-all hover:shadow-xl hover:-translate-y-1">
              <div className={`w-14 h-14 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <s.icon size={28} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{s.label}</p>
                <p className="text-3xl font-black text-[#002b5c] tracking-tight">{s.val}</p>
              </div>
            </div>
          ))}
        </section>

        <main className="bg-white rounded-[44px] shadow-2xl shadow-slate-200/50 border border-white flex flex-col overflow-hidden relative">
          <header className="px-12 py-10 border-b border-slate-50 flex flex-col gap-8 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#002b5c]">
                   <LifeBuoy size={24} />
                 </div>
                 <div>
                   <h2 className="text-xl font-black text-[#002b5c] tracking-tight uppercase italic leading-none mb-1">Incident Registry</h2>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Maintenance Directory</p>
                 </div>
              </div>

              <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
                {['all', 'open', 'in-progress', 'resolved', 'closed'].map(st => (
                  <button 
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedStatus === st ? 'bg-[#002b5c] text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-[#002b5c]'}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedCategory === cat.value 
                      ? 'bg-[#002b5c] text-white shadow-lg shadow-blue-900/20' 
                      : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 w-80 focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:bg-white transition-all">
                <Search size={18} className="text-slate-300" />
                <input 
                  className="bg-transparent border-none focus:outline-none text-xs font-bold text-[#002b5c] w-full placeholder:text-slate-300"
                  placeholder="Filter tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-white/95 backdrop-blur-md sticky top-0 z-10">
                <tr className="border-b border-slate-100 text-left">
                  <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Incident Details</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lifecycle Status</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                  <th className="px-12 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Command</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTickets.length > 0 ? filteredTickets.map((ticket) => {
                  const status = getStatusConfig(ticket.status);
                  return (
                    <tr
                      key={ticket._id}
                      className="group hover:bg-slate-50/50 transition-all duration-300"
                      onClick={e => {
                        if (
                          e.target.tagName !== 'SELECT' &&
                          e.target.tagName !== 'OPTION' &&
                          !e.target.closest('button')
                        ) {
                          navigate(`/ticket/${ticket._id}`);
                        }
                      }}
                    >
                      <td className="px-12 py-8 max-w-sm">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                            ticket.category === 'network' ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-50 text-slate-400'
                          }`}>
                            <AlertCircle size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-[#002b5c] tracking-tight group-hover:text-blue-600 transition-colors">{ticket.subject}</p>
                            <p className="text-[11px] font-medium text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{ticket.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          {ticket.category === 'hardware' && <Cpu size={12} />}
                          {ticket.category === 'software' && <Settings size={12} />}
                          {ticket.category === 'network' && <Wifi size={12} />}
                          {ticket.category}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="relative inline-block w-44">
                          <select 
                            value={ticket.status || 'open'}
                            onChange={(e) => handleUpdateStatus(ticket._id, e.target.value)}
                            disabled={actionLoading}
                            className={`w-full appearance-none px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-transparent cursor-pointer transition-all outline-none pr-10 ${status.bg} ${status.color} hover:shadow-md active:scale-[0.98] disabled:opacity-50`}
                            onClick={e => e.stopPropagation()}
                          >
                            {statusOptions.map(opt => (
                              <option key={opt.value} value={opt.value} className="bg-white text-slate-800 lowercase">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${status.color} opacity-50`} />
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col text-slate-400">
                          <span className="text-xs font-bold tracking-tight">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                          <span className="text-[9px] font-medium opacity-60 uppercase tracking-tighter mt-0.5">
                            {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </td>
                      <td className="px-12 py-8 text-right">
                        <div className="flex items-center justify-end gap-2 ">
                          <button 
                            onClick={e => { e.stopPropagation(); handleDelete(ticket._id); }}
                            className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                            title="Revoke Log"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={5} className="py-32 text-center grayscale opacity-30">
                       <div className="mb-6 flex justify-center">
                         <div className="p-10 bg-slate-50 rounded-full">
                           <History size={100} strokeWidth={1} />
                         </div>
                       </div>
                       <h3 className="text-2xl font-black uppercase tracking-widest text-[#002b5c]">Support Log Clear</h3>
                       <p className="text-sm font-bold mt-2">No maintenance records matching the current parameters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #e2e8f0; 
          border-radius: 20px; 
          border: 2px solid white;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default HelpRequests;