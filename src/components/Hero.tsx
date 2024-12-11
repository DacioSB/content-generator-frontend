import React from 'react';
import { Cloud, Plug, BotIcon as Robot } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 rounded-full bg-teal-100 p-3 text-teal-600">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

export function Hero() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div 
          className="mb-8 w-full max-w-2xl h-[400px] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        >
          {/* Optionally add any overlay or additional content here */}
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          Welcome to ContentGen Platform
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-600">
          Experience the power of AI in content generation and moderation. Our platform offers seamless integration, advanced AI tools, and secure cloud storage to help you create and manage content effortlessly.
        </p>
        <button className="rounded-full bg-teal-500 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
          Get Started
        </button>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={<Plug className="h-6 w-6" />}
          title="Seamless Integration"
          description="Easily connect with your existing tools and workflows."
        />
        <FeatureCard
          icon={<Robot className="h-6 w-6" />}
          title="AI-Powered Tools"
          description="Generate and moderate content with state-of-the-art AI models."
        />
        <FeatureCard
          icon={<Cloud className="h-6 w-6" />}
          title="Secure Cloud Storage"
          description="Store your content securely with Azure Blob Storage."
        />
      </div>
    </div>
  )
}
