"use client";

interface GenderDistributionProps {
  female: string;
  male: string;
  other: string;
}

const GenderDistribution = ({ female, male, other }: GenderDistributionProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium text-[#FF7B00] mb-4">By gender</h3>
      <div className="flex justify-between items-end space-x-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#FF7B00]">{female}</div>
          <div className="text-xs text-[#FFA652] mt-1">Female</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#FF7B00]">{male}</div>
          <div className="text-xs text-[#FFA652] mt-1">Male</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#FF7B00]">{other}</div>
          <div className="text-xs text-[#FFA652] mt-1">Other</div>
        </div>
      </div>
    </div>
  );
};

export default GenderDistribution;