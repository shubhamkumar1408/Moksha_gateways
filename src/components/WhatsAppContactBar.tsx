import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ExternalLink, Clock } from 'lucide-react';
import { MokshaLogo } from './MokshaLogo';

export const WhatsAppContactBar: React.FC = () => {
  const phoneNumber = '7352883580';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=Namaste%20Moksha%20Gateways%2C%20I%20am%20interested%20in%20Holiday%20%2F%20Pilgrimage%20packages.%20Please%20share%20details.`;

  return (
    <>
      {/* 1. Bottom Fixed Quick Contact Banner */}
      <section className="bg-gradient-to-r from-[#081729] via-[#0e243d] to-[#081729] text-white border-t border-[#ff6a00]/30 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left Info: Direct Contact & Office Details */}
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Direct WhatsApp & Customer Support</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white font-['Cinzel'] tracking-wide">
                Need Instant Help or Custom Group Package?
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Chat directly on WhatsApp with our destination experts or visit our Noida office for personalized holiday & pilgrimage itineraries.
              </p>

              {/* Badges: Phone, Email, Address */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs">
                <a
                  href={`tel:+91${phoneNumber}`}
                  className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call: <strong>{phoneNumber}</strong></span>
                </a>

                <a
                  href="mailto:support@mokshagateways.com"
                  className="flex items-center gap-1.5 text-teal-300 hover:text-teal-200 font-bold transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-400" />
                  <span>support@mokshagateways.com</span>
                </a>

                <div className="flex items-center gap-1.5 text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Sector 49 Noida, near Hanuman Mandir</span>
                </div>
              </div>
            </div>

            {/* Right Action: Big Direct WhatsApp Chat Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                id="direct-whatsapp-footer-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-900/40 hover:shadow-emerald-600/30 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                </div>
                <span>DIRECT CHAT ON WHATSAPP</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="mailto:support@mokshagateways.com?subject=Package%20Inquiry%20-%20Moksha%20Gateways"
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-white/20 transition-all text-center"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating WhatsApp Sticky Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-2xl shadow-emerald-900/50 flex items-center justify-center cursor-pointer transition-all transform hover:scale-110 active:scale-95 relative group"
          title="Direct WhatsApp: 7352883580"
          aria-label="Direct WhatsApp Chat"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
        </a>
      </div>
    </>
  );
};
