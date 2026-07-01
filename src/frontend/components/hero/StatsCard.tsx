import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  number: number;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, number, label }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
      <Icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
      <div className="text-4xl font-bold text-[#D4AF37] mb-2">{number}</div>
      <div className="text-[#A0AEC0] text-sm uppercase tracking-wide">{label}</div>
    </div>
  );
};

export default StatsCard;
