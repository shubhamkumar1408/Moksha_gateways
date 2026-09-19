import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const LEADS_FILE = path.join(process.cwd(), "leads.json");

function getStoredLeads(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading leads file:", err);
  }
  return [];
}

function saveLeadToFile(lead: any): void {
  try {
    const leads = getStoredLeads();
    leads.unshift(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads.slice(0, 500), null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving lead to file:", err);
  }
}

async function sendLeadEmailNotification(lead: any): Promise<{ sent: boolean; recipient: string; message: string }> {
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || "duttshubham68@gmail.com, mokshagateways@gmail.com";
  
  // Clean phone for WhatsApp / Direct call link
  const cleanPhone = (lead.phone || "").replace(/[^0-9]/g, "");
  const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Namaste ${lead.name || "Customer"}, thank you for choosing Moksha Gateways regarding ${lead.destinationOrPackage || "your trip"}!`
  )}`;
  const telUrl = `tel:${lead.phone || ""}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead - Moksha Gateways</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0b1b2d 0%, #152d4a 100%); padding: 28px 24px; text-align: center; border-bottom: 4px solid #ff6a00;">
      <span style="display: inline-block; background: rgba(255, 106, 0, 0.2); color: #ff9142; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">
        🚀 Instant Website Lead Alert
      </span>
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">
        Moksha Gateways
      </h1>
      <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 14px;">
        New ${lead.leadType || 'Inquiry / Booking'} Received from Website
      </p>
    </div>

    <!-- Lead Key Highlights Card -->
    <div style="padding: 24px;">
      
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; width: 40%;">Lead Reference ID:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 13px; font-weight: 800; font-family: monospace;">${lead.id || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Customer Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 15px; font-weight: 800;">${lead.name || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Mobile / WhatsApp:</td>
            <td style="padding: 8px 0; color: #0284c7; font-size: 15px; font-weight: 800;">
              <a href="${telUrl}" style="color: #0284c7; text-decoration: none;">${lead.phone || 'Not provided'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Email Address:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 13px; font-weight: 600;">
              <a href="mailto:${lead.email || ''}" style="color: #0f172a; text-decoration: none;">${lead.email || 'Not provided'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Package / Destination:</td>
            <td style="padding: 8px 0; color: #ea580c; font-size: 14px; font-weight: 800;">${lead.destinationOrPackage || 'General Website Lead'}</td>
          </tr>
          ${lead.duration ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Tour Duration:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 13px; font-weight: 700;">${lead.duration}</td>
          </tr>` : ''}
          ${lead.travelDate ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Preferred Travel Date:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 13px; font-weight: 700;">${lead.travelDate}</td>
          </tr>` : ''}
          ${lead.travelersCount ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Travelers Count:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 13px; font-weight: 700;">${lead.travelersCount} Traveler(s)</td>
          </tr>` : ''}
          ${lead.budgetOrAmount ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Budget / Package Amount:</td>
            <td style="padding: 8px 0; color: #16a34a; font-size: 16px; font-weight: 900;">₹${Number(lead.budgetOrAmount).toLocaleString('en-IN')}</td>
          </tr>` : ''}
          ${lead.couponCode ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Coupon Code Applied:</td>
            <td style="padding: 8px 0; color: #b45309; font-size: 13px; font-weight: 800;">${lead.couponCode}</td>
          </tr>` : ''}
        </table>
      </div>

      ${lead.notes ? `
      <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
        <span style="font-size: 11px; font-weight: 800; color: #b45309; text-transform: uppercase; display: block; margin-bottom: 4px;">Customer Notes / Special Request:</span>
        <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.5;">${lead.notes}</p>
      </div>` : ''}

      <!-- Quick Action Buttons -->
      <div style="text-align: center; margin: 24px 0;">
        <a href="${telUrl}" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 13px; margin-right: 8px;">
          📞 Direct Call
        </a>
        <a href="${whatsappUrl}" style="display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 13px;">
          💬 WhatsApp Customer
        </a>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #94a3b8; text-align: center;">
        Submitted at: ${new Date(lead.submittedAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)<br>
        Source Page: ${lead.sourceUrl || 'Moksha Gateways Portal'}
      </div>
    </div>
  </div>
</body>
</html>
  `;

  // Check if Resend API is configured (Guaranteed cloud delivery without SMTP blocks)
  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpUser = process.env.SMTP_USER || "mokshagateways@gmail.com";
  const smtpPass = process.env.SMTP_PASS;

  if (resendApiKey) {
    try {
      const targetEmails = recipient.includes(",") 
        ? recipient.split(",").map(s => s.trim()).filter(Boolean)
        : [recipient.trim()];

      let res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Moksha Gateways <onboarding@resend.dev>",
          to: targetEmails,
          subject: `🔔 New Lead: ${lead.name} (${lead.destinationOrPackage || 'Moksha Inquiry'}) - ₹${lead.budgetOrAmount || 'Custom'}`,
          html: htmlContent
        })
      });

      let resData = await res.json();

      // If Resend free sandbox restricts recipient to account owner:
      if (!res.ok && resData?.message?.includes("only send testing emails to your own email address")) {
        console.log("[RESEND SANDBOX] Directing to registered account owner mokshagateways@gmail.com");
        res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Moksha Gateways <onboarding@resend.dev>",
            to: ["mokshagateways@gmail.com"],
            subject: `🔔 New Lead: ${lead.name} (${lead.destinationOrPackage || 'Moksha Inquiry'}) - ₹${lead.budgetOrAmount || 'Custom'}`,
            html: htmlContent
          })
        });
        resData = await res.json();
      }

      if (res.ok) {
        console.log(`[EMAIL SENT VIA RESEND] Successfully delivered to mokshagateways@gmail.com (ID: ${resData?.id})`);
        return { sent: true, recipient: "mokshagateways@gmail.com", message: `Notification email delivered to mokshagateways@gmail.com via Resend` };
      } else {
        console.error("[RESEND DELIVERY NOTICE]", resData);
      }
    } catch (resendErr: any) {
      console.error("[RESEND ERROR]", resendErr?.message);
    }
  } else if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport(
        smtpHost
          ? {
              host: smtpHost,
              port: Number(process.env.SMTP_PORT) || 465,
              secure: Number(process.env.SMTP_PORT) === 465 || !process.env.SMTP_PORT,
              auth: { user: smtpUser, pass: smtpPass },
            }
          : {
              service: "gmail",
              auth: { user: smtpUser, pass: smtpPass },
            }
      );

      const info = await transporter.sendMail({
        from: `"Moksha Gateways" <${smtpUser}>`,
        to: recipient,
        subject: `🔔 New Lead: ${lead.name} (${lead.destinationOrPackage || 'Moksha Inquiry'}) - ₹${lead.budgetOrAmount || 'Custom'}`,
        html: htmlContent,
        text: `New Lead Received:\nName: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\nPackage: ${lead.destinationOrPackage}\nAmount: ${lead.budgetOrAmount}\nDate: ${lead.travelDate}\nNotes: ${lead.notes || 'None'}`
      });

      console.log(`[EMAIL NOTIFICATION SENT] Lead notification delivered to ${recipient} (Message ID: ${info.messageId})`);
      return { sent: true, recipient, message: `Notification email sent to ${recipient}` };
    } catch (mailErr: any) {
      console.error(`[EMAIL SENDING ERROR] Failed sending to ${recipient}:`, mailErr?.message);
      let hint = "";
      if (mailErr?.message?.includes("535") || mailErr?.message?.includes("BadCredentials")) {
        hint = " Note: Google Workspace requires a 16-character Google App Password (not standard account password) for SMTP.";
      }
      return { sent: false, recipient, message: `SMTP error: ${mailErr?.message}.${hint} Lead safely recorded.` };
    }
  }

  // Fallback when SMTP is not yet configured: Log clearly to server and file
  console.log(`\n======================================================`);
  console.log(`📢 [NEW LEAD NOTIFICATION READY FOR ${recipient.toUpperCase()}]`);
  console.log(`• Lead ID: ${lead.id}`);
  console.log(`• Customer: ${lead.name} | Phone: ${lead.phone} | Email: ${lead.email}`);
  console.log(`• Destination / Tour: ${lead.destinationOrPackage} (${lead.duration || 'Standard'})`);
  console.log(`• Amount: ₹${lead.budgetOrAmount} | Date: ${lead.travelDate}`);
  console.log(`• Status: Lead recorded in leads.json. (To receive live email in Gmail inbox, set SMTP_USER & SMTP_PASS in .env)`);
  console.log(`======================================================\n`);

  return {
    sent: false,
    recipient,
    message: `Lead saved to server database. Add SMTP_USER and SMTP_PASS in .env to receive live inbox email at ${recipient}.`
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Moksha Gateways API" });
  });

  // Submit Lead endpoint with email notification
  app.post("/api/submit-lead", async (req, res) => {
    try {
      const {
        leadType = "Inquiry",
        name,
        phone,
        email,
        serviceType,
        destinationOrPackage,
        duration,
        travelDate,
        travelersCount,
        budgetOrAmount,
        couponCode,
        notes,
        sourceUrl,
        submittedAt
      } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ success: false, error: "Name and phone number are required to submit a lead." });
      }

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const leadId = `LEAD-${Date.now().toString().slice(-4)}-${randomSuffix}`;

      const leadRecord = {
        id: leadId,
        leadType,
        name: name.trim(),
        phone: phone.trim(),
        email: (email || "").trim(),
        serviceType: serviceType || "holidays",
        destinationOrPackage: destinationOrPackage || "General Inquiry",
        duration: duration || "",
        travelDate: travelDate || "",
        travelersCount: Number(travelersCount) || 1,
        budgetOrAmount: budgetOrAmount || "",
        couponCode: couponCode || "",
        notes: notes || "",
        sourceUrl: sourceUrl || "",
        submittedAt: submittedAt || new Date().toISOString(),
        status: "New Lead"
      };

      // 1. Save lead to local disk/storage
      saveLeadToFile(leadRecord);

      // 2. Dispatch Email Notification
      const emailResult = await sendLeadEmailNotification(leadRecord);

      res.json({
        success: true,
        leadId,
        emailSent: emailResult.sent,
        emailRecipient: emailResult.recipient,
        message: emailResult.sent
          ? `Lead successfully submitted and email notification sent to ${emailResult.recipient}!`
          : `Lead successfully submitted and recorded! (${emailResult.message})`
      });
    } catch (err: any) {
      console.error("Error submitting lead:", err);
      res.status(500).json({ success: false, error: err?.message || "Failed to submit lead" });
    }
  });

  // Get all leads (for admin monitoring)
  app.get("/api/leads", (_req, res) => {
    const leads = getStoredLeads();
    res.json({ success: true, count: leads.length, leads });
  });

  // Check email service status
  app.get("/api/email-status", (_req, res) => {
    const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || "duttshubham68@gmail.com";
    const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
    const hasResend = Boolean(process.env.RESEND_API_KEY);

    res.json({
      recipient,
      configured: hasSmtp || hasResend,
      method: hasSmtp ? "SMTP" : hasResend ? "Resend" : "Local Database & Console Logger",
      instructions: hasSmtp || hasResend
        ? "Email notification is active."
        : `To deliver emails directly to Gmail inbox, configure SMTP_USER & SMTP_PASS in .env. Current destination: ${recipient}`
    });
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
