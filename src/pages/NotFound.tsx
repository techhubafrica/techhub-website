import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="relative flex min-h-[75vh] items-center overflow-hidden bg-background px-5 pb-20 pt-36 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="eyebrow text-accent">Page not found</p>
          <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-[7rem] font-black leading-[0.8] tracking-tight text-foreground sm:text-[10rem]">404<span className="text-accent">.</span></h1>
              <h2 className="mt-8 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">This page took a wrong turn.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/65">The link may be outdated, or the page may have moved. Let’s get you back to Tech Hub Africa.</p>
            </div>
            <Link to="/" className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to Home <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-16 h-px w-full bg-gradient-to-r from-accent/60 via-foreground/10 to-transparent" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">Explore · Discover · Build</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
