import { 
  LayoutDashboard, 
  Megaphone, 
  Users, 
  Building2, 
  Monitor, 
  LogOut,
  Globe 
} from 'lucide-react';

const Sidebar = ({ current, setPage, role }) => {
  const menu = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'announcements', icon: Megaphone, label: 'Announcements' },
    { id: 'faculty', icon: Users, label: 'Faculty' },
    { id: 'buildings', icon: Building2, label: 'Buildings' },
    { id: 'kiosks', icon: Monitor, label: 'Kiosk Monitor' },
  ];

  if (role === 'Superadmin') {
    menu.push({ id: 'settings', icon: Globe, label: 'Global Settings' });
  }

  return (
    <div className="w-64 bg-slate-900 h-screen sticky top-0 flex flex-col overflow-hidden text-slate-400">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Monitor size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight">Campus360</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              current === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => window.location.reload()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
