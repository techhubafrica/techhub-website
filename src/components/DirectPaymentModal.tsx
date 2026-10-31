import React, { useState, useEffect } from "react";
import {
  X,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Download,
  Copy,
  Check
} from "lucide-react";

export interface PaymentServiceItem {
  id: string;
  name: string;
  category: string;
  usdPrice: number;
  ghsPrice: number;
  description: string;
}

export const PAYMENT_SERVICES: PaymentServiceItem[] = [
  {
    id: "techhub-website",
    name: "Techhub Website Development",
    category: "Web & Digital",
    usdPrice: 1200,
    ghsPrice: 18000,
    description: "Bespoke high-performance enterprise website, custom UI/UX design, CMS integration, and speed optimization.",
  },
  {
    id: "vaults-security",
    name: "Enterprise Vaults & Asset Protection",
    category: "Infrastructure",
    usdPrice: 850,
    ghsPrice: 12750,
    description: "Encrypted data vaults, zero-knowledge secrets management, access policies, and digital asset backup systems.",
  },
  {
    id: "smart-work",
    name: "Smart Work & Workflow Automation",
    category: "Productivity",
    usdPrice: 650,
    ghsPrice: 9750,
    description: "Curated efficiency software stack, workflow automation playbooks, and employee productivity onboarding.",
  },
  {
    id: "crm-platform",
    name: "CRM & Corporate Communication Platform",
    category: "Customer Relations",
    usdPrice: 950,
    ghsPrice: 14250,
    description: "Unified client pipeline, customer history, automated multi-channel messaging, and revenue dashboard.",
  },
  {
    id: "hr-tools",
    name: "HR Tools & Talent Systems",
    category: "Human Capital",
    usdPrice: 750,
    ghsPrice: 11250,
    description: "Automated talent onboarding, attendance and leave tracking, digital contracts, and employee records hub.",
  },
  {
    id: "threat-lock",
    name: "Threat Lock Cybersecurity Audit & WAF",
    category: "Cybersecurity",
    usdPrice: 500,
    ghsPrice: 7500,
    description: "Complete vulnerability surface audit, 24/7 AI-driven WAF deployment, and DDoS mitigation setup.",
  },
  {
    id: "hub-desk-pass",
    name: "The Hub East Legon — Dedicated Desk Pass",
    category: "Campus Access",
    usdPrice: 150,
    ghsPrice: 2250,
    description: "Monthly premium access to East Legon campus: gigabit fiber, ergonomic hot desk, and artisanal coffee lounge.",
  },
  {
    id: "custom-invoice",
    name: "Custom Enterprise Deposit / Invoice",
    category: "Custom Billing",
    usdPrice: 300,
    ghsPrice: 4500,
    description: "Direct payment towards a custom Tech Hub Africa statement of work, milestone, or contract invoice.",
  },
];

interface DirectPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const DirectPaymentModal: React.FC<DirectPaymentModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || "techhub-website"
  );
  const [currency, setCurrency] = useState<"USD" | "GHS">("USD");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "momo" | "bank">("momo");
  const [copiedRef, setCopiedRef] = useState(false);

  // Form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [momoNetwork, setMomoNetwork] = useState<"MTN" | "Telecel" | "AirtelTigo">("MTN");
  const [momoNumber, setMomoNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [invoiceRef, setInvoiceRef] = useState("");

  // Processing state
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  if (!isOpen) return null;

  const currentService =
    PAYMENT_SERVICES.find((s) => s.id === selectedServiceId) || PAYMENT_SERVICES[0];

  const rawPrice =
    currentService.id === "custom-invoice" && customAmount
      ? parseFloat(customAmount) || 0
      : currency === "USD"
      ? currentService.usdPrice
      : currentService.ghsPrice;

  const currencySymbol = currency === "USD" ? "$" : "GH₵ ";

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    setTimeout(() => {
      const generatedId = `THA-${Math.floor(100000 + Math.random() * 900000)}-${Date.now()
        .toString()
        .slice(-4)}`;
      setTransactionId(generatedId);
      setStep("success");
    }, 2200);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transactionId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleReset = () => {
    setStep("form");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative z-10 w-full max-w-3xl rounded-3xl bg-background border border-foreground/15 shadow-2xl overflow-hidden my-auto"
        style={{ animation: "scale-in-modal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        {/* Header banner */}
        <div className="bg-primary px-6 sm:px-8 py-5 border-b border-primary-foreground/10 text-primary-foreground relative flex items-center justify-between">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">
                  Secure Checkout
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25">
                  Direct Payment
                </span>
              </div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-primary-foreground leading-tight">
                Tech Hub Africa Direct Payment
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {step === "processing" ? (
            <div className="py-16 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
                <Lock className="w-7 h-7 text-accent absolute inset-0 m-auto" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-foreground">
                  Processing Direct Payment...
                </h3>
                <p className="mt-2 text-sm text-foreground/60 max-w-md mx-auto">
                  Connecting to secure payment gateway. Please approve prompt on your mobile device
                  or await banking clearance.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                Zero-Latency 256-bit Encrypted Transaction
              </div>
            </div>
          ) : step === "success" ? (
            <div className="py-6 sm:py-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
                  Transaction Verified & Confirmed
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mt-1">
                  Payment Successful!
                </h3>
                <p className="mt-2 text-sm text-foreground/65 max-w-lg mx-auto">
                  Thank you, <strong className="text-foreground">{fullName || "Client"}</strong>. Your
                  payment of{" "}
                  <strong className="text-accent">
                    {currencySymbol}
                    {rawPrice.toLocaleString()}
                  </strong>{" "}
                  for <strong>{currentService.name}</strong> has been received and verified.
                </p>
              </div>

              {/* Digital Receipt Card */}
              <div className="max-w-md mx-auto rounded-2xl border border-foreground/15 bg-secondary/50 p-5 text-left text-xs space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-foreground/10">
                  <span className="text-foreground/50 font-bold uppercase tracking-wider text-[10px]">
                    Reference ID
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-foreground">{transactionId}</span>
                    <button
                      onClick={handleCopyRef}
                      className="p-1 text-foreground/60 hover:text-accent"
                      title="Copy Reference ID"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Service / Product</span>
                  <span className="font-semibold text-foreground text-right">{currentService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Payment Method</span>
                  <span className="font-semibold text-foreground uppercase">
                    {paymentMethod === "momo"
                      ? `${momoNetwork} Mobile Money`
                      : paymentMethod === "card"
                      ? "Debit / Credit Card"
                      : "Direct Bank Wire"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Billed To</span>
                  <span className="font-semibold text-foreground">{email || "client@techhubafrica.org"}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-foreground/10 text-sm">
                  <span className="font-bold text-foreground">Amount Paid</span>
                  <span className="font-display font-extrabold text-accent">
                    {currencySymbol}
                    {rawPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-foreground/20 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-secondary transition-colors"
                >
                  <Download className="w-4 h-4" /> Download / Print Receipt
                </button>
                <button
                  onClick={handleReset}
                  className="btn-magnetic w-full sm:w-auto px-8 py-3 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-6">
              {/* Step 1: Select Service */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">
                    1. Select Service / Product
                  </label>
                  {/* Currency Switcher */}
                  <div className="flex items-center gap-1 bg-secondary p-1 rounded-lg border border-foreground/10 text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setCurrency("USD")}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        currency === "USD"
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      USD ($)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency("GHS")}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        currency === "GHS"
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      GHS (GH₵)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
                  {PAYMENT_SERVICES.map((s) => {
                    const isSelected = s.id === selectedServiceId;
                    const priceFormatted =
                      currency === "USD" ? `$${s.usdPrice}` : `GH₵ ${s.ghsPrice.toLocaleString()}`;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedServiceId(s.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? "border-accent bg-accent/10 shadow-sm"
                            : "border-foreground/10 bg-secondary/40 hover:border-foreground/25"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[8.5px] font-black uppercase tracking-wider text-accent block">
                              {s.category}
                            </span>
                            <h4 className="font-display font-bold text-xs text-foreground leading-tight mt-0.5">
                              {s.name}
                            </h4>
                          </div>
                          <span className="font-display font-extrabold text-xs text-foreground shrink-0">
                            {priceFormatted}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedServiceId === "custom-invoice" && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9.5px] font-bold uppercase tracking-wider text-foreground/60 mb-1">
                        Invoice / Statement Reference #
                      </label>
                      <input
                        type="text"
                        placeholder="INV-2026-XXXX"
                        value={invoiceRef}
                        onChange={(e) => setInvoiceRef(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary/60 text-xs text-foreground focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[9.5px] font-bold uppercase tracking-wider text-foreground/60 mb-1">
                        Custom Amount ({currencySymbol.trim()})
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 500"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary/60 text-xs text-foreground focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Customer Details */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/60 mb-2.5">
                  2. Client & Contact Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      required
                      type="text"
                      placeholder="Your Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary/60 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="email"
                      placeholder="Work Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary/60 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number (e.g. +233 / +1) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary/60 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Company / Institution Name (Optional)"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary/60 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/60 mb-2.5">
                  3. Direct Payment Channel
                </label>
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("momo")}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "momo"
                        ? "border-accent bg-accent/10 shadow-sm"
                        : "border-foreground/10 bg-secondary/30 hover:border-foreground/20"
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                      Mobile Money
                    </span>
                    <span className="text-[8px] text-foreground/50">MTN · Telecel · AT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "card"
                        ? "border-accent bg-accent/10 shadow-sm"
                        : "border-foreground/10 bg-secondary/30 hover:border-foreground/20"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                      Card (Visa/MC)
                    </span>
                    <span className="text-[8px] text-foreground/50">Global Debit / Credit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === "bank"
                        ? "border-accent bg-accent/10 shadow-sm"
                        : "border-foreground/10 bg-secondary/30 hover:border-foreground/20"
                    }`}
                  >
                    <Building className="w-5 h-5 text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                      Bank Wire
                    </span>
                    <span className="text-[8px] text-foreground/50">Direct Transfer</span>
                  </button>
                </div>

                {/* Sub-inputs based on payment channel */}
                {paymentMethod === "momo" && (
                  <div className="p-4 rounded-2xl bg-secondary/40 border border-foreground/10 space-y-3">
                    <div className="flex gap-2">
                      {(["MTN", "Telecel", "AirtelTigo"] as const).map((net) => (
                        <button
                          key={net}
                          type="button"
                          onClick={() => setMomoNetwork(net)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                            momoNetwork === net
                              ? "bg-accent text-accent-foreground shadow-sm"
                              : "bg-background border border-foreground/10 text-foreground/70"
                          }`}
                        >
                          {net}
                        </button>
                      ))}
                    </div>
                    <div>
                      <input
                        required
                        type="tel"
                        placeholder="Mobile Money Number (e.g. 055 042 5321)"
                        value={momoNumber}
                        onChange={(e) => setMomoNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-background text-xs text-foreground focus:outline-none focus:border-accent"
                      />
                    </div>
                    <p className="text-[10px] text-foreground/50">
                      An instant authorization prompt will be pushed directly to your phone.
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="p-4 rounded-2xl bg-secondary/40 border border-foreground/10 space-y-3">
                    <div>
                      <input
                        required
                        type="text"
                        placeholder="Card Number (4XXX XXXX XXXX XXXX)"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-background text-xs text-foreground font-mono focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        required
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        maxLength={5}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-background text-xs text-foreground font-mono focus:outline-none focus:border-accent"
                      />
                      <input
                        required
                        type="password"
                        placeholder="CVC / CVV"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        maxLength={4}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-background text-xs text-foreground font-mono focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="p-4 rounded-2xl bg-secondary/40 border border-foreground/10 space-y-2 text-xs text-foreground/75">
                    <p className="font-semibold text-foreground">Official Direct Wire Details:</p>
                    <p>• Account Name: <strong>Tech Hub Africa LLC</strong></p>
                    <p>• Bank: Ecobank Ghana / Standard Chartered / US Wire</p>
                    <p>• Account (Ghana Cedis): 1441002389101</p>
                    <p>• SWIFT / Routing: ECOGHAC / Direct Wire Available</p>
                    <p className="text-[10px] text-foreground/50 pt-1">
                      Click below to generate your unique verified wire tracking reference.
                    </p>
                  </div>
                )}
              </div>

              {/* Total & Action Button */}
              <div className="pt-4 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[9.5px] font-bold uppercase tracking-widest text-foreground/50 block">
                    Total Amount Due
                  </span>
                  <span className="font-display font-extrabold text-2xl text-foreground">
                    {currencySymbol}
                    {rawPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-accent text-accent-foreground font-bold text-xs uppercase tracking-[0.22em] hover:brightness-110 transition-all shadow-lg"
                >
                  Confirm Direct Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectPaymentModal;
