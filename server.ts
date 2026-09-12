import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Moksha Gateways API" });
  });

  // AI Trip & Pilgrimage Planner endpoint powered by Gemini
  app.post("/api/plan-trip", async (req, res) => {
    try {
      const { destination, days, travelers, budget, preferences, tripType } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
          success: true,
          isFallback: true,
          plan: {
            title: `${days || 4}-Day Serene Journey to ${destination || "Varanasi & Beyond"}`,
            summary: `A carefully designed ${tripType || "Spiritual & Leisure"} itinerary balancing divine darshans, serene riverfront moments, and comfortable travel for ${travelers || 2} travelers.`,
            bestSeason: "September to March",
            estimatedCost: budget || "₹18,500 per person",
            days: [
              {
                day: 1,
                title: "Arrival & Sacred Welcoming",
                activities: [
                  "Warm arrival & VIP transfer to premium riverside hotel",
                  "Evening Mangala Ganga Aarti viewing from private boat",
                  "Authentic Satvik dinner with local culinary delights"
                ],
                spiritualHighlight: "Sunset Ganga Aarti at Dashashwamedh Ghat",
                staySuggestion: "BrijRama Palace / Ganga Heritage Resort"
              },
              {
                day: 2,
                title: "Divine Darshan & Ancient Alleyways",
                activities: [
                  "Special VIP Sugam Darshan at Shri Kashi Vishwanath Temple",
                  "Visit to Annapurna Devi & historic Kal Bhairav temple",
                  "Afternoon exploration of Varanasi weavers & silk emporiums"
                ],
                spiritualHighlight: "Morning Rudrabhishekam at Vishwanath Jyotirlinga",
                staySuggestion: "BrijRama Palace / Taj Nadesar"
              },
              {
                day: 3,
                title: "Peaceful Sarnath & Sacred Chanting",
                activities: [
                  "Morning excursion to peaceful Sarnath Dhamek Stupa",
                  "Meditation session amidst ancient Buddhist gardens",
                  "Evening classical flute and sitar recital on the quiet ghats"
                ],
                spiritualHighlight: "Deer Park mindfulness walk",
                staySuggestion: "Luxury Heritage Havelis"
              },
              {
                day: 4,
                title: "Sunrise Blessing & Homeward Journey",
                activities: [
                  "Subah-e-Banaras sunrise boat tour with traditional chanting",
                  "Shopping for sacred brass idols and holy Gangajal souvenirs",
                  "Comfortable transfer to Airport / Vande Bharat Train station"
                ],
                spiritualHighlight: "Assi Ghat morning Surya Arghya",
                staySuggestion: "Departure"
              }
            ],
            packingTips: [
              "Traditional modest cotton attire for temple entries",
              "Comfortable slip-on walking footwear for ghat exploration",
              "Valid photo ID (Aadhar/Passport) for VIP temple darshan slips"
            ]
          }
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `You are the chief travel & pilgrimage architect at 'Moksha Gateways', India's premier spiritual and vacation booking company (like MakeMyTrip, with specialized spiritual yatra excellence).
Create an inspiring, highly realistic, day-by-day travel plan based on the following:
Destination: ${destination || "Varanasi / Kedarnath / Kerala"}
Trip Duration: ${days || "4"} Days
Trip Style: ${tripType || "Spiritual & Pilgrimage"}
Travelers: ${travelers || "2 adults"}
Budget Preference: ${budget || "Comfort / Premium"}
Special Requests: ${preferences || "Senior citizen friendly, authentic satvik food, VIP temple darshan"}

Return strictly a valid JSON object matching this structure:
{
  "title": "Inspiring Package Title",
  "summary": "2 sentence overview of why this journey will be transformative",
  "bestSeason": "e.g., Oct - Apr",
  "estimatedCost": "e.g., ₹24,500 per person",
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "activities": ["Bullet 1", "Bullet 2", "Bullet 3"],
      "spiritualHighlight": "Specific temple, aarti, view, or wellness ritual",
      "staySuggestion": "Recommended hotel or ashram category"
    }
  ],
  "packingTips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const text = response.text || "{}";
      let parsedPlan;
      try {
        parsedPlan = JSON.parse(text);
      } catch {
        parsedPlan = null;
      }

      if (parsedPlan) {
        return res.json({ success: true, plan: parsedPlan });
      }

      res.status(500).json({ error: "Failed to parse itinerary JSON" });
    } catch (err: any) {
      console.error("Gemini trip planner error:", err?.message);
      res.status(500).json({ error: err?.message || "Error generating trip plan" });
    }
  });

  // Vite middleware in dev mode, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Moksha Gateways server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
