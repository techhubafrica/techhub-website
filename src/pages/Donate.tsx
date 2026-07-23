import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import donateHero from "@/assets/donate-hero.jpg";
import handsPlanting from "@/assets/hands-planting.jpg";

const presetAmounts = [10, 20, 30, 40];
const frequencies = ["One-Time Donation", "Monthly Giving", "Annual Contribution"];

const Donate = () => {
  const [selected, setSelected] = useState(10);
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [frequency, setFrequency] = useState(frequencies[0]);

  const total = useCustom ? parseFloat(custom) || 0 : selected;

  const marqueeText = "Your donation matters";

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <img src={donateHero} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-olive-950/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-olive-950/30 via-transparent to-olive-950/50" />
          <h1 className="relative z-10 font-serif text-6xl md:text-8xl text-cream text-center leading-tight">
            Make a<br />difference
          </h1>
        </section>

        {/* Marquee strip */}
        <div className="bg-olive-900 py-3 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="text-sm tracking-widest uppercase text-cream/60 mx-10 font-sans">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>

        {/* Donation section — 50/50 split */}
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left: image with overlaid text */}
          <div className="relative min-h-[400px] lg:min-h-full">
            <img
              src={handsPlanting}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-olive-950/30" />
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <h2 className="font-serif text-4xl md:text-5xl text-cream text-center leading-snug max-w-md">
                Every dollar you donate supports our cause
              </h2>
            </div>
          </div>

          {/* Right: minimal donation form */}
          <div className="bg-tan/30 flex flex-col justify-center px-10 lg:px-16 py-16">
            {/* Amount checkboxes */}
            <div className="flex flex-col gap-3 mb-8">
              {presetAmounts.map((amt) => (
                <label
                  key={amt}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => { setSelected(amt); setUseCustom(false); }}
                >
                  <span
                    className={`w-4 h-4 border-2 border-olive-700 flex items-center justify-center ${
                      !useCustom && selected === amt ? "bg-olive-800" : "bg-transparent"
                    }`}
                  >
                    {!useCustom && selected === amt && (
                      <span className="w-2 h-2 bg-cream block" />
                    )}
                  </span>
                  <span className="font-serif text-lg text-olive-900">${amt.toFixed(2)}</span>
                </label>
              ))}
              <label
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setUseCustom(true)}
              >
                <span
                  className={`w-4 h-4 border-2 border-olive-700 flex items-center justify-center ${
                    useCustom ? "bg-olive-800" : "bg-transparent"
                  }`}
                >
                  {useCustom && <span className="w-2 h-2 bg-cream block" />}
                </span>
                <span className="font-serif text-lg text-olive-900">Custom Amount</span>
              </label>
              {useCustom && (
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  autoFocus
                  className="ml-7 border-b-2 border-olive-400 bg-transparent px-2 py-1 text-lg text-olive-900 focus:border-olive-700 focus:outline-none w-48 font-serif"
                />
              )}
            </div>

            {/* Frequency select */}
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full max-w-xs border-2 border-olive-600 px-4 py-3 text-base mb-6 focus:border-olive-800 focus:outline-none bg-transparent text-olive-900 font-serif"
            >
              {frequencies.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>

            {/* Total */}
            <div className="flex justify-between items-center mb-6 max-w-xs">
              <span className="text-base font-medium text-olive-900">Total</span>
              <span className="text-base font-serif text-olive-900">${total.toFixed(2)}</span>
            </div>

            {/* Donate button */}
            <button className="border-2 border-olive-900 text-olive-900 hover:bg-olive-900 hover:text-cream px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-300 w-fit rounded-full">
              Donate
            </button>
          </div>
        </section>

        {/* Dark spacer */}
        <section className="h-40 bg-olive-950" />
      </main>
      <Footer />
    </>
  );
};

export default Donate;
