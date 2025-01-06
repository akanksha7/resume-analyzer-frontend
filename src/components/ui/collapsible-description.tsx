import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const classNames = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface CollapsibleDescriptionProps {
  description: string;
  isUploadingActive: boolean;
}

const CollapsibleDescription: React.FC<CollapsibleDescriptionProps> = ({
  description,
  isUploadingActive
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [description]);

  // Auto-collapse when upload is active
  useEffect(() => {
    if (isUploadingActive) {
      setIsExpanded(false);
    }
  }, [isUploadingActive]);

  return (
    <div className="relative bg-muted/30 rounded-lg">
      <div
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : '8rem',
        }}
        className="transition-all duration-300 ease-in-out overflow-hidden p-4"
      >
        <div 
          ref={contentRef}
          className="text-muted-foreground whitespace-pre-wrap"
        >
          {description}
        </div>
      </div>
      
      {/* Gradient overlay when collapsed */}
      {!isExpanded && (
        <div 
          className="absolute bottom-12 left-0 right-0 h-16 bg-gradient-to-t from-muted/30 via-muted/30 to-transparent"
        />
      )}
      
      <div className="flex justify-center border-t border-border/10">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show More
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CollapsibleDescription;