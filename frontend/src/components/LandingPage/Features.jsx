import { cn } from "../../lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export default function Features() {
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
    {
      title: "Multi-tenant Architecture",
      description: "You can simply share passwords instead of buying new seats",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "We are available a 100% of the time. Atleast our AI Agents are.",
      icon: <IconHelp />,
    },
    {
      title: "Money back guarantee",
      description:
        "If you donot like EveryAI, we will convince you to like us.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "And everything else",
      description: "I just ran out of copy ideas. Accept my sincere apologies",
      icon: <IconHeart />,
    },
  ];
  return (
    (<div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>)
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    (<div id="features"
      className={cn(
        "flex flex-col lg:border-r font-grotesk  py-10 relative group/feature dark:border-neutral-800 mx-auto",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-purple-600 dark:from-purple-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-purple-600 dark:from-purple-800 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative px-10 text-neutral-100 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative  px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-purple-400 dark:bg-purple-700 group-hover/feature:bg-radial-gradient(circle, rgba(34,193,195,1) 0%, rgba(226,45,253,1) 100%) transition-all duration-200 origin-center" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-neutral-100 dark:text-neutral-300 max-w-xs relative  px-10">
        {description}
      </p>
    </div>)
  );
};
