// File: src/pages/AuthPage.tsx (Simplified)

import { SignIn, SignUp } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

export function AuthPage() {
  const location = useLocation();
  const isSignUp = location.pathname.startsWith("/sign-up");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      {isSignUp ? (
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/dashboard" 
        />
      ) : (
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard" 
        />
      )}
    </div>
  );
}