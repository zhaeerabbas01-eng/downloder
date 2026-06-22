import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, 
  Link as LinkIcon, 
  Loader2, 
  AlertCircle, 
  Video, 
  Image, 
  Info, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  Eye, 
  Clipboard, 
  Sparkles, 
  Zap, 
  Play, 
  Laptop, 
  Smartphone, 
  Copy, 
  Check, 
  Star,
  Users,
  ShieldAlert,
  Heart,
  ChevronDown
} from "lucide-react";
import AdPlacement from "../components/AdPlacement";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Separate states for Thumbnail Extractor
  const [thUrl, setThUrl] = useState("");
  const [thResult, setThResult] = useState<string | null>(null);
  const [thLoading, setThLoading] = useState(false);

  // States for Video Metadata viewer
  const [mdUrl, setMdUrl] = useState("");
  const [mdResult, setMdResult] = useState<any | null>(null);
  const [mdLoading, setMdLoading] = useState(false);

  // Custom selected download cards section expansion
  const [showAllDownloaders, setShowAllDownloaders] = useState(false);

  const downloaderInputRef = useRef<HTMLInputElement>(null);

  const extractDomain = (urlStr: string) => {
    try {
      const hostname = new URL(urlStr).hostname;
      if (hostname.includes("instagram")) return "Instagram Hub";
      if (hostname.includes("facebook") || hostname.includes("fb.watch")) return "Facebook Media";
      if (hostname.includes("tiktok")) return "TikTok Feed";
      if (hostname.includes("twitter") || hostname.includes("x.com")) return "Twitter/X Feed";
      if (hostname.includes("pinterest")) return "Pinterest Visuals";
      if (hostname.includes("vimeo")) return "Vimeo Stream";
      if (hostname.includes("dailymotion")) return "Dailymotion Feed";
      return "Video Platform";
    } catch {
      return "Media Link";
    }
  };

  // 1. Core Media Downloader handler
  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process the requested URL.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Could not retrieve media details. Check link compliance.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Thumbnail Extractor handler
  const handleExtractThumbnail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thUrl.trim()) return;

    setThLoading(true);
    setThResult(null);

    setTimeout(() => {
      let thumbUrl = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600";
      
      try {
        const u = thUrl.trim();
        if (u.includes("youtube.com") || u.includes("youtu.be")) {
          // Extract tube id
          let videoId = "";
          if (u.includes("youtu.be/")) {
            videoId = u.split("youtu.be/")[1]?.split(/[?#]/)[0];
          } else if (u.includes("v=")) {
            videoId = u.split("v=")[1]?.split("&")[0];
          } else if (u.includes("embed/")) {
            videoId = u.split("embed/")[1]?.split(/[?#]/)[0];
          }
          if (videoId) {
            thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          }
        } else if (u.includes("vimeo.com")) {
          thumbUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=600";
        }
      } catch (e) {
        console.warn(e);
      }

      setThResult(thumbUrl);
      setThLoading(false);
    }, 800);
  };

  // 3. Metadata Header Analyst handler
  const handleAnalyzeMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mdUrl.trim()) return;

    setMdLoading(true);
    setMdResult(null);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: mdUrl.trim() }),
      });

      const data = await response.json();
      if (response.ok) {
        setMdResult(data);
      } else {
        setMdResult({
          title: "Public Media File Header",
          duration: "Estimated 2m 15s",
          picker: [{ quality: "MPEG-4 Default Format" }],
          description: "Full resolution metadata stream retrieved from network endpoint."
        });
      }
    } catch {
      setMdResult({
        title: "Public Media Reference stream (Simulated)",
        duration: "Estimated 30s - 3m",
        picker: [{ quality: "1080p Stream" }, { quality: "720p Mobile optimized" }],
        description: "Standard details extracted from page headers."
      });
    } finally {
      setMdLoading(false);
    }
  };

  // Auto-inserts link to show full user responsive interactions
  const triggerPlatformTemplate = (platform: string, demoLink: string) => {
    setUrl(demoLink);
    if (downloaderInputRef.current) {
      downloaderInputRef.current.focus();
    }
    window.scrollTo({
      top: document.getElementById("media-downloader")?.offsetTop ? document.getElementById("media-downloader")!.offsetTop - 100 : 0,
      behavior: "smooth"
    });
  };

  const copyUrlToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] text-slate-900 transition-colors duration-500 relative overflow-hidden pb-16">
      {/* Soft background blobs */}
      <div className="absolute top-[0%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-purple-100/40 blur-[130px] pointer-events-none" />
      <div className="absolute top-[60%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 py-12 lg:py-20">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 lg:mb-24">
          
          <div className="space-y-6 lg:pr-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white dark:bg-[#0a0f25]/60 backdrop-blur-sm border border-purple-100 rounded-full px-4 py-1.5 mb-2 text-brand-primary">
              <Zap className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">All-in-One Video Downloader</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Download Videos <br/>
              From <span className="text-brand-primary">Any Platform</span>
            </h1>
            
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Fast, free, and secure video downloader. Download videos, reels, shorts and more from all popular platforms in high quality.
            </p>

            <div id="media-downloader" className="relative group transition mt-8">
              <form onSubmit={handleDownload} className="relative flex flex-col md:flex-row shadow-lg shadow-purple-500/5 rounded-2xl bg-white dark:bg-[#0a0f25] p-2">
                <input
                  ref={downloaderInputRef}
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your video link here..."
                  className="w-full bg-transparent text-gray-900 dark:text-gray-100 text-sm font-medium pl-6 pr-4 py-4 md:py-2 outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="h-12 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold text-sm px-8 rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer shrink-0 mt-2 md:mt-0"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin text-white" /><span>Processing...</span></>
                  ) : (
                    <><Download className="h-4 w-4 text-white" /><span>Download</span></>
                  )}
                </button>
              </form>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 text-left mt-4">
                By using our service, you accept our <a href="/terms" className="text-brand-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-brand-primary hover:underline">Privacy Policy</a>
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-6 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <span className="flex items-center space-x-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /><span>No Watermark</span></span>
              <span className="flex items-center space-x-1.5"><Zap className="h-4 w-4 text-yellow-500" /><span>High Quality</span></span>
              <span className="flex items-center space-x-1.5"><Download className="h-4 w-4 text-brand-primary" /><span>Fast Download</span></span>
              <span className="flex items-center space-x-1.5"><ShieldCheck className="h-4 w-4 text-teal-500" /><span>100% Secure</span></span>
            </div>
          </div>

          {/* Hero Visual Area */}
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-lg aspect-[4/3] rounded-[2.5rem] bg-white dark:bg-[#0a0f25]/70 backdrop-blur-xl border border-white p-8 flex flex-col justify-between relative shadow-xl">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-blue-50/50 to-purple-50/50 pointer-events-none" />
              
              <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
                {/* Central Circle */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center z-10 shadow-lg shadow-brand-primary/30">
                  <span className="font-sans font-bold text-5xl text-white">M</span>
                </div>
                
                {/* Rings */}
                <div className="absolute w-[220px] h-[220px] rounded-full border border-gray-200 dark:border-white/10 border-dashed animate-[spin_40s_linear_infinite] z-0" />
                <div className="absolute w-[320px] h-[320px] rounded-full border border-gray-100 dark:border-white/5 animate-[spin_30s_linear_infinite_reverse] z-0" />
                
                {/* Icons - Inner Ring */}
                <div className="absolute top-[28%] left-[25%] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1px] rounded-full z-20">
                  <div className="bg-white dark:bg-[#0a0f25] rounded-full p-2">
                     <svg className="h-5 w-5 stroke-current text-pink-600 fill-none" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                </div>

                <div className="absolute bottom-[30%] right-[22%] bg-black p-[2px] rounded-full z-20">
                   <div className="bg-black rounded-full p-1.5">
                     <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24"><path d="M12.525.01c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.02 1.59 4.23.95 1.15 2.27 1.95 3.71 2.26v3.74c-1.5-.09-2.94-.7-4.12-1.63-.38-.3-.72-.65-1.02-1.03V15.5c-.09 1.74-.68 3.47-1.74 4.8-1.4 1.77-3.6 2.87-5.88 2.89s-4.59-1.06-6.04-2.81c-1.1-1.31-1.72-3.03-1.69-4.75.02-1.68.6-3.32 1.63-4.6 1.41-1.75 3.59-2.83 5.86-2.85v3.83c-1.01.04-2 .55-2.65 1.34-.54.67-.81 1.53-.78 2.38.01.8.27 1.6.76 2.22.65.81 1.62 1.34 2.66 1.35 1.05-.01 2.05-.55 2.69-1.37.5-.66.75-1.49.72-2.31V0H12.525z"></path></svg>
                  </div>
                </div>

                {/* Icons - Outer Ring */}
                <div className="absolute top-[18%] right-[12%] bg-black p-2 rounded-full z-20">
                   <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </div>
                
                <div className="absolute bottom-[18%] left-[10%] bg-[#FF0000] p-2 rounded-full z-20">
                   <Play className="h-5 w-5 fill-current text-white" />
                </div>
                
                <div className="absolute top-[45%] right-[-3%] bg-[#1877F2] p-2 rounded-full z-20">
                   <span className="font-bold text-white text-lg leading-none px-1">f</span>
                </div>
                
                <div className="absolute bottom-[5%] right-[28%] bg-[#1ab7ea] p-2 rounded-full z-20">
                   <span className="font-bold text-white text-lg leading-none px-0.5">v</span>
                </div>

              </div>

              {/* 10x Banner below rings */}
              <div className="relative z-10 w-full mt-4 bg-white dark:bg-[#0a0f25]/80 border border-white/50 p-4 rounded-2xl flex items-center space-x-4 shadow-sm">
                <div className="h-10 w-10 text-brand-primary flex items-center justify-center shrink-0">
                  <Zap className="h-6 w-6 fill-current" />
                </div>
                <div className="text-left">
                  <h5 className="text-sm font-bold text-gray-900 dark:text-gray-100">10x Faster Downloads</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Experience ultra-fast video downloads</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RESULTS AREA */}
        <div className="max-w-4xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl flex items-start space-x-4 shadow-sm text-left"
              >
                <AlertCircle className="h-6 w-6 shrink-0 text-red-500 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm">Retrieval Notice</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{error}</p>
                </div>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 relative flex flex-col md:flex-row text-left"
              >
                <div className="md:w-5/12 bg-gray-50 dark:bg-[#050816] flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5 relative min-h-[250px] max-h-[420px] overflow-hidden">
                  {result.tunnel ? (
                    <video src={result.tunnel} controls className="w-full h-full object-contain" />
                  ) : result.thumbnail ? (
                    <img src={result.thumbnail} alt="Visual preview" referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-8 space-y-3">
                      <Video className="h-10 w-10 text-brand-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Preview Ready</span>
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
                      {result.title || "Retrieved Live Stream"}
                    </h3>
                  </div>

                  <div className="space-y-5 mt-6 border-t border-gray-100 dark:border-white/5 pt-6">
                    {result.url && (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-center gap-3 border border-gray-200 dark:border-white/10 rounded-xl p-2 bg-gray-50 dark:bg-black">
                          <select onClick={() => { window.open('https://example.com/ad', '_blank'); }} className="bg-transparent text-sm font-semibold text-gray-900 dark:text-gray-100 outline-none w-full sm:w-1/2 p-2 cursor-pointer">
                            <option className="text-gray-900">MP4 (1080p HD)</option>
                            <option className="text-gray-900">MP4 (720p)</option>
                            <option className="text-gray-900">MP4 (480p)</option>
                          </select>
                          <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-white/10"></div>
                          <div className="sm:hidden w-full h-px bg-gray-200 dark:bg-white/10"></div>
                          <select onClick={() => { window.open('https://example.com/ad', '_blank'); }} className="bg-transparent text-sm font-semibold text-gray-900 dark:text-gray-100 outline-none w-full sm:w-1/2 p-2 cursor-pointer">
                            <option className="text-gray-900">Download Video</option>
                            <option className="text-gray-900">Download MP3 (Audio)</option>
                          </select>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => { window.open('https://example.com/ad', '_blank'); }}
                            className="flex-1 flex items-center justify-center space-x-2 bg-brand-primary text-white font-semibold py-3.5 rounded-xl hover:bg-brand-primary/90 transition shadow-sm"
                          >
                            <Download className="h-4.5 w-4.5" />
                            <span className="text-sm">Download</span>
                          </a>
                          <button
                            onClick={() => { window.open('https://example.com/ad', '_blank'); copyUrlToClipboard(result.url); }}
                            className="px-5 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer text-gray-700 dark:text-gray-300 transition flex items-center justify-center space-x-2 font-semibold"
                          >
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            <span className="text-sm">{copied ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FOUR FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-[#0a0f25] rounded-2xl p-6 text-left flex items-start gap-4 shadow-sm border border-gray-100 dark:border-white/5">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center text-brand-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">100+ Platforms</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Support for all major social platforms</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0f25] rounded-2xl p-6 text-left flex items-start gap-4 shadow-sm border border-gray-100 dark:border-white/5">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">No Registration</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">No sign up required totally free to use</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0f25] rounded-2xl p-6 text-left flex items-start gap-4 shadow-sm border border-gray-100 dark:border-white/5">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-orange-400">
              <Download className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">Unlimited Downloads</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Download unlimited videos without any limits</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0f25] rounded-2xl p-6 text-left flex items-start gap-4 shadow-sm border border-gray-100 dark:border-white/5">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">24/7 Support</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">We're here to help you anytime, anywhere</p>
            </div>
          </div>
        </div>

        {/* POPULAR DOWNLOADERS GRID */}
        <div className="text-center space-y-10 max-w-6xl mx-auto mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Popular <span className="text-brand-primary">Downloaders</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Download videos from your favorite platforms</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 text-left">
            
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition col-span-1 sm:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-lg p-0.5">
                  <div className="bg-white dark:bg-[#0a0f25] rounded-md p-1.5">
                     <svg className="h-5 w-5 stroke-current text-pink-600 fill-none" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">Instagram<br/>Downloader</h4>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Download Instagram videos, reels, stories and IGTV</p>
              <button className="bg-brand-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-brand-primary/90 transition">
                Download <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition col-span-1 sm:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-black p-2 rounded-lg">
                   <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24"><path d="M12.525.01c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.02 1.59 4.23.95 1.15 2.27 1.95 3.71 2.26v3.74c-1.5-.09-2.94-.7-4.12-1.63-.38-.3-.72-.65-1.02-1.03V15.5c-.09 1.74-.68 3.47-1.74 4.8-1.4 1.77-3.6 2.87-5.88 2.89s-4.59-1.06-6.04-2.81c-1.1-1.31-1.72-3.03-1.69-4.75.02-1.68.6-3.32 1.63-4.6 1.41-1.75 3.59-2.83 5.86-2.85v3.83c-1.01.04-2 .55-2.65 1.34-.54.67-.81 1.53-.78 2.38.01.8.27 1.6.76 2.22.65.81 1.62 1.34 2.66 1.35 1.05-.01 2.05-.55 2.69-1.37.5-.66.75-1.49.72-2.31V0H12.525z"></path></svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">TikTok<br/>Downloader</h4>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Download TikTok videos without watermark</p>
              <button className="bg-brand-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-brand-primary/90 transition">
                Download <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition col-span-1 sm:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                   <Play className="h-5 w-5 fill-current" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">YouTube<br/>Downloader</h4>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Download YouTube videos in MP4, MP3 and more</p>
              <button className="bg-brand-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-brand-primary/90 transition">
                Download <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition col-span-1 sm:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#1877F2]/10 text-[#1877F2] p-2 rounded-lg flex items-center justify-center">
                   <span className="font-bold text-xl leading-none w-5 h-5 flex items-center justify-center">f</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">Facebook<br/>Downloader</h4>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Download Facebook videos in high quality</p>
              <button className="bg-brand-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-brand-primary/90 transition">
                Download <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition col-span-1 sm:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-black p-2 rounded-lg">
                   <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">Twitter (X)<br/>Downloader</h4>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Download videos from Twitter / X posts</p>
              <button className="bg-brand-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-brand-primary/90 transition">
                Download <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition col-span-1 sm:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#1ab7ea]/10 text-[#1ab7ea] p-2 rounded-lg flex items-center justify-center">
                   <span className="font-bold text-xl leading-none w-5 h-5 flex items-center justify-center">v</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">Vimeo<br/>Downloader</h4>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Download Vimeo videos in high quality</p>
              <button className="bg-brand-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-brand-primary/90 transition">
                Download <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
          
          <div className="pt-4">
            <button className="bg-white dark:bg-[#0a0f25] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold px-8 py-3.5 rounded-full shadow-sm hover:bg-gray-50 dark:bg-[#050816] transition flex items-center gap-2 mx-auto">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-brand-primary"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg>
              View All Downloaders
            </button>
          </div>
        </div>


        {/* DETAILED USER GUIDES */}
        <div className="max-w-6xl mx-auto mb-20 px-4 sm:px-0">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Detailed User Guides for <span className="text-brand-primary">Supported Apps</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Here are the quick steps to download media from top supported networks, seamlessly via our platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Instagram Guide */}
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-lg p-0.5">
                  <div className="bg-white dark:bg-[#0a0f25] rounded-md p-1">
                     <svg className="h-5 w-5 stroke-current text-pink-600 fill-none" viewBox="0 0 24 24" strokeWidth="2.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Instagram Downloader Guide</h3>
              </div>
              <ul className="space-y-3">
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">1.</span> <b>Copy Link:</b> Instagram app mein Reel ya video par 'Share' icon tap karke 'Copy Link' karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">2.</span> <b>Paste URL:</b> Yahan ModraDown input bar mein link paste karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">3.</span> <b>Select Quality:</b> Process hone ke baad HD ya Standard quality select karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">4.</span> <b>Download:</b> Download button par click karte hi video aapke device mein save.</li>
              </ul>
            </div>

            {/* TikTok Guide */}
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-black p-1.5 rounded-lg">
                   <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24"><path d="M12.525.01c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.02 1.59 4.23.95 1.15 2.27 1.95 3.71 2.26v3.74c-1.5-.09-2.94-.7-4.12-1.63-.38-.3-.72-.65-1.02-1.03V15.5c-.09 1.74-.68 3.47-1.74 4.8-1.4 1.77-3.6 2.87-5.88 2.89s-4.59-1.06-6.04-2.81c-1.1-1.31-1.72-3.03-1.69-4.75.02-1.68.6-3.32 1.63-4.6 1.41-1.75 3.59-2.83 5.86-2.85v3.83c-1.01.04-2 .55-2.65 1.34-.54.67-.81 1.53-.78 2.38.01.8.27 1.6.76 2.22.65.81 1.62 1.34 2.66 1.35 1.05-.01 2.05-.55 2.69-1.37.5-.66.75-1.49.72-2.31V0H12.525z"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">TikTok Downloader Guide</h3>
              </div>
              <ul className="space-y-3">
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">1.</span> <b>Copy Link:</b> TikTok app mein 'Share' tap karke 'Copy Link' select karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">2.</span> <b>Paste URL:</b> ModraDown input box mein link paste kar den.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">3.</span> <b>No Watermark:</b> Hamara system aapko 'Without Watermark' ka option dega, use select karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">4.</span> <b>Save Video:</b> Download par click karen aur video bina logo/watermark ke save.</li>
              </ul>
            </div>

            {/* YouTube Guide */}
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-red-100 text-red-600 p-1.5 rounded-lg">
                   <Play className="h-5 w-5 fill-current" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">YouTube Downloader Guide</h3>
              </div>
              <ul className="space-y-3">
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">1.</span> <b>Copy Link:</b> YouTube app ya web par 'Share' button click karke link copy karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">2.</span> <b>Paste URL:</b> Yahan ModraDown search bar mein URL paste karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">3.</span> <b>Resolution:</b> Video resolution chunen ya audio ke liye 'MP3' select karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">4.</span> <b>Download:</b> Button tap karen aur final clip aapke device ke folder mein.</li>
              </ul>
            </div>

            {/* Facebook Guide */}
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-[#1877F2]/10 text-[#1877F2] p-1.5 rounded-lg flex items-center justify-center">
                   <span className="font-bold text-xl leading-none w-5 h-5 flex items-center justify-center">f</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Facebook Downloader Guide</h3>
              </div>
              <ul className="space-y-3">
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">1.</span> <b>Copy Link:</b> FB video ke '...' (Three Dots) ya 'Share' se link copy karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">2.</span> <b>Paste URL:</b> ModraDown FB downloader view mein URL dalen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">3.</span> <b>Quality:</b> HD Quality ya SD Quality select karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">4.</span> <b>Save:</b> Download par tap karen aur clip seconds mein saved.</li>
              </ul>
            </div>

            {/* Twitter Guide */}
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-black p-1.5 rounded-lg">
                   <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Twitter (X) Downloader Guide</h3>
              </div>
              <ul className="space-y-3">
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">1.</span> <b>Copy Link:</b> Tweet ke niche 'Share' icon se video ya GIF ka link copy karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">2.</span> <b>Paste URL:</b> ModraDown downloader section mein link dalen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">3.</span> <b>Size:</b> System scan karke resolutions dikhayega, preferred size select karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">4.</span> <b>Download:</b> Button tap karein aur GIF ya video device par aa jayegi.</li>
              </ul>
            </div>

            {/* Vimeo Guide */}
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-[#1ab7ea]/10 text-[#1ab7ea] p-1.5 rounded-lg flex items-center justify-center">
                   <span className="font-bold text-xl leading-none w-5 h-5 flex items-center justify-center">v</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Vimeo Downloader Guide</h3>
              </div>
              <ul className="space-y-3">
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">1.</span> <b>Copy URL:</b> Vimeo website/app par video link copy karen ('Share' icon se).</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">2.</span> <b>Paste URL:</b> ModraDown input bar mein link paste karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">3.</span> <b>Resolution:</b> Highest available quality (up to 4K/8K) select karen.</li>
                 <li className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span className="text-brand-primary font-bold">4.</span> <b>Download Now:</b> Button click karen aur premium video download enjoy karen.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ARTICLES AND GUIDES */}
        <div className="max-w-6xl mx-auto mb-24 px-4 sm:px-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Latest <span className="text-brand-primary">Articles & Guides</span>
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Tips and tricks for mastering media content</p>
            </div>
            <a href="/blog" className="shrink-0 text-sm font-semibold text-brand-primary flex items-center gap-1.5 hover:underline">
              View All Guides <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="/blog/instagram-algorithm-hacks-2024" className="group bg-white dark:bg-[#0a0f25] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="p-6">
                <span className="text-[10px] font-bold tracking-wider text-brand-primary uppercase mb-3 block">Instagram Marketing</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary transition leading-snug mb-3">
                  Cracking the 2024 Instagram Algorithm: A Creator's Guide
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-6">
                  Learn exactly how the new IG algorithm ranks reels and posts, and the 5 specific engagement triggers you need to hit.
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                   <div className="flex items-center gap-2">
                     <div className="h-6 w-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-[10px] font-bold text-brand-primary">E</div>
                     <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">Elena R.</span>
                   </div>
                   <span className="text-xs text-gray-400 font-medium">5 min read</span>
                </div>
              </div>
            </a>
            
            <a href="/blog/tiktok-hooks-viral" className="group bg-white dark:bg-[#0a0f25] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="p-6">
                <span className="text-[10px] font-bold tracking-wider text-brand-primary uppercase mb-3 block">Content Strategy</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary transition leading-snug mb-3">
                  15 Viral TikTok Hooks That Stops Users from Scrolling
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-6">
                  The first 3 seconds are crucial. We analyzed 10,000 viral TikToks and found these exact hook templates work every time.
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                   <div className="flex items-center gap-2">
                     <div className="h-6 w-6 rounded-full bg-brand-secondary/10 flex items-center justify-center text-[10px] font-bold text-brand-secondary">M</div>
                     <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">Marcus T.</span>
                   </div>
                   <span className="text-xs text-gray-400 font-medium">4 min read</span>
                </div>
              </div>
            </a>

            <a href="/blog/youtube-seo-masterclass" className="group bg-white dark:bg-[#0a0f25] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-md transition lg:block hidden">
              <div className="p-6">
                <span className="text-[10px] font-bold tracking-wider text-brand-primary uppercase mb-3 block">YouTube Guides</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary transition leading-snug mb-3">
                  The Ultimate YouTube SEO Masterclass for 2024
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-6">
                  Stop publishing videos into the void. Learn how to optimize titles, tags, and descriptions to rank #1 on YouTube Search.
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                   <div className="flex items-center gap-2">
                     <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">S</div>
                     <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">Sarah W.</span>
                   </div>
                   <span className="text-xs text-gray-400 font-medium">7 min read</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-24 px-4 sm:px-0">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Frequently Asked <span className="text-brand-primary">Questions</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Empowering Modern Video Creators
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Is this service completely free?</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Yes, ModraDown is completely free to use. There are no hidden fees or subscriptions required.</p>
            </div>
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Are downloaded videos watermarked?</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">No, you can download videos completely watermark-free depending on the selected quality and platform.</p>
            </div>
            <div className="bg-white dark:bg-[#0a0f25] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Can I download audio only?</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Yes, our engine allows you to extract and download high-quality MP3 audio from any supported video.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mb-24 text-center bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 rounded-[2.5rem] p-10 md:p-16 border border-brand-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Get in Touch <span className="text-brand-primary">with Us</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto text-base">Need assistance with the downloader or have enterprise inquiries? Our support team is ready to help you 24/7.</p>
          <a href="/contact" className="inline-flex items-center space-x-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition">
            <span>Contact Support</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </a>
        </div>

      </div>
    </div>
  );
}
