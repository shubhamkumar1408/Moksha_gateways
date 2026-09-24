import React, { useState, useMemo } from 'react';
import { 
  Palmtree, 
  Star, 
  Clock, 
  MapPin, 
  Globe, 
  Search, 
  Sparkles, 
  Check, 
  ChevronRight, 
  X, 
  Eye, 
  Compass,
  Filter,
  ShieldCheck,
  Calendar,
  MessageCircle,
  QrCode,
  Share2,
  Tag,
  Copy,
  PhoneCall
} from 'lucide-react';
import { HolidayPackage } from '../types';
import { MOCK_HOLIDAYS } from '../data/mockData';

interface HolidaysSectionProps {
  onBookHoliday: (holiday: HolidayPackage) => void;
  onQuickQrPay?: (holiday: HolidayPackage) => void;
  onSelectDestination?: (holiday: HolidayPackage) => void;
  onOpenLeadModal?: (holiday?: HolidayPackage) => void;
}

export const HolidaysSection: React.FC<HolidaysSectionProps> = ({ 
  onBookHoliday,
  onQuickQrPay,
  onSelectDestination,
  onOpenLeadModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePackageModal, setActivePackageModal] = useState<HolidayPackage | null>(null);
  const [selectedDurationByPkg, setSelectedDurationByPkg] = useState<Record<string, number>>({});
  const [isCouponCopied, setIsCouponCopied] = useState<boolean>(false);

  const handleCopyFirst501 = () => {
    navigator.clipboard.writeText('FIRST501');
    setIsCouponCopied(true);
    setTimeout(() => setIsCouponCopied(false), 2500);
  };

  const handleOpenDestination = (pkg: HolidayPackage) => {
    if (onSelectDestination) {
      onSelectDestination(pkg);
    } else {
      setActivePackageModal(pkg);
    }
  };

  // Category Tabs
  const categories = [
    { id: 'all', label: 'All Packages', count: MOCK_HOLIDAYS.length },
    { 
      id: 'kashmir', 
      label: '❄️ Kashmir Paradise', 
      count: MOCK_HOLIDAYS.filter(p => p.category === 'kashmir').length 
    },
    { 
      id: 'himachal', 
      label: 'Himachal Pradesh', 
      count: MOCK_HOLIDAYS.filter(p => p.category === 'himachal').length 
    },
    { 
      id: 'uttarakhand', 
      label: 'Uttarakhand (Chakrata & Sacred)', 
      count: MOCK_HOLIDAYS.filter(p => p.category === 'uttarakhand' || p.category === 'sacred').length 
    },
    { 
      id: 'ladakh', 
      label: 'Leh Ladakh', 
      count: MOCK_HOLIDAYS.filter(p => p.category === 'ladakh').length 
    },
    { 
      id: 'rajasthan', 
      label: '🏰 Royal Rajasthan', 
      count: MOCK_HOLIDAYS.filter(p => p.category === 'rajasthan').length 
    },
    { 
      id: 'international', 
      label: 'International', 
      count: MOCK_HOLIDAYS.filter(p => p.isInternational || p.category === 'international').length 
    }
  ];

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return MOCK_HOLIDAYS.filter(pkg => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === 'kashmir') {
        matchesCategory = pkg.category === 'kashmir';
      } else if (selectedCategory === 'himachal') {
        matchesCategory = pkg.category === 'himachal';
      } else if (selectedCategory === 'uttarakhand') {
        matchesCategory = pkg.category === 'uttarakhand' || pkg.category === 'sacred';
      } else if (selectedCategory === 'ladakh') {
        matchesCategory = pkg.category === 'ladakh';
      } else if (selectedCategory === 'rajasthan') {
        matchesCategory = pkg.category === 'rajasthan';
      } else if (selectedCategory === 'international') {
        matchesCategory = Boolean(pkg.isInternational || pkg.category === 'international');
      }

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        pkg.title.toLowerCase().includes(query) ||
        (pkg.location && pkg.location.toLowerCase().includes(query)) ||
        (pkg.region && pkg.region.toLowerCase().includes(query)) ||
        (pkg.reasonToVisit && pkg.reasonToVisit.toLowerCase().includes(query)) ||
        pkg.destination.toLowerCase().includes(query) ||
        pkg.theme.toLowerCase().includes(query) ||
        pkg.tags.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="holidays-section" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 w-full min-w-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b1b2d] via-[#102744] to-[#15345a] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white mb-6 sm:mb-8 shadow-xl relative overflow-hidden border border-orange-500/20 w-full min-w-0">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#ff6a00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <span className="text-[#ff6a00] font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Palmtree className="w-4 h-4 text-[#ff6a00]" />
            <span>Moksha Gateways Holiday & Mountain Expeditions</span>
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-white font-['Cinzel'] tracking-wide">
            Himalayan Treks, Royal Rajasthan & International Getaways
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Explore Himalayan treks & village retreats (Rasol Trek, Spiti, Manali-Kasol, Jibhi, Chopta), Royal Rajasthan palaces & desert dunes (Udaipur, Jaisalmer, Mount Abu), and exotic international escapes across Vietnam, Thailand, Bali & Bhutan.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 relative z-10 items-stretch sm:items-center justify-between">
          {/* Quick Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination (e.g. Rasol, Kasol, Spiti, Udaipur, Bali)..."
              className="w-full pl-10 pr-8 py-2.5 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-xl text-xs text-white placeholder-slate-300 focus:outline-hidden focus:border-[#ff6a00] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#ff6a00] to-orange-500 text-white shadow-md shadow-orange-950/40 font-black'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                }`}
              >
                {cat.id === 'international' && <Globe className="w-3.5 h-3.5" />}
                {cat.id === 'himachal' && <Compass className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-black/25 text-white font-black' : 'bg-white/20 text-orange-200'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* First Booking Coupon Promotional Banner */}
      <div className="mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-2xl p-3.5 sm:p-4 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner">
            <Sparkles className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-orange-700">
                First Booking Special Offer
              </span>
              <span className="text-xs font-black text-amber-100">
                Flat ₹501 OFF with Coupon Code
              </span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
              Manali: 2N/3D @ ₹5,999 (effective ₹5,498) & 3N/4D @ ₹6,999 (effective ₹6,498)!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/30 font-mono font-black text-sm tracking-wider text-amber-300">
            FIRST501
          </div>
          <button
            type="button"
            onClick={handleCopyFirst501}
            className="px-3 py-1.5 bg-white hover:bg-orange-50 text-orange-700 font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1"
          >
            {isCouponCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCouponCopied ? 'Copied ₹501 OFF' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Package Grid */}
      {filteredPackages.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-slate-200 shadow-xs">
          <Compass className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-base font-bold text-slate-800">No packages found for "{searchQuery}"</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing filters or search for Spiti, Bali, Vietnam, Kasol, or Kedarnath.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
          {filteredPackages.map((pkg) => {
            const hasOptions = Boolean(pkg.durationOptions && pkg.durationOptions.length > 1);
            const activeDurationIdx = selectedDurationByPkg[pkg.id] ?? (pkg.durationOptions ? (pkg.durationOptions.findIndex(o => o.nights === 3) >= 0 ? pkg.durationOptions.findIndex(o => o.nights === 3) : 0) : 0);
            const activeOption = pkg.durationOptions ? pkg.durationOptions[activeDurationIdx] : null;
            const currentPrice = activeOption ? activeOption.price : pkg.price;
            const currentOriginalPrice = activeOption ? activeOption.originalPrice : pkg.originalPrice;
            const currentDuration = activeOption ? activeOption.duration : pkg.duration;

            const packageForAction: HolidayPackage = {
              ...pkg,
              price: currentPrice,
              originalPrice: currentOriginalPrice,
              duration: currentDuration,
              nights: activeOption ? activeOption.nights : pkg.nights,
              days: activeOption ? activeOption.days : pkg.days
            };

            return (
              <div
                key={pkg.id}
                id={`holiday-card-${pkg.id}`}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group w-full min-w-0"
              >
                <div>
                  {/* Image & Badges - Clickable to open full destination page */}
                  <div 
                    onClick={() => handleOpenDestination(packageForAction)}
                    className="h-52 relative overflow-hidden cursor-pointer"
                    title={`View full details & itinerary for ${pkg.title}`}
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/10 shadow-xs flex items-center gap-1">
                        {pkg.isInternational ? <Globe className="w-3 h-3 text-cyan-400" /> : <Compass className="w-3 h-3 text-amber-400" />}
                        <span>{pkg.theme}</span>
                      </span>

                      {pkg.badge && (
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    {/* Bottom Duration & Rating over image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs pointer-events-none">
                      <div className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 border border-white/15">
                        <Clock className="w-3.5 h-3.5 text-teal-400" />
                        <span>{currentDuration}</span>
                      </div>

                      <div className="bg-white/95 px-2 py-0.5 rounded-lg text-[11px] font-black text-slate-900 flex items-center gap-1 shadow-xs">
                        ⭐ {pkg.rating} <span className="text-slate-500 font-normal">({pkg.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Package Details */}
                  <div className="p-5 pb-3">
                    {/* Location & Region Badges */}
                    <div className="flex flex-col gap-1.5 mb-2.5">
                      {pkg.location && (
                        <div className="flex items-center gap-1.5 text-xs text-teal-900 font-bold bg-teal-50/90 px-2.5 py-1 rounded-lg border border-teal-200/60">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate">{pkg.location}</span>
                        </div>
                      )}
                      {pkg.region && (
                        <div className="flex items-center gap-1.5 text-[11px] text-amber-900 font-bold bg-amber-50/90 px-2 py-0.5 rounded-md border border-amber-200/60 w-fit">
                          <Compass className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>Region: {pkg.region}</span>
                        </div>
                      )}
                    </div>

                    <h3 
                      onClick={() => handleOpenDestination(packageForAction)}
                      className="text-base font-black text-slate-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-teal-700 transition-colors cursor-pointer"
                      title={`Click to open full page for ${pkg.title}`}
                    >
                      {pkg.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-2.5">
                      {pkg.destination}
                    </p>

                    {/* Duration Options Selector (for Manali & multi-duration packages) */}
                    {hasOptions && (
                      <div className="mb-3 p-2.5 bg-gradient-to-r from-orange-50/90 to-amber-50/80 rounded-xl border border-orange-200">
                        <div className="flex items-center justify-between text-[11px] font-black text-slate-800 mb-1.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-orange-600" />
                            <span>Select Duration:</span>
                          </span>
                          <span className="text-[10px] text-orange-800 font-extrabold bg-orange-100 px-1.5 py-0.2 rounded">
                            2 Options Available
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {pkg.durationOptions!.map((opt, optIdx) => (
                            <button
                              key={opt.duration}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDurationByPkg(prev => ({ ...prev, [pkg.id]: optIdx }));
                              }}
                              className={`py-1.5 px-2 rounded-lg text-left transition-all cursor-pointer border ${
                                activeDurationIdx === optIdx
                                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-1 ring-orange-400'
                                  : 'bg-white text-slate-800 border-slate-200 hover:border-orange-300'
                              }`}
                            >
                              <div className="text-[11px] font-extrabold truncate">{opt.duration}</div>
                              <div className="text-xs font-black text-[#ff6a00] font-mono mt-0.5">
                                ₹{opt.price.toLocaleString('en-IN')}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* First Booking Discount Pill */}
                    <div className="mb-3 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1 text-[11px]">
                      <div className="flex items-center gap-1 font-bold text-amber-900 truncate">
                        <Tag className="w-3 h-3 text-[#ff6a00] shrink-0" />
                        <span>Code: <strong className="text-slate-900 font-mono">FIRST501</strong> (₹501 OFF)</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyFirst501();
                        }}
                        className="text-[10px] font-black text-orange-700 hover:text-orange-900 uppercase cursor-pointer shrink-0 ml-1.5"
                      >
                        {isCouponCopied ? 'Copied!' : 'Copy Code'}
                      </button>
                    </div>

                    {/* Why Visit / Reason */}
                    {pkg.reasonToVisit && (
                      <div className="mb-3 bg-gradient-to-r from-orange-50/90 to-amber-50/70 p-2.5 rounded-xl border border-orange-200/70">
                        <div className="flex items-center gap-1 text-[11px] font-black text-orange-950 uppercase tracking-wide mb-1">
                          <Sparkles className="w-3 h-3 text-[#ff6a00]" />
                          <span>Why Visit</span>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-relaxed line-clamp-2">
                          {pkg.reasonToVisit}
                        </p>
                      </div>
                    )}

                    {/* Highlights Bullet Preview */}
                    {pkg.highlights && pkg.highlights.length > 0 && (
                      <div className="space-y-1 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {pkg.highlights.slice(0, 2).map((hl, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700 leading-tight">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {pkg.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through">
                      ₹{currentOriginalPrice.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-slate-900">
                        ₹{currentPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">/ person</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://wa.me/919334789099?text=Namaste%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(packageForAction.title)}%20(${encodeURIComponent(packageForAction.duration)}%20-%20Rs.${packageForAction.price})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      title="Chat on WhatsApp (+91 9334789099)"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </a>

                    {onQuickQrPay && (
                      <button
                        type="button"
                        onClick={() => onQuickQrPay(packageForAction)}
                        className="p-2 bg-gradient-to-r from-[#00baf2] to-[#002970] hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                        title="Direct Paytm UPI QR Payment & Booking"
                      >
                        <QrCode className="w-3.5 h-3.5 text-white" />
                        <span className="hidden sm:inline">QR Pay</span>
                      </button>
                    )}

                    {/* Details / Full Page View Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenDestination(packageForAction)}
                      className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      title={`Open dedicated page for ${packageForAction.title}`}
                    >
                      <Eye className="w-3.5 h-3.5 text-teal-600" />
                      <span>View Page</span>
                    </button>

                    <button
                      type="button"
                      id={`book-holiday-btn-${pkg.id}`}
                      onClick={() => onBookHoliday(packageForAction)}
                      className="px-3 sm:px-4 py-2 bg-gradient-to-r from-[#ff6a00] to-orange-600 hover:from-orange-500 hover:to-[#ff6a00] text-white font-extrabold text-xs rounded-xl shadow-md shadow-orange-950/30 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>BOOK</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Package Detail Modal */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-6 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-teal-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {activePackageModal.duration}
                </span>
                <button
                  onClick={() => setActivePackageModal(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold font-['Cinzel'] leading-tight">
                {activePackageModal.title}
              </h3>

              {/* Exact Location & Region */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {activePackageModal.location && (
                  <div className="flex items-center gap-1.5 text-xs text-teal-200">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{activePackageModal.location}</span>
                  </div>
                )}
                {activePackageModal.region && (
                  <span className="text-[11px] bg-amber-400/20 text-amber-200 border border-amber-300/30 px-2 py-0.5 rounded-md font-semibold">
                    📍 {activePackageModal.region}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5">
              {/* Reason to Visit */}
              {activePackageModal.reasonToVisit && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200/80">
                  <h4 className="text-xs font-black uppercase text-orange-900 tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#ff6a00]" />
                    <span>Why Visit This Destination</span>
                  </h4>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {activePackageModal.reasonToVisit}
                  </p>
                </div>
              )}

              {/* Highlights */}
              {activePackageModal.highlights && (
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Package Highlights</span>
                  </h4>
                  <div className="bg-teal-50/60 rounded-xl p-3.5 border border-teal-100 space-y-2">
                    {activePackageModal.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions */}
              {activePackageModal.inclusions && (
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Inclusions</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activePackageModal.inclusions.map((inc, i) => (
                      <span key={i} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-3 py-1 rounded-lg font-medium">
                        ✓ {inc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Day-by-Day Itinerary */}
              {activePackageModal.itinerary && activePackageModal.itinerary.length > 0 && (
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Day-by-Day Plan</span>
                  </h4>
                  <div className="space-y-4">
                    {activePackageModal.itinerary.map((day) => (
                      <div key={day.day} className="border-l-2 border-teal-500 pl-4 relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-teal-500 absolute -left-[6px] top-1" />
                        <h5 className="text-xs font-black text-slate-900">
                          Day {day.day}: {day.title}
                        </h5>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 font-medium block">All inclusive price:</span>
                <div className="text-2xl font-black text-slate-900">
                  ₹{activePackageModal.price.toLocaleString('en-IN')}
                  <span className="text-xs text-slate-500 font-normal"> / person</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://wa.me/919334789099?text=Namaste%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(activePackageModal.title)}%20(${encodeURIComponent(activePackageModal.duration)}%20-%20Rs.${activePackageModal.price})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp (+91 9334789099)</span>
                </a>

                {onOpenLeadModal && (
                  <button
                    type="button"
                    onClick={() => {
                      const toInquire = activePackageModal;
                      setActivePackageModal(null);
                      onOpenLeadModal(toInquire);
                    }}
                    className="px-3.5 sm:px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-4 h-4 text-[#ff6a00]" />
                    <span>Request Callback</span>
                  </button>
                )}

                {onQuickQrPay && (
                  <button
                    type="button"
                    onClick={() => {
                      const toBook = activePackageModal;
                      setActivePackageModal(null);
                      onQuickQrPay(toBook);
                    }}
                    className="px-4 py-2.5 bg-gradient-to-r from-[#00baf2] via-[#052b61] to-[#002970] hover:opacity-95 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 border border-sky-300"
                  >
                    <QrCode className="w-4 h-4 text-[#00baf2]" />
                    <span>⚡ DIRECT QR PAY & BOOK</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    const toBook = activePackageModal;
                    setActivePackageModal(null);
                    onBookHoliday(toBook);
                  }}
                  className="px-5 sm:px-6 py-2.5 bg-gradient-to-r from-[#ff6a00] to-orange-600 hover:from-orange-500 hover:to-[#ff6a00] text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                >
                  PROCEED TO BOOK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
