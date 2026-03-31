import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AuditFormData } from "@/lib/audit-types";

interface StepOneProps {
  data: AuditFormData;
  onChange: (field: keyof AuditFormData, value: string) => void;
  errors: Record<string, string>;
}

const StepOne = ({ data, onChange, errors }: StepOneProps) => (
  <div className="space-y-5">
    <h2 className="text-xl font-bold text-foreground">Store Details</h2>
    <p className="text-sm text-muted-foreground">Tell us about your store so we can personalize your audit.</p>

    <div className="space-y-4">
      <div>
        <Label htmlFor="storeName">Store Name *</Label>
        <Input id="storeName" placeholder="My Awesome Store" value={data.storeName} onChange={(e) => onChange("storeName", e.target.value)} className="mt-1.5" />
        {errors.storeName && <p className="text-destructive text-xs mt-1">{errors.storeName}</p>}
      </div>
      <div>
        <Label htmlFor="storeUrl">Store URL *</Label>
        <Input id="storeUrl" placeholder="https://mystore.com" value={data.storeUrl} onChange={(e) => onChange("storeUrl", e.target.value)} className="mt-1.5" />
        {errors.storeUrl && <p className="text-destructive text-xs mt-1">{errors.storeUrl}</p>}
      </div>
      <div>
        <Label htmlFor="yourName">Your Name *</Label>
        <Input id="yourName" placeholder="Jane Smith" value={data.yourName} onChange={(e) => onChange("yourName", e.target.value)} className="mt-1.5" />
        {errors.yourName && <p className="text-destructive text-xs mt-1">{errors.yourName}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input id="email" type="email" placeholder="jane@mystore.com" value={data.email} onChange={(e) => onChange("email", e.target.value)} className="mt-1.5" />
        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
      </div>
    </div>
  </div>
);

export default StepOne;
