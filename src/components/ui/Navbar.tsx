import { Brain } from 'lucide-react';
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Button } from '../Button';

export function Navbar() {
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
              >
                Features
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                href="#pricing"
              >
                Pricing
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                href="#about"
              >
                About
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                href="#contact"
              >
                Contact
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <Button href="/sign-in">
          Sign In
        </Button>
      </div>
    </header>
  )
}