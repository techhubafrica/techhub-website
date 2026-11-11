import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ArrowUpRight, CheckCircle2, GraduationCap, HandHeart, Users, X } from "lucide-react";
import Marquee from "@/components/Marquee";
import { heroCelebration } from "@/assets/photos";
import { submitWebsiteForm, websiteApiError } from "@/lib/techhubApi";

const initiatives = [
  "Provide scholarships and mentorship opportunities to underrepresented groups in tech.",
  "Organize events and workshops that promote diversity and inclusion in the tech industry.",
  "Partner with organizations that support diversity and inclusion in tech.",
];

const benefits = [
  "Enhanced brand reputation through association with a socially responsible organization.",
  "Opportunities for employee engagement and volunteerism.",
  "Access to a diverse and inclusive community of tech professionals.",
  "Recognition on our website and social media channels as a CSR partner.",
];

const packages = [
  "Event sponsorship",
  "Scholarship donations",
  "Mentorship program participation",
  "Partnerships with diversity and inclusion organizations",
];

const CSR = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [submissionReference, setSubmissionReference] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setSubmitting(true); setFormError("");
    const payload = new FormData(e.currentTarget);
    payload.set("website_url", ""); payload.set("consent_version", "2026-11");
    try {
      const result = await submitWebsiteForm("partnership-inquiries", payload);
      setSubmissionReference((result.data as { reference?: string })?.reference || ""); setSubmitted(true);
    } catch (error) { setFormError(websiteApiError(error)); }
    finally { setSubmitting(false); }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSubmitted(false);
    setFormError(""); setSubmissionReference("");
  };

  return (
    <>
      <Header />
      <PageHero
        tag="Community Impact"
        title={<>Corporate Social <span className="italic font-light text-accent">Responsibility.</span></>}
        body="We are committed to giving back to the community and promoting diversity and inclusion in the tech industry."
        ghost="IMPACT"
      />

      <Marquee text="Opportunity · Diversity · Inclusion · A stronger technology community" />

      <main className="page-entry bg-background overflow-hidden">
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Our Commitment</span>
              <h2 className="font-display font-extrabold text-foreground text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] mt-4 mb-6">
                Making technology more <span className="italic font-light text-accent">inclusive.</span>
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-8">
                We work to widen access to opportunity in technology through practical support,
                community programs and partnerships.
              </p>
              <ul className="space-y-4">
                {initiatives.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed">
                    <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-3xl overflow-hidden min-h-[320px] lg:min-h-[440px] bg-primary">
              <img src={heroCelebration} alt="Technology community celebrating together" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-primary-foreground">
                <HandHeart className="w-9 h-9 text-accent mb-4" />
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold mb-3">You can support the mission.</h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-lg mb-6">
                  Sponsoring our programs helps build a more diverse and inclusive technology community.
                </p>
                <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition">
                  Apply to Partner <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">Partner with us</span>
              <h2 className="font-display font-extrabold text-foreground text-3xl sm:text-4xl lg:text-5xl tracking-tight mt-4">CSR Benefits &amp; Package</h2>
              <p className="text-foreground/65 leading-relaxed mt-4">
                We offer a range of ways to support our work, from event sponsorship and scholarships to mentorship and community partnerships.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <article className="rounded-3xl bg-background border border-foreground/10 p-7 sm:p-9">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6"><Users className="w-6 h-6" /></div>
                <h3 className="font-display font-extrabold text-2xl text-foreground mb-5">CSR Benefits</h3>
                <ul className="space-y-4">
                  {benefits.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/70"><CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />{item}</li>)}
                </ul>
              </article>
              <article className="rounded-3xl bg-primary text-primary-foreground p-7 sm:p-9">
                <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 text-accent flex items-center justify-center mb-6"><GraduationCap className="w-6 h-6" /></div>
                <h3 className="font-display font-extrabold text-2xl mb-5">CSR Package</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed mb-5">Choose a way to contribute that aligns with your organization’s goals:</p>
                <ul className="space-y-4">
                  {packages.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-primary-foreground/80"><CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />{item}</li>)}
                </ul>
                <button onClick={() => setModalOpen(true)} className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:text-primary-foreground transition-colors">
                  Fill CSR Form <ArrowUpRight className="w-4 h-4" />
                </button>
              </article>
            </div>
          </div>
        </section>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto">
          <button aria-label="Close CSR form" className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(10px)" }} onClick={closeModal} />
          <div className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-auto">
            <div className="bg-primary px-7 sm:px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground">
              <button onClick={closeModal} aria-label="Close" className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground"><X className="w-4 h-4" /></button>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">Corporate Social Responsibility</p>
              <h3 className="font-display font-extrabold text-2xl">CSR Partnership Form</h3>
            </div>
            <div className="bg-background px-7 sm:px-8 py-7 max-h-[75vh] overflow-y-auto">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h4 className="font-display font-extrabold text-xl text-foreground">Thank you for your interest.</h4>
                  <p className="mt-2 text-sm text-foreground/60">Your inquiry has been sent to our partnerships team.</p>
                  {submissionReference && <p className="mt-3 text-xs font-semibold text-accent">Reference: {submissionReference}</p>}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block text-xs font-bold text-foreground/70">Organization Name *<input name="organization_name" required maxLength={150} className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-secondary/40 px-4 py-3 text-sm" /></label>
                  <label className="block text-xs font-bold text-foreground/70">Contact Name *<input name="contact_name" required maxLength={120} className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-secondary/40 px-4 py-3 text-sm" /></label>
                  <label className="block text-xs font-bold text-foreground/70">Mission &amp; Vision<textarea name="mission_vision" rows={3} maxLength={3000} className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-secondary/40 px-4 py-3 text-sm" /></label>
                  <label className="block text-xs font-bold text-foreground/70">Type of Sponsorship *<select name="sponsorship_type" required defaultValue="" className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-secondary/40 px-4 py-3 text-sm"><option value="" disabled>Select a sponsorship type</option><option value="event">Event sponsorship</option><option value="grant">Scholarship donations</option><option value="other">Mentorship program participation</option><option value="csr">Diversity and inclusion partnership</option><option value="equipment">Equipment</option></select></label>
                  <label className="block text-xs font-bold text-foreground/70">Who will benefit? *<textarea name="beneficiaries" required rows={2} maxLength={3000} className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-secondary/40 px-4 py-3 text-sm" /></label>
                  <label className="block text-xs font-bold text-foreground/70">Why should you be considered? *<textarea name="reason_for_consideration" required rows={2} maxLength={3000} className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-secondary/40 px-4 py-3 text-sm" /></label>
                  <label className="block text-xs font-bold text-foreground/70">What are the benefits to Tech Hub Africa? *<textarea name="benefit_to_techhub" required rows={2} maxLength={3000} className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-secondary/40 px-4 py-3 text-sm" /></label>
                  <label className="block text-xs font-bold text-foreground/70">Project proposal (optional)<input name="proposal_document" type="file" accept=".pdf,.doc,.docx" className="mt-1.5 block w-full text-sm text-foreground/60" /></label>
                  <label className="block text-xs font-bold text-foreground/70">501(c)(3) or nonprofit documents<input name="tax_exempt_document" type="file" accept=".pdf,.doc,.docx" className="mt-1.5 block w-full text-sm text-foreground/60" /></label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block text-xs font-bold text-foreground/70">Email Address *<input name="email" required type="email" maxLength={150} className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-secondary/40 px-4 py-3 text-sm" /></label>
                    <label className="block text-xs font-bold text-foreground/70">Phone *<input name="phone" required type="tel" maxLength={30} className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-secondary/40 px-4 py-3 text-sm" /></label>
                  </div>
                  <label className="flex items-start gap-3 text-xs text-foreground/65"><input name="consent" required type="checkbox" value="1" className="mt-0.5 accent-accent" /><span>Yes, I agree with the privacy policy and terms and conditions.</span></label>
                  <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}
                  <button disabled={submitting} type="submit" className="w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-60">{submitting ? "Submitting…" : "Submit Request"}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CSR;
