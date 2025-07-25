// File: src/main.tsx (CORRECTED with Splat Routes)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';

// --- Component & Page Imports ---
import App from './App.tsx';
import { LandingPage } from './pages/landing/page.tsx'; // Ensure this path is correct
import { AuthPage } from './pages/AuthPage.tsx';
import Dashboard from './pages/dashboard/page.tsx'; // Ensure this path is correct
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import Projects from './pages/projects/page.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        // Add a splat (*) to catch all sub-routes like /sign-in/sso-callback
        path: "/sign-in/*", 
        element: <AuthPage />,
      },
      {
        // Also add a splat to the sign-up route for consistency
        path: "/sign-up/*", 
        element: <AuthPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/projects",
        element: (
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);