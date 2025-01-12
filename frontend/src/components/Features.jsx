import React from 'react';

const features = [
  {
    title: "Secure Storage",
    description: "Your files are encrypted and stored securely in the cloud.",
    icon: "🔒",
  },
  {
    title: "Easy Sharing",
    description: "Share your files and folders with anyone, anywhere.",
    icon: "🔗",
  },
  {
    title: "Multi-device Sync",
    description: "Access your files from any device, anytime.",
    icon: "🔄",
  },
  {
    title: "Version History",
    description: "Keep track of changes with file version history.",
    icon: "📜",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-4 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-white">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

