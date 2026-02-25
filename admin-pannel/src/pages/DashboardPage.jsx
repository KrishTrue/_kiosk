import { AlertCircle } from 'lucide-react';
import { Card } from '../components/ui';
import { INITIAL_STATS, INITIAL_KIOSKS, RECENT_ALERTS } from '../data/mockData';

const DashboardPage = () => (
  <div className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {INITIAL_STATS.map((stat, idx) => (
        <Card key={idx} className="p-5 flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
          </div>
        </Card>
      ))}
    </div>

    {/* Kiosk Status & Alerts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">Kiosk Status Monitor</h3>
          <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
            Real-time
          </span>
        </div>
        <div className="space-y-4">
          {INITIAL_KIOSKS.map(kiosk => (
            <div 
              key={kiosk.id} 
              className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${kiosk.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <p className="font-medium text-slate-800">{kiosk.name}</p>
                  <p className="text-xs text-slate-500">{kiosk.location}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-mono">{kiosk.lastPing}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold text-slate-800 mb-6">Recent Alerts</h3>
        <div className="space-y-3">
          {RECENT_ALERTS.map((alert, i) => (
            <div key={i} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
              <AlertCircle size={18} className={alert.type === 'error' ? 'text-red-500' : 'text-blue-500'} />
              <div>
                <p className="text-sm text-slate-700">{alert.msg}</p>
                <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

export default DashboardPage;
