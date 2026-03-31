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
    <h2 className="text-xl font-bold text-foreground">Business Details</h2>
    <p className="text-sm text-muted-foreground">Help us understand your shipping profile.</p>

    <div className="space-y-4">
      <div>
        <Label>Average Order Value *</Label>
        <Select value={data.aov} onValueChange={(v) => onChange("aov", v)}>
          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select AOV range" /></SelectTrigger>
          <SelectContent>
            {AOV_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.aov && <p className="text-destructive text-xs mt-1">{errors.aov}</p>}
      </div>

      <div>
        <Label>Monthly Shipment Volume *</Label>
        <Select value={data.monthlyVolume} onValueChange={(v) => onChange("monthlyVolume", v)}>
          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select volume range" /></SelectTrigger>
          <SelectContent>
            {VOLUME_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.monthlyVolume && <p className="text-destructive text-xs mt-1">{errors.monthlyVolume}</p>}
      </div>

      <div>
        <Label>Product Category *</Label>
        <Select value={data.productCategory} onValueChange={(v) => onChange("productCategory", v)}>
          <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select category" /></SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.productCategory && <p className="text-destructive text-xs mt-1">{errors.productCategory}</p>}
      </div>

      <div>
        <Label htmlFor="concerns">Specific concerns (optional)</Label>
        <Textarea
          id="concerns"
          placeholder="E.g., high claim rates, customer complaints, cost concerns..."
          value={data.concerns}
          onChange={(e) => onChange("concerns", e.target.value)}
          className="mt-1.5"
        />
      </div>
    </div>
  </div>
);

export default StepThree;
