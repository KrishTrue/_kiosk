import { useState, useEffect } from 'react';
import { Map, BookOpen, Bell, Calendar, Users, Info, Clock, ChevronRight } from 'lucide-react';
import Navbar from './components/Navbar';

const MENU_ITEMS = [
  {
    id: 'nav',
    title: 'Campus Navigation',
    description: 'Find buildings, rooms, and facilities',
    icon: <Map className="w-12 h-12" />,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  },
  {
    id: 'lib',
    title: 'Library Services',
    description: 'Search books, check availability, and reserve',
    icon: <BookOpen className="w-12 h-12" />,
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
  },
  {
    id: 'notices',
    title: 'Notice Board',
    description: 'Latest announcements and campus news',
    icon: <Bell className="w-12 h-12" />,
    color: 'bg-amber-500',
    hoverColor: 'hover:bg-amber-600',
  },
  {
    id: 'schedule',
    title: 'Class Schedules',
    description: 'View timetables and room allocations',
    icon: <Calendar className="w-12 h-12" />,
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
  },
  {
    id: 'faculty',
    title: 'Faculty Directory',
    description: 'Find professors and their office hours',
    icon: <Users className="w-12 h-12" />,
    color: 'bg-rose-500',
    hoverColor: 'hover:bg-rose-600',
  },
  {
    id: 'info',
    title: 'General Information',
    description: 'Campus rules, emergency contacts, and FAQs',
    icon: <Info className="w-12 h-12" />,
    color: 'bg-slate-600',
    hoverColor: 'hover:bg-slate-700',
  },
];

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">
      <Navbar/>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-10">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="relative z-10 w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">How can we help you today?</h2>
            <p className="text-2xl text-gray-500">Please select an option below to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                className="group relative bg-white rounded-3xl p-8 text-left shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Background Effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${item.color}`}
                ></div>

                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-5 rounded-2xl text-white shadow-lg ${item.color} ${item.hoverColor} transition-colors duration-300`}
                  >
                    {item.icon}
                  </div>
                  <div className="bg-gray-50 p-3 rounded-full text-gray-400 group-hover:text-gray-900 group-hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xl text-gray-500 leading-relaxed">{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-400 text-lg border-t border-gray-200 z-10">
        <p>
          Touch the screen anywhere to interact • For immediate assistance, please visit the
          reception desk
        </p>
      </footer>
    </div>
  );
}

export default App;
