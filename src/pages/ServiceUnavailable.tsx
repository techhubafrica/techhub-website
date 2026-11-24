import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, RotateCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServiceUnavailable = () => (
  <>
    <Header />
    <main className="relative flex min-h-[75vh] items-center overflow-hidden bg-background px-5 pb-20 pt-36 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto w-full max-w-7xl">
        <p className="eyebrow text-accent">Temporarily unavailable</p>
        <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-[7rem] font-black leading-[0.8] tracking-tight text-foreground sm:text-[10rem]">503<span className="text-accent">.</span></h1>
            <h2 className="mt-8 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">We’ll be back shortly.</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/65">Tech Hub Africa is taking a short break for maintenance. Please try again in a little while.</p>
          </div>
          <div className="flex w-fit flex-wrap gap-3">
            <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
              <RotateCw className="h-4 w-4" /> Try Again
            </button>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-accent hover:text-accent">
              <ArrowLeft className="h-4 w-4" /> Home <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-16 h-px w-full bg-gradient-to-r from-accent/60 via-foreground/10 to-transparent" />
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">Explore · Discover · Build</p>
      </div>
    </main>
    <Footer />
  </>
);

export default ServiceUnavailable;
