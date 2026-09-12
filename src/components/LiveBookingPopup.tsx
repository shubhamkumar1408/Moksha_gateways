import React, { useState, useEffect } from 'react';
import { CheckCircle2, Flame, MapPin, X, Sparkles, Compass } from 'lucide-react';

interface RecentBooking {
  id: string;
  name: string;
  city: string;
  packageTitle: string;
  category: 'Himalayan Trek' | 'Sacred Yatra' | 'International' | 'Adventure';
  timeAgo: string;
  avatarColor: string;
  initials: string;
  priceTag: string;
  destinationIcon: string;
}

const RECENT_BOOKINGS: RecentBooking[] = [
  {
    id: 'b1',
    name: 'Rahul & Tanya Sharma',
    city: 'Delhi NCR',
    packageTitle: 'Spiti Valley 4x4 Off-road Expedition (7D/6N)',
    category: 'Himalayan Trek',
    timeAgo: 'Just now',
    avatarColor: 'from-blue-600 to-indigo-700',
    initials: 'RS',
    priceTag: '₹22,999/p',
    destinationIcon: '🏔️'
  },
  {
    id: 'b2',
    name: 'Sunita Verma & Family',
    city: 'Ahmedabad, Gujarat',
    packageTitle: 'Char Dham Yatra with VIP Helicopter Pass',
    category: 'Sacred Yatra',
    timeAgo: '2 mins ago',
    avatarColor: 'from-amber-500 to-orange-600',
    initials: 'SV',
    priceTag: '₹48,500/p',
    destinationIcon: '🛕'
  },
  {
    id: 'b3',
    name: 'Amitabh Sen',
    city: 'Kolkata, WB',
    packageTitle: 'Kedarnath Dham Trek & Sevadar Priority Pass',
    category: 'Sacred Yatra',
    timeAgo: '4 mins ago',
    avatarColor: 'from-emerald-600 to-teal-700',
    initials: 'AS',
    priceTag: '₹14,999/p',
    destinationIcon: '🕉️'
  },
  {
    id: 'b4',
    name: 'Pooja & Vikram Hegde',
    city: 'Bangalore, KA',
    packageTitle: 'Bali Tropical Villa & Nusa Penida Island Tour',
    category: 'International',
    timeAgo: '6 mins ago',
    avatarColor: 'from-rose-500 to-pink-600',
    initials: 'VH',
    priceTag: '₹34,500/p',
    destinationIcon: '🌴'
  },
  {
    id: 'b5',
    name: 'Karan Mehra & Group (5 Pax)',
    city: 'Chandigarh',
    packageTitle: 'Leh Ladakh Himalayan Bike Safari with Pangong Tso',
    category: 'Adventure',
    timeAgo: '9 mins ago',
    avatarColor: 'from-cyan-600 to-blue-700',
    initials: 'KM',
    priceTag: '₹28,500/p',
    destinationIcon: '🏍️'
  },
  {
    id: 'b6',
    name: 'Dr. Anand Joshi',
    city: 'Pune, Maharashtra',
    packageTitle: 'Kashmir Paradise: Srinagar Houseboat & Gulmarg Gondola',
    category: 'Himalayan Trek',
    timeAgo: '12 mins ago',
    avatarColor: 'from-violet-600 to-purple-800',
    initials: 'AJ',
    priceTag: '₹26,999/p',
    destinationIcon: '❄️'
  },
  {
    id: 'b7',
    name: 'Manish Tiwari & Parents',
    city: 'Lucknow, UP',
    packageTitle: 'Varanasi Ganga Aarti & Ayodhya Ram Mandir Darshan',
    category: 'Sacred Yatra',
    timeAgo: '15 mins ago',
    avatarColor: 'from-orange-500 to-amber-600',
    initials: 'MT',
    priceTag: '₹16,499/p',
    destinationIcon: '🪔'
  },
  {
    id: 'b8',
    name: 'Neha & Siddharth Rao',
    city: 'Mumbai, MH',
    packageTitle: 'Kasol, Tosh & Kheerganga Stargazing Trek',
    category: 'Adventure',
    timeAgo: '18 mins ago',
    avatarColor: 'from-teal-500 to-emerald-700',
    initials: 'NR',
    priceTag: '₹8,999/p',
    destinationIcon: '⛺'
  }
];

interface LiveBookingPopupProps {
  onSelectDestination?: (title: string) => void;
}

export const LiveBookingPopup: React.FC<LiveBookingPopupProps> = ({ onSelectDestination }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Initial delay before first popup shows
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (isDismissed || isPaused) return;

    // Show duration: 6 seconds, then hide for 2.5 seconds, then switch to next
    const displayTimer = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_BOOKINGS.length);
        setIsVisible(true);
      }, 1500);
    }, 7000);

    return () => clearInterval(displayTimer);
  }, [isDismissed, isPaused]);

  if (isDismissed) return null;

  const current = RECENT_BOOKINGS[currentIndex];

  return (
    <div
      id="live-booking-toast-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`fixed bottom-6 left-4 sm:left-6 z-40 max-w-[340px] sm:max-w-[370px] w-full transition-all duration-500 ease-out transform ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
          : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-slate-200/90 shadow-slate-900/15 relative overflow-hidden group hover:shadow-orange-500/10 hover:border-orange-200 transition-all">
        {/* Subtle Brand Highlight Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B2545] via-[#ff6a00] to-[#0B2545]" />

        {/* Close Button */}
        <button
          id="close-booking-popup-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
          title="Dismiss live updates"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-start gap-3">
          {/* Avatar Icon / Initial */}
          <div className="relative shrink-0 mt-0.5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${current.avatarColor} text-white flex items-center justify-center font-bold text-xs shadow-md`}>
              {current.initials}
            </div>
            <span className="absolute -bottom-1 -right-1 text-sm leading-none filter drop-shadow">
              {current.destinationIcon}
            </span>
          </div>

          {/* Booking Information */}
          <div className="flex-1 min-w-0 pr-4">
            {/* Header Badge */}
            <div className="flex items-center gap-1.5 text-[10px] mb-1">
              <span className="flex items-center gap-1 font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Booking Verified
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-semibold">{current.timeAgo}</span>
            </div>

            {/* Customer & Location */}
            <div className="text-xs text-slate-800 font-semibold truncate">
              <strong className="text-slate-950 font-black">{current.name}</strong> from {current.city}
            </div>

            {/* Package Title */}
            <div className="text-xs font-bold text-[#0B2545] group-hover:text-[#ff6a00] transition-colors line-clamp-1 mt-0.5">
              {current.packageTitle}
            </div>

            {/* Price Tag & Category */}
            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-100 text-[11px]">
              <span className="text-slate-500 font-medium">{current.category}</span>
              <span className="font-extrabold text-[#ff6a00] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                {current.priceTag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
