import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRightLeft, 
  Calendar, 
  Users, 
  Search, 
  Flame, 
  MapPin, 
  Sparkles, 
  Building2, 
  ChevronDown, 
  Check, 
  ShieldAlert,
  Plane,
  Palmtree,
  Globe,
  Compass,
  Play,
  Pause,
  Video,
  RefreshCw
} from 'lucide-react';
import { 
  ServiceType, 
  TripType, 
  CabinClass, 
  FareType, 
  CityOption, 
  FlightSearchQuery 
} from '../types';
import { POPULAR_CITIES } from '../data/mockData';

export interface DestinationVideo {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  url: string;
  poster: string;
}

export const POPULAR_DESTINATIONS: DestinationVideo[] = [
  {
    id: 'kashmir-paradise',
    name: '❄️ Kashmir & Dal Lake',
    badge: 'Paradise on Earth',
    tagline: 'Gondola snow peaks, houseboats & Betaab valley',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Snow-capped_Himalayan_mountains_Rasuwa.webm',
    poster: './destinations/kashmir.jpg'
  },
  {
    id: 'chakrata-retreat',
    name: '🌲 Chakrata & Tiger Falls',
    badge: 'Offbeat Uttarakhand',
    tagline: 'Ancient deodars, 312ft falls & tranquil hills',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/India_Unravelled.webm',
    poster: './destinations/chakrata.jpg'
  },
  {
    id: 'spiti-himalayas',
    name: '🏔️ Spiti & Himalayas',
    badge: 'Popular Trek',
    tagline: 'Snow-capped peaks & high valleys',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Snow-capped_Himalayan_mountains_Rasuwa.webm',
    poster: './destinations/spiti.jpg'
  },
  {
    id: 'leh-ladakh',
    name: '🏍️ Leh Ladakh & Pangong',
    badge: 'Trending Adventure',
    tagline: 'High mountain passes & crystal lakes',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Crossing_of_a_stream_between_Nubra_valley_and_Pangong_lake.webm',
    poster: './destinations/ladakh.jpg'
  },
  {
    id: 'sacred-bharat',
    name: '🕉️ Sacred Ghats & Yatras',
    badge: 'Pilgrimage Circuit',
    tagline: 'Kedarnath Dham, Badrinath & Varanasi',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/India_Unravelled.webm',
    poster: './destinations/kedarnath.jpg'
  },
  {
    id: 'royal-rajasthan',
    name: '🏰 Royal Rajasthan & Lakes',
    badge: 'Desert & Heritage',
    tagline: 'Udaipur, Jaisalmer & Mount Abu',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/India_Unravelled.webm',
    poster: './destinations/udaipur.jpg'
  },
  {
    id: 'bali-tropics',
    name: '🌴 Bali, Thailand & Tropics',
    badge: 'International Gateway',
    tagline: 'Turquoise ocean waves & tropical shores',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Aerial_view_of_sand_beach._Top_view_sea_waves._Drone_footage.webm',
    poster: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&auto=format&fit=crop&q=80'
  }
];

interface HeroSearchProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  onSearch: (params: any) => void;
  onOpenAiPlanner: () => void;
  language: 'EN' | 'HI';
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  activeService,
  onSelectService,
  onSearch,
  onOpenAiPlanner,
  language
}) => {
  // Flight Search States
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [fareType, setFareType] = useState<FareType>('regular');
  const [fromCity, setFromCity] = useState<CityOption>(POPULAR_CITIES[0]); // Delhi
  const [toCity, setToCity] = useState<CityOption>(POPULAR_CITIES[1]); // Varanasi
  const [departureDate, setDepartureDate] = useState<string>('2026-09-18');
  const [returnDate, setReturnDate] = useState<string>('2026-09-22');
  
  // Passenger dropdown
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);

  // City Picker Dropdowns
  const [activePicker, setActivePicker] = useState<'from' | 'to' | null>(null);

  // Hotel Search States
  const [hotelCity, setHotelCity] = useState<string>('Varanasi');
  const [hotelCheckIn, setHotelCheckIn] = useState<string>('2026-09-18');
  const [hotelCheckOut, setHotelCheckOut] = useState<string>('2026-09-21');
  const [hotelGuests, setHotelGuests] = useState<number>(2);
  const [nearTempleOnly, setNearTempleOnly] = useState<boolean>(true);

  // Yatra Search States
  const [yatraCircuit, setYatraCircuit] = useState<string>('All');
  const [yatraDuration, setYatraDuration] = useState<string>('Any');

  // Holiday Search States
  const [holidayDestination, setHolidayDestination] = useState<string>('All');
  const [holidayDurationFilter, setHolidayDurationFilter] = useState<string>('Any');

  // Background Destination Video States with Auto-Switching
  const ROTATION_INTERVAL_MS = 9000; // 9 seconds per destination
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [autoProgress, setAutoProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeDest = POPULAR_DESTINATIONS[activeVideoIndex];

  // Auto-switch destination video time-to-time
  useEffect(() => {
    if (!isVideoPlaying || !isAutoRotate) return;

    const tickInterval = 100; // update progress every 100ms
    const step = (tickInterval / ROTATION_INTERVAL_MS) * 100;

    const interval = setInterval(() => {
      setAutoProgress((prev) => {
        if (prev >= 100) {
          setActiveVideoIndex((currIndex) => (currIndex + 1) % POPULAR_DESTINATIONS.length);
          return 0;
        }
        return prev + step;
      });
    }, tickInterval);

    return () => clearInterval(interval);
  }, [isVideoPlaying, isAutoRotate]);

  const handleSelectDestination = (index: number) => {
    setActiveVideoIndex(index);
    setAutoProgress(0);
  };

  const handleVideoEnded = () => {
    if (isAutoRotate) {
      setActiveVideoIndex((prev) => (prev + 1) % POPULAR_DESTINATIONS.length);
      setAutoProgress(0);
    }
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsVideoPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isVideoPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [activeVideoIndex]);

  // Handle Swap
  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeService === 'flights') {
      const query: FlightSearchQuery = {
        tripType,
        from: fromCity,
        to: toCity,
        departureDate,
        returnDate: tripType === 'roundtrip' ? returnDate : undefined,
        adults,
        children,
        infants: 0,
        cabinClass,
        fareType
      };
      onSearch({ type: 'flights', query });
    } else if (activeService === 'hotels') {
      onSearch({ 
        type: 'hotels', 
        query: { city: hotelCity, checkIn: hotelCheckIn, checkOut: hotelCheckOut, guests: hotelGuests, nearTemple: nearTempleOnly } 
      });
    } else if (activeService === 'yatras') {
      onSearch({
        type: 'yatras',
        query: { circuit: yatraCircuit, duration: yatraDuration }
      });
    } else if (activeService === 'holidays') {
      onSearch({
        type: 'holidays',
        query: { destination: holidayDestination, duration: holidayDurationFilter }
      });
    } else if (activeService === 'trains') {
      onSearch({
        type: 'trains',
        query: { from: fromCity, to: toCity, date: departureDate }
      });
    } else if (activeService === 'cabs') {
      onSearch({
        type: 'cabs',
        query: { from: fromCity.city, to: toCity.city, date: departureDate }
      });
    } else {
      onSearch({ type: activeService });
    }
  };

  return (
    <div className="relative pt-4 sm:pt-6 pb-12 sm:pb-20 px-3 sm:px-6 lg:px-8 overflow-hidden min-h-[540px] sm:min-h-[620px] w-full max-w-full">
      {/* 1. Dynamic Destination Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          key={activeDest.id}
          autoPlay
          loop={!isAutoRotate}
          muted
          playsInline
          onEnded={handleVideoEnded}
          poster={activeDest.poster}
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.65] contrast-[1.08] transition-all duration-700"
        >
          <source src={activeDest.url} type="video/webm" />
        </video>

        {/* Dual-layer Color Grading Overlay: Deep Navy + Brand Highlights */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081729]/85 via-[#0b1f36]/70 to-[#f4f7fb]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[90vw] max-w-[850px] h-[360px] bg-[#ff6a00]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full min-w-0">
        {/* Popular Destination Video Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 w-full min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white text-xs shadow-md max-w-full truncate">
            <span className="w-2 h-2 rounded-full bg-[#ff6a00] animate-ping shrink-0" />
            <span className="text-slate-300 font-medium hidden xs:inline">Auto Destination Tour:</span>
            <span className="text-[#ff6a00] font-extrabold truncate">{activeDest.name}</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">• {activeDest.tagline}</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/70 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-md overflow-x-auto no-scrollbar max-w-full">
            {POPULAR_DESTINATIONS.map((dest, idx) => (
              <button
                key={dest.id}
                type="button"
                id={`dest-video-btn-${dest.id}`}
                onClick={() => handleSelectDestination(idx)}
                className={`relative px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap overflow-hidden ${
                  activeVideoIndex === idx
                    ? 'bg-gradient-to-r from-[#ff6a00] to-orange-500 text-white shadow-md shadow-orange-950/40 scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title={`${dest.name} - ${dest.tagline}`}
              >
                <span className="relative z-10">{dest.name}</span>
                {activeVideoIndex === idx && isAutoRotate && isVideoPlaying && (
                  <span className="absolute bottom-0 left-1 right-1 h-0.5 bg-black/20 rounded-full overflow-hidden">
                    <span
                      className="block h-full bg-white transition-all duration-100 ease-linear"
                      style={{ width: `${autoProgress}%` }}
                    />
                  </span>
                )}
              </button>
            ))}

            {/* Auto Switch Toggle */}
            <button
              type="button"
              id="toggle-video-autorotate-btn"
              onClick={() => {
                setIsAutoRotate(!isAutoRotate);
                setAutoProgress(0);
              }}
              className={`p-1 px-2 text-xs rounded-full transition-colors flex items-center gap-1 cursor-pointer border-l border-white/20 ml-1 shrink-0 ${
                isAutoRotate
                  ? 'text-orange-400 hover:text-orange-300 hover:bg-white/15'
                  : 'text-slate-400 hover:text-white hover:bg-white/15'
              }`}
              title={isAutoRotate ? "Auto-switching destinations is active (switches every 9s)" : "Auto-switching paused (Click to enable)"}
            >
              <RefreshCw className={`w-3 h-3 ${isAutoRotate && isVideoPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span className="text-[10px] uppercase font-bold hidden sm:inline">
                {isAutoRotate ? "AUTO" : "MANUAL"}
              </span>
            </button>

            {/* Play/Pause */}
            <button
              type="button"
              id="toggle-video-play-btn"
              onClick={toggleVideoPlay}
              className="p-1 px-2.5 text-slate-300 hover:text-white rounded-full hover:bg-white/15 text-xs transition-colors flex items-center gap-1 cursor-pointer ml-0.5 shrink-0"
              title={isVideoPlaying ? "Pause Video" : "Play Video"}
            >
              {isVideoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-[#ff6a00]" />
                  <span className="text-[10px] uppercase font-bold text-slate-200">PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] uppercase font-bold text-slate-200">PLAY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-orange-200 text-xs font-bold mb-3 shadow-lg max-w-full truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#ff6a00] shrink-0" />
            <span className="truncate">Sacred Yatras • Himalayan Treks • Curated Holiday Gateways</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-['Cinzel'] tracking-tight drop-shadow-md">
            Journey Beyond the Ordinary
          </h1>
          <p className="mt-2 text-xs sm:text-base text-slate-200 max-w-2xl mx-auto drop-shadow-xs font-medium px-2">
            Explore Spiti Valley, Leh Ladakh, Char Dham, Bali & Vietnam with verified passes, stays & 24x7 support.
          </p>
        </div>

        {/* The Signature MakeMyTrip Floating Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200/80 p-3.5 sm:p-7 transition-all w-full min-w-0 max-w-full">
          {/* Sub-selectors (Trip Type / Fare Category) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
            {activeService === 'flights' ? (
              <div className="flex items-center gap-6 text-sm font-semibold text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === 'oneway'}
                    onChange={() => setTripType('oneway')}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                  <span>One Way</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === 'roundtrip'}
                    onChange={() => setTripType('roundtrip')}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                  <span>Round Trip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === 'multicity'}
                    onChange={() => setTripType('multicity')}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                  <span>Multi City Yatra</span>
                </label>
              </div>
            ) : activeService === 'hotels' ? (
              <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                <span className="font-bold text-amber-800">Stays & Spiritual Ashrams:</span>
                <label className="flex items-center gap-2 cursor-pointer bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-amber-900 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={nearTempleOnly}
                    onChange={(e) => setNearTempleOnly(e.target.checked)}
                    className="w-3.5 h-3.5 text-amber-600 rounded"
                  />
                  <span>Within 1km of Main Temple / Ghat</span>
                </label>
              </div>
            ) : activeService === 'yatras' ? (
              <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold text-slate-700">
                <span className="text-slate-500">Popular Circuits:</span>
                {['All', 'Char Dham', 'Jyotirlinga', 'North Sacred', 'South Sacred'].map((circ) => (
                  <button
                    key={circ}
                    type="button"
                    onClick={() => setYatraCircuit(circ)}
                    className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                      yatraCircuit === circ 
                        ? 'bg-amber-600 text-white border-amber-600' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {circ}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs font-medium text-slate-500">
                Book verified services with 100% moneyback & sevadar assistance
              </div>
            )}

            {/* AI Trip Planner Shortcut */}
            <button
              type="button"
              id="hero-ai-planner-btn"
              onClick={onOpenAiPlanner}
              className="flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 text-[#ff6a00] border border-orange-200/90 transition-all cursor-pointer shadow-xs transform hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff6a00] animate-pulse" />
              <span>AI THAPA for your trip planner</span>
            </button>
          </div>

          {/* Form Content per service */}
          <form onSubmit={handleSearchSubmit}>
            {activeService === 'flights' || activeService === 'trains' || activeService === 'cabs' ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
                {/* FROM BOX */}
                <div className="md:col-span-3 relative">
                  <div 
                    id="from-city-box"
                    onClick={() => setActivePicker(activePicker === 'from' ? null : 'from')}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all cursor-pointer h-full flex flex-col justify-between"
                  >
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">From</span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-slate-900">{fromCity.city}</span>
                        <span className="text-xs font-bold text-slate-400">[{fromCity.code}]</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{fromCity.name}</p>
                    </div>
                  </div>

                  {/* Swap Button on desktop */}
                  <button
                    type="button"
                    id="swap-cities-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSwapCities();
                    }}
                    className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white border border-slate-300 rounded-full items-center justify-center text-slate-600 hover:text-amber-600 hover:border-amber-500 shadow-md transition-all active:scale-90"
                    title="Swap From & To"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </button>

                  {/* From City Dropdown */}
                  {activePicker === 'from' && (
                    <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 p-2 max-h-72 overflow-y-auto">
                      <div className="text-[11px] font-bold uppercase text-slate-400 px-3 py-1.5">
                        Select Departure City
                      </div>
                      {POPULAR_CITIES.map((c) => (
                        <div
                          key={c.code}
                          onClick={() => {
                            setFromCity(c);
                            setActivePicker(null);
                          }}
                          className={`p-2.5 rounded-lg hover:bg-amber-50 cursor-pointer flex items-center justify-between ${
                            fromCity.code === c.code ? 'bg-amber-50/80 font-bold' : ''
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                              <span>{c.city}</span>
                              {c.isPilgrimage && (
                                <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-bold">
                                  🕉️ Sacred
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400">{c.name}</div>
                          </div>
                          <span className="text-xs font-bold text-slate-500">{c.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* TO BOX */}
                <div className="md:col-span-3 relative">
                  <div 
                    id="to-city-box"
                    onClick={() => setActivePicker(activePicker === 'to' ? null : 'to')}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all cursor-pointer h-full flex flex-col justify-between"
                  >
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">To (Destination)</span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-slate-900">{toCity.city}</span>
                        <span className="text-xs font-bold text-slate-400">[{toCity.code}]</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{toCity.name}</p>
                    </div>
                  </div>

                  {/* To City Dropdown */}
                  {activePicker === 'to' && (
                    <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 p-2 max-h-72 overflow-y-auto">
                      <div className="text-[11px] font-bold uppercase text-slate-400 px-3 py-1.5">
                        Select Destination City / Sacred Dhams
                      </div>
                      {POPULAR_CITIES.map((c) => (
                        <div
                          key={c.code}
                          onClick={() => {
                            setToCity(c);
                            setActivePicker(null);
                          }}
                          className={`p-2.5 rounded-lg hover:bg-amber-50 cursor-pointer flex items-center justify-between ${
                            toCity.code === c.code ? 'bg-amber-50/80 font-bold' : ''
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                              <span>{c.city}</span>
                              {c.isPilgrimage && (
                                <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-bold">
                                  🕉️ Sacred
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400">{c.name}</div>
                          </div>
                          <span className="text-xs font-bold text-slate-500">{c.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* DEPARTURE DATE BOX */}
                <div className="md:col-span-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all h-full flex flex-col justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>Departure</span>
                    </span>
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="text-lg sm:text-xl font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 cursor-pointer"
                    />
                    <span className="text-xs text-slate-500">Selected Travel Date</span>
                  </div>
                </div>

                {/* TRAVELLERS & CLASS BOX */}
                <div className="md:col-span-3 relative">
                  <div 
                    id="travellers-class-box"
                    onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all cursor-pointer h-full flex flex-col justify-between"
                  >
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-600" />
                        <span>Travellers & Class</span>
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </span>
                    <div>
                      <div className="text-xl font-extrabold text-slate-900">
                        {adults + children} <span className="text-xs font-semibold text-slate-600">Traveller(s)</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{cabinClass}</p>
                    </div>
                  </div>

                  {/* Travellers Dropdown */}
                  {isPassengerDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 p-4">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-700">Adults (12+ yrs)</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                            >
                              -
                            </button>
                            <span className="w-4 text-center font-bold text-sm">{adults}</span>
                            <button
                              type="button"
                              onClick={() => setAdults(Math.min(9, adults + 1))}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold text-slate-700">Children (2-12 yrs)</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                            >
                              -
                            </button>
                            <span className="w-4 text-center font-bold text-sm">{children}</span>
                            <button
                              type="button"
                              onClick={() => setChildren(Math.min(6, children + 1))}
                              className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-3">
                          <span className="text-xs font-bold text-slate-700 block mb-2">Cabin Class</span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {(['Economy', 'Premium Economy', 'Business'] as CabinClass[]).map((cls) => (
                              <button
                                key={cls}
                                type="button"
                                onClick={() => setCabinClass(cls)}
                                className={`px-2 py-1 rounded text-xs font-semibold border text-left ${
                                  cabinClass === cls 
                                    ? 'bg-amber-600 text-white border-amber-600' 
                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {cls}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsPassengerDropdownOpen(false)}
                        className="w-full py-1.5 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : activeService === 'hotels' ? (
              /* HOTELS SEARCH LAYOUT */
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
                <div className="md:col-span-5 p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>City, Location or Holy Shrine</span>
                  </span>
                  <input
                    type="text"
                    value={hotelCity}
                    onChange={(e) => setHotelCity(e.target.value)}
                    placeholder="e.g. Udaipur, Jaisalmer, Mount Abu, Varanasi, Ayodhya"
                    className="text-xl font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 mt-1"
                  />
                  <span className="text-xs text-amber-700 font-medium">Over 2,400+ Verified Ashrams, Heritage Haveli & Luxury Resorts</span>
                </div>

                <div className="md:col-span-3 p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Check-In</span>
                  </span>
                  <input
                    type="date"
                    value={hotelCheckIn}
                    onChange={(e) => setHotelCheckIn(e.target.value)}
                    className="text-lg font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-500">Standard 12:00 PM Check-in</span>
                </div>

                <div className="md:col-span-2 p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Check-Out</span>
                  </span>
                  <input
                    type="date"
                    value={hotelCheckOut}
                    onChange={(e) => setHotelCheckOut(e.target.value)}
                    className="text-lg font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-500">Flexible Check-out</span>
                </div>

                <div className="md:col-span-2 p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>Guests</span>
                  </span>
                  <select
                    value={hotelGuests}
                    onChange={(e) => setHotelGuests(Number(e.target.value))}
                    className="text-lg font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 cursor-pointer"
                  >
                    <option value={1}>1 Guest, 1 Room</option>
                    <option value={2}>2 Guests, 1 Room</option>
                    <option value={3}>3 Guests, 1 Room</option>
                    <option value={4}>4 Guests, 2 Rooms</option>
                  </select>
                  <span className="text-xs text-slate-500">Couple & Family Friendly</span>
                </div>
              </div>
            ) : activeService === 'holidays' ? (
              /* HOLIDAYS SEARCH LAYOUT */
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
                <div className="md:col-span-5 p-3.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Palmtree className="w-3.5 h-3.5 text-teal-600" />
                    <span>Select Holiday Destination</span>
                  </span>
                  <select
                    value={holidayDestination}
                    onChange={(e) => setHolidayDestination(e.target.value)}
                    className="text-xl font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 mt-1 cursor-pointer"
                  >
                    <option value="All">All Curated Getaways (20 Packages)</option>
                    <optgroup label="🏰 Royal Rajasthan">
                      <option value="Udaipur">Udaipur Lake Palace & Pichola (3N/4D • ₹12,500)</option>
                      <option value="Jaisalmer">Jaisalmer Fort & Sam Desert Dunes (3N/4D • ₹11,000)</option>
                      <option value="Mount Abu">Mount Abu & Dilwara Temples (2N/3D • ₹8,500)</option>
                      <option value="Udaipur Mount Abu">Udaipur & Mount Abu Combo (4N/5D • ₹16,800)</option>
                      <option value="Rajasthan Grand">Royal Rajasthan Grand Circuit (7N/8D • ₹28,500)</option>
                    </optgroup>
                    <optgroup label="Himachal Pradesh">
                      <option value="Spiti">Spiti Valley (6N/7D • ₹20,000)</option>
                      <option value="Manali Kasol">Manali Kasol (3N/4D • ₹7,000)</option>
                      <option value="Jibhi Sojha">Jibhi Sojha (2N/3D • ₹7,000)</option>
                      <option value="Mcleodganj">Mcleodganj (2N/3D • ₹7,000)</option>
                      <option value="Humtapass">Hampta Pass (5N/6D • ₹6,000)</option>
                    </optgroup>
                    <optgroup label="Uttarakhand & Sacred">
                      <option value="Char Dham">Char Dham Sacred Yatra (10N/11D • ₹23,500)</option>
                      <option value="Kedarnath">Kedarnath Yatra (3N/4D • ₹8,000)</option>
                      <option value="Chopta Tungnath">Chopta Tungnath (2N/3D • ₹5,000)</option>
                      <option value="Valley of Flower">Valley of Flowers (5N/6D • ₹8,000)</option>
                      <option value="Kedarkantha">Kedarkantha Snow Summit (4N/5D • ₹6,000)</option>
                    </optgroup>
                    <optgroup label="Ladakh">
                      <option value="Leh Ladakh">Leh Ladakh (9N/10D • ₹35,000)</option>
                    </optgroup>
                    <optgroup label="International Gateways">
                      <option value="Vietnam">Vietnam - Halong Bay & Golden Bridge (5N/6D • ₹38,000)</option>
                      <option value="Thailand">Thailand - Bangkok & Pattaya (4N/5D • ₹24,000)</option>
                      <option value="Bali">Bali - Ubud & Nusa Penida (6N/7D • ₹36,000)</option>
                      <option value="Bhutan">Bhutan - Paro & Tiger's Nest (5N/6D • ₹32,000)</option>
                    </optgroup>
                  </select>
                  <span className="text-xs text-teal-700 font-medium">All with detailed day-wise itinerary & locations</span>
                </div>

                <div className="md:col-span-4 p-3.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>Duration & Season</span>
                  </span>
                  <select
                    value={holidayDurationFilter}
                    onChange={(e) => setHolidayDurationFilter(e.target.value)}
                    className="text-lg font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 cursor-pointer"
                  >
                    <option value="Any">Flexible / All Durations</option>
                    <option value="Weekend">2N/3D Weekend Escapes (Jibhi, Chopta, Mcleodganj)</option>
                    <option value="Medium">3N/4D - 5N/6D Mountain Treks (Manali, VOF, Hampta)</option>
                    <option value="Long">6N/7D - 10N/11D Grand Expeditions (Spiti, Ladakh, Char Dham)</option>
                  </select>
                  <span className="text-xs text-slate-500">Includes stay, verified mountain guide & transport</span>
                </div>

                <div className="md:col-span-3 p-3.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-teal-600" />
                    <span>Travellers / Room</span>
                  </span>
                  <select
                    className="text-lg font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 cursor-pointer"
                  >
                    <option>2 Travellers (Couple / Double)</option>
                    <option>1 Solo Backpacker</option>
                    <option>4-6 Friends / Family Group</option>
                    <option>10+ College / Corporate Batch</option>
                  </select>
                  <span className="text-xs text-slate-500">Customized private vehicle available</span>
                </div>
              </div>
            ) : (
              /* YATRAS SEARCH LAYOUT */
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-5">
                <div className="md:col-span-5 p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>Select Pilgrimage Circuit</span>
                  </span>
                  <select
                    value={yatraCircuit}
                    onChange={(e) => setYatraCircuit(e.target.value)}
                    className="text-xl font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 mt-1 cursor-pointer"
                  >
                    <option value="All">All Sacred Yatra Packages</option>
                    <option value="Char Dham">Char Dham Deluxe Helicopter & Road Yatra</option>
                    <option value="Jyotirlinga">12 Jyotirlinga Darshan Tours</option>
                    <option value="North Sacred">Kashi Vishwanath, Ayodhya & Prayagraj</option>
                    <option value="South Sacred">Tirupati Balaji VIP Sheegra Darshan</option>
                    <option value="Himalayan">Kedarnath & Badrinath Do-Dham</option>
                  </select>
                  <span className="text-xs text-amber-700 font-medium">Guaranteed VIP Darshan Slips Included</span>
                </div>

                <div className="md:col-span-4 p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Preferred Departure Month</span>
                  </span>
                  <select
                    className="text-lg font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 cursor-pointer"
                  >
                    <option>Sept - Oct 2026 (Autumn Season)</option>
                    <option>Nov - Dec 2026 (Winter Spiritual)</option>
                    <option>May - June 2026 (Char Dham Peak)</option>
                    <option>Immediate / Weekend Departure</option>
                  </select>
                  <span className="text-xs text-slate-500">Daily batches with veteran sevadars</span>
                </div>

                <div className="md:col-span-3 p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/20 transition-all flex flex-col justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>Yatris / Group Size</span>
                  </span>
                  <select
                    className="text-lg font-extrabold text-slate-900 bg-transparent border-none focus:outline-hidden p-0 cursor-pointer"
                  >
                    <option>2 Yatris (Family / Couple)</option>
                    <option>1-4 Yatris (Maruti Dzire AC Sedan)</option>
                    <option>4-6 Yatris (Toyota Innova Crysta / Ertiga)</option>
                    <option>10-13 Yatris (Force Urbania Luxury Van)</option>
                    <option>12-17 Yatris (Force Tempo Traveller)</option>
                    <option>30-45 Yatris (Volvo Multi-Axle Luxury Bus Coach)</option>
                  </select>
                  <span className="text-xs text-slate-500">Senior citizen assistance provided</span>
                </div>
              </div>
            )}

            {/* Special Fare Categories (MakeMyTrip signature pill bar for flights) */}
            {activeService === 'flights' && (
              <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
                <span className="font-bold text-slate-700 mr-2">Special Fares:</span>
                {[
                  { id: 'regular' as FareType, label: 'Regular Fare' },
                  { id: 'senior' as FareType, label: '👵 Senior Citizen (Up to ₹600 OFF)' },
                  { id: 'pilgrim' as FareType, label: '🕉️ Pilgrim Special (Extra 5kg Pooja Baggage)' },
                  { id: 'student' as FareType, label: '🎓 Student' },
                  { id: 'armed_forces' as FareType, label: '🎖️ Armed Forces' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFareType(f.id)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                      fareType === f.id
                        ? 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-500'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            {/* CTA Search Button - Centered Glowing MakeMyTrip Style */}
            <div className="flex items-center justify-center -mb-10 sm:-mb-12">
              <button
                type="submit"
                id="main-search-submit-btn"
                className="px-8 sm:px-14 py-3.5 sm:py-4 bg-gradient-to-r from-[#ff6a00] via-orange-600 to-[#ea580c] hover:from-orange-500 hover:to-[#ff6a00] text-white font-black text-base sm:text-lg rounded-full shadow-xl shadow-orange-950/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-3 cursor-pointer uppercase tracking-wider border-2 border-orange-400/40"
              >
                <Search className="w-5 h-5 stroke-[3]" />
                <span>
                  {activeService === 'flights' 
                    ? 'SEARCH FLIGHTS' 
                    : activeService === 'hotels' 
                    ? 'SEARCH HOTELS & ASHRAMS'
                    : activeService === 'yatras'
                    ? 'EXPLORE MOKSHA YATRAS'
                    : activeService === 'holidays'
                    ? 'EXPLORE HOLIDAYS & EXPEDITIONS'
                    : activeService === 'trains'
                    ? 'SEARCH VANDE BHARAT & TRAINS'
                    : 'SEARCH CABS'}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Trending Quick Search Chips */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-700">Trending Now:</span>
          {[
            { label: '🏰 Udaipur Lake Palace (3N/4D • ₹12,500)', service: 'holidays' },
            { label: '🏜️ Jaisalmer Desert Glamping (3N/4D • ₹11,000)', service: 'holidays' },
            { label: '⛰️ Mount Abu & Dilwara (2N/3D • ₹8,500)', service: 'holidays' },
            { label: '🏔️ Spiti Valley (6N/7D • ₹20,000)', service: 'holidays' },
            { label: '🏍️ Leh Ladakh (9N/10D • ₹35,000)', service: 'holidays' },
            { label: '🕉️ Char Dham (10N/11D • ₹23,500)', service: 'holidays' },
            { label: 'Kedarnath Yatra (3N/4D • ₹8,000)', service: 'holidays' },
            { label: '🏝️ Bali Island Retreat (6N/7D • ₹36,000)', service: 'holidays' },
            { label: '🏮 Vietnam Heritage (5N/6D • ₹38,000)', service: 'holidays' },
            { label: 'Delhi ⇄ Varanasi (Kashi)', service: 'flights', from: 'DEL', to: 'VNS' },
          ].map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (chip.service === 'yatras') {
                  onSelectService('yatras');
                } else if (chip.service === 'holidays') {
                  onSelectService('holidays');
                } else if (chip.from && chip.to) {
                  onSelectService('flights');
                  const f = POPULAR_CITIES.find(c => c.code === chip.from);
                  const t = POPULAR_CITIES.find(c => c.code === chip.to);
                  if (f && t) {
                    setFromCity(f);
                    setToCity(t);
                  }
                }
              }}
              className="px-3 py-1 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-full text-slate-700 font-medium transition-all shadow-xs cursor-pointer flex items-center gap-1"
            >
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
