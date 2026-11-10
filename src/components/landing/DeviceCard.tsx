import React from "react";
import { LucideIcon } from "lucide-react";

interface DeviceCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  features: string[];
}

export default function DeviceCard({
  icon: Icon,
  name,
  description,
  features,
}: DeviceCardProps) {
  return (
    <div className="group relative p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00FF99]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative">
        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#00FF99]/30 mx-auto">
          <Icon className="w-8 h-8 text-[#00FF99] transform group-hover:scale-110 transition-transform" />
        </div>
        <h3 className="text-xl font-bold text-center mb-2">{name}</h3>
        <p className="text-gray-400 text-center mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="text-sm text-gray-300 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-[#00FF99] rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
