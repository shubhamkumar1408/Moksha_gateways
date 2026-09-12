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
  Flame
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs border-b border-slate-200/80 bg-slate-50/70">
        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-1.5 text-[#0B2545] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#ff6a00]" />
            <span>Govt. Approved Pilgrimage Partner • IRCTC Authorized</span>
          </div>
          <span className="hidden md:inline text-slate-300">|</span>
          <div className="hidden md:flex items-center gap-2 text-slate-700 hover:text-[#0B2545] transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-[#ff6a00]" />
            <span>Support: <a href="tel:+917352883580" className="text-[#0B2545] hover:text-[#ff6a00] font-bold">7352883580</a></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            id="lang-toggle-btn"
            onClick={onToggleLanguage}
            className="px-2 py-0.5 rounded border border-slate-300 hover:border-[#ff6a00] transition-colors text-slate-700 hover:text-[#0B2545] bg-white cursor-pointer"
          >
            {language === 'EN' ? '🇮🇳 English' : '🇮🇳 हिन्दी'}
          </button>

          <span className="text-slate-500 font-semibold">₹ INR</span>

          <button
            id="header-my-trips-btn"
            onClick={onOpenBookings}
            className="relative flex items-center gap-1.5 text-slate-700 hover:text-[#ff6a00] font-semibold transition-colors cursor-pointer"
          >
            <Luggage className="w-4 h-4 text-[#ff6a00]" />
            <span>{language === 'HI' ? 'मेरी यात्राएं' : 'My Bookings'}</span>
            {bookingsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#ff6a00] text-white font-bold text-[10px] rounded-full">
                {bookingsCount}
              </span>
            )}
          </button>

          <button
            id="header-login-btn"
            onClick={onOpenLoginModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#0B2545] to-[#163864] hover:from-[#ff6a00] hover:to-orange-600 text-white font-bold px-3.5 py-1.5 rounded-full text-xs shadow-sm transition-all transform active:scale-95 cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>{userName ? userName : (language === 'HI' ? 'लॉगिन / साइनअप' : 'Login / Sign Up')}</span>
          </button>
        </div>
      </div>

      {/* Main Logo & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div 
            className="cursor-pointer transition-transform hover:scale-[1.01]" 
            onClick={() => onSelectService('holidays')}
            title="Moksha Gateways Home"
          >
            <MokshaLogo variant="full" theme="light" size="md" />
          </div>

          {/* Service Selector Tabs - Signature MakeMyTrip Horizontal Navigation */}
          <nav className="flex items-center overflow-x-auto no-scrollbar gap-1 sm:gap-2 pb-1 md:pb-0">
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
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ff6a00] to-orange-500 text-white shadow-md shadow-orange-500/25 scale-105'
                      : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-100'
                  } ${item.isSpecial ? 'ring-1 ring-[#ff6a00]/30 bg-orange-50/50' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isSpecial ? 'text-[#ff6a00]' : 'text-slate-500'}`} />
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
    </header>
  );
};
