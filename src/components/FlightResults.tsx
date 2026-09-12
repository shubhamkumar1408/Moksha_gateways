import React, { useState, useMemo } from 'react';
import { 
  Plane, 
  Clock, 
  ShieldCheck, 
  Luggage, 
  ChevronRight, 
  SlidersHorizontal, 
  Check, 
  Info,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Flight } from '../types';
import { MOCK_FLIGHTS } from '../data/mockData';

interface FlightResultsProps {
  onBookFlight: (flight: Flight) => void;
  fromCityName: string;
  toCityName: string;
  departureDate: string;
}

export const FlightResults: React.FC<FlightResultsProps> = ({
  onBookFlight,
  fromCityName,
  toCityName,
  departureDate
}) => {
  // Filter states
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [nonStopOnly, setNonStopOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'cheapest' | 'fastest' | 'earliest'>('cheapest');

  const airlinesList = ['Air India', 'IndiGo', 'Vistara', 'SpiceJet', 'Akasa Air'];

  const toggleAirline = (airline: string) => {
    if (selectedAirlines.includes(airline)) {
      setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
    } else {
      setSelectedAirlines([...selectedAirlines, airline]);
    }
  };

  const filteredFlights = useMemo(() => {
    return MOCK_FLIGHTS.filter(flight => {
      if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) {
        return false;
      }
      if (flight.price > maxPrice) {
        return false;
      }
      if (nonStopOnly && flight.stops > 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'cheapest') return a.price - b.price;
      if (sortBy === 'fastest') return a.duration.localeCompare(b.duration);
      if (sortBy === 'earliest') return a.departureTime.localeCompare(b.departureTime);
      return 0;
    });
  }, [selectedAirlines, maxPrice, nonStopOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Route Header Banner */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-slate-900">
            <span>{fromCityName || 'New Delhi'}</span>
            <ArrowRight className="w-5 h-5 text-amber-500" />
            <span>{toCityName || 'Varanasi'}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {departureDate ? `Departure: ${departureDate}` : 'Departure: Upcoming'} • Showing {filteredFlights.length} available flights
          </p>
        </div>

        {/* Quick Sort Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setSortBy('cheapest')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sortBy === 'cheapest' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ Cheapest
          </button>
          <button
            onClick={() => setSortBy('fastest')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sortBy === 'fastest' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⏱️ Fastest
          </button>
          <button
            onClick={() => setSortBy('earliest')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              sortBy === 'earliest' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌅 Earliest Flight
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                <span>Filters</span>
              </span>
              {(selectedAirlines.length > 0 || nonStopOnly || maxPrice < 10000) && (
                <button
                  onClick={() => {
                    setSelectedAirlines([]);
                    setMaxPrice(10000);
                    setNonStopOnly(false);
                  }}
                  className="text-xs text-amber-600 font-bold hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Stops */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Stops</h4>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={nonStopOnly}
                  onChange={(e) => setNonStopOnly(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <span>Non-Stop Flights Only</span>
              </label>
            </div>

            {/* Price Slider */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-slate-500 uppercase">Max Price</span>
                <span className="text-amber-700">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={3000}
                max={10000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            {/* Airlines */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Airlines</h4>
              <div className="space-y-2">
                {airlinesList.map((airline) => (
                  <label key={airline} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                    <input
                      type="checkbox"
                      checked={selectedAirlines.includes(airline)}
                      onChange={() => toggleAirline(airline)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span>{airline}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Pilgrimage Baggage Privilege Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Moksha Pilgrimage Benefit</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              Carry Holy Gangajal & Temple Prasad tins safely. All Moksha Gateways flights to Varanasi, Dehradun & Ayodhya support specialized religious cargo guidelines.
            </p>
          </div>
        </div>

        {/* Flight Cards List */}
        <div className="lg:col-span-9 space-y-4">
          {filteredFlights.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Plane className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-pulse" />
              <h3 className="text-lg font-bold text-slate-800">No flights matching your filters</h3>
              <p className="text-xs text-slate-500 mt-1">Try relaxing your price or airline filters to see available flights.</p>
            </div>
          ) : (
            filteredFlights.map((flight) => (
              <div
                key={flight.id}
                id={`flight-card-${flight.id}`}
                className="bg-white rounded-xl shadow-xs border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Airline details */}
                  <div className="flex items-center gap-3 min-w-[160px]">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-sm shadow-xs">
                      {flight.airlineLogo}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{flight.airline}</h4>
                      <span className="text-[11px] text-slate-400">{flight.flightNumber}</span>
                    </div>
                  </div>

                  {/* Flight Schedule Times */}
                  <div className="flex items-center justify-between sm:justify-start gap-6 sm:gap-10 flex-1">
                    {/* Departure */}
                    <div className="text-left">
                      <div className="text-xl sm:text-2xl font-black text-slate-900">{flight.departureTime}</div>
                      <div className="text-xs font-bold text-slate-700">{flight.fromCode}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[110px]">{flight.fromCity}</div>
                    </div>

                    {/* Duration & Stops Indicator */}
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-slate-500 font-medium">{flight.duration}</span>
                      <div className="w-24 sm:w-28 relative flex items-center justify-center my-1">
                        <div className="w-full h-0.5 bg-slate-200" />
                        <Plane className="w-3.5 h-3.5 text-amber-500 absolute rotate-90" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-full">
                        {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop`}
                      </span>
                    </div>

                    {/* Arrival */}
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-black text-slate-900">{flight.arrivalTime}</div>
                      <div className="text-xs font-bold text-slate-700">{flight.toCode}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[110px]">{flight.toCity}</div>
                    </div>
                  </div>

                  {/* Price & Book CTA */}
                  <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 min-w-[160px]">
                    <div className="text-left md:text-right">
                      <div className="flex items-baseline gap-2 md:justify-end">
                        <span className="text-xs text-slate-400 line-through">₹{flight.originalPrice.toLocaleString('en-IN')}</span>
                        <span className="text-2xl font-black text-slate-900">₹{flight.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">per adult, taxes incl.</div>
                    </div>

                    <button
                      type="button"
                      id={`book-flight-btn-${flight.id}`}
                      onClick={() => onBookFlight(flight)}
                      className="mt-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs rounded-full shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>BOOK NOW</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer specs inside flight card */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Luggage className="w-3.5 h-3.5 text-slate-400" />
                      <span>{flight.baggage}</span>
                    </span>
                    {flight.refundable ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Partially Refundable</span>
                      </span>
                    ) : (
                      <span className="text-amber-700 font-semibold">Non-refundable</span>
                    )}
                    {flight.mealIncluded && (
                      <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                        🍱 Pure Veg Satvik Meal Included
                      </span>
                    )}
                  </div>

                  <span className="text-amber-800 font-bold text-[11px]">
                    🔥 Only {flight.seatsLeft} seats left at this price!
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
