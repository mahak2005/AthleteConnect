"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Access basic features to get started, ideal for new athletes.",
    features: [
      "Access to basic training resources",
      "Join the athlete community",
      "Track personal progress",
      "Limited sponsor visibility",
    ],
    cta: "Get Started for Free",
    popular: false,
  },
  {
    name: "Starter",
    price: { monthly: 15, yearly: 12 },
    description: "For aspiring athletes who want to step up their game.",
    features: [
      "Advanced training resources",
      "Personalized workout plans",
      "Sponsor matchmaking",
      "Basic analytics dashboard",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Premium",
    price: { monthly: 50, yearly: 40 },
    description: "For committed athletes seeking professional-level support.",
    features: [
      "Exclusive sponsorship opportunities",
      "Premium coaching and training resources",
      "Advanced performance analytics",
      "Priority community access",
    ],
    cta: "Get Premium",
    popular: false,
  },
  {
    name: "Team",
    price: { monthly: 120, yearly: 96 },
    description: "For teams of athletes looking to collaborate, manage progress, and access team resources.",
    features: [
      "Multiple team members management",
      "Team performance analytics",
      "Shared workout plans and resources",
      "Exclusive team sponsorship deals",
      "Customizable team goals and progress tracking",
      "Priority access to team coaching sessions",
    ],
    cta: "Get Team",
    popular: false,
  },
]

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-8 bg-gradient-to-b from-teal-500 to-teal-400 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-sm font-medium text-slate-600 mb-2"></div>
          <h1 className="text-4xl font-bold text-white mb-8">Flexible Pricing, built for growth</h1>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsYearly(false)}
              className={`text-sm font-medium ${!isYearly ? "text-white-600" : "text-slate-600"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`text-sm font-medium ${isYearly ? "text-white-600" : "text-slate-600"}`}
            >
              Yearly
            </button>
            {isYearly && (
              <span className="inline-block bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                Save 20%
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-lg border p-6 bg-white ${plan.popular ? "border-teal-200 shadow-lg" : "border-slate-200"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                <span className="text-slate-600">/month</span>
              </div>
              <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                {plan.cta}
              </Button>
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-teal-500" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
