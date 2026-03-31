import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AOV_OPTIONS, VOLUME_OPTIONS, CATEGORY_OPTIONS, type AuditFormData } from "@/lib/audit-types";

interface StepThreeProps {
  data: AuditFormData;
  onChange: (field: keyof AuditFormData, value: string) => void;
  errors: Record<string, string>;
}

const StepThree = ({ data, onChange, errors }: StepThreeProps) => (
  <div className="space-y-5">
    <div>
      <h2 className="text-xl font-bold text-foreground">Business Details</h2>
      <p className="text-sm text-muted-foreground mt-1">Help us understand your shipping profile.</p>
    </div>

    <div className="space-y-4">
      <div>
        <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Average Order Value *</Label>
        <Select value={data.aov} onValueChange={(v) => onChange("aov", v)}>
          <SelectTrigger className="mt-1.5 bg-muted/30 border-border/50 text-foreground"><SelectValue placeholder="Select AOV range" /></SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {AOV_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.aov && <p className="text-destructive text-xs mt-1">{errors.aov}</p>}
      </div>

      <div>
        <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Monthly Shipment Volume *</Label>
        <Select value={data.monthlyVolume} onValueChange={(v) => onChange("monthlyVolume", v)}>
          <SelectTrigger className="mt-1.5 bg-muted/30 border-border/50 text-foreground"><SelectValue placeholder="Select volume range" /></SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {VOLUME_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.monthlyVolume && <p className="text-destructive text-xs mt-1">{errors.monthlyVolume}</p>}
      </div>

      <div>
        <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Product Category *</Label>
        <Select value={data.productCategory} onValueChange={(v) => onChange("productCategory", v)}>
          <SelectTrigger className="mt-1.5 bg-muted/30 border-border/50 text-foreground"><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {CATEGORY_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.productCategory && <p className="text-destructive text-xs mt-1">{errors.productCategory}</p>}
      </div>

      <div>
        <Label htmlFor="concerns" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Specific concerns (optional)</Label>
        <Textarea
          id="concerns"
          placeholder="E.g., high claim rates, customer complaints, cost concerns..."
          value={data.concerns}
          onChange={(e) => onChange("concerns", e.target.value)}
          className="mt-1.5 bg-muted/30 border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground/40"
        />
      </div>
    </div>
  </div>
);

export default StepThree;
