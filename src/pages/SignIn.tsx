import { SignIn as ClerkSignIn, SignUp as ClerkSignUp, useSignUp, useSession } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { createBackendUser } from "../api/users";
import { useNavigate } from "react-router-dom";

export function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { signUp } = useSignUp();
  const { session } = useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle successful authentication (both sign-in and sign-up)
  useEffect(() => {
    const handleAuthSuccess = async () => {
      if (!session) return;

      setLoading(true);
      setError(null);

      try {
        const token = await session.getToken();
        if (token) {
          // For new signups, sync with backend
          if (signUp?.status === 'complete') {
            await createBackendUser(token);
          }
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Failed to authenticate. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    handleAuthSuccess();
  }, [session, signUp, navigate]);

  // Toggle between sign-in and sign-up views
  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          {isSignIn ? 'Sign In to Your Account' : 'Create a New Account'}
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        {loading && (
          <div className="mb-4 text-center text-blue-600">Processing...</div>
        )}

        {isSignIn ? (
          <ClerkSignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/dashboard"
            afterSignUpUrl="/dashboard"
          />
        ) : (
          <ClerkSignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/dashboard"
          />
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          {isSignIn ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={toggleAuthMode}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={toggleAuthMode}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}