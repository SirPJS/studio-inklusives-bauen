import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableContentProps {
  trigger: string;
  children: React.ReactNode;
  className?: string;
}

const ExpandableContent = ({ trigger, children, className = "" }: ExpandableContentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-link body-medium inline-flex items-center justify-center space-x-1"
      >
        <span>{trigger}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      <div className={`reveal-content ${isOpen ? 'open' : 'closed'}`}>
        <div className="pt-8 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpandableContent;