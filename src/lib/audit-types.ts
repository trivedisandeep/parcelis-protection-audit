export interface AuditFormData {
  storeName: string;
  storeUrl: string;
  yourName: string;
  email: string;
  currentProvider: string;
  otherProvider: string;
  aov: string;
  monthlyVolume: string;
  productCategory: string;
  concerns: string;
}

export const INITIAL_FORM_DATA: AuditFormData = {
  storeName: "",
  storeUrl: "",
  yourName: "",
  email: "",
  currentProvider: "",
  otherProvider: "",
  aov: "",
  monthlyVolume: "",
  productCategory: "",
  concerns: "",
};

export const PROVIDER_OPTIONS = [
  { id: "route", label: "Route" },
  { id: "navidium", label: "Navidium" },
  { id: "corso", label: "Corso" },
  { id: "guide", label: "Guide" },
  { id: "redo", label: "Redo" },
  { id: "none", label: "No protection" },
  { id: "other", label: "Other / not sure" },
] as const;

export const AOV_OPTIONS = [
  { value: "under-30", label: "Under $30" },
  { value: "30-60", label: "$30 – $60" },
  { value: "60-100", label: "$60 – $100" },
  { value: "100-200", label: "$100 – $200" },
  { value: "200-plus", label: "$200+" },
];

export const VOLUME_OPTIONS = [
  { value: "under-500", label: "Under 500" },
  { value: "500-2000", label: "500 – 2,000" },
  { value: "2000-5000", label: "2,000 – 5,000" },
  { value: "5000-10000", label: "5,000 – 10,000" },
  { value: "10000-plus", label: "10,000+" },
];

export const CATEGORY_OPTIONS = [
  { value: "food", label: "Food & Perishables" },
  { value: "auto", label: "Automotive Parts" },
  { value: "luxury", label: "Luxury Goods" },
  { value: "electronics", label: "Electronics" },
  { value: "supplements", label: "Supplements / Health" },
  { value: "apparel", label: "Apparel & Fashion" },
  { value: "home", label: "Home & Garden" },
  { value: "beauty", label: "Beauty & Cosmetics" },
  { value: "other", label: "Other" },
];

const PROVIDER_SCORES: Record<string, number> = {
  none: 90,
  navidium: 75,
  corso: 70,
  guide: 70,
  route: 65,
  other: 60,
  redo: 55,
};

const CATEGORY_BONUSES: Record<string, number> = {
  food: 10,
  auto: 8,
  luxury: 8,
  electronics: 5,
  supplements: 5,
};

export function calculateRiskScore(provider: string, category: string): number {
  const base = PROVIDER_SCORES[provider] ?? 60;
  const bonus = CATEGORY_BONUSES[category] ?? 0;
  return Math.min(100, base + bonus);
}

export function getScoreColor(score: number): string {
  if (score >= 75) return "hsl(0, 84%, 60%)";
  if (score >= 50) return "hsl(38, 92%, 50%)";
  return "hsl(134, 55%, 41%)";
}

export function getScoreLabel(score: number): string {
  if (score >= 75) return "High Risk";
  if (score >= 50) return "Moderate Risk";
  return "Low Risk";
}

export interface GapCard {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
}

export function getProviderGaps(provider: string): GapCard[] {
  const gaps: Record<string, GapCard[]> = {
    route: [
      { title: "High merchant cost", description: "Route takes a large commission on each protected order, reducing your margins.", severity: "high" },
      { title: "Slow claims process", description: "Merchants report lengthy claim resolution timelines affecting customer satisfaction.", severity: "medium" },
      { title: "Limited customization", description: "Branding and flow customization options are restricted.", severity: "low" },
    ],
    navidium: [
      { title: "Self-insured risk exposure", description: "You absorb all claim costs yourself with no underwriting backing.", severity: "high" },
      { title: "No carrier integration", description: "Claims data isn't connected to carrier networks for faster resolution.", severity: "high" },
      { title: "Scaling limitations", description: "As order volume grows, self-insurance reserves become harder to manage.", severity: "medium" },
    ],
    corso: [
      { title: "Limited carrier network", description: "Fewer carrier partnerships means less negotiation leverage on your behalf.", severity: "medium" },
      { title: "Basic analytics", description: "Reporting lacks actionable depth for protection optimization.", severity: "medium" },
      { title: "Regional restrictions", description: "Coverage gaps exist for certain international shipping corridors.", severity: "high" },
    ],
    guide: [
      { title: "Newer platform risks", description: "Less market track record compared to established providers.", severity: "medium" },
      { title: "Limited integrations", description: "Fewer platform and carrier integrations available.", severity: "high" },
      { title: "Support response times", description: "Growing pains may impact merchant support quality.", severity: "medium" },
    ],
    redo: [
      { title: "Return-focused model", description: "Redo optimizes for returns, not full shipping protection coverage.", severity: "medium" },
      { title: "Gap in loss/damage claims", description: "Lost and damaged package coverage is not the core strength.", severity: "medium" },
    ],
    none: [
      { title: "Full financial exposure", description: "Every lost, stolen, or damaged package comes out of your bottom line.", severity: "high" },
      { title: "Customer experience risk", description: "No streamlined claims process erodes buyer trust and repeat purchases.", severity: "high" },
      { title: "No data visibility", description: "Without protection analytics, you can't identify shipping vulnerability patterns.", severity: "high" },
    ],
    other: [
      { title: "Unknown coverage gaps", description: "Without clarity on your current provider, hidden risks may be present.", severity: "medium" },
      { title: "Potential over-spending", description: "You may be paying above-market rates without benchmarking.", severity: "medium" },
    ],
  };
  return gaps[provider] ?? gaps.other;
}

export interface CategoryOverlay {
  title: string;
  description: string;
}

export function getCategoryOverlay(category: string): CategoryOverlay | null {
  const overlays: Record<string, CategoryOverlay> = {
    food: { title: "Perishable goods require specialized protection", description: "Temperature-sensitive shipments face 3x higher claim rates. Parcelis offers cold-chain aware coverage with expedited replacements." },
    auto: { title: "Auto parts need heavyweight coverage", description: "Heavy, high-value parts are prone to transit damage. Parcelis provides dimensional-weight optimized protection with carrier accountability." },
    luxury: { title: "Luxury brands demand premium protection", description: "High-value goods are theft targets. Parcelis offers signature-verified delivery protection and discreet packaging coverage." },
    electronics: { title: "Electronics require fragile-item protocols", description: "Sensitive components need impact-aware shipping. Parcelis monitors handling events and provides instant replacement authorization." },
    supplements: { title: "Supplements face regulatory shipping complexity", description: "Health products may have temperature and compliance requirements. Parcelis ensures regulatory-aware protection for supplement shipments." },
  };
  return overlays[category] ?? null;
}
