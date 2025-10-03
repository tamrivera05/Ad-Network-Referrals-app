"use client";

interface DemographicsSectionProps {
  title: string;
  children: React.ReactNode;
}

const DemographicsSection = ({ title, children }: DemographicsSectionProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default DemographicsSection;