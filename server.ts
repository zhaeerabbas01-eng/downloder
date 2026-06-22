import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { exec } from "child_process";
import ytdl from "youtube-dl-exec";
import { GoogleGenAI } from "@google/genai";
import { createRequire } from "module";
import dotenv from "dotenv";

dotenv.config();

// Resolving CommonJS requires safely in ES Modules
const require = createRequire(import.meta.url);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Safe lazy initializer for Google GenAI SDK
  let aiClient: any = null;
  function getAI() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        aiClient = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': "aistudio-build",
            },
          },
        });
      }
    }
    return aiClient;
  }

  // API route for downloading video info
  app.post("/api/download", async (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      let result: any = null;
      let isTiktok = url.includes("tiktok");
      
      if (isTiktok) {
        try {
          const { ttdl } = require("btch-downloader");
          const ttResult = await ttdl(url);
          if (ttResult && ttResult.status && ttResult.video && ttResult.video.length > 0) {
            result = {
              title: ttResult.title || "TikTok Video",
              url: ttResult.video[0] || ttResult.video,
              thumbnail: ttResult.thumbnail || null,
              formats: ttResult.video.map((v: string, idx: number) => ({
                 url: v,
                 format_note: idx === 0 ? "No Watermark" : "With Watermark",
                 vcodec: "h264",
                 acodec: "aac"
              }))
            };
          }
        } catch (e) {
          console.error("btch-downloader failed for tiktok, falling back", e);
        }
      }

      if (!result) {
        const ytdlOptions: any = {
          dumpJson: true,
          noWarnings: true,
          noCheckCertificates: true,
          preferFreeFormats: true,
          extractorArgs: "youtube:player_client=ios,android,web",
        };
        
        if (process.env.INSTAGRAM_COOKIE && url.includes("instagram.com")) {
            ytdlOptions.addHeader = ['Cookie:' + process.env.INSTAGRAM_COOKIE];
        }

        // Execute youtube-dl-exec to extract video information
        result = await ytdl(url, ytdlOptions);
      }

      if (!result) {
         return res.status(500).json({ error: "Could not fetch video info." });
      }

      // Find the best URL with video
      let bestUrl = result.url;
      if (!bestUrl && result.formats && result.formats.length > 0) {
          const videoFormats = result.formats.filter((f: any) => f.vcodec !== 'none' && f.url);
          if (videoFormats.length > 0) {
              const bestFormat = videoFormats.reduce((prev: any, current: any) => {
                 return ((prev.height || 0) > (current.height || 0)) ? prev : current;
              });
              bestUrl = bestFormat.url;
          } else {
             bestUrl = result.formats[0].url;
          }
      }

      const mediaData = {
          title: result.title || result.fulltitle || "Extracted Video",
          url: bestUrl,
          tunnel: bestUrl,
          thumbnail: result.thumbnail,
          description: result.description || "No description extracted.",
          duration: result.duration ? `${Math.floor(result.duration / 60)}m ${result.duration % 60}s` : "Unknown",
          viewCount: result.view_count || "N/A",
          likeCount: result.like_count || "N/A",
          picker: result.formats ? result.formats.filter((f: any) => (f.vcodec !== 'none' || f.acodec !== 'none') && f.url && f.url.startsWith("http")).map((f: any) => ({
             url: f.url,
             quality: f.format_note || f.resolution || `${f.height ? f.height + 'p' : 'Download stream'}`
          })) : []
      };

      res.json(mediaData);
    } catch (error: any) {
      console.log('youtube-dl-exec failed, attempting fallback...', error.message);
      
      try {
        const bd = require('btch-downloader');
        let fallbackResult: any = null;
        let isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
        let isX = url.includes("twitter.com") || url.includes("x.com");
        let isFb = url.includes("facebook.com") || url.includes("fb.watch");
        let isIg = url.includes("instagram.com");
        
        if (isYoutube && bd.youtube) {
           fallbackResult = await bd.youtube(url);
        } else if (isX && bd.twitter) {
           fallbackResult = await bd.twitter(url);
        } else if (isFb && bd.fbdown) {
           fallbackResult = await bd.fbdown(url);
        } else if (isIg && bd.igdl) {
           fallbackResult = await bd.igdl(url);
        } else if (bd.aio) {
           fallbackResult = await bd.aio(url);
        }

        if (fallbackResult && (fallbackResult.mp4 || fallbackResult.url || (fallbackResult.video && fallbackResult.video.length > 0) || fallbackResult.Normal_video)) {
            const bestUrl = fallbackResult.mp4 || fallbackResult.url || fallbackResult.Normal_video || (Array.isArray(fallbackResult.video) ? fallbackResult.video[0] : fallbackResult.video) || fallbackResult.HD || fallbackResult.SD;
            
            let picker = [];
            if (fallbackResult.mp4) picker.push({ url: fallbackResult.mp4, quality: 'MP4 Video' });
            if (fallbackResult.mp3) picker.push({ url: fallbackResult.mp3, quality: 'MP3 Audio' });
            if (fallbackResult.HD) picker.push({ url: fallbackResult.HD, quality: 'HD Video' });
            if (fallbackResult.SD) picker.push({ url: fallbackResult.SD, quality: 'SD Video' });
            if (fallbackResult.Normal_video) picker.push({ url: fallbackResult.Normal_video, quality: 'Normal Video' });

            const mediaData = {
                title: fallbackResult.title || "Extracted Video (Fallback)",
                url: bestUrl,
                tunnel: bestUrl,
                thumbnail: fallbackResult.thumbnail || fallbackResult.thumb || "",
                description: fallbackResult.author ? `Author: ${fallbackResult.author}` : "No description",
                duration: "Unknown",
                viewCount: "N/A",
                likeCount: "N/A",
                picker: picker
            };
            return res.json(mediaData);
        }
      } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
      }

      const errMessage = error.stderr || error.message || "Failed connecting to downloader";
      
      let friendlyError = "Failed to fetch video information. ";
      if (errMessage.toLowerCase().includes("instagram") && (errMessage.includes("login") || errMessage.includes("rate-limit") || errMessage.includes("cookie"))) {
         friendlyError = "Instagram blocked the request due to rate-limiting or authentication requirements. We support links from other providers, or you can check our metadata/thumbnail viewers below!";
      } else if (errMessage.includes("ERROR:")) {
         friendlyError += errMessage.split("ERROR:")[1].split("\n")[0];
      } else {
         friendlyError += errMessage;
      }
      
      res.status(500).json({ 
        error: friendlyError
      });
    }
  });

  // AI Content Generator API Endpoint
  app.post("/api/ai/generate", async (req, res) => {
    const { tool, prompt, options, apiKey } = req.body;

    if (!tool || !prompt) {
      return res.status(400).json({ error: "Tool and Prompt are required fields." });
    }

    try {
      let ai = getAI();
      if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
      }
      let responseText = "";

      if (ai) {
        // Construct the prompt based on the specific tool
        let systemPrompt = "You are a professional social media marketing copywriter and content growth SEO consultant.";
        let finalPrompt = "";

        if (tool === "hashtag") {
          systemPrompt += " Generate 15-20 highly engaging visual tags, categorizing them by Top, Medium, and Niche size.";
          finalPrompt = `Generate optimized trending social media hashtags for: "${prompt}". Focus Platform: ${options?.platform || 'Instagram'}.`;
        } else if (tool === "caption") {
          systemPrompt += " Write a compelling caption including hook lines, call to actions, and custom formatting spacing.";
          finalPrompt = `Write an optimized caption for: "${prompt}". Tone: ${options?.tone || 'Professional'}, Platform: ${options?.platform || 'TikTok'}.`;
        } else if (tool === "title") {
          systemPrompt += " Produce 10 distinct clicking hooks and high CTR headline variations.";
          finalPrompt = `Generate video titles and hooks for the topic: "${prompt}". Video Goal: ${options?.goal || 'Viral View count'}.`;
        } else if (tool === "bio") {
          systemPrompt += " Create 3 completely distinct bio concepts with line breaks and custom emojis.";
          finalPrompt = `Create a social media profile biography for: "${prompt}". Style: ${options?.style || 'Creative'}, Platform: ${options?.platform || 'Instagram'}.`;
        } else if (tool === "idea") {
          systemPrompt += " Suggest 5 unique viral video concepts with outline, specific hook, and sound advice.";
          finalPrompt = `Analyze and list complete content idea outlines for: "${prompt}". Niche Category: ${options?.category || 'General Creator'}.`;
        } else if (tool === "tags") {
          systemPrompt += " Produce active tags formatted cleanly as a comma-separated list and direct checklist.";
          finalPrompt = `Generate search tags and key terms for YouTube upload: "${prompt}". Niche focus: ${options?.audience || 'General Discoverability'}.`;
        }

        const modelRes = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: finalPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.8,
          },
        });

        responseText = modelRes.text || "No response received from AI model.";
      } else {
        // Fallback generator for a key-less preview environment
        responseText = `[PREVIEW MODE - GEMINI KEY ABSENT]
Here is a high-quality preview response generated based on standard digital templates for: "${prompt}"

1. Core Strategy: Optimizing content with high-intent keywords relative to your target query.
2. Formatted Copy Proposal:
- "#${prompt.replace(/\s+/g, "")}Creator" 
- "#SocialTrend2026"
- "#ViralCreator"
- "#MediaTools"

3. Actionable Checklist: 
- Post during high-activity hours (11AM - 2PM, and 6PM - 8PM local time).
- Spark debate in the comments with binary options.
- Maintain consistent visual loops.

(Configure GEMINI_API_KEY inside Settings > Secrets to unlock live interactive smart generation!)`;
      }

      res.json({ output: responseText });
    } catch (e: any) {
      console.error("AI Generation endpoint crashed", e);
      let errMsg = e.message || "An error occurred during AI generation";
      if (errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED")) {
          errMsg = "AI Generation quota exceeded. Please try again later. Wait about a minute for limits to refresh.";
      }
      res.status(500).json({ error: errMsg });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
