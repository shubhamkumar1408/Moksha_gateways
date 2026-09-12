import React from 'react';
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
  ArrowRight
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
  if (mode === 'trains') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
              <div className="mt-4 flex flex-wrap gap-3">
                {train.classes.map((cls) => (
                  <div
                    key={cls.code}
                    className="p-3 rounded-xl border border-slate-200 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/30 transition-all min-w-[170px] flex flex-col justify-between"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-black text-slate-900">
            <Car className="w-5 h-5 text-amber-600" />
            <span>Outstation Pilgrimage & Airport Transfers</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            AC Cabs with verified hill-certified sevadar chauffeurs. Toll, state tax & fuel included.
          </p>
        </div>
        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Clean & Sanitized Vehicles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_CABS.map((cab) => (
          <div
            key={cab.id}
            className="bg-white rounded-2xl shadow-xs border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="h-44 relative">
                <img src={cab.image} alt={cab.model} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {cab.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-white/95 px-2 py-0.5 rounded text-xs font-black text-slate-900">
                  ⭐ {cab.rating}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-extrabold text-slate-900">{cab.model}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-1 mb-3">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Up to {cab.capacity} Yatris</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Luggage className="w-3.5 h-3.5" />
                    <span>{cab.luggage} Bags</span>
                  </span>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  {cab.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400">All-Inclusive Est.</span>
                <div className="text-xl font-black text-slate-900">₹{cab.estimatedTotal.toLocaleString('en-IN')}</div>
                <span className="text-[10px] text-slate-500">₹{cab.pricePerKm}/km beyond limit</span>
              </div>

              <button
                type="button"
                onClick={() => onBookCab(cab)}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-full shadow-md"
              >
                BOOK CAB
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
