import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Sparkles, Video, BookOpen, Heart, HelpCircle, Mail, ShieldAlert, ArrowRight, Moon, Sun, ChevronDown, Menu as MenuIcon, X as CloseIcon, User, ShieldCheck, HeartHandshake } from "lucide-react";
import Home from "./pages/Home";
import AITools from "./pages/AITools";
import BlogList from "./pages/BlogList";
import BlogPostDetail from "./pages/BlogPostDetail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import DMCA from "./pages/DMCA";
import CookiePolicy from "./pages/CookiePolicy";
import FAQ from "./pages/FAQ";
import { motion, AnimatePresence } from "motion/react";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glowEnabled, setGlowEnabled] = useState(false); // Default false = light mode
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    if (glowEnabled) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#050816';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    }
  }, [glowEnabled]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSignInSuccess(true);
      setTimeout(() => {
        setShowSignInModal(false);
        setSignInSuccess(false);
        setEmailInput("");
      }, 1500);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-white/10  bg-white dark:bg-[#0a0f25]/95 dark:bg-[#050816]/95  backdrop-blur-md transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO: M MODRA */}
        
        <Link to="/" className="flex items-center space-x-2 group relative z-50">
          <div className="h-9 w-9">
            <svg viewBox="0 0 24 24" className="w-full h-full">
               <defs>
                 <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#6650ff" />
                   <stop offset="100%" stopColor="#d946ef" />
                 </linearGradient>
               </defs>
               <path d="M4 21V5l8 6 8-6v16" fill="none" stroke="url(#logo-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">
            ModraDown
          </span>
        </Link>

        {/* Navigation Items - PC Responsive to match the image */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-gray-300">
          <Link 
            to="/" 
            className={`transition-all duration-200 hover:text-gray-900 dark:text-gray-100 flex items-center gap-1.5 ${path === "/" ? "text-brand-primary font-extrabold border-b-2 border-brand-primary pb-1" : "pb-1"}`}
          >
            Home
          </Link>
          
          {/* Downloader dropdown preview */}
          <div className="relative group hover:py-1">
            <button className="transition-all duration-200 hover:text-gray-900 dark:text-gray-100 flex items-center gap-1 hover:text-brand-primary cursor-pointer font-sans font-bold  text-xs">
              Downloader <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 mt-2 bg-gray-50 dark:bg-[#050816] border border-gray-200 dark:border-white/10 rounded-xl p-3 shadow-2xl space-y-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition duration-300 z-50">
              <div className="text-[9px]  tracking-widest text-gray-500 dark:text-gray-400 font-black mb-1 border-b border-gray-200 dark:border-white/10 pb-1">Supported Apps</div>
              <a href="/#media-downloader" className="block text-[10px] text-gray-600 dark:text-gray-300 hover:text-brand-primary  font-bold tracking-wider transition">★ Facebook</a>
              <a href="/#media-downloader" className="block text-[10px] text-gray-600 dark:text-gray-300 hover:text-brand-primary  font-bold tracking-wider transition">★ Instagram</a>
              <a href="/#media-downloader" className="block text-[10px] text-gray-600 dark:text-gray-300 hover:text-brand-primary  font-bold tracking-wider transition">★ YouTube</a>
              <a href="/#media-downloader" className="block text-[10px] text-gray-600 dark:text-gray-300 hover:text-brand-primary  font-bold tracking-wider transition">★ TikTok</a>
              <a href="/#media-downloader" className="block text-[10px] text-gray-600 dark:text-gray-300 hover:text-brand-primary  font-bold tracking-wider transition">★ Reddit</a>
              <a href="/#media-downloader" className="block text-[10px] text-gray-600 dark:text-gray-300 hover:text-brand-primary  font-bold tracking-wider transition">★ Vimeo</a>
              <a href="/#media-downloader" className="block text-[10px] text-gray-600 dark:text-gray-300 hover:text-brand-primary  font-bold tracking-wider transition">★ DailyMotion</a>
            </div>
          </div>

          <Link 
            to="/tools" 
            className={`flex items-center gap-1 transition-all duration-200 hover:text-gray-900 dark:text-gray-100 ${path === "/tools" ? "text-brand-primary font-extrabold border-b-2 border-brand-primary pb-1" : "pb-1"}`}
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-accent animate-pulse" />
            Tools
          </Link>
          
          <Link 
            to="/blog" 
            className={`transition-all duration-200 hover:text-gray-900 dark:text-gray-100 ${path.startsWith("/blog") ? "text-brand-primary font-extrabold border-b-2 border-brand-primary pb-1" : "pb-1"}`}
          >
            Blog
          </Link>
          
          <Link 
            to="/faq" 
            className={`transition-all duration-200 hover:text-gray-900 dark:text-gray-100 ${path === "/faq" ? "text-brand-primary font-extrabold border-b-2 border-brand-primary pb-1" : "pb-1"}`}
          >
            How to Use
          </Link>
          
          <Link 
            to="/about" 
            className={`transition-all duration-200 hover:text-gray-900 dark:text-gray-100 ${path === "/about" ? "text-brand-primary font-extrabold border-b-2 border-brand-primary pb-1" : "pb-1"}`}
          >
            About Us
          </Link>
          
          <Link 
            to="/contact" 
            className={`transition-all duration-200 hover:text-gray-900 dark:text-gray-100 ${path === "/contact" ? "text-brand-primary font-extrabold border-b-2 border-brand-primary pb-1" : "pb-1"}`}
          >
            Contact
          </Link>
        </nav>

        {/* Right side Actions matching screenshot */}
        <div className="hidden lg:flex items-center space-x-4">
          <button 
            onClick={() => setGlowEnabled(!glowEnabled)}
            className="p-2.5 rounded-full hover:bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 transition cursor-pointer"
          >
            {glowEnabled ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={() => setShowSignInModal(true)}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white transition duration-300 text-sm font-semibold rounded-lg px-6 py-2.5"
          >
            Sign In
          </button>
        </div>

        {/* MOBILE MENU TRIGGER BUTTON */}
        <div className="flex items-center lg:hidden space-x-3">
          <button 
            onClick={() => setGlowEnabled(!glowEnabled)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
          >
            <Moon className={`h-4 w-4 ${glowEnabled ? "text-brand-primary" : ""}`} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:bg-white/10 transition"
          >
            {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE RESPONSIVE SIDEBAR DRAWER - Smooth Animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f25] overflow-hidden"
          >
            <div className="px-6 py-8 space-y-5 flex flex-col text-sm font-semibold tracking-wide  font-sans">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2 border-b border-gray-200 dark:border-white/10 ${path === "/" ? "text-brand-primary" : "text-gray-600 dark:text-gray-300"}`}
              >
                <span>Home / Downloader</span>
                <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-md font-sans font-bold">Downloader</span>
              </Link>
              <Link 
                to="/tools" 
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2 border-b border-gray-200 dark:border-white/10 ${path === "/tools" ? "text-brand-primary" : "text-gray-600 dark:text-gray-300"}`}
              >
                <span>AI Creative Tools</span>
                <Sparkles className="h-3.5 w-3.5 text-brand-accent animate-spin" />
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-gray-200 dark:border-white/10 ${path.startsWith("/blog") ? "text-brand-primary" : "text-gray-600 dark:text-gray-300"}`}
              >
                Academy Blog
              </Link>
              <Link 
                to="/faq" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-gray-200 dark:border-white/10 ${path === "/faq" ? "text-brand-primary font-bold" : "text-gray-600 dark:text-gray-300"}`}
              >
                How to Use / FAQ
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-gray-200 dark:border-white/10 ${path === "/about" ? "text-brand-primary" : "text-gray-600 dark:text-gray-300"}`}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-gray-200 dark:border-white/10 ${path === "/contact" ? "text-brand-primary" : "text-gray-600 dark:text-gray-300"}`}
              >
                Contact Ticket
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSignInModal(true);
                }}
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-gray-900 dark:text-gray-100 font-extrabold text-xs tracking-wider text-center"
              >
                SIGN IN TO DASHBOARD
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIGN IN DESK MODAL DIALOG */}
      <AnimatePresence>
        {showSignInModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-50 dark:bg-[#050816] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 max-w-md w-full relative overflow-hidden"
            >
              {/* Glow effects */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-secondary/10 rounded-full blur-2xl" />

              <button 
                onClick={() => setShowSignInModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 transition"
              >
                <CloseIcon className="h-5 w-5" />
              </button>

              <div className="text-center space-y-2 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-gray-900 dark:text-gray-100 font-black mx-auto shadow-md">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-6 h-6">
                    <path d="M4 20V8l8 5 8-5v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">Welcome to ModraDown</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">Maximize your media downloads up to 10x faster!</p>
              </div>

              {signInSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-brand-accent/25 flex items-center justify-center text-brand-accent mx-auto">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100  text-xs tracking-widest font-sans">Access Authorized</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Connecting you to premium downlink processors...</p>
                </div>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-sans  font-semibold text-gray-600 dark:text-gray-300 mb-1.5">Your Email Address</label>
                    <input 
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. download@modrahub.com"
                      className="w-full bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl p-3 text-xs text-gray-900 dark:text-gray-100 outline-none focus:border-brand-primary placeholder:text-neutral-600 transition"
                    />
                  </div>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-600 dark:text-gray-300">
                    <HeartHandshake className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                    <span>Free account - No credit card required.</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-gray-900 dark:text-gray-100 font-extrabold text-xs py-3 rounded-xl hover:brightness-110 active:scale-[0.98] font-medium transition"
                  >
                    Get instant free access
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0f25] pt-8 pb-16 mt-auto relative z-10 overflow-hidden">
      
      {/* SCROLLING MARQUEE */}
      <div className="w-full bg-slate-50 border-y border-gray-100 dark:border-white/5 py-3 mb-10 overflow-hidden relative">
        <div className="flex w-[200%] animate-marquee">
          <div className="flex w-1/2 justify-around items-center text-sm font-bold text-gray-400">
            <span className="shrink-0 flex items-center gap-2 text-[#E4405F]">Instagram<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-black dark:text-white">TikTok<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-[#FF0000]">YouTube<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-[#1877F2]">Facebook<span className="text-gray-400">Downloader</span></span>
            <Link to="/tools" className="shrink-0 flex items-center gap-2 text-brand-primary hover:opacity-80 transition cursor-pointer">AI Tools<span className="text-gray-400">Suite</span></Link>
            <span className="shrink-0 flex items-center gap-2 text-black dark:text-white">Twitter (X)<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-[#006add]">DailyMotion<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-[#1ab7ea]">Vimeo<span className="text-gray-400">Downloader</span></span>
          </div>
          <div className="flex w-1/2 justify-around items-center text-sm font-bold text-gray-400">
            <span className="shrink-0 flex items-center gap-2 text-[#E4405F]">Instagram<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-black dark:text-white">TikTok<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-[#FF0000]">YouTube<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-[#1877F2]">Facebook<span className="text-gray-400">Downloader</span></span>
            <Link to="/tools" className="shrink-0 flex items-center gap-2 text-brand-primary hover:opacity-80 transition cursor-pointer">AI Tools<span className="text-gray-400">Suite</span></Link>
            <span className="shrink-0 flex items-center gap-2 text-black dark:text-white">Twitter (X)<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-[#006add]">DailyMotion<span className="text-gray-400">Downloader</span></span>
            <span className="shrink-0 flex items-center gap-2 text-[#1ab7ea]">Vimeo<span className="text-gray-400">Downloader</span></span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4 col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-gray-900 dark:text-gray-100 font-bold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5 text-gray-900 dark:text-gray-100">
                  <path d="M4 20V8l8 5 8-5v12" />
                </svg>
              </div>
              <span className="font-extrabold text-sm tracking-tight text-gray-900 dark:text-gray-100 ">ModraDown</span>
            </Link>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              An elegant, legal, policy-compliant converter suite, built specifically for digital content creators under fair use provisions.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-sans tracking-widest font-black text-gray-600 dark:text-gray-300 ">Interactive Utilities</h5>
            <ul className="space-y-2 text-[11px] text-gray-500 dark:text-gray-400 font-medium font-sans">
              <li><Link to="/" className="hover:text-brand-primary transition font-sans text-[11px]">Media Downloader</Link></li>
              <li><a href="/#thumbnail-extractor" className="hover:text-brand-primary transition font-sans text-[11px]">YouTube Thumbnails</a></li>
              <li><a href="/#metadata-analyst" className="hover:text-brand-primary transition font-sans text-[11px]">Metadata Examiner</a></li>
              <li><Link to="/tools" className="hover:text-brand-primary transition font-sans text-[11px]">AI Creative Tools</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-sans tracking-widest font-black text-gray-600 dark:text-gray-300 ">Supported Apps</h5>
            <ul className="space-y-2 text-[11px] text-[#94a3b8] font-medium font-sans">
              <li><Link to="/" className="hover:text-brand-primary transition">Facebook Downloader</Link></li>
              <li><Link to="/" className="hover:text-brand-primary transition">Instagram Downloader</Link></li>
              <li><Link to="/" className="hover:text-brand-primary transition">YouTube Downloader</Link></li>
              <li><Link to="/" className="hover:text-brand-primary transition">TikTok Downloader</Link></li>
              <li><Link to="/" className="hover:text-brand-primary transition">Vimeo Downloader</Link></li>
              <li><Link to="/" className="hover:text-brand-primary transition">DailyMotion Downloader</Link></li>
              <li><Link to="/" className="hover:text-brand-primary transition">Reddit Downloader</Link></li>
              <li><Link to="/" className="hover:text-brand-primary transition">Threads Downloader</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-sans tracking-widest font-black text-gray-600 dark:text-gray-300 ">Legal Policy Sheets</h5>
            <ul className="space-y-2 text-[11px] text-[#94a3b8] font-medium font-sans">
              <li><Link to="/privacy" className="hover:text-brand-primary transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-primary transition">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-brand-primary transition">Disclaimer Notice</Link></li>
              <li><Link to="/dmca" className="hover:text-brand-primary transition">DMCA / Copyright</Link></li>
              <li><Link to="/cookies" className="hover:text-brand-primary transition">Cookie Declarations</Link></li>
            </ul>
          </div>

        </div>

        {/* Fine-print copyright and trademark warnings */}
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-[11px] text-gray-500 dark:text-gray-400 font-sans">
          <div className="space-y-1">
            <p>&copy; {new Date().getFullYear()} ModraDown. All rights reserved.</p>
            <p className="max-w-3xl text-[9px] text-[#475569] leading-relaxed">
              Legal Disclaimer: ModraDown is an independent visual hub. We do not host any copy-righted files or media streams in our local database. We operate client-only formatting proxy requests strictly under policy-compliant APIs. Not affiliated with Instagram, Facebook, TikTok, Vimeo, YouTube, or Meta Inc.
            </p>
          </div>
          <div className="flex gap-4">
             <span className="flex items-center gap-1.5 text-[#00FFB3] font-sans text-[9px] tracking-wider  border border-brand-accent/20 bg-brand-accent/5 px-2.5 py-1 rounded-md shrink-0">
               <ShieldAlert className="h-3.5 w-3.5 text-brand-accent" /> Policy Sandbox Active
             </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050816] text-gray-900 dark:text-gray-100 font-sans selection:bg-brand-primary/30 flex flex-col scroll-smooth">
      <Header />
      <div className="flex-1 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<AITools />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/dmca" element={<DMCA />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
