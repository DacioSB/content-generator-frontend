import { Brain } from 'lucide-react';
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { useAuth } from '@clerk/clerk-react';

export function Navbar() {
  const { isSignedIn, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-teal-500" />
          <span className="text-xl font-semibold">ContentGen Platform</span>
        </div>
        <NavigationMenu.Root className="flex items-center">
          <NavigationMenu.List className="hidden md:flex md:items-center md:space-x-6">
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Features
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Pricing
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                About
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
        {isSignedIn ? (
          <Button
            variant="secondary"
            size="small"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        ) : (
          <Link to="/sign-in">
            <Button variant="secondary" size="small">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}
