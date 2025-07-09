'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

const plans = [
  {
    name: 'Free',
    title: 'Free plan',
    price: 0,
    priceUnit: 'month',
    description: 'The best way to start using EAS, no credit card required.',
    features: [
      '30 mobile app builds per month',
      'Submit to the app stores',
      'Send updates to 1,000 MAUs',
    ],
    buttonText: 'Select Plan',
    highlight: false,
    badge: null,
    bottomLink: null,
  },
  {
    name: 'Pro',
    title: 'Starter plan',
    price: 19,
    priceUnit: 'month',
    description: 'For developers ready to launch real-world apps.',
    features: [
      '$30 of build credit',
      'Skip the line with high priority builds',
      'Send updates to 3,000 MAUs',
    ],
    buttonText: 'Select Plan',
    highlight: true,
    badge: 'Popular',
    bottomLink: null,
  },
  {
    name: 'Business',
    title: 'Production plan',
    price: 99,
    priceUnit: 'month',
    description: 'For teams with growing user bases.',
    features: [
      '$100 of build credit',
      'Send updates to 50,000 MAUs',
      '2 build concurrencies',
    ],
    buttonText: 'Select Plan',
    highlight: false,
    badge: null,
    bottomLink: {
      text: 'Need more? Talk to our team.',
      href: '#',
    },
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 px-4">
      {/* Header */}
      <div className="flex flex-col items-center mt-16 mb-10">
        <h1 className="text-5xl font-extrabold text-center mb-4 leading-tight">
          Make incredible apps.
          <br />
          With pricing to match.
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          Build, submit, and update your app, all with pricing that scales as
          you grow. Great for any React Native app.
        </p>
      </div>
      {/* Plans */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 justify-center mx-auto">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`flex-1 flex flex-col rounded-2xl border border-gray-200 shadow-md bg-white transition-all
              ${plan.highlight ? 'border-blue-500 shadow-blue-100 relative' : ''}
            `}
            style={{ minWidth: 0 }}
          >
            {/* Badge */}
            {plan.badge && (
              <Badge className="absolute top-6 right-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {plan.badge}
              </Badge>
            )}
            {/* Card Content */}
            <Card className="flex-1 flex flex-col pb-0">
              <div className="px-6 pt-4 pb-0 min-h-[160px]">
                <div className="text-lg font-semibold mb-1">{plan.title}</div>
                <div className="text-sm text-gray-500 mb-4 min-h-[40px]">
                  {plan.description}
                </div>
                <div className="text-3xl font-bold mb-6">
                  {plan.price === 0
                    ? 'Free'
                    : `$${plan.price}/${plan.priceUnit}`}
                </div>
                <Button
                  className={`w-full mt-2 mb-6 py-2 text-base font-semibold rounded-lg border border-gray-300
                  ${
                    plan.highlight
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }
                `}
                >
                  {plan.buttonText}
                </Button>
              </div>
              {/* Features */}
              <CardFooter className="bg-gray-50 border-t rounded-b-2xl border-gray-200 px-6 py-6 min-h-[140px]">
                <ul className="space-y-2">
                  {plan.features.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-700 text-sm"
                    >
                      <span className="mr-2 text-blue-500">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
