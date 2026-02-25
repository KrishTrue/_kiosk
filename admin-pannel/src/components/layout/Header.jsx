import { Search } from 'lucide-react';

const Navbar = ({ pageTitle, userRole }) => (
  <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-bold text-slate-800 capitalize">{pageTitle.replace('-', ' ')}</h2>
      <p className="text-xs text-slate-400">Last updated: Today at 09:41 AM</p>
    </div>
    
    <div className="flex items-center gap-6">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          placeholder="Global search..." 
          className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm outline-none w-64 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
      </div>
      
      <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-800">
            {userRole === 'Superadmin' ? 'Root Admin' : userRole === 'Admin' ? 'Campus Manager' : 'Campus User'}
          </p>
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">{userRole}</p>
        </div>
        <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
          {userRole[0]}
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
