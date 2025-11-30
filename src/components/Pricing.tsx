import { Check } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import { Badge } from './ui/Badge'
import { Button } from './ui/Button';

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingTier {
  name: string
  price: string
  description: string
  features: PricingFeature[]
  buttonText: string
  buttonVariant?: 'default' | 'secondary'
  isPopular?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: '$10',
    description: 'Perfect for individuals getting started',
    features: [
      { text: 'Access to text generation', included: true },
      { text: 'Limited image generation (5 images/month)', included: true },
      { text: 'Basic moderation tools', included: true },
      { text: 'Workflow automation', included: false },
    ],
    buttonText: 'Get Started',
    buttonVariant: 'secondary',
  },
  {
    name: 'Pro',
    price: '$30',
    description: 'Best for professionals and growing teams',
    features: [
      { text: 'Unlimited text generation', included: true },
      { text: 'Image generation (50 images/month)', included: true },
      { text: 'Advanced moderation tools', included: true },
      { text: 'Workflow automation', included: true },
    ],
    buttonText: 'Upgrade Now',
    buttonVariant: 'default',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs',
    features: [
      { text: 'Dedicated support', included: true },
      { text: 'Unlimited text and image generation', included: true },
      { text: 'Customized workflow automation', included: true },
      { text: 'Team collaboration tools', included: true },
    ],
    buttonText: 'Contact Us',
    buttonVariant: 'secondary',
  },
]

export function Pricing() {
  return (
    <section className="bg-white py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold text-[#ff7757] sm:text-4xl md:text-5xl">
            Affordable Plans for Every User
          </h2>
          <p className="max-w-[85%] text-lg text-gray-600 sm:text-xl">
            Choose the perfect plan for your needs. All plans include core features.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name}
              className={`relative flex flex-col justify-between ${
                tier.isPopular ? 'border-2 border-teal-600 shadow-lg' : ''
              }`}
            >
              {tier.isPopular && (
                <Badge 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600"
                >
                  Most Popular
                </Badge>
              )}
              <div>
                <CardHeader>
                  <h3 className="text-2xl font-bold text-[#ff7757]">{tier.name}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-teal-600">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="text-gray-600">/month</span>}
                  </div>
                  <p className="mt-4 text-gray-600">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className={`h-5 w-5 ${feature.included ? 'text-teal-600' : 'text-gray-300'}`} />
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <CardFooter className="mt-8">
              <Button 
                    className="w-full" 
                    variant={tier.buttonVariant === 'secondary' ? 'secondary' : 'primary'} // Change here
                    >
                    {tier.buttonText}
                    </Button>

              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

