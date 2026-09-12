import React from 'react';
import { Compass, PhoneCall, Mail, ShieldCheck, Heart, Flame } from 'lucide-react';
import { MokshaLogo } from './MokshaLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#081524] text-slate-400 text-xs border-t border-slate-800">
      {/* Top Links Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-3">
            <MokshaLogo variant="full" theme="dark" size="md" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India's premier travel & spiritual booking portal. Making holidays, Himalayan treks, and pilgrimages effortless with verified temple passes, certified satvik cuisine, helicopter reservations, luxury stays, and 24x7 support.
            </p>
            <div className="pt-2 text-slate-300 space-y-2">
              <a 
                href="https://wa.me/917352883580?text=Namaste%20Moksha%20Gateways%2C%20I%20would%20like%20to%20inquire%20about%20holiday%20and%20yatra%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>💬 Direct WhatsApp: +91 7352883580</span>
              </a>
              <div className="flex items-center gap-2 text-xs">
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Call / WhatsApp: <a href="tel:+917352883580" className="text-white hover:text-amber-400 font-bold">7352883580</a></span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Email: <a href="mailto:support@mokshagateways.com" className="text-white hover:text-amber-400 font-semibold">support@mokshagateways.com</a></span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-amber-400">📍</span>
                <span>Office: <strong>Sector 49 Noida, near Hanuman Mandir</strong>, Uttar Pradesh</span>
              </div>
            </div>
          </div>

          {/* Col 2: Top Yatras */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Sacred Yatras 2026
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-amber-400">Char Dham Helicopter Tour</a></li>
              <li><a href="#" className="hover:text-amber-400">Kedarnath & Badrinath Do Dham</a></li>
              <li><a href="#" className="hover:text-amber-400">Kashi Vishwanath Sugam Darshan</a></li>
              <li><a href="#" className="hover:text-amber-400">Ayodhya Ram Mandir Tour</a></li>
              <li><a href="#" className="hover:text-amber-400">Tirupati Balaji Sheegra Darshan</a></li>
              <li><a href="#" className="hover:text-amber-400">12 Jyotirlinga Mahayatra</a></li>
            </ul>
          </div>

          {/* Col 3: Popular Flights */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Top Flight Routes
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-amber-400">Delhi to Varanasi Flights</a></li>
              <li><a href="#" className="hover:text-amber-400">Delhi to Dehradun Flights</a></li>
              <li><a href="#" className="hover:text-amber-400">Delhi to Ayodhya Flights</a></li>
              <li><a href="#" className="hover:text-amber-400">Bangalore to Tirupati Flights</a></li>
              <li><a href="#" className="hover:text-amber-400">Mumbai to Goa Flights</a></li>
              <li><a href="#" className="hover:text-amber-400">Delhi to Srinagar Flights</a></li>
            </ul>
          </div>

          {/* Col 4: Trust & Partner Badges */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Security & Credentials
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>IRCTC Authorized Partner</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>IATA Accredited Agency</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span>100% PCI-DSS Encrypted</span>
              </li>
              <li className="flex items-center gap-1.5 text-amber-400">
                <Flame className="w-3.5 h-3.5" />
                <span>Temple Trust Coordinated</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Moksha Gateways India Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Terms of Pilgrimage</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Yatra Advisory</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
