// File: src/App.tsx (CORRECTED with the right hook)

import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react'; // <-- IMPORT useAuth
import { useEffect } from 'react';

export default function App() {
  // Use the useAuth() hook to get authentication state.
  const { isLoaded, isSignedIn } = useAuth(); 
  const navigate = useNavigate();

  // This effect will handle redirecting signed-in users away from the landing page.
  useEffect(() => {
    // Wait until Clerk has loaded its state before making any decisions
    if (!isLoaded) {
      return;
    }

    // If the user is signed in and on the landing page, redirect them to the dashboard.
    if (isSignedIn && window.location.pathname === '/') {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  // While Clerk is loading, you might want to show a loading indicator
  // to prevent a flash of the landing page for an authenticated user.
  if (!isLoaded) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            Loading...
        </div>
    );
  }

  // The Outlet component from react-router-dom will render the 
  // active child route defined in main.tsx.
  return (
    <div className="app-container">
      <main>
        <Outlet />
      </main>
    </div>
  );
}