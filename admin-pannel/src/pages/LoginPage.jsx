import { useState } from 'react';
import { Monitor } from 'lucide-react';
import { Card, Button, Input } from '../components/ui';

const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState('Admin');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
            <Monitor size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Campus Kiosk Admin</h1>
          <p className="text-slate-500">Log in to manage your kiosk ecosystem</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="admin@campus.edu" 
            defaultValue="admin@campus.edu" 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            defaultValue="password" 
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Access Role</label>
            <div className="grid grid-cols-2 gap-3">
              {['Admin', 'Superadmin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                    role === r 
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full mt-4 py-3">Login to Dashboard</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
