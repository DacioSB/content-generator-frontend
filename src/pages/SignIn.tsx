import { SignIn as ClerkSignIn } from "@clerk/clerk-react";

export function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ClerkSignIn 
        routing="path" 
        path="/sign-in" 
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}