import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Check, 
  Copy, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  QrCode, 
  Compass, 
  Globe, 
  ChevronRight, 
  CheckCircle2,
  X,
  Send,
  AlertCircle,
  Users,
  Info
} from 'lucide-react';
import { HolidayPackage } from '../types';

interface DestinationDetailPageProps {
  destination: HolidayPackage;
  onBack: () => void;
  onBook: (pkg: HolidayPackage) => void;
  onQuickQrPay: (pkg: HolidayPackage) => void;
  onSelectOtherDestination: (pkgId: string) => void;
  allDestinations: HolidayPackage[];
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({
  destination,
  onBack,
  onBook,
  onQuickQrPay,
  onSelectOtherDestination,
  allDestinations
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCouponCopied, setIsCouponCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'highlights' | 'inclusions' | 'guidelines'>('itinerary');
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number>(() => {
    if (destination.durationOptions && destination.durationOptions.length > 0) {
      const idx = destination.durationOptions.findIndex(o => o.nights === 3);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  // Calculate active duration option values
  const hasOptions = Boolean(destination.durationOptions && destination.durationOptions.length > 1);
  const activeOption = destination.durationOptions ? destination.durationOptions[selectedOptionIdx] : null;
  const currentPrice = activeOption ? activeOption.price : destination.price;
  const currentOriginalPrice = activeOption ? activeOption.originalPrice : destination.originalPrice;
  const currentDuration = activeOption ? activeOption.duration : destination.duration;

  const packageForAction: HolidayPackage = {
    ...destination,
    price: currentPrice,
    originalPrice: currentOriginalPrice,
    duration: currentDuration,
    nights: activeOption ? activeOption.nights : destination.nights,
    days: activeOption ? activeOption.days : destination.days
  };

  // Scroll to top when destination changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (destination.durationOptions && destination.durationOptions.length > 0) {
      const idx = destination.durationOptions.findIndex(o => o.nights === 3);
      setSelectedOptionIdx(idx >= 0 ? idx : 0);
    }
  }, [destination.id]);

  // Construct absolute shareable URL
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('destination', destination.id);
      return url.toString();
    }
    return `https://mokshagateways.com/?destination=${destination.id}`;
  };

  const shareUrl = getShareUrl();
  const shareText = `🏔️ Check out ${destination.title} on Moksha Gateways!\n⏱️ Duration: ${currentDuration}\n💰 Price: ₹${currentPrice.toLocaleString('en-IN')}/person\n📍 Places: ${destination.destination}\n\n👉 View details & book here: ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      } else {
        // Fallback for iframe environments
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }
    } catch (e) {
      console.error('Error copying share link:', e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: destination.title,
          text: `Check out ${destination.title} (${destination.duration}) on Moksha Gateways at ₹${destination.price.toLocaleString('en-IN')}/person!`,
          url: shareUrl
        });
      } catch {
        // User cancelled share
      }
    } else {
      setIsShareModalOpen(true);
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${destination.title} on Moksha Gateways!`)}&url=${encodeURIComponent(shareUrl)}`;

  // Find related/similar destinations
  const relatedDestinations = allDestinations
    .filter(d => d.id !== destination.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f4f7fb] pb-24">
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-[58px] sm:top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2">
          <button
            id="back-to-destinations-btn"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#ff6a00] transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span className="hidden xs:inline">Back to All Destinations</span>
            <span className="xs:hidden">Back</span>
          </button>

          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 truncate max-w-md">
            <span>Home</span>
            <span>/</span>
            <span>Holidays & Treks</span>
            <span>/</span>
            <span className="font-bold text-slate-800 truncate">{destination.title}</span>
          </div>

          {/* Share Button in Top Bar */}
          <div className="flex items-center gap-2">
            <button
              id="top-share-destination-btn"
              onClick={handleNativeShare}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-[#ff6a00] border border-orange-200 rounded-full text-xs font-extrabold transition-all cursor-pointer shadow-xs active:scale-95"
              title="Share this specific destination with friends or on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5 text-[#ff6a00]" />
              <span>Share Destination</span>
            </button>

            <button
              id="top-book-now-btn"
              onClick={() => onBook(packageForAction)}
              className="hidden sm:flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-[#ff6a00] to-orange-600 hover:from-orange-500 hover:to-[#ff6a00] text-white font-black text-xs rounded-full shadow-sm cursor-pointer active:scale-95 transition-all"
            >
              <span>Book Now • ₹{currentPrice.toLocaleString('en-IN')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Destination Hero Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 min-h-[380px] sm:min-h-[460px] flex flex-col justify-end text-white">
          {/* Background Image */}
          <img
            src={destination.image}
            alt={destination.title}
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30" />

          {/* Top Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between flex-wrap gap-2 z-10">
            <div className="flex items-center gap-2">
              <span className="bg-slate-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-full border border-white/20 shadow-md flex items-center gap-1.5">
                {destination.isInternational ? <Globe className="w-3.5 h-3.5 text-cyan-400" /> : <Compass className="w-3.5 h-3.5 text-amber-400" />}
                <span>{destination.theme}</span>
              </span>

              {destination.badge && (
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                  {destination.badge}
                </span>
              )}
            </div>

            {/* Direct Quick Share Pill on Banner */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5 text-white" />
              <span>Share Link</span>
            </button>
          </div>

          {/* Hero Content Information */}
          <div className="relative z-10 p-5 sm:p-8 md:p-10 max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <div className="bg-teal-500/30 backdrop-blur-md border border-teal-300/40 text-teal-200 px-3 py-1 rounded-lg font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>{destination.location}</span>
              </div>
              {destination.region && (
                <span className="bg-white/15 backdrop-blur-md text-slate-200 px-3 py-1 rounded-lg font-semibold text-xs">
                  {destination.region}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-['Cinzel'] tracking-tight leading-tight text-white drop-shadow-md">
              {destination.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl font-medium drop-shadow-xs">
              {destination.destination}
            </p>

            {/* Quick Meta Stats Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-[#ff6a00]" />
                <span className="font-bold">{currentDuration}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-black text-amber-300">{destination.rating}</span>
                <span className="text-slate-300">({destination.reviewsCount} verified reviews)</span>
              </div>

              <div className="flex items-center gap-1.5 bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-400/30 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>IRCTC & Govt. Registered Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Content + Sticky Booking Panel */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Columns: Details & Itinerary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why Visit Feature Callout */}
            {destination.reasonToVisit && (
              <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl p-5 sm:p-6 border border-orange-200/90 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-950 tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-[#ff6a00]" />
                  <span>Why Visit This Destination</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {destination.reasonToVisit}
                </p>
              </div>
            )}

            {/* Navigation Tabs for Details */}
            <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('itinerary')}
                className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'itinerary'
                    ? 'bg-[#081b2f] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Day-by-Day Plan</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('highlights')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'highlights'
                    ? 'bg-[#081b2f] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Key Highlights</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('inclusions')}
                className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'inclusions'
                    ? 'bg-[#081b2f] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Inclusions</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('guidelines')}
                className={`flex-1 min-w-[110px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'guidelines'
                    ? 'bg-[#081b2f] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Travel Tips</span>
              </button>
            </div>

            {/* Tab 1: Detailed Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-['Cinzel']">
                      Complete Day-by-Day Journey Itinerary
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Expertly paced with safe altitude acclimatization, local food and sightseeing.
                    </p>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                    {destination.duration}
                  </span>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gradient-to-b before:from-[#ff6a00] before:via-teal-500 before:to-slate-200">
                  {destination.itinerary && destination.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-10">
                      {/* Timeline Day Dot */}
                      <div className="absolute left-1 top-0 w-6 h-6 rounded-full bg-white border-2 border-[#ff6a00] text-[#ff6a00] font-black text-[11px] flex items-center justify-center shadow-xs">
                        {day.day}
                      </div>

                      <div className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-orange-300 transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <h4 className="text-sm sm:text-base font-black text-slate-900">
                            Day {day.day}: {day.title}
                          </h4>
                          <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                            Included in Package
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Key Highlights */}
            {activeTab === 'highlights' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-slate-900 font-['Cinzel'] border-b border-slate-100 pb-4">
                  What Makes This Tour Special
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.highlights && destination.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-teal-50/70 border border-teal-100">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-2">Destination Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.tags.map((t, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded-lg border border-slate-200">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Inclusions */}
            {activeTab === 'inclusions' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-slate-900 font-['Cinzel'] border-b border-slate-100 pb-4">
                  Everything Included in Your Fare (No Hidden Charges)
                </h3>

                <div className="space-y-3">
                  {destination.inclusions && destination.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-slate-800 text-xs sm:text-sm font-medium">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-800 block">Exclusions & Personal Expenses:</span>
                  <p>• Personal monument entry tickets, personal camera permits, and adventure sports (unless mentioned).</p>
                  <p>• Emergency medical insurance or evacuation expenses (oxygen cylinders provided in mountain vans).</p>
                </div>
              </div>
            )}

            {/* Tab 4: Guidelines */}
            {activeTab === 'guidelines' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-900 font-['Cinzel'] border-b border-slate-100 pb-4">
                  Essential Travel & Weather Guidelines
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <span className="font-bold text-amber-950 block mb-1">Packing & Clothing:</span>
                    <p>Carry thermal innerwear, windproof jackets, high-ankle trekking shoes, sunglasses, and high-SPF sunscreen for mountain journeys.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                    <span className="font-bold text-sky-950 block mb-1">Connectivity & Cash:</span>
                    <p>Postpaid Jio/Airtel SIM works best in high Himalayas. Carry sufficient liquid cash as ATMs in remote mountain passes may have connectivity issues.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Share Destination Callout Card */}
            <div className="bg-gradient-to-r from-[#081a2e] to-[#122e50] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-orange-500/30">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[#ff6a00] font-black text-xs uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Planning with Family or Group?</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-['Cinzel']">
                  Share this Destination with Friends
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Send this exact package with verified rates and day-by-day itinerary directly on WhatsApp or copy the link.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Share on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/25 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
                  <span>{isCopied ? 'Link Copied!' : 'Copy Page Link'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-1 sticky top-28 space-y-4">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 overflow-hidden relative">
              {/* Duration Options Selector (e.g. Manali 2N/3D ₹5,999 vs 3N/4D ₹6,999) */}
              {hasOptions && (
                <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
                  <div className="flex items-center justify-between text-xs font-black text-slate-900 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-orange-600" />
                      <span>Choose Tour Duration:</span>
                    </span>
                    <span className="text-[10px] text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full font-bold">
                      2 Plans Available
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {destination.durationOptions!.map((opt, idx) => (
                      <button
                        key={opt.duration}
                        type="button"
                        onClick={() => setSelectedOptionIdx(idx)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedOptionIdx === idx
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-orange-400'
                            : 'bg-white text-slate-800 border-slate-300 hover:border-orange-300'
                        }`}
                      >
                        <div className="text-xs font-extrabold">{opt.duration}</div>
                        <div className="text-sm font-black text-[#ff6a00] mt-0.5">
                          ₹{opt.price.toLocaleString('en-IN')}
                        </div>
                        {opt.badge && (
                          <div className={`text-[9px] font-bold mt-1 px-1.5 py-0.5 rounded w-fit ${
                            selectedOptionIdx === idx ? 'bg-white/20 text-orange-200' : 'bg-orange-100 text-orange-900'
                          }`}>
                            {opt.badge}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Header Price */}
              <div className="border-b border-slate-100 pb-5 mb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    Price for {currentDuration}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Govt. Subsidized Rates
                  </span>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{currentOriginalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-[#ff6a00]">
                    ({Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)}% OFF)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Includes stays, transfers, breakfast, guide & all permits</span>

                {/* First Booking Discount Coupon Block */}
                <div className="mt-3.5 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-300 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1 text-xs font-black text-amber-950">
                      <Sparkles className="w-3.5 h-3.5 text-[#ff6a00]" />
                      <span>First Booking: Flat ₹501 OFF</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Use coupon code <strong className="font-mono text-slate-900 font-black">FIRST501</strong> at checkout
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('FIRST501');
                      setIsCouponCopied(true);
                      setTimeout(() => setIsCouponCopied(false), 2500);
                    }}
                    className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-black rounded-xl cursor-pointer flex items-center gap-1 shrink-0 shadow-xs"
                  >
                    {isCouponCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                    <span>{isCouponCopied ? 'Copied ₹501' : 'FIRST501'}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  id="destination-page-book-btn"
                  onClick={() => onBook(packageForAction)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#ff6a00] to-orange-600 hover:from-orange-500 hover:to-[#ff6a00] text-white font-black text-sm rounded-2xl shadow-lg shadow-orange-950/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <span>PROCEED TO BOOK ({currentDuration})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  id="destination-page-qr-pay-btn"
                  onClick={() => onQuickQrPay(packageForAction)}
                  className="w-full py-3 bg-gradient-to-r from-[#00baf2] via-[#04285c] to-[#002970] hover:opacity-95 text-white font-black text-xs rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-sky-300"
                >
                  <QrCode className="w-4 h-4 text-[#00baf2]" />
                  <span>⚡ DIRECT PAYTM UPI QR BOOKING</span>
                </button>

                <a
                  href={`https://wa.me/919334789099?text=Namaste%2C%20I%20am%20interested%20in%20booking%20${encodeURIComponent(destination.title)}%20(${encodeURIComponent(currentDuration)}%20-%20Rs.${currentPrice}).%20Please%20guide%20me.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat with Travel Specialist (+91 9334789099)</span>
                </a>

                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#ff6a00]" />
                  <span>Share this Destination Link</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Refund on Medical / Weather Cancellations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Certified Himalayan Expedition Leaders</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff6a00] shrink-0" />
                  <span>Instant E-Voucher with PNR Confirmation</span>
                </div>
              </div>
            </div>

            {/* Office Contact Card */}
            <div className="bg-[#081524] text-white rounded-3xl p-5 border border-slate-800 space-y-2 text-xs">
              <span className="text-[#ff6a00] font-black uppercase text-[10px] tracking-wider">
                Moksha Gateways Support Desk
              </span>
              <p className="font-semibold text-slate-200">
                Head Office: D-58/12-A-7, Sigra, Varanasi, UP 221010
              </p>
              <p className="text-slate-400">
                Helpline: +91 9334789099 • 24x7 Active Traveler Assistance
              </p>
            </div>
          </div>
        </div>

        {/* Similar Recommended Destinations Section */}
        {relatedDestinations.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[#ff6a00] font-black text-xs uppercase tracking-wider">
                  More Mountain & Holiday Expeditions
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-['Cinzel'] text-slate-900 mt-1">
                  You Might Also Like
                </h3>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-bold text-slate-600 hover:text-[#ff6a00] flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDestinations.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectOtherDestination(rel.id)}
                  className="bg-white rounded-2xl shadow-xs hover:shadow-xl border border-slate-200 hover:border-teal-500 transition-all cursor-pointer overflow-hidden group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 relative overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="bg-slate-950/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                          {rel.duration}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                        <span className="text-[11px] font-bold text-amber-300">⭐ {rel.rating}</span>
                        <span className="font-extrabold text-sm">₹{rel.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-black text-slate-900 text-sm line-clamp-1 group-hover:text-teal-700 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {rel.destination}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      className="w-full py-2 bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-[#ff6a00] group-hover:to-orange-600 group-hover:text-white text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                    >
                      <span>Explore {rel.title.split(' ')[0]}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal Dialog */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#081a2e] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ff6a00] text-white flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black">Share This Destination</h4>
                  <p className="text-[11px] text-slate-400">Anyone opening this link will see this exact page</p>
                </div>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Destination preview mini card */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <h5 className="text-xs font-black text-slate-900 truncate">{destination.title}</h5>
                  <p className="text-[11px] text-slate-500 truncate">{destination.duration} • ₹{destination.price.toLocaleString('en-IN')}/person</p>
                  <span className="text-[10px] text-emerald-600 font-bold">Verified on Moksha Gateways</span>
                </div>
              </div>

              {/* Direct WhatsApp Share button */}
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share via WhatsApp</span>
              </a>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={facebookShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold border border-blue-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Facebook</span>
                </a>
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>X (Twitter)</span>
                </a>
              </div>

              {/* Copy URL Input Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Page Link (Sharable URL)
                </label>
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-300">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-transparent text-xs text-slate-700 px-2 py-1 outline-hidden select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 bg-[#081a2e] hover:bg-[#ff6a00] text-white text-xs font-black rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                {isCopied && (
                  <p className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Direct page link copied to clipboard!</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
