import * as React from "react"
import { Brain } from 'lucide-react';
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-teal-500" />
          <span className="text-xl font-semibold">ContentGen Platform</span>
        </div>
        <NavigationMenu.Root className="ml-auto flex items-center space-x-4">
          <NavigationMenu.List className="hidden md:flex md:items-center md:space-x-4">
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
                href="#features"
              >
                Features
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
                href="#pricing"
              >
                Pricing
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
                href="#about"
              >
                About
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
                href="#contact"
              >
                Contact
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <a
            href="/sign-in"
            className="inline-flex h-9 items-center justify-center rounded-md bg-[#ff7757] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#ff7757]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7757] disabled:pointer-events-none disabled:opacity-50"
          >
            Sign In
          </a>
        </NavigationMenu.Root>
      </div>
    </header>
  )
}