import { useEffect, useRef } from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  const coinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (coinRef.current) {
      coinRef.current.style.left = `${progress}%`;
    }
  }, [progress]);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2.5">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="relative">
        <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(224, 76%, 52%), hsl(200, 80%, 55%))',
            }}
          />
        </div>
        {/* Dollar coin */}
        <div
          ref={coinRef}
          className="absolute -top-2.5 transition-all duration-700 ease-out"
          style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
        >
          <div className="relative w-7 h-7 animate-coin-bounce">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30 border-2 border-yellow-300/60 flex items-center justify-center animate-coin-spin">
              <span className="text-yellow-900 font-extrabold text-xs leading-none">$</span>
            </div>
            {/* Sparkle trail */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-yellow-300/60 animate-ping" />
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-yellow-400/40 animate-ping" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
