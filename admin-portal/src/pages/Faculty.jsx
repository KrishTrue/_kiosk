import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { 
  Users, 
  UserPlus, 
  Search, 
  Trash2, 
  Edit3, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase,
  ChevronRight,
  Loader2,
  AlertCircle,
  Building2,
  Image as ImageIcon,
  CheckCircle2,
  Filter,
  Upload,
  User as UserIcon,
  Activity,
  X,
  Camera
} from 'lucide-react';


const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  
  const fileInputRef = useRef(null);
  const departments = ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT'];

  const [formData, setFormData] = useState({
    facultyName: '',
    designation: '',
    qualification: '',
    totalExperience: '',
    imageUrl: '', 
    email: '',
    phoneNumber: '',
    department: 'CSE'
  });

  const fetchFaculty = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/faculty/all');
      setFaculty(res.data.faculties || res.data || []);
    } catch (err) {
      console.error("Faculty Sync Error:", err);
      setError("Unable to sync faculty directory with the secure server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        setError("Image exceeds 2MB limit. Please optimize the file.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
        if (error) setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      setError("Faculty profile requires an official image.");
      return;
    }

    setActionLoading(true);
    try {
      await axios.post('/api/faculty/add', formData);
      setFormData({
        facultyName: '',
        designation: '',
        qualification: '',
        totalExperience: '',
        imageUrl: '',
        email: '',
        phoneNumber: '',
        department: 'CSE'
      });
      fetchFaculty();
    } catch (err) {
      setError(err.response?.data?.message || "Internal server error during provisioning.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm identity revocation? This action is permanent.")) return;
    setActionLoading(true);
    try {
      await axios.get(`/api/faculty/delete/${id}`);
      fetchFaculty();
    } catch (err) {
      setError("Administrative action failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredFaculty = useMemo(() => {
    return faculty.filter(f => {
      const matchesSearch = f.facultyName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           f.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === "All" || f.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [faculty, searchQuery, selectedDept]);

  if (loading) return (
    <div className="ml-72 mt-24 h-[calc(100vh-6rem)] flex flex-col items-center justify-center bg-slate-50/20">
      <Loader2 size={40} className="text-[#002b5c] animate-spin mb-4" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Initializing Directory Interface</p>
    </div>
  );

  return (
    <div className="ml-72 mt-24 h-[calc(100vh-6rem)] flex flex-col font-sans bg-[#fcfdfe] overflow-hidden">
      
      <div className="flex-1 flex gap-10 p-10 overflow-hidden">
      
        <aside className="w-[440px] bg-white rounded-[44px] shadow-2xl shadow-slate-200/40 border border-slate-100 flex flex-col h-full shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60 -z-0" />
          
          <div className="p-10 border-b border-slate-50 relative z-10">
             <div className="flex items-center gap-3 mb-2">
               <Camera className="text-blue-500" size={18} />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile Registry</span>
             </div>
             <h2 className="text-2xl font-black text-[#002b5c] tracking-tight">Add Faculty</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8 flex-1 overflow-y-auto custom-scrollbar relative z-10">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl animate-in slide-in-from-left-2">
                <AlertCircle size={18} className="text-red-500 shrink-0" />
                <p className="text-[11px] font-bold text-red-900 leading-tight">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-4">Profile Portrait</label>
              {!formData.imageUrl ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex flex-col items-center justify-center w-full h-44 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-white hover:border-blue-400 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="text-slate-300 group-hover:text-blue-500" size={24} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Identity Photo</p>
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              ) : (
                <div className="relative w-full h-44 rounded-3xl overflow-hidden border-2 border-slate-100 group shadow-lg">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button" 
                      onClick={removeImage}
                      className="p-4 bg-white text-red-500 rounded-2xl shadow-xl active:scale-90 transition-all"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {[
                { label: 'Faculty Name', name: 'facultyName', type: 'text', icon: UserIcon },
                { label: 'Role / Designation', name: 'designation', type: 'text', icon: Briefcase },
                { label: 'Qualification', name: 'qualification', type: 'text', icon: GraduationCap },
                { label: 'Experience (Years)', name: 'totalExperience', type: 'number', icon: Activity },
                { label: 'Campus Email', name: 'email', type: 'email', icon: Mail },
                { label: 'Contact Phone', name: 'phoneNumber', type: 'text', icon: Phone },
              ].map((field) => (
                <div key={field.name} className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-[9px] font-black text-slate-300 uppercase tracking-widest group-focus-within:text-[#002b5c] transition-colors z-10">{field.label}</label>
                  <div className="relative">
                    <field.icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      type={field.type}
                      name={field.name}
                      className="w-full border border-slate-100 bg-slate-50/30 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[#002b5c] focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-200"
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-4">Department Unit</label>
                <div className="grid grid-cols-3 gap-2">
                  {departments.map(dept => (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => setFormData({ ...formData, department: dept })}
                      className={`py-3 rounded-xl text-[10px] font-black transition-all border ${formData.department === dept ? 'bg-[#002b5c] text-white border-transparent shadow-lg shadow-blue-900/20' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'}`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={actionLoading}
              className="w-full bg-[#002b5c] text-white py-6 rounded-3xl font-black text-sm active:scale-[0.97] transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-4 group"
            >
              {actionLoading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span className="tracking-[0.2em] uppercase">Commit Record</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </aside>

        <main className="flex-1 bg-white rounded-[44px] shadow-2xl shadow-slate-200/40 border border-slate-100 flex flex-col overflow-hidden relative">
          <header className="px-12 py-10 border-b border-slate-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-5">
               <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#002b5c]">
                 <Users size={24} />
               </div>
               <div>
                 <h2 className="text-xl font-black text-[#002b5c] tracking-tight">Identity Vault</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Faculty Repository</p>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-[10px] font-black uppercase text-slate-500 focus:outline-none cursor-pointer"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                <option value="All">All Units</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 w-64 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
                <Search size={18} className="text-slate-300" />
                <input 
                  className="bg-transparent border-none focus:outline-none text-xs font-bold text-[#002b5c] w-full"
                  placeholder="Filter by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <tr className="border-b border-slate-100 text-left">
                  <th className="px-12 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identity</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Credentials</th>
                  <th className="px-12 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredFaculty.length > 0 ? filteredFaculty.map((member) => (
                  <tr key={member._id} className="group hover:bg-slate-50/40 transition-all">
                    <td className="px-12 py-8">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative group-hover:scale-105 transition-transform">
                          <img 
                            src={member.imageUrl} 
                            alt="" 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Profile'; }} 
                          />
                        </div>
                        <div>
                          <p className="text-base font-black text-[#002b5c] tracking-tight">{member.facultyName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="px-4 py-2 bg-slate-100 text-[#002b5c] rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200">
                        {member.department}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-sm font-bold text-slate-700">{member.qualification}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{member.totalExperience}Y EXPERIENCE</p>
                    </td>
                    <td className="px-12 py-8 text-right">
                      <div className="flex items-center justify-end gap-2  duration-300">
                        <button className="p-4 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-2xl transition-all">
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(member._id)}
                          className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-32 text-center grayscale opacity-30">
                       <Building2 size={80} className="mx-auto mb-6 text-slate-300" />
                       <h3 className="text-2xl font-black uppercase tracking-widest text-[#002b5c]">Database Clear</h3>
                       <p className="text-sm font-bold mt-2 text-slate-400 tracking-tight">No faculty records found for this unit.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; border: 2px solid white; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
      `}</style>
    </div>
  );
};

export default Faculty;