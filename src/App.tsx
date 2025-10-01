import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useUserSync } from './hooks/useUserSync';

export default function App() {
  const { isLoaded, isSignedIn } = useAuth();
  const { isLoading: isSyncing, error: syncError } = useUserSync();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;
    
    if (isSignedIn && window.location.pathname === '/') {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || isSyncing) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (syncError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error syncing user: {syncError}
      </div>
    );
  }

  return (
    <div className="app-container">
      <main>
        <Outlet />
      </main>
    </div>
  );
}