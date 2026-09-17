import React from 'react';
import { 
  Plane, 
  Building2, 
  Sparkles, 
  Palmtree, 
  TrainTrack, 
  Car, 
  Compass, 
  PhoneCall, 
  Luggage, 
  User, 
  ShieldCheck, 
  Flame,
  Instagram,
  Facebook,
  QrCode
} from 'lucide-react';
import { ServiceType } from '../types';
import { MokshaLogo } from './MokshaLogo';

interface HeaderProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  bookingsCount: number;
  onOpenBookings: () => void;
  onOpenAiPlanner: () => void;
  onOpenLoginModal: () => void;
  userName: string | null;
  language: 'EN' | 'HI';
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeService,
  onSelectService,
  bookingsCount,
  onOpenBookings,
  onOpenAiPlanner,
  onOpenLoginModal,
  userName,
  language,
  onToggleLanguage
}) => {
  const navItems = [
    { id: 'flights' as ServiceType, label: language === 'HI' ? 'उड़ानें' : 'Flights', icon: Plane },
    { id: 'hotels' as ServiceType, label: language === 'HI' ? 'होटल्स' : 'Hotels', icon: Building2 },
    { id: 'yatras' as ServiceType, label: language === 'HI' ? 'मोक्ष यात्रा' : 'Moksha Yatra', icon: Flame, isSpecial: true },
    { id: 'holidays' as ServiceType, label: language === 'HI' ? 'हॉलिडे पैकेज' : 'Holidays', icon: Palmtree },
    { id: 'trains' as ServiceType, label: language === 'HI' ? 'ट्रेनें' : 'Trains', icon: TrainTrack },
    { id: 'cabs' as ServiceType, label: language === 'HI' ? 'कैब्स' : 'Cabs', icon: Car },
    { id: 'ai-planner' as ServiceType, label: 'AI THAPA - Trip Planner', icon: Sparkles, isAi: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md text-slate-900 shadow-sm border-b border-slate-200">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between text-[11px] sm:text-xs border-b border-slate-200/80 bg-slate-50/70 w-full">
        <div className="flex items-center gap-2 sm:gap-4 text-slate-600 min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 text-[#0B2545] font-semibold truncate">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff6a00] shrink-0" />
            <span className="hidden md:inline">Govt. Approved Pilgrimage Partner • </span>
            <span className="truncate">IRCTC Authorized</span>
          </div>
          <span className="hidden md:inline text-slate-300">|</span>
          <div className="hidden md:flex items-center gap-2 text-slate-700 hover:text-[#0B2545] transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-[#ff6a00]" />
            <span>Support: <a href="tel:+917352883580" className="text-[#0B2545] hover:text-[#ff6a00] font-bold">7352883580</a></span>
          </div>

          <span className="hidden lg:inline text-slate-300">|</span>

          {/* Social Links */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://www.instagram.com/moksha_getaways?stkn=MXc2NnVoMjY5a2VsYg=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-600 hover:text-[#fd1d1d] transition-colors font-medium text-[11px]"
              title="Instagram @moksha_getaways"
            >
              <Instagram className="w-3.5 h-3.5 text-[#e1306c]" />
              <span>Instagram</span>
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="https://www.facebook.com/share/1Bp3mEHYUn/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-600 hover:text-[#1877F2] transition-colors font-medium text-[11px]"
              title="Facebook Moksha Gateways"
            >
              <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button 
            id="lang-toggle-btn"
            onClick={onToggleLanguage}
            className="px-1.5 sm:px-2 py-0.5 rounded border border-slate-300 hover:border-[#ff6a00] transition-colors text-slate-700 hover:text-[#0B2545] bg-white cursor-pointer whitespace-nowrap text-[10px] sm:text-xs"
          >
            {language === 'EN' ? '🇮🇳 EN' : '🇮🇳 हिं'}
          </button>

          <span className="hidden sm:inline text-slate-500 font-semibold">₹ INR</span>

          <button
            id="header-my-trips-btn"
            onClick={onOpenBookings}
            className="relative flex items-center gap-1 text-slate-700 hover:text-[#ff6a00] font-semibold transition-colors cursor-pointer text-[11px] sm:text-xs px-1"
          >
            <Luggage className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff6a00] shrink-0" />
            <span className="hidden xs:inline sm:inline">{language === 'HI' ? 'यात्राएं' : 'Bookings'}</span>
            {bookingsCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#ff6a00] text-white font-bold text-[10px] rounded-full">
                {bookingsCount}
              </span>
            )}
          </button>

          <button
            id="header-login-btn"
            onClick={onOpenLoginModal}
            className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-[#0B2545] to-[#163864] hover:from-[#ff6a00] hover:to-orange-600 text-white font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs shadow-sm transition-all transform active:scale-95 cursor-pointer max-w-[105px] sm:max-w-none truncate"
          >
            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">{userName ? userName : (language === 'HI' ? 'लॉगिन' : 'Login')}</span>
          </button>
        </div>
      </div>

      {/* Main Logo & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 bg-white w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 sm:gap-4 w-full min-w-0">
          {/* Logo & Brand Identity */}
          <div 
            className="cursor-pointer transition-transform hover:scale-[1.01] shrink-0" 
            onClick={() => onSelectService('holidays')}
            title="Moksha Gateways Home"
          >
            <MokshaLogo variant="full" theme="light" size="md" />
          </div>

          {/* Service Selector Tabs - Signature MakeMyTrip Horizontal Navigation */}
          <div className="w-full min-w-0 overflow-x-auto no-scrollbar -mx-3 sm:mx-0 px-3 sm:px-0">
            <nav className="flex items-center gap-1 sm:gap-2 pb-1 md:pb-0 w-max min-w-full">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeService === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-service-${item.id}`}
                    onClick={() => {
                      if (item.id === 'ai-planner') {
                        onOpenAiPlanner();
                      } else {
                        onSelectService(item.id);
                      }
                    }}
                    className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ff6a00] to-orange-500 text-white shadow-md shadow-orange-500/25 scale-105'
                        : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-100'
                    } ${item.isSpecial ? 'ring-1 ring-[#ff6a00]/30 bg-orange-50/50' : ''}`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : item.isSpecial ? 'text-[#ff6a00]' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                    {item.isSpecial && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] animate-ping" />
                    )}
                    {item.isAi && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-orange-100 text-[#ff6a00] border border-orange-200">
                        AI THAPA
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
