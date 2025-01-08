import { Link } from 'react-router-dom';
import { useAuth } from '@/services/authContext';

export function AppHeader() {

  const shouldShowSteps = (
    ['/verify-otp', '/plans', '/checkout', '/login'].some(path => 
      location.pathname.includes(path)
    ) && 
    location.pathname !== '/'  
  );

if (!shouldShowSteps) return null;

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to={'/'} 
          className="flex items-center"
        >
          <span className="font-inter text-3xl font-bold">
            <span className="text-white">Talent</span>
            <span className="text-blue-500">Tuner</span>
          </span>
        </Link>

      </div>
    </header>
  );
}

// Layout component that includes the header
export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}