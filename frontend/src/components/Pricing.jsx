import React from 'react';

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
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-white">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingData.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-800 p-8 rounded-lg shadow-lg ${
                plan.title === "Pro" ? "border-2 border-blue-500" : ""
              }`}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">{plan.title}</h3>
              <p className="text-4xl font-bold mb-6 text-blue-500">{plan.price}</p>
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

