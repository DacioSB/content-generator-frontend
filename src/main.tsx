import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import Dashboard from './pages/dashboard/page.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-in/*",
    element: <SignIn />,
  },
  {
    path: "/sign-up/*",
    element: <SignUp />,
  },
  {
    path: "/dashboard/*",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)