import { useState } from 'react';
import { Sidebar, Header, Footer } from './components/layout';
import { 
  LoginPage, 
  DashboardPage, 
  AnnouncementManager, 
  FacultyManager, 
  BuildingManager 
} from './pages';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('Admin');
  const [page, setPage] = useState('dashboard');

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardPage />;
      case 'announcements':
        return <AnnouncementManager />;
      case 'faculty':
        return <FacultyManager />;
      case 'buildings':
        return <BuildingManager />;
      case 'kiosks':
        return <DashboardPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar current={page} setPage={setPage} role={role} />
      
      <main className="flex-1 flex flex-col overflow-x-hidden">
        <Header pageTitle={page} userRole={role} />
        
        <div className="p-8 max-w-7xl w-full mx-auto flex-1">
          {renderContent()}
          <Footer />
        </div>
      </main>
    </div>
  );
}