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
  MessageCircle
} from 'lucide-react';
import { HolidayPackage } from '../types';
import { MOCK_HOLIDAYS } from '../data/mockData';

interface HolidaysSectionProps {
  onBookHoliday: (holiday: HolidayPackage) => void;
}

export const HolidaysSection: React.FC<HolidaysSectionProps> = ({ onBookHoliday }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePackageModal, setActivePackageModal] = useState<HolidayPackage | null>(null);

  // Category Tabs
  const categories = [
    { id: 'all', label: 'All Packages', count: MOCK_HOLIDAYS.length },
    { 
      id: 'himachal', 
      label: 'Himachal Pradesh', 
      count: MOCK_HOLIDAYS.filter(p => p.category === 'himachal').length 
    },
    { 
      id: 'uttarakhand', 
      label: 'Uttarakhand & Sacred', 
      count: MOCK_HOLIDAYS.filter(p => p.category === 'uttarakhand' || p.category === 'sacred').length 
    },
    { 
      id: 'ladakh', 
      label: 'Leh Ladakh', 
      count: MOCK_HOLIDAYS.filter(p => p.category === 'ladakh').length 
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
      if (selectedCategory === 'himachal') {
        matchesCategory = pkg.category === 'himachal';
      } else if (selectedCategory === 'uttarakhand') {
        matchesCategory = pkg.category === 'uttarakhand' || pkg.category === 'sacred';
      } else if (selectedCategory === 'ladakh') {
        matchesCategory = pkg.category === 'ladakh';
      } else if (selectedCategory === 'international') {
        matchesCategory = Boolean(pkg.isInternational || pkg.category === 'international');
      }

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        pkg.title.toLowerCase().includes(query) ||
        (pkg.location && pkg.location.toLowerCase().includes(query)) ||
        pkg.destination.toLowerCase().includes(query) ||
        pkg.theme.toLowerCase().includes(query) ||
        pkg.tags.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="holidays-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b1b2d] via-[#102744] to-[#15345a] rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl relative overflow-hidden border border-orange-500/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#ff6a00]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <span className="text-[#ff6a00] font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2">
            <Palmtree className="w-4 h-4 text-[#ff6a00]" />
            <span>Moksha Gateways Holiday & Mountain Expeditions</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cinzel'] tracking-wide">
            Himalayan Treks, Mountain Escapes & International Getaways
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Explore curated domestic trails across Spiti, Ladakh, Kasol, Chopta, Kedarnath and exotic international escapes across Vietnam, Thailand, Bali & Bhutan.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10 items-stretch sm:items-center justify-between">
          {/* Quick Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination, location (e.g. Spiti, Bali, Kedarnath, Kasol)..."
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
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
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

      {/* Package Grid */}
      {filteredPackages.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              id={`holiday-card-${pkg.id}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="h-52 relative overflow-hidden">
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
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 border border-white/15">
                      <Clock className="w-3.5 h-3.5 text-teal-400" />
                      <span>{pkg.duration}</span>
                    </div>

                    <div className="bg-white/95 px-2 py-0.5 rounded-lg text-[11px] font-black text-slate-900 flex items-center gap-1 shadow-xs">
                      ⭐ {pkg.rating} <span className="text-slate-500 font-normal">({pkg.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-5 pb-3">
                  {/* Location with MapPin - Explicitly highlighted */}
                  {pkg.location && (
                    <div className="flex items-center gap-1.5 text-xs text-teal-900 font-bold bg-teal-50/90 px-2.5 py-1 rounded-lg mb-2.5 border border-teal-200/60">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{pkg.location}</span>
                    </div>
                  )}

                  <h3 className="text-base font-black text-slate-900 leading-snug line-clamp-2 mb-1.5 group-hover:text-teal-700 transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {pkg.destination}
                  </p>

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
                    ₹{pkg.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">/ person</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`https://wa.me/917352883580?text=Namaste%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(pkg.title)}%20(${encodeURIComponent(pkg.duration)}%20-%20Rs.${pkg.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    title="Chat on WhatsApp (7352883580)"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActivePackageModal(pkg)}
                    className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    title="View Day-by-day Itinerary"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Details</span>
                  </button>

                  <button
                    type="button"
                    id={`book-holiday-btn-${pkg.id}`}
                    onClick={() => onBookHoliday(pkg)}
                    className="px-4 py-2 bg-gradient-to-r from-[#ff6a00] to-orange-600 hover:from-orange-500 hover:to-[#ff6a00] text-white font-extrabold text-xs rounded-xl shadow-md shadow-orange-950/30 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>BOOK NOW</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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

              {/* Exact Location */}
              {activePackageModal.location && (
                <div className="flex items-center gap-1.5 text-xs text-teal-200 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>{activePackageModal.location}</span>
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5">
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

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/917352883580?text=Namaste%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(activePackageModal.title)}%20(${encodeURIComponent(activePackageModal.duration)}%20-%20Rs.${activePackageModal.price})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const toBook = activePackageModal;
                    setActivePackageModal(null);
                    onBookHoliday(toBook);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#ff6a00] to-orange-600 hover:from-orange-500 hover:to-[#ff6a00] text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
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
