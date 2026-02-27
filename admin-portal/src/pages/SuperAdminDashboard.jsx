import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { 
  ShieldCheck, 
  UserPlus, 
  Users, 
  Trash2, 
  Mail, 
  User as UserIcon, 
  Lock, 
  ChevronRight, 
  Loader2, 
  AlertCircle,
  Activity,
  Search,
  CheckCircle2,
  Fingerprint,
  UserCheck,
  MoreVertical,
  BadgeCheck,
  IdCard
} from 'lucide-react';
import { authContext } from '../context/AuthContext';


const SuperAdminDashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const {user}=useContext(authContext)

  const [newUser, setNewUser] = useState({
    name: '',
    userId: '',
    email: '',
    password: '',
    role: 'user'
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [profileRes, usersRes] = await Promise.all([
        axios.get('/api/auth/user-info'),
        axios.get('/api/auth/all-users')
      ]);
      
      setProfile(profileRes.data.user || profileRes.data);
      setAllUsers(usersRes.data.users || usersRes.data);
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
      setError("Administrative database connection timed out.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if(!newUser.userId || !newUser.password) return;
    setActionLoading(true);
    try {
      await axios.post('/api/auth/create-user', newUser);
      setNewUser({ name: '', userId: '', email: '', password: '', role: 'user' });
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to provision new account.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if(!window.confirm("Confirm identity revocation? This action is irreversible.")) return;
    setActionLoading(true);
    try {
      await axios.delete(`/api/auth/delete/${userId}`);
      fetchData();
    } catch (err) {
      setError("Administrative override failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return allUsers.filter(u => 
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.userId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allUsers, searchQuery]);

  const stats = useMemo(() => ({
    total: allUsers.length,
    admins: allUsers.filter(u => u.role?.toLowerCase() === 'admin').length,
    users: allUsers.filter(u => u.role?.toLowerCase() === 'user').length,
  }), [allUsers]);

  if (loading) return (
    <div className="ml-72 mt-24 h-[calc(100vh-6rem)] flex flex-col items-center justify-center bg-slate-50/50 backdrop-blur-md">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-[#002b5c] rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldCheck size={20} className="text-[#002b5c]" />
        </div>
      </div>
      <span className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] animate-pulse">Establishing Secure Session</span>
    </div>
  );

  return (
    <div className="ml-72 mt-24 h-[calc(100vh-6rem)] flex flex-col font-sans bg-[#f4f7fa] overflow-hidden">
      
      <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
      
        <header className="mb-10 bg-[#002b5c] rounded-[48px] p-10 shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck size={240} className="rotate-12" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-4xl flex items-center justify-center text-white shadow-inner">
                <UserIcon size={44} strokeWidth={1.5} />
              </div>
              <div className="text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-blue-500 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg shadow-blue-500/20">
                    Active Session
                  </span>
                  <div className="flex items-center gap-1 text-blue-300">
                    <BadgeCheck size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Authenticated Admin</span>
                  </div>
                </div>
                <h1 className="text-4xl font-black tracking-tight leading-none mb-2 italic">
                  {user?.name || "Administrator"}
                </h1>
                <div className="flex flex-wrap items-center gap-6 opacity-60">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span className="text-sm font-medium">{user?.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IdCard size={14} />
                    <span className="text-sm font-medium uppercase tracking-tighter">UID: {user?.userId || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm px-8 py-5 rounded-3xl text-center">
                <p className="text-[10px] font-black text-blue-300/50 uppercase tracking-widest mb-1">Privilege Level</p>
                <p className="text-xl font-black text-white uppercase italic">Superuser</p>
              </div>
            </div>
          </div>
        </header>

        <section className="shrink-0 grid grid-cols-4 gap-8 mb-10">
          {[
            { label: 'Total Identities', val: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'System Admins', val: stats.admins, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Standard Users', val: stats.users, icon: UserCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Network Health', val: 'Optimal', icon: Activity, color: 'text-slate-600', bg: 'bg-slate-50' }
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex items-center gap-6 group transition-all hover:shadow-xl hover:-translate-y-1">
              <div className={`w-14 h-14 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <s.icon size={28} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">{s.label}</p>
                <p className="text-3xl font-black text-[#002b5c] tracking-tight">{s.val}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="flex gap-10 min-h-150">
          <aside className="w-110 bg-white rounded-4xl shadow-2xl shadow-slate-200/50 border border-white flex flex-col h-fit sticky top-0">
            <div className="p-10 border-b border-slate-50">
               <div className="flex items-center gap-3 mb-2">
                 <UserPlus className="text-blue-500" size={20} />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Provisioning Engine</span>
               </div>
               <h2 className="text-2xl font-black text-[#002b5c] tracking-tight leading-none uppercase italic">Register Identity</h2>
            </div>

            <form onSubmit={handleCreateUser} className="p-10 space-y-8">
              <div className="space-y-6">
                {[
                  { label: 'Full Name', name: 'name', type: 'text', icon: UserIcon, placeholder: 'Ex: Robert Smith' },
                  { label: 'User Identifier', name: 'userId', type: 'text', icon: Fingerprint, placeholder: 'admin_primary' },
                  { label: 'Email Address', name: 'email', type: 'email', icon: Mail, placeholder: 'name@campus.edu' },
                  { label: 'Security Key', name: 'password', type: 'password', icon: Lock, placeholder: '••••••••' },
                ].map((input) => (
                  <div key={input.name} className="relative group">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-slate-300 uppercase tracking-widest group-focus-within:text-[#002b5c] transition-colors">{input.label}</label>
                    <div className="relative">
                      <input.icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input 
                        type={input.type}
                        className="w-full border border-slate-100 bg-slate-50/50 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[#002b5c] focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
                        value={newUser[input.name]}
                        onChange={(e) => setNewUser({...newUser, [input.name]: e.target.value})}
                        placeholder={input.placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 bg-slate-50 p-2 rounded-[22px] border border-slate-100">
                {['user', 'admin'].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setNewUser({...newUser, role: r})}
                    className={`flex-1 py-3.5 rounded-[18px] font-black text-[10px] transition-all tracking-[0.2em] border ${
                      newUser.role === r 
                        ? 'bg-white text-[#002b5c] border-white shadow-xl shadow-slate-200/50' 
                        : 'text-slate-400 border-transparent hover:text-slate-600'
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>

              <button 
                type="submit"
                disabled={actionLoading}
                className="w-full bg-[#002b5c] text-white py-6 rounded-3xl font-black text-base active:scale-[0.97] disabled:opacity-50 transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-4 group"
              >
                {actionLoading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>
                    <span className="tracking-widest uppercase">Commit Changes</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </aside>

          <main className="flex-1 bg-white rounded-[44px] shadow-2xl shadow-slate-200/50 border border-white flex flex-col overflow-hidden relative min-h-fit">
            <header className="px-12 py-10 border-b border-slate-50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#002b5c]">
                   <Fingerprint size={24} />
                 </div>
                 <div>
                   <h2 className="text-xl font-black text-[#002b5c] tracking-tight uppercase italic leading-none mb-1">Master Directory</h2>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Identity Repository</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 w-80 focus-within:ring-4 focus-within:ring-blue-500/5 focus-within:bg-white transition-all">
                <Search size={18} className="text-slate-300" />
                <input 
                  className="bg-transparent border-none focus:outline-none text-xs font-bold text-[#002b5c] w-full placeholder:text-slate-300"
                  placeholder="Search Identity Database..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </header>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-white/95 backdrop-blur-md z-10">
                  <tr className="border-b border-slate-100 text-left">
                    <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identity Profile</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Level</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Connectivity</th>
                    <th className="px-12 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Commands</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                    <tr key={user._id} className="group hover:bg-slate-50/50 transition-all">
                      <td className="px-12 py-8">
                        <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${user.role?.toLowerCase() === 'admin' ? 'bg-[#002b5c] text-white shadow-xl shadow-blue-900/10' : 'bg-slate-100 text-slate-400'}`}>
                            {user.role?.toLowerCase() === 'admin' ? <ShieldCheck size={24} /> : <UserIcon size={24} />}
                          </div>
                          <div>
                            <p className="text-base font-black text-[#002b5c] tracking-tight">{user.name}</p>
                            <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest opacity-60">ID: {user.userId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${user.role?.toLowerCase() === 'admin' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${user.role?.toLowerCase() === 'admin' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-300'}`} />
                          {user.role}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <p className="text-sm font-bold text-slate-600">{user.email}</p>
                      </td>
                      <td className="px-12 py-8 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                            title="Revoke Access"
                          >
                            <Trash2 size={20} />
                          </button>
                          <button className="p-4 text-slate-300 hover:text-[#002b5c] hover:bg-slate-100 rounded-2xl transition-all">
                            <MoreVertical size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-32 text-center grayscale opacity-30">
                         <div className="mb-6 flex justify-center">
                           <div className="p-10 bg-slate-50 rounded-full">
                             <Users size={100} strokeWidth={1} />
                           </div>
                         </div>
                         <h3 className="text-2xl font-black uppercase tracking-widest text-[#002b5c]">Search Failure</h3>
                         <p className="text-sm font-bold mt-2">No identities matching "{searchQuery}"</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #e2e8f0; 
          border-radius: 10px; 
          border: 2px solid white;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;