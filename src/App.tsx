import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";

/* ── Code-split every route ───────────────────────────────────── */
import Index from "./pages/Index"; // keep homepage eager (first paint)
const About      = lazy(() => import("./pages/About"));
const Services   = lazy(() => import("./pages/Services"));
const Events     = lazy(() => import("./pages/Events"));
const Careers    = lazy(() => import("./pages/Careers"));
const CSR        = lazy(() => import("./pages/CSR"));
const Media      = lazy(() => import("./pages/Media"));
const Gallery    = lazy(() => import("./pages/Gallery"));
const TheHub     = lazy(() => import("./pages/TheHub"));
const Metaverse  = lazy(() => import("./pages/Metaverse"));
const CMS        = lazy(() => import("./pages/CMS"));
const NotFound   = lazy(() => import("./pages/NotFound"));

/* Minimal page-transition shell while lazy chunk loads */
/* Cinematic page-transition shell while lazy chunk loads */
const PageShell = () => <Loader />;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageShell />}>
          <Routes>
            <Route path="/"           element={<Index />} />
            <Route path="/about"      element={<About />} />
            <Route path="/services"   element={<Services />} />
            <Route path="/events"     element={<Events />} />
            <Route path="/careers"    element={<Careers />} />
            <Route path="/c/career"   element={<Careers />} />
            <Route path="/internship" element={<Careers />} />
            <Route path="/mentorship" element={<Careers />} />
            <Route path="/csr"        element={<CSR />} />
            <Route path="/media"      element={<Media />} />
            <Route path="/gallery"    element={<Gallery />} />
            <Route path="/thehub"     element={<TheHub />} />
            <Route path="/metaverse" element={<Metaverse />} />
            <Route path="/cms"        element={<CMS />} />
            <Route path="/doreen-cms" element={<CMS />} />
            <Route path="/admin"      element={<CMS />} />
            <Route path="*"           element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
