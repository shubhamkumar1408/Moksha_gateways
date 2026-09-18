import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  MapPin, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Calendar, 
  Users, 
  Eye, 
  X,
  Plane
} from 'lucide-react';
import { YatraPackage } from '../types';
import { MOCK_YATRAS } from '../data/mockData';

interface YatraResultsProps {
  onBookYatra: (yatra: YatraPackage) => void;
  filterCircuit?: string;
  onSelectDestination?: (yatraId: string) => void;
}

export const YatraResults: React.FC<YatraResultsProps> = ({
  onBookYatra,
  filterCircuit,
  onSelectDestination
}) => {
  const [selectedCircuit, setSelectedCircuit] = useState<string>(filterCircuit && filterCircuit !== 'All' ? filterCircuit : 'All');
  const [activeItineraryModal, setActiveItineraryModal] = useState<YatraPackage | null>(null);

  const handleOpenYatra = (yatra: YatraPackage) => {
    if (onSelectDestination) {
      onSelectDestination(yatra.id);
    } else {
      setActiveItineraryModal(yatra);
    }
  };

  const circuits = ['All', 'Char Dham', 'North Sacred', 'Himalayan', 'South Sacred'];

  const filteredYatras = MOCK_YATRAS.filter(yatra => {
    if (selectedCircuit === 'All') return true;
    return yatra.circuit === selectedCircuit;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 rounded-2xl p-6 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-amber-400 font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5 mb-2">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Moksha Gateways Sacred Collections 2026</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Cinzel'] tracking-wide">
            Char Dham, Jyotirlinga & Sacred Yatra Packages
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every package guarantees pre-approved temple VIP darshan slips, luxury satvik accommodations, helicopter shuttles, and 24x7 sevadar accompaniment.
          </p>
        </div>

        {/* Floating circuit filters */}
        <div className="mt-6 flex flex-wrap gap-2 relative z-10">
          {circuits.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCircuit(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCircuit === c
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              {c === 'All' ? 'All Sacred Packages' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Yatra Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredYatras.map((yatra) => (
          <div
            key={yatra.id}
            id={`yatra-card-${yatra.id}`}
            className="bg-white rounded-2xl shadow-md border border-slate-200 hover:border-amber-500 hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Package Header Image */}
              <div 
                onClick={() => handleOpenYatra(yatra)}
                className="h-64 relative overflow-hidden group cursor-pointer"
                title={`View full details & itinerary for ${yatra.title}`}
              >
                <img
                  src={yatra.image}
                  alt={yatra.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 pointer-events-none">
                  {yatra.badge && (
                    <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-md">
                      {yatra.badge}
                    </span>
                  )}
                  {yatra.hasHelicopterOption && (
                    <span className="bg-slate-900/90 backdrop-blur-xs text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-400/40 flex items-center gap-1">
                      <Plane className="w-3 h-3" />
                      <span>Helicopter Darshan</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{yatra.days} Days / {yatra.nights} Nights</span>
                    <span>•</span>
                    <span>⭐ {yatra.rating} ({yatra.reviewsCount} Yatris)</span>
                  </div>
                  <h3 className="text-xl font-bold font-['Cinzel'] leading-tight drop-shadow-md">
                    {yatra.title}
                  </h3>
                </div>
              </div>

              {/* Subtitle & Places Covered */}
              <div className="p-5 pb-3">
                {/* Location with MapPin */}
                {yatra.location && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold bg-amber-50/80 px-2.5 py-1 rounded-lg mb-2.5 border border-amber-200/50">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{yatra.location}</span>
                  </div>
                )}

                <p className="text-xs text-slate-600 font-medium line-clamp-2 mb-3">
                  {yatra.subtitle}
                </p>

                {/* Places tags */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Circuit:</span>
                  {yatra.placesCovered.map((place, idx) => (
                    <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {place}
                    </span>
                  ))}
                </div>

                {/* Package Highlights */}
                <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200/60 space-y-1.5 mb-4">
                  <div className="text-[11px] font-bold uppercase text-amber-900 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Key Inclusions & Privileges</span>
                  </div>
                  {yatra.highlights.slice(0, 3).map((hl, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Upcoming departure dates */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-semibold text-slate-700">Next Batches:</span>
                  <span className="truncate">{yatra.nextDates.join(' • ')}</span>
                </div>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 line-through">₹{yatra.originalPrice.toLocaleString('en-IN')}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">₹{yatra.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-500">/ person</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold block">✓ All Taxes & VIP Passes Included</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenYatra(yatra)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  title="View complete itinerary & details"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  id={`book-yatra-btn-${yatra.id}`}
                  onClick={() => onBookYatra(yatra)}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>BOOK YATRA</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Itinerary Preview Modal */}
      {activeItineraryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
            <div className="bg-[#08182b] text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Detailed Day-by-Day Journey</span>
                <h3 className="text-lg font-bold font-['Cinzel'] mt-0.5">{activeItineraryModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveItineraryModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
              {activeItineraryModal.itinerary.map((day) => (
                <div key={day.day} className="border-l-2 border-amber-500 pl-4 relative">
                  <div className="w-3 h-3 rounded-full bg-amber-500 absolute -left-[7px] top-1" />
                  <div className="flex items-baseline justify-between mb-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      Day {day.day}: {day.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    {day.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded">🏨 Stay: {day.stay}</span>
                    <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded">🍲 Meals: {day.meals}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Starting from:</span>
                <div className="text-xl font-black text-slate-900">₹{activeItineraryModal.price.toLocaleString('en-IN')}</div>
              </div>
              <button
                onClick={() => {
                  const yatraToBook = activeItineraryModal;
                  setActiveItineraryModal(null);
                  onBookYatra(yatraToBook);
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-md"
              >
                PROCEED TO BOOKING
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
