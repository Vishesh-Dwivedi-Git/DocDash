import React from 'react';
import Button from '../design/Button';

const pricingData = [
  {
    title: "Basic",
    price: "$9.99",
    features: ["10GB Storage", "File Sharing", "Mobile Access"],
    cta: "Get Started",
  },
  {
    title: "Pro",
    price: "$19.99",
    features: ["100GB Storage", "Advanced Sharing", "Version History"],
    cta: "Upgrade to Pro",
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: ["Unlimited Storage", "Admin Controls", "24/7 Support"],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-black bg-opacity-70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-grotesk">
        {/* Section Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-12 text-white-500">
          Pricing Plans
        </h2>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Separator Lines */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <div className="hidden md:block absolute top-0 bottom-0 left-1/3 border-r border-white"></div>
            <div className="hidden md:block absolute top-0 bottom-0 left-2/3 border-r border-white"></div>
          </div>

          {pricingData.map((plan, index) => (
            <div
              key={index}
              className="p-8 bg-transparent text-center transition-transform transform hover:scale-105 relative z-10"
            >
              {/* Plan Title */}
              <h3 className="text-2xl font-bold mb-4 text-white">{plan.title}</h3>

              {/* Plan Price */}
              <p className="text-4xl font-bold mb-6 text-white">{plan.price}</p>

              {/* Plan Features */}
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center justify-center text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Call-to-Action Button */}
              <Button className="w-full text-white font-bold py-2 px-4 rounded transition duration-300">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
