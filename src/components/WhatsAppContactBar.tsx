import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ExternalLink, Clock, Instagram, Facebook } from 'lucide-react';
import { MokshaLogo } from './MokshaLogo';

export const WhatsAppContactBar: React.FC = () => {
  const phoneNumber = '9334789099';
  const altPhone = '7352883580';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=Namaste%20Shubham%20%2F%20Moksha%20Gateways%2C%20I%20am%20interested%20in%20direct%20booking%20and%20packages.%20Please%20guide%20me.`;
  const instagramUrl = 'https://www.instagram.com/moksha_getaways?stkn=MXc2NnVoMjY5a2VsYg==';
  const facebookUrl = 'https://www.facebook.com/share/1Bp3mEHYUn/';

  return (
    <>
      {/* 1. Bottom Fixed Quick Contact Banner */}
      <section className="bg-gradient-to-r from-[#081729] via-[#0e243d] to-[#081729] text-white border-t border-[#ff6a00]/30 py-6 px-3 sm:px-6 lg:px-8 w-full min-w-0 max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 w-full">
            {/* Left Info: Direct Contact & Office Details */}
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Direct WhatsApp & 24x7 Desk</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white font-['Cinzel'] tracking-wide">
                Need Instant Help or Custom Group Package?
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Chat directly on WhatsApp with our destination experts or visit our Noida office for personalized holiday & pilgrimage itineraries.
              </p>

              {/* Badges: Phone, Email, Address */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs">
                <a
                  href={`tel:+91${phoneNumber}`}
                  className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call: <strong>+91 {phoneNumber}</strong></span>
                </a>

                <a
                  href={`tel:+91${altPhone}`}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white font-medium transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
                >
                  <span>Helpline: +91 {altPhone}</span>
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

              <div className="flex items-center gap-2">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                  title="Instagram: @moksha_getaways"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>

                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                  title="Facebook: Moksha Gateways"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Action Controls (Bottom Right - Clean WhatsApp Button Only) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
        <a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-2xl shadow-emerald-900/50 flex items-center justify-center cursor-pointer transition-all transform hover:scale-110 active:scale-95 relative group"
          title={`Direct WhatsApp: +91 ${phoneNumber}`}
          aria-label="Direct WhatsApp Chat"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
        </a>
      </div>
    </>
  );
};
