import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSiteContent, ImageSection, SiteImage } from "@/data/siteContentStore";
import {
  Lock, Upload, Image as ImageIcon, Trash2, Plus,
  CheckCircle2, Eye, Camera, Calendar,
  ArrowUpRight, Newspaper, LogOut,
  X, Loader2
} from "lucide-react";
import { Link } from "react-router-dom";

/* â”€â”€â”€ Section config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const SECTIONS: {
  id: ImageSection;
  label: string;
  icon: React.ElementType;
  desc: string;
  previewPath: string;
}[] = [
  {
    id: "gallery",
    label: "Photo Gallery",
    icon: Camera,
    desc: "Photos shown in the Gallery page â€” Tech Guru Meetup, events, corporate shots.",
    previewPath: "/gallery",
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    desc: "Event banners and promo images shown on the Events section.",
    previewPath: "/events",
  },
  {
    id: "media",
    label: "Media & Press",
    icon: Newspaper,
    desc: "Press feature images, keynote photos, and media highlights.",
    previewPath: "/media",
  },
];

/* â”€â”€â”€ Valid passcodes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const VALID_CODES = ["tha2026", "doreen2026", "techhubafrica"];

/* â”€â”€â”€ Helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   UPLOAD MODAL
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function UploadModal({
  section,
  onAdd,
  onClose,
}: {
  section: ImageSection;
  onAdd: (img: Omit<SiteImage, "id" | "addedAt">) => void;
  onClose: () => void;
}) {
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const dataUrl = await fileToDataUrl(file);
    setPreview(dataUrl);
    setLoading(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setLoading(true);
    const dataUrl = await fileToDataUrl(file);
    setPreview(dataUrl);
    setLoading(false);
  };

  const activeSrc = tab === "url" ? urlInput : preview;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSrc) return;
    onAdd({
      section,
      src: activeSrc,
      caption: caption || "Untitled",
      date: date || new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
      tag: tag || undefined,
      externalLink: externalLink || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-background rounded-3xl border border-foreground/15 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
          <div>
            <h3 className="font-display font-extrabold text-lg text-foreground">Add Image</h3>
            <p className="text-[11px] text-foreground/55 mt-0.5 capitalize">{section} section</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-foreground/50 hover:text-foreground transition-colors rounded-xl hover:bg-secondary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Source toggle */}
          <div className="flex gap-2 p-1 bg-secondary rounded-xl">
            {(["upload", "url"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  tab === t
                    ? "bg-accent text-accent-foreground shadow"
                    : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {t === "upload" ? "Upload from device" : "Paste image URL"}
              </button>
            ))}
          </div>

          {/* Drop zone */}
          {tab === "upload" && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="relative flex flex-col items-center justify-center gap-3 w-full h-44 rounded-2xl border-2 border-dashed border-accent/40 bg-accent/5 hover:bg-accent/10 cursor-pointer transition-all"
            >
              {loading && <Loader2 className="w-6 h-6 text-accent animate-spin" />}
              {!loading && preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-60"
                />
              )}
              {!loading && !preview && (
                <>
                  <Upload className="w-8 h-8 text-accent" />
                  <div className="text-center">
                    <p className="text-xs font-bold text-accent">Click or drag &amp; drop</p>
                    <p className="text-[11px] text-foreground/50 mt-0.5">JPG, PNG, WebP â€” any size</p>
                  </div>
                </>
              )}
              {preview && !loading && (
                <span className="absolute bottom-2 right-2 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                  Ready âœ“
                </span>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>
          )}

          {/* URL input */}
          {tab === "url" && (
            <div className="space-y-2">
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-foreground/15 bg-secondary text-sm text-foreground focus:outline-none focus:border-accent"
              />
              {urlInput && (
                <img
                  src={urlInput}
                  alt="url preview"
                  className="w-full h-32 object-cover rounded-xl border border-foreground/15"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/60 mb-1">
                Caption / Title *
              </label>
              <input
                type="text"
                required
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Tech Guru Opening Keynote"
                className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/60 mb-1">
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="October 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/60 mb-1">
                Tag (optional)
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Keynote, Award, Panel"
                className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary text-sm text-foreground focus:outline-none focus:border-accent"
              />
            </div>
            {section !== "gallery" && (
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-foreground/60 mb-1">
                  External Link (optional)
                </label>
                <input
                  type="url"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  placeholder="https://event-page.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-foreground/15 bg-secondary text-sm text-foreground focus:outline-none focus:border-accent"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!activeSrc}
            className="w-full py-3.5 rounded-full bg-accent text-accent-foreground font-bold text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        </form>
      </div>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION PANEL
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function SectionPanel({
  sectionId,
  images,
  onRemove,
  onAddClick,
}: {
  sectionId: ImageSection;
  images: SiteImage[];
  onRemove: (id: string) => void;
  onAddClick: () => void;
}) {
  const sec = SECTIONS.find((s) => s.id === sectionId)!;
  const Icon = sec.icon;

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl border border-foreground/12 bg-secondary/40">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-base text-foreground">{sec.label}</h2>
            <p className="text-xs text-foreground/55 mt-0.5">{sec.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={sec.previewPath}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-foreground/20 text-xs font-bold text-foreground/70 hover:text-foreground transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Preview <ArrowUpRight className="w-3 h-3" />
          </Link>
          <button
            onClick={onAddClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Image
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <div
          onClick={onAddClick}
          className="flex flex-col items-center justify-center gap-3 h-36 rounded-2xl border-2 border-dashed border-foreground/15 text-foreground/35 cursor-pointer hover:border-accent/40 hover:text-accent/60 transition-all"
        >
          <ImageIcon className="w-8 h-8" />
          <p className="text-xs font-semibold">No images yet â€” click to add your first</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative rounded-2xl overflow-hidden border border-foreground/12 bg-secondary/30 shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black/10">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {img.tag && (
                <span className="absolute top-2 left-2 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/80 text-accent border border-accent/30 backdrop-blur-sm">
                  {img.tag}
                </span>
              )}
              <button
                onClick={() => {
                  if (confirm(`Remove "${img.caption}"?`)) onRemove(img.id);
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="p-3">
                <p className="text-xs font-semibold text-foreground leading-snug line-clamp-1">{img.caption}</p>
                <p className="text-[10px] text-foreground/50 mt-0.5">{img.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN CMS PAGE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const CMS = () => {
  const { content, addImage, removeImage, bySection } = useSiteContent();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    sessionStorage.getItem("tha_cms_auth") === "true"
  );
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);
  const [activeSection, setActiveSection] = useState<ImageSection>("gallery");
  const [uploadTarget, setUploadTarget] = useState<ImageSection | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  const totalImages = content.images.length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (VALID_CODES.includes(passcode.trim().toLowerCase())) {
      setIsAuthenticated(true);
      sessionStorage.setItem("tha_cms_auth", "true");
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("tha_cms_auth");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const handleAdd = (img: Omit<SiteImage, "id" | "addedAt">) => {
    addImage(img);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
  };

  /* â”€â”€ LOGIN SCREEN â”€â”€ */
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center px-4 pt-28 pb-20">
          <div className="w-full max-w-sm space-y-6 p-8 sm:p-10 rounded-3xl border border-foreground/15 bg-secondary/50 backdrop-blur-xl shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                Tech Hub Africa
              </span>
              <h2 className="font-display font-extrabold text-2xl text-foreground mt-1">
                CEO Content Portal
              </h2>
              <p className="text-xs text-foreground/55 mt-2 leading-relaxed">
                Upload and manage photos for the website â€” no coding required.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter your access key"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError(false);
                }}
                className="w-full px-4 py-3 rounded-xl border border-foreground/20 bg-background text-sm text-foreground text-center focus:outline-none focus:border-accent tracking-widest"
              />
              {authError && (
                <p className="text-[11px] text-red-500 font-semibold">
                  Incorrect access key. Please try again.
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-accent text-accent-foreground font-bold text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-md"
              >
                Enter Dashboard
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* â”€â”€ DASHBOARD â”€â”€ */
  return (
    <>
      <Header />

      {uploadTarget && (
        <UploadModal
          section={uploadTarget}
          onAdd={handleAdd}
          onClose={() => setUploadTarget(null)}
        />
      )}

      <main className="min-h-screen bg-background pt-28 pb-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Top bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-primary text-primary-foreground border border-primary-foreground/15 shadow-xl relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">
                Tech Hub Africa Â· CEO Portal
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-primary-foreground mt-1">
                Content Manager
              </h1>
              <p className="text-xs text-primary-foreground/60 mt-1">
                {totalImages} image{totalImages !== 1 ? "s" : ""} published across the website
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary-foreground/25 text-primary-foreground/70 hover:text-primary-foreground text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
              <button
                onClick={() => setUploadTarget(activeSection)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
              >
                <Upload className="w-3.5 h-3.5" /> Upload Photo
              </button>
            </div>
          </div>

          {/* Saved toast */}
          {savedToast && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Photo added and live on the website!
            </div>
          )}

          {/* Section tabs */}
          <div className="flex gap-2 border-b border-foreground/10 pb-3 overflow-x-auto">
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const count = bySection(sec.id).length;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-foreground/60 hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {sec.label}
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                        isActive
                          ? "bg-accent-foreground/20 text-accent-foreground"
                          : "bg-accent/20 text-accent"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active section */}
          <SectionPanel
            sectionId={activeSection}
            images={bySection(activeSection)}
            onRemove={removeImage}
            onAddClick={() => setUploadTarget(activeSection)}
          />

        </div>
      </main>
      <Footer />
    </>
  );
};

export default CMS;

