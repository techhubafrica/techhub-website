import { useEffect } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EVENTS_URL = "https://events.techhubafrica.org";

const Events = () => {
  useEffect(() => {
    window.location.replace(EVENTS_URL);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Calendar className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold font-display text-foreground mb-3">
            Redirecting to Events
          </h1>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Taking you to the official Tech Hub Africa events portal at{" "}
            <span className="font-semibold text-foreground">events.techhubafrica.org</span>.
          </p>
          <a
            href={EVENTS_URL}
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:brightness-110 transition-all shadow-lg"
          >
            Open Events Portal <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
