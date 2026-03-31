import { cn } from "@/lib/utils";
import {
  type AuditFormData,
  calculateRiskScore,
  getScoreColor,
  getScoreLabel,
  getProviderGaps,
  getCategoryOverlay,
  PROVIDER_OPTIONS,
} from "@/lib/audit-types";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, Info, Send, Loader2 } from "lucide-react";

interface StepFourProps {
  data: AuditFormData;
  onSendAudit: () => void;
  sending: boolean;
  sent: boolean;
}

const severityConfig = {
  high: { border: "border-l-destructive", badge: "bg-destructive/10 text-destructive", label: "High" },
  medium: { border: "border-l-warning", badge: "bg-warning/10 text-warning", label: "Medium" },
  low: { border: "border-l-accent", badge: "bg-accent/10 text-accent", label: "Low" },
};

const StepFour = ({ data, onSendAudit, sending, sent }: StepFourProps) => {
  const score = calculateRiskScore(data.currentProvider, data.productCategory);
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const gaps = getProviderGaps(data.currentProvider);
  const overlay = getCategoryOverlay(data.productCategory);
  const providerLabel = PROVIDER_OPTIONS.find((p) => p.id === data.currentProvider)?.label ?? data.currentProvider;

  const circumference = 283;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Your Audit Results</h2>

      {/* Score Ring */}
      <div className="flex flex-col items-center py-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke={color} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              style={{ "--score-offset": offset } as React.CSSProperties}
              className="animate-score-fill"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{score}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
        <span className="mt-3 text-sm font-semibold" style={{ color }}>{label}</span>
        <p className="text-xs text-muted-foreground mt-1">Based on {providerLabel} + your business profile</p>
      </div>

      {/* Gap Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" /> Protection Gaps Identified
        </h3>
        {gaps.map((gap, i) => {
          const cfg = severityConfig[gap.severity];
          return (
            <div key={i} className={cn("border-l-4 rounded-lg bg-card p-4 shadow-sm", cfg.border)}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-sm text-foreground">{gap.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{gap.description}</p>
                </div>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap", cfg.badge)}>
                  {cfg.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Overlay */}
      {overlay && (
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm text-foreground">{overlay.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{overlay.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Box */}
      <div className="rounded-xl bg-accent/10 border border-accent/30 p-6 text-center space-y-3">
        <Shield className="h-8 w-8 text-accent mx-auto" />
        <h3 className="font-bold text-foreground">Ready to close the gaps?</h3>
        <p className="text-sm text-muted-foreground">
          Get a personalized full audit report with actionable recommendations for {data.storeName}.
        </p>
        {sent ? (
          <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm py-2">
            <CheckCircle className="h-5 w-5" /> Audit sent! Check your inbox.
          </div>
        ) : (
          <Button variant="cta" size="lg" onClick={onSendAudit} disabled={sending} className="min-w-[220px]">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {sending ? "Sending..." : "Send me the full audit"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepFour;
