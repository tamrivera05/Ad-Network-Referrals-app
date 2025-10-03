"use client";

interface AnalyticsBarProps {
  label: string;
  percentage: string;
  value: number;
}

const AnalyticsBar = ({ label, percentage, value }: AnalyticsBarProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium text-[#FF7B00]">{percentage}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div 
          className="bg-[#FF7B00] h-2 rounded-full" 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnalyticsBar;