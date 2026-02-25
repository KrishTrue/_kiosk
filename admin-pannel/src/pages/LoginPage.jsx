import { useState } from 'react';
import { Monitor } from 'lucide-react';
import { Card, Button, Input } from '../components/ui';
import bgImage from '../assets/image.png';

const LoginPage = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call to validate credentials and get role
    // For now, mock role based on userId
    let role = 'User';
    if (userId.includes('superadmin')) role = 'Superadmin';
    else if (userId.includes('admin')) role = 'Admin';
    
    onLogin(role);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      <Card className="max-w-md w-full p-8 space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4">
            <Monitor size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Campus Kiosk Admin</h1>
          <p className="text-slate-500">Log in to manage your kiosk ecosystem</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input 
            label="User ID" 
            type="text" 
            placeholder="Enter your user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button className="w-full mt-4 py-3">Login to Dashboard</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
