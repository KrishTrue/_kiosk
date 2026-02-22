import { useState } from 'react';
import {
  Search,
  Navigation,
  Calendar,
  Library,
  Users,
  DoorOpen,
  Bell,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SidePanel = () => {
  const [activeTab, setActiveTab] = useState('navigate');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navItems = [
    { key: 'navigate', icon: Navigation, color: 'bg-[#8dc63f]', route: '/' },
    { key: 'schedule', icon: Calendar, route: '/schedule' },
    { key: 'library', icon: Library, route: '/library' },
    { key: 'faculty', icon: Users, route: '/faculty' },
    { key: 'rooms', icon: DoorOpen, route: '/rooms' },
  ];

  return (
    <div className="w-full h-full bg-white/90 backdrop-blur-md border border-gray-200 p-8 flex flex-col gap-8 select-none rounded-2xl shadow-xl overflow-y-auto">
      <div>
        <h2 className="text-gray-400 font-bold tracking-widest text-sm mb-4">
          {t('sidebar.title')}
        </h2>
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder={t('sidebar.search')}
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                navigate(item.route);
              }}
              className={`flex items-center gap-4 px-6 py-5 rounded-3xl transition-all active:scale-95 duration-200 ${
                isActive
                  ? `${item.color ?? 'bg-blue-600'} text-white shadow-lg shadow-green-900/10`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-lg font-semibold tracking-wide">
                {t(`sidebar.${item.key}`)}
              </span>
              {isActive && <ChevronRight size={20} className="ml-auto opacity-70" />}
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        <Link to="/announcements">
          <button className="w-full bg-white border border-gray-200 py-6 rounded-3xl flex items-center justify-center gap-3 text-gray-700 font-bold shadow-sm active:bg-gray-50 transition-colors">
            <Bell size={20} className="text-gray-400" />
            {t('sidebar.announcements')}
          </button>
        </Link>
        <p className="text-[11px] text-gray-400 mt-4 px-2 leading-relaxed text-center">
          {t('sidebar.maintenance')}
        </p>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h2 className="text-gray-400 font-bold tracking-widest text-sm mb-4 uppercase">
          {t('sidebar.help')}
        </h2>
        <Link to="/help">
          <button className="w-full bg-white border border-gray-200 py-4 rounded-full flex items-center justify-center gap-3 text-gray-700 font-bold shadow-md active:bg-gray-100 transition-all">
            <MessageSquare size={18} className="text-blue-500" />
            {t('sidebar.contactSupport')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SidePanel;
