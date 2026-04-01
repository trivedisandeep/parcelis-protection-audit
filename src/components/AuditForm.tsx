import { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import StepThree from "@/components/StepThree";
import StepFour from "@/components/StepFour";
import {
  INITIAL_FORM_DATA,
  type AuditFormData,
  calculateRiskScore,
  getScoreLabel,
  PROVIDER_OPTIONS,
  AOV_OPTIONS,
  VOLUME_OPTIONS,
  CATEGORY_OPTIONS,
} from "@/lib/audit-types";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";
import { toast } from "sonner";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_yvtksoy";
const EMAILJS_TEMPLATE_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFICATION || "template_zcfafgp";
const EMAILJS_TEMPLATE_MERCHANT = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION || "template_ifv205u";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "--xOHp56JyrTAt2Vj";

const AuditForm = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AuditFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = useCallback((field: keyof AuditFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!data.storeName.trim()) errs.storeName = "Required";
      if (!data.storeUrl.trim()) errs.storeUrl = "Required";
      if (!data.yourName.trim()) errs.yourName = "Required";
      if (!data.email.trim()) errs.email = "Required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Invalid email format";
    } else if (step === 2) {
      if (!data.currentProvider) errs.currentProvider = "Please select an option";
    } else if (step === 3) {
      if (!data.aov) errs.aov = "Required";
      if (!data.monthlyVolume) errs.monthlyVolume = "Required";
      if (!data.productCategory) errs.productCategory = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validate()) setStep((s) => Math.min(s + 1, 4));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const sendAudit = async () => {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_PUBLIC_KEY) {
      toast.error("EmailJS is not configured.");
      return;
    }
    setSending(true);
    const score = calculateRiskScore(data.currentProvider, data.productCategory);
    const providerLabel = PROVIDER_OPTIONS.find((p) => p.id === data.currentProvider)?.label ?? data.currentProvider;
    const aovLabel = AOV_OPTIONS.find((o) => o.value === data.aov)?.label ?? data.aov;
    const volumeLabel = VOLUME_OPTIONS.find((o) => o.value === data.monthlyVolume)?.label ?? data.monthlyVolume;
    const categoryLabel = CATEGORY_OPTIONS.find((o) => o.value === data.productCategory)?.label ?? data.productCategory;
    const timestamp = new Date().toISOString();

    const adminParams = {
      to_email: "sandeep.t@myparcelis.com",
      store_name: data.storeName,
      store_url: data.storeUrl,
      contact_name: data.yourName,
      contact_email: data.email,
      current_provider: providerLabel,
      other_provider: data.otherProvider,
      aov: aovLabel,
      monthly_volume: volumeLabel,
      product_category: categoryLabel,
      concerns: data.concerns || "None",
      risk_score: `${score}/100 (${getScoreLabel(score)})`,
      timestamp,
    };

    const merchantParams = {
      to_email: data.email,
      contact_name: data.yourName,
      store_name: data.storeName,
      risk_score: `${score}/100`,
    };

    try {
      await Promise.all([
        EMAILJS_TEMPLATE_ADMIN && emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, adminParams, EMAILJS_PUBLIC_KEY),
        EMAILJS_TEMPLATE_MERCHANT && emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_MERCHANT, merchantParams, EMAILJS_PUBLIC_KEY),
      ]);
      setSent(true);
      toast.success("Audit report sent successfully!");
    } catch {
      toast.error("Failed to send email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-[580px] mx-auto px-4 py-12">
      {/* Hero header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-primary">Free Audit Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text leading-tight">
          Shipping Protection Audit
        </h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
          Find gaps in your current protection in under 2 minutes.
        </p>
      </div>

      <ProgressBar currentStep={step} totalSteps={4} />

      <div className="glass-card-solid rounded-2xl glow-primary">
        <div className="p-6 sm:p-8">
          <div key={step} className="animate-slide-in-right">
            {step === 1 && <StepOne data={data} onChange={onChange} errors={errors} />}
            {step === 2 && <StepTwo data={data} onChange={onChange} errors={errors} />}
            {step === 3 && <StepThree data={data} onChange={onChange} errors={errors} />}
            {step === 4 && <StepFour data={data} onSendAudit={sendAudit} sending={sending} sent={sent} />}
          </div>

          {step < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-border/20">
              <Button variant="ghost" onClick={prev} disabled={step === 1} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              <Button onClick={next} className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
          {step === 4 && !sent && (
            <div className="mt-6 pt-4 border-t border-border/20">
              <Button variant="ghost" onClick={prev} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Trust badge */}
      <div className="text-center mt-6">
        <p className="text-xs text-muted-foreground/50">Trusted by 10,000+ Shopify merchants worldwide</p>
      </div>
    </div>
  );
};

export default AuditForm;
