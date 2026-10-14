import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* The live events hub, shown in-app through our own origin (see src/hubFrame.ts). */
const Events = () => {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1600);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== location.origin || e.source !== frame.current?.contentWindow) return;
      if (e.data?.type === "hub-height") setHeight(Math.max(600, e.data.height));
      if (e.data?.type === "hub-nav") window.scrollTo({ top: 0 });
    };
    addEventListener("message", onMsg);
    return () => removeEventListener("message", onMsg);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        <iframe
          ref={frame}
          src="/events-hub/"
          title="Tech Hub Africa Events"
          className="block w-full border-0"
          style={{ height }}
          allow="payment; clipboard-write"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Events;
