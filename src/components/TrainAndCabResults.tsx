import React, { useState } from 'react';
import { 
  TrainTrack, 
  Car, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Users, 
  Luggage, 
  Check, 
  Sparkles,
  ArrowRight,
  MessageCircle,
  Fuel,
  Info
} from 'lucide-react';
import { Train, Cab, TrainClassAvailability } from '../types';
import { MOCK_TRAINS, MOCK_CABS } from '../data/mockData';

interface TrainAndCabResultsProps {
  mode: 'trains' | 'cabs';
  onBookTrain: (train: Train, selectedClass: TrainClassAvailability) => void;
  onBookCab: (cab: Cab) => void;
  fromCityName?: string;
  toCityName?: string;
}

export const TrainAndCabResults: React.FC<TrainAndCabResultsProps> = ({
  mode,
  onBookTrain,
  onBookCab,
  fromCityName,
  toCityName
}) => {
  const [selectedVehicleFilter, setSelectedVehicleFilter] = useState<'all' | 'suv_muv' | 'tempo_urbania' | 'bus' | 'sedan'>('all');

  const filteredCabs = MOCK_CABS.filter(cab => {
    if (selectedVehicleFilter === 'all') return true;
    if (selectedVehicleFilter === 'suv_muv') return cab.category === 'SUV' || cab.category === 'MUV';
    if (selectedVehicleFilter === 'tempo_urbania') return cab.category === 'Tempo Traveller' || cab.category === 'Luxury Van';
    if (selectedVehicleFilter === 'bus') return cab.category === 'Luxury Bus';
    if (selectedVehicleFilter === 'sedan') return cab.category === 'Sedan';
    return true;
  });
  if (mode === 'trains') {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 w-full min-w-0 max-w-full">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
          <div>
            <div className="flex items-center gap-2 text-lg font-black text-slate-900">
              <TrainTrack className="w-5 h-5 text-amber-600" />
              <span>IRCTC Authorized Vande Bharat & Express Trains</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live seat availability, zero payment gateway fee on UPI, instant IRCTC cancellation refund
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✓ IRCTC Partner ID: MOKSHA-7728
          </span>
        </div>

        <div className="space-y-4">
          {MOCK_TRAINS.map((train) => (
            <div
              key={train.id}
              className="bg-white rounded-xl shadow-xs border border-slate-200 hover:border-amber-400 transition-all p-5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                      {train.type}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {train.trainName} ({train.trainNumber})
                    </h3>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Runs on: <span className="font-semibold text-slate-700">{train.runDays.join(', ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-center sm:text-left">
                  <div>
                    <div className="text-xl font-black text-slate-900">{train.departureTime}</div>
                    <div className="text-xs text-slate-500">{train.fromStation}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] text-slate-400 font-medium">{train.duration}</span>
                    <div className="w-16 h-0.5 bg-slate-200 my-1" />
                    <span className="text-[10px] text-emerald-600 font-bold">On-Time 98%</span>
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900">{train.arrivalTime}</div>
                    <div className="text-xs text-slate-500">{train.toStation}</div>
                  </div>
                </div>
              </div>

              {/* Train Classes Selection */}
              <div className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
                {train.classes.map((cls) => (
                  <div
                    key={cls.code}
                    className="p-3 rounded-xl border border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/30 transition-all min-w-[135px] flex-1 sm:flex-none sm:min-w-[160px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-sm text-slate-900">{cls.code}</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          AVL {cls.seats}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{cls.className}</div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-extrabold text-slate-900">₹{cls.price}</span>
                      <button
                        type="button"
                        onClick={() => onBookTrain(train, cls)}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-lg transition-all"
                      >
                        BOOK
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 w-full min-w-0 max-w-full">
      {/* Cabs Header & Assurance Banner */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-4 sm:p-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div>
          <div className="flex items-center gap-2 text-lg sm:text-xl font-black text-slate-900">
            <Car className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0" />
            <span>Outstation Pilgrimage, Airport Transfers & Group Fleet</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Clean, sanitized vehicles with verified mountain-certified sevadar chauffeurs. Includes GPS tracking, Fastag toll support, AC comfort, and luggage carriers for Pooja samagri.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>100% Guaranteed On-Time</span>
          </span>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Toll & Fuel Included</span>
          </span>
        </div>
      </div>

      {/* Fleet Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar w-full max-w-full">
        <button
          type="button"
          onClick={() => setSelectedVehicleFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
            selectedVehicleFilter === 'all'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Fleet ({MOCK_CABS.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedVehicleFilter('suv_muv')}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
            selectedVehicleFilter === 'suv_muv'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Innova Crysta & Ertiga (SUV/MUV)
        </button>
        <button
          type="button"
          onClick={() => setSelectedVehicleFilter('tempo_urbania')}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
            selectedVehicleFilter === 'tempo_urbania'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Tempo Traveller & Urbania (12-17 Seater)
        </button>
        <button
          type="button"
          onClick={() => setSelectedVehicleFilter('bus')}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
            selectedVehicleFilter === 'bus'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Volvo Luxury AC Bus (45 Seater Coach)
        </button>
        <button
          type="button"
          onClick={() => setSelectedVehicleFilter('sedan')}
          className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
            selectedVehicleFilter === 'sedan'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Maruti Dzire (AC Sedan)
        </button>
      </div>

      {/* Grid of Vehicles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCabs.map((cab) => {
          const whatsappInquiryUrl = `https://wa.me/919334789099?text=Namaste%20Shubham%2C%20I%20want%20to%20inquire%20and%20book%20the%20${encodeURIComponent(cab.model)}%20(${encodeURIComponent(cab.category)})%20for%20our%20trip.%20Please%20share%20availability%20and%20details.`;

          // Category badge colors
          const badgeColor = 
            cab.category === 'Luxury Bus' ? 'bg-purple-900/90 text-purple-200 border-purple-400/40' :
            cab.category === 'Luxury Van' ? 'bg-sky-900/90 text-sky-200 border-sky-400/40' :
            cab.category === 'Tempo Traveller' ? 'bg-indigo-900/90 text-indigo-200 border-indigo-400/40' :
            cab.category === 'SUV' ? 'bg-amber-900/90 text-amber-200 border-amber-400/40' :
            cab.category === 'MUV' ? 'bg-emerald-900/90 text-emerald-200 border-emerald-400/40' :
            'bg-slate-900/90 text-slate-200 border-slate-600';

          return (
            <div
              key={cab.id}
              className="bg-white rounded-2xl shadow-xs border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Photo container with realistic aspect ratio */}
                <div className="h-52 relative overflow-hidden bg-slate-100">
                  <img 
                    src={cab.image} 
                    alt={cab.model} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className={`absolute top-3 left-3 text-[11px] font-black px-2.5 py-1 rounded-full backdrop-blur-md border shadow-xs ${badgeColor}`}>
                    {cab.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-black text-slate-900 shadow-sm flex items-center gap-1 border border-slate-100">
                    <span className="text-amber-500">★</span> {cab.rating}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                      {cab.model}
                    </h3>
                  </div>

                  {/* Capacity & Luggage Badges */}
                  <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 mb-3">
                    <span className="flex items-center gap-1.5 font-bold text-slate-800">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      <span>{cab.capacity} Yatris / Seats</span>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                      <Luggage className="w-3.5 h-3.5 text-slate-500" />
                      <span>{cab.luggage} Luggage Bags</span>
                    </span>
                  </div>

                  {/* Vehicle Features */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {cab.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action Buttons */}
              <div className="p-5 pt-3 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/50">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">All-Inclusive Base</span>
                    <div className="text-xl font-black text-slate-900">
                      ₹{cab.estimatedTotal.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      ₹{cab.pricePerKm}/km
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">beyond base limit</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all text-center"
                    title="Enquire on WhatsApp with Shubham Kumar"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onBookCab(cab)}
                    className="py-2.5 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
                  >
                    <span>BOOK NOW</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCabs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-base font-bold text-slate-700">No vehicles match this filter.</p>
          <button
            type="button"
            onClick={() => setSelectedVehicleFilter('all')}
            className="mt-3 text-xs font-bold text-amber-600 hover:underline"
          >
            View all fleet
          </button>
        </div>
      )}
    </div>
  );
};
