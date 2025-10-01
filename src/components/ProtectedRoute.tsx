import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserSync } from '../hooks/useUserSync';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { isLoading: isSyncing, error: syncError } = useUserSync();
  const location = useLocation();

  if (!isLoaded || isSyncing) {
    return <div>Loading...</div>;
  }

  if (syncError) {
    return <div>Error syncing user: {syncError}</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}