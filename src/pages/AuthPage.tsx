// File: src/pages/AuthPage.tsx (Simplified)

import { SignIn, SignUp } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

export function AuthPage() {
  const location = useLocation();
  // Determine if we should show the sign-up form based on the URL path
  const isSignUp = location.pathname.startsWith("/sign-up");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      {isSignUp ? (
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          // After a successful sign-up, Clerk will redirect the user here.
          // The backend user sync should be triggered on the dashboard or root layout.
          fallbackRedirectUrl="/dashboard" 
        />
      ) : (
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          // After a successful sign-in, Clerk will redirect the user here.
          fallbackRedirectUrl="/dashboard" 
        />
      )}
    </div>
  );
}