import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AuditFormData } from "@/lib/audit-types";
import { Store, Globe, User, Mail } from "lucide-react";

interface StepOneProps {
  data: AuditFormData;
  onChange: (field: keyof AuditFormData, value: string) => void;
  errors: Record<string, string>;
}

const StepOne = ({ data, onChange, errors }: StepOneProps) => (
  <div className="space-y-5">
    <div>
      <h2 className="text-xl font-bold text-foreground">Store Details</h2>
      <p className="text-sm text-muted-foreground mt-1">Tell us about your store so we can personalize your audit.</p>
    </div>

    <div className="space-y-4">
      <div>
        <Label htmlFor="storeName" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Store Name *</Label>
        <div className="relative mt-1.5">
          <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <Input id="storeName" placeholder="My Awesome Store" value={data.storeName} onChange={(e) => onChange("storeName", e.target.value)} className="pl-10 bg-muted/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/40" />
        </div>
        {errors.storeName && <p className="text-destructive text-xs mt-1">{errors.storeName}</p>}
      </div>
      <div>
        <Label htmlFor="storeUrl" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Store URL *</Label>
        <div className="relative mt-1.5">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <Input id="storeUrl" placeholder="https://mystore.com" value={data.storeUrl} onChange={(e) => onChange("storeUrl", e.target.value)} className="pl-10 bg-muted/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/40" />
        </div>
        {errors.storeUrl && <p className="text-destructive text-xs mt-1">{errors.storeUrl}</p>}
      </div>
      <div>
        <Label htmlFor="yourName" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Your Name *</Label>
        <div className="relative mt-1.5">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <Input id="yourName" placeholder="Jane Smith" value={data.yourName} onChange={(e) => onChange("yourName", e.target.value)} className="pl-10 bg-muted/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/40" />
        </div>
        {errors.yourName && <p className="text-destructive text-xs mt-1">{errors.yourName}</p>}
      </div>
      <div>
        <Label htmlFor="email" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Email Address *</Label>
        <div className="relative mt-1.5">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <Input id="email" type="email" placeholder="jane@mystore.com" value={data.email} onChange={(e) => onChange("email", e.target.value)} className="pl-10 bg-muted/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/40" />
        </div>
        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
      </div>
    </div>
  </div>
);

export default StepOne;
