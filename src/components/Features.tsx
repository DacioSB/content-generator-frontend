import React from 'react'
import { FileText, ImageIcon, Shield, GitBranch } from 'lucide-react'

interface FeatureProps {
  title: string
  description: string
  icon: React.ReactNode
  imagePosition: 'left' | 'right'
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon, imagePosition }) => {
  const textOrder = imagePosition === 'left' ? 'order-2' : 'order-1'
  const imageOrder = imagePosition === 'left' ? 'order-1' : 'order-2'

  return (
    <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
      <div className={`md:w-1/2 ${textOrder}`}>
        <h3 className="mb-4 text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-lg text-gray-600">{description}</p>
      </div>
      <div className={`flex md:w-1/2 ${imageOrder} justify-center`}>
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-orange-1 text-white">
          {icon}
        </div>
      </div>
    </div>
  )
}

export function Features() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-orabg-orange-1">
          Empower Your Creativity with AI
        </h2>
        <div className="space-y-24">
          <Feature
            title="AI-Powered Text Generation"
            description="Create high-quality written content in seconds with our AI-powered generator."
            icon={<FileText size={48} />}
            imagePosition="right"
          />
          <Feature
            title="Image Creation and Customization"
            description="Generate stunning visuals tailored to your needs using AI-driven image generation."
            icon={<ImageIcon size={48} />}
            imagePosition="left"
          />
          <Feature
            title="Intelligent Moderation"
            description="Ensure compliance and safety with AI-driven content moderation."
            icon={<Shield size={48} />}
            imagePosition="right"
          />
          <Feature
            title="Workflow Automation"
            description="Streamline your processes with automated notifications and reporting."
            icon={<GitBranch size={48} />}
            imagePosition="left"
          />
        </div>
      </div>
    </section>
  )
}

