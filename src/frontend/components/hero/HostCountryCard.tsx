import React from 'react';

interface HostCountryCardProps {
  name: string;
  description: string;
  emoji: string;
}

const HostCountryCard: React.FC<HostCountryCardProps> = ({ name, description, emoji }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-white font-bold text-lg mb-2">{name}</h3>
      <p className="text-[#A0AEC0] text-sm">{description}</p>
    </div>
  );
};

export default HostCountryCard;
