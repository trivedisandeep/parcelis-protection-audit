import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PROVIDER_OPTIONS, type AuditFormData } from "@/lib/audit-types";
import { Check } from "lucide-react";

interface StepTwoProps {
  data: AuditFormData;
  onChange: (field: keyof AuditFormData, value: string) => void;
  errors: Record<string, string>;
}

const StepTwo = ({ data, onChange, errors }: StepTwoProps) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-foreground">Current Protection</h2>
    <p className="text-sm text-muted-foreground">Select your current shipping protection provider.</p>

    <div className="grid grid-cols-2 gap-3">
      {PROVIDER_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange("currentProvider", opt.id)}
          className={cn(
            "relative flex items-center justify-center rounded-lg border-2 p-4 text-sm font-medium transition-all hover:border-primary/50",
            data.currentProvider === opt.id
              ? "border-primary bg-primary/5 text-foreground"
              : "border-border bg-card text-muted-foreground"
          )}
        >
          {data.currentProvider === opt.id && (
            <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
          )}
          {opt.label}
        </button>
      ))}
    </div>
    {errors.currentProvider && <p className="text-destructive text-xs">{errors.currentProvider}</p>}

    {data.currentProvider === "other" && (
      <div className="pt-2">
        <Label htmlFor="otherProvider">Please specify</Label>
        <Input
          id="otherProvider"
          placeholder="Provider name"
          value={data.otherProvider}
          onChange={(e) => onChange("otherProvider", e.target.value)}
          className="mt-1.5"
        />
      </div>
    )}
  </div>
);

export default StepTwo;
