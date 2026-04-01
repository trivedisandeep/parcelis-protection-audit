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
import { Shield, AlertTriangle, CheckCircle, Info, Send, Loader2, DollarSign, TrendingUp } from "lucide-react";

interface StepFourProps {
  data: AuditFormData;
  onSendAudit: () => void;
  sending: boolean;
  sent: boolean;
}

const severityConfig = {
  high: { border: "border-l-destructive", badge: "bg-destructive/15 text-destructive", label: "High" },
  medium: { border: "border-l-warning", badge: "bg-warning/15 text-warning", label: "Medium" },
  low: { border: "border-l-accent", badge: "bg-accent/15 text-accent", label: "Low" },
};

function getProviderCallout(provider: string): { icon: React.ReactNode; title: string; description: string; type: "warning" | "opportunity" } {
  if (provider === "route") {
    return {
      icon: <TrendingUp className="h-5 w-5 text-accent shrink-0 mt-0.5" />,
      title: "You could be generating substantial revenue here",
      description: "Route's model means you're leaving money on the table. With Parcelis, shipping protection becomes a profit center — merchants typically see 15-25% margins on protection revenue instead of paying commission to a third party.",
      type: "opportunity",
    };
  }
  // All non-Route providers
  return {
    icon: <DollarSign className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "High chances of paying from your own margin",
    description: provider === "none"
      ? "Without any shipping protection, every lost or damaged package is a direct hit to your bottom line. You're absorbing costs that should be covered — or better yet, turned into revenue."
      : provider === "navidium"
        ? "With a self-insured model, every claim eats directly into your margins. You're bearing all the risk with no underwriting safety net — one bad month of claims could wipe out weeks of profit."
        : "Your current provider's model means claim costs and commissions are quietly eroding your margins. Parcelis flips this — turning protection into a revenue stream instead of an expense line.",
    type: "warning",
  };
}

const StepFour = ({ data, onSendAudit, sending, sent }: StepFourProps) => {
  const score = calculateRiskScore(data.currentProvider, data.productCategory);
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const gaps = getProviderGaps(data.currentProvider);
  const overlay = getCategoryOverlay(data.productCategory);
  const providerLabel = PROVIDER_OPTIONS.find((p) => p.id === data.currentProvider)?.label ?? data.currentProvider;
  const callout = getProviderCallout(data.currentProvider);

  const circumference = 283;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Your Audit Results</h2>

      {/* Score Ring */}
      <div className="flex flex-col items-center py-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted) / 0.4)" strokeWidth="8" />
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

      {/* Provider-specific callout */}
      <div className={cn(
        "rounded-xl p-4 border",
        callout.type === "warning"
          ? "bg-destructive/8 border-destructive/25"
          : "bg-accent/8 border-accent/25"
      )}>
        <div className="flex items-start gap-3">
          {callout.icon}
          <div>
            <p className="font-semibold text-sm text-foreground">{callout.title}</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{callout.description}</p>
          </div>
        </div>
      </div>

      {/* Gap Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" /> Protection Gaps Identified
        </h3>
        {gaps.map((gap, i) => {
          const cfg = severityConfig[gap.severity];
          return (
            <div key={i} className={cn("border-l-4 rounded-xl bg-muted/20 p-4", cfg.border)}>
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
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-4">
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
      <div className="rounded-2xl p-6 text-center space-y-3" style={{ background: 'linear-gradient(135deg, hsl(152, 56%, 45% / 0.12), hsl(224, 76%, 52% / 0.08))', border: '1px solid hsl(152, 56%, 45% / 0.25)' }}>
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
          <Button
            onClick={onSendAudit}
            disabled={sending}
            className="min-w-[220px] bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg shadow-accent/20 h-11 px-8 rounded-xl"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {sending ? "Sending..." : "Send me the full audit"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepFour;
