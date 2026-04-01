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
      <div className="flex justify-between text-xs font-medium text-muted-foreground mb-3">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="relative">
        <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(224, 76%, 52%), hsl(200, 80%, 55%))',
            }}
          />
        </div>
        {/* Dollar coin — static, with golden glow trail */}
        <div
          ref={coinRef}
          className="absolute -top-3 transition-all duration-700 ease-out"
          style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
        >
          {/* Glow trail behind coin */}
          <div
            className="absolute top-1/2 -translate-y-1/2 right-[60%] h-5 w-16 rounded-full opacity-70 blur-md"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(45, 93%, 47% / 0.5), hsl(45, 93%, 58% / 0.3))',
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 right-[70%] h-3 w-10 rounded-full opacity-40 blur-lg"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(40, 90%, 50% / 0.4))',
            }}
          />
          {/* Coin */}
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 border-2 border-yellow-300/70 flex items-center justify-center shadow-[0_0_16px_4px_hsl(45,93%,47%/0.4),0_0_32px_8px_hsl(45,93%,47%/0.15)]">
            <span className="text-yellow-900 font-extrabold text-sm leading-none select-none">$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
