import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Star, 
  MapPin, 
  Check, 
  Sparkles, 
  Utensils, 
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { Hotel } from '../types';
import { MOCK_HOTELS } from '../data/mockData';

interface HotelResultsProps {
  onBookHotel: (hotel: Hotel) => void;
  searchedCity?: string;
}

export const HotelResults: React.FC<HotelResultsProps> = ({
  onBookHotel,
  searchedCity
}) => {
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [satvikOnly, setSatvikOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(40000);

  const filteredHotels = useMemo(() => {
    return MOCK_HOTELS.filter(hotel => {
      if (searchedCity && !hotel.city.toLowerCase().includes(searchedCity.toLowerCase()) && !hotel.name.toLowerCase().includes(searchedCity.toLowerCase())) {
        // If specific city search was done but no direct match, show all top stays
      }
      if (starFilter && hotel.starRating !== starFilter) {
        return false;
      }
      if (satvikOnly && !hotel.satvikFood) {
        return false;
      }
      if (hotel.pricePerNight > maxPrice) {
        return false;
      }
      return true;
    });
  }, [searchedCity, starFilter, satvikOnly, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Heritage Palaces, Luxury Resorts & Sacred Ashrams
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified properties in Varanasi, Ayodhya, Rishikesh, Tirupati, Udaipur & Goa with direct temple access
          </p>
        </div>
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
          ✨ 100% Satvik & Sanitized Stays
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                <span>Filters</span>
              </span>
              {(starFilter || satvikOnly || maxPrice < 40000) && (
                <button
                  onClick={() => {
                    setStarFilter(null);
                    setSatvikOnly(false);
                    setMaxPrice(40000);
                  }}
                  className="text-xs text-amber-600 font-bold hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Star Rating */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Star Rating</h4>
              <div className="space-y-1.5">
                {[5, 4].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStarFilter(starFilter === star ? null : star)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all ${
                      starFilter === star
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {Array.from({ length: star }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1">{star} Star Stays</span>
                    </span>
                    {starFilter === star && <Check className="w-3.5 h-3.5 text-amber-700" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Pure Satvik Food Filter */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Dining Preferences</h4>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={satvikOnly}
                  onChange={(e) => setSatvikOnly(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <span>Certified Pure Satvik Dining</span>
              </label>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-slate-500 uppercase">Max Budget / Night</span>
                <span className="text-amber-700">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={40000}
                step={2000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Darshan Assistance Card */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 text-xs">
            <h4 className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Temple Travel Desk</span>
            </h4>
            <p className="text-amber-800 leading-relaxed">
              Every hotel listed under Moksha Gateways features an on-site Yatra Desk to arrange morning VIP darshan slips, private boat aartis, and wheelchair services.
            </p>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="lg:col-span-9 space-y-5">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              id={`hotel-card-${hotel.id}`}
              className="bg-white rounded-2xl shadow-xs border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all overflow-hidden flex flex-col md:flex-row"
            >
              {/* Hotel Image & Badge */}
              <div className="md:w-72 h-56 md:h-auto relative shrink-0">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                {hotel.badge && (
                  <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-400/40">
                    {hotel.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-black text-slate-900 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{hotel.userRating}</span>
                  <span className="text-slate-400 font-normal">({hotel.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Hotel Info Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 mb-1">
                        {Array.from({ length: hotel.starRating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <h3 className="text-lg font-black text-slate-900 leading-snug">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{hotel.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Spiritual proximity tag */}
                  {hotel.distanceToTemple && (
                    <div className="mt-3 p-2 bg-amber-50/80 rounded-lg border border-amber-200/80 text-xs text-amber-900 font-semibold flex items-center gap-1.5">
                      <span>🕉️</span>
                      <span>{hotel.distanceToTemple}</span>
                    </div>
                  )}

                  {/* Amenities */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hotel.amenities.map((amenity, i) => (
                      <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {amenity}
                      </span>
                    ))}
                    {hotel.satvikFood && (
                      <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                        <Utensils className="w-3 h-3" />
                        <span>Pure Satvik</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Book Row */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through">₹{hotel.originalPrice.toLocaleString('en-IN')}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">₹{hotel.pricePerNight.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-slate-500 font-medium">/ night + taxes</span>
                    </div>
                    {hotel.freeCancellation && (
                      <span className="text-[11px] text-emerald-700 font-bold block">
                        ✓ Free Cancellation before 24 hrs
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    id={`book-hotel-btn-${hotel.id}`}
                    onClick={() => onBookHotel(hotel)}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs rounded-full shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>BOOK ROOM</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
