import React from "react";
import { ShieldCheck, Target, Heart, Award, CheckCircle } from "lucide-react";
import AdPlacement from "../components/AdPlacement";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050816] text-gray-900 dark:text-gray-100 py-16 relative overflow-hidden">
      {/* Glow Elements */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-secondary/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-primary/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Ad Space Header */}
        <div className="mb-12">
          <AdPlacement type="banner" title="Header Ad Area" />
        </div>

        {/* Hero Meta Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FFFB]/20 bg-[#00FFFB]/5 text-[#00FFB3] text-xs font-mono mb-4">
            <span className="h-2 w-2 rounded-full bg-[#00FFB3] animate-pulse" />
            Learn About Our Mission
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent mb-6">
            Empowering Modern Video Creators
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            ModraDown is a legal, policy-compliant web platform dedicated to providing video converter tools, thumbnail extractors, link previews, and metadata analyses.
          </p>
        </div>

        {/* EEAT Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gray-50 dark:bg-[#050816]/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 p-8 hover:border-brand-primary/20 transition group">
            <div className="h-12 w-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">100% Legal & Safe</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              We respect copyright laws and never host content or circumvent technical locks. Our tools help you check public file parameters, examine metadata headers, and analyze visual thumbnails.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#050816]/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 p-8 hover:border-brand-secondary/20 transition group">
            <div className="h-12 w-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-6 group-hover:scale-110 transition">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Authoritative Guidelines</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Our growth and SEO guides are published by certified industry professionals who actively run social outreach campaigns, ensuring complete data relevance and real value.
            </p>
          </div>
        </div>

        {/* Ad Space In-Content */}
        <div className="my-12">
          <AdPlacement type="in-content" title="In Content Ad Slot" />
        </div>

        {/* The Hub Philosophy */}
        <div className="space-y-8 bg-white/[0.01] rounded-3xl border border-gray-200 dark:border-white/10 p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Our Core Philosophy</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
            We believe that accessibility is paramount to a healthy digital creator ecosystem. Many professional video editors require offline local clips to analyze pacing, grading, or reference keyframes.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-brand-accent mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">No Copyright Infringement</h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">We strictly encourage our users to download, convert, or preview only original creations or free public domain items.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-brand-accent mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">AdSense-Compliant Policy Sandbox</h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">This platform does not contain spam content, deceptive links, or redirect walls. Our design is clean, fast, and optimized for native, premium banner delivery.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Authors Card */}
        <div className="border border-gray-200 dark:border-white/10 rounded-3xl bg-gray-50 dark:bg-[#050816]/90 p-8 text-center">
          <Award className="h-10 w-10 text-brand-primary mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Our Dedicated Editorial Team</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm max-w-lg mx-auto mb-6">
            All SEO analyses, growth strategy papers, and platform tools are continuously checked by experienced authors specializing in short-form algorithm updates.
          </p>
        </div>
      </div>
    </div>
  );
}
