import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { syncBackendUser } from "../api/client"; // Import your API client

export function useUserSync() {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [isSynced, setIsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function syncUser() {
      if (!isLoaded || !isSignedIn) {
        setIsLoading(false);
        return;
      }

      try {
        const token = await getToken();
        await syncBackendUser(token);
        setIsSynced(true);
        setError(null);
      } catch (err) {
        console.error('User sync failed:', err);
        setError(err instanceof Error ? err.message : "Failed to sync user with backend");
        setIsSynced(false);
      } finally {
        setIsLoading(false);
      }
    }

    syncUser();
  }, [isSignedIn, isLoaded, getToken]);

  return { isSynced, isLoading, error };
}