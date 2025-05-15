"use client";
import ToolCard from "./tool-card";

interface ToolFeature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ToolGridSectionProps {
  tools: {
    title: string;
    description: string;
    features: ToolFeature[];
    bgGradientFrom?: string;
    bgGradientTo?: string;
    buttonText?: string;
    buttonUrl?: string;
  }[];
}

const ToolGridSection: React.FC<ToolGridSectionProps> = ({ tools }) => {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {tools.map((tool, idx) => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </section>
  );
};

export default ToolGridSection;
