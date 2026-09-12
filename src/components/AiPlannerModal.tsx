import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  Send, 
  Check, 
  Clock, 
  Building2, 
  ShieldCheck,
  Flame,
  ArrowRight,
  Loader2,
  Compass,
  CheckCircle2,
  MessageCircle,
  FileText
} from 'lucide-react';

interface AiPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConvertPlanToBooking: (plan: any) => void;
}

interface StaticItinerary {
  id: string;
  title: string;
  destination: string;
  duration: string;
  style: string;
  bestSeason: string;
  estimatedCost: string;
  badge: string;
  summary: string;
  days: {
    day: number;
    title: string;
    activities: string[];
    highlight?: string;
    staySuggestion?: string;
  }[];
  packingTips: string[];
}

const STATIC_CURATED_PLANS: StaticItinerary[] = [
  {
    id: 'plan-spiti',
    title: 'Spiti Valley High-Altitude 4x4 Circuit',
    destination: 'Spiti Valley, Himachal Pradesh',
    duration: '7 Days / 6 Nights',
    style: 'Adventure & Himalayan Expedition',
    bestSeason: 'May to October',
    estimatedCost: '₹22,999 - ₹26,500 / person',
    badge: 'Trending Himalayan Expedition',
    summary: 'Traverse world-famous Kunzum Pass, ancient Key Monastery, world’s highest post office at Hikkim, and camp under the Milky Way at pristine Chandratal Lake.',
    days: [
      {
        day: 1,
        title: 'Shimla to Kalpa via Kinnaur Valley',
        activities: ['Scenic drive along Sutlej river', 'Visit suicide point and apple orchards', 'Sunset view of sacred Kinner Kailash peak'],
        highlight: 'Kinner Kailash Golden Sunset',
        staySuggestion: 'Kalpa Boutique Alpine Lodge'
      },
      {
        day: 2,
        title: 'Kalpa to Nako & Tabo Monastery',
        activities: ['Halt at Khab river confluence (Spiti & Sutlej)', 'Explore Nako Lake & 1,000-year-old Tabo mud monastery', 'Ancient Buddhist frescoes and meditation caves'],
        highlight: 'UNESCO-listed Tabo Murals',
        staySuggestion: 'Tabo Heritage Guesthouse'
      },
      {
        day: 3,
        title: 'Tabo to Kaza via Dhankar Monastery',
        activities: ['Drive to Dhankar cliffside gompa overlooking pin-spiti confluence', 'Check-in at Kaza capital', 'Evening local Spiti market and sea-buckthorn tea'],
        highlight: 'Dhankar Cliff Gompa',
        staySuggestion: 'Kaza Valley Deluxe Hotel'
      },
      {
        day: 4,
        title: 'High Villages: Key, Kibber, Chicham & Hikkim',
        activities: ['Morning prayers at 11th century Key Gompa', 'Cross Asia’s highest bridge at Chicham (4,145m)', 'Send letters from world’s highest Post Office Hikkim (4,440m)', 'Fossil hunting at Langza beneath Chau Chau Kang Nilda'],
        highlight: 'World’s Highest Post Office',
        staySuggestion: 'Kaza Valley Deluxe Hotel'
      },
      {
        day: 5,
        title: 'Kaza to Chandratal Lake via Kunzum Pass',
        activities: ['Drive through high winds of Kunzum Top (4,551m)', 'Pay homage to Kunzum Mata shrine', '2-hour scenic walk around moon lake Chandratal', 'Night astrophotography camp'],
        highlight: 'Magical Chandratal Milky Way Stargazing',
        staySuggestion: 'Chandratal Swiss Luxury Tents'
      },
      {
        day: 6,
        title: 'Chandratal to Manali via Atal Tunnel',
        activities: ['Cross rugged Batal and Chatru water crossings', 'Ascend towards Gramphu', 'Drive through engineering marvel Atal Tunnel', 'Arrive in Manali for celebration dinner'],
        highlight: 'Off-road 4x4 Water Crossings',
        staySuggestion: 'Manali Pine Retreat'
      },
      {
        day: 7,
        title: 'Manali Departure / Delhi Return',
        activities: ['Morning visit to Old Manali cafes', 'Volvo or private cab departure to Delhi/Chandigarh with lifelong memories'],
        highlight: 'Expedition Completion',
        staySuggestion: 'Safe Journey Home'
      }
    ],
    packingTips: [
      'Layered thermal wear & windproof jacket (sub-zero night temperatures).',
      'Diamox / camphor pouch for high-altitude acclimatization.',
      'High SPF sunscreen, UV sunglasses, and powerbanks (intermittent electricity).'
    ]
  },
  {
    id: 'plan-chardham',
    title: 'Sacred Char Dham Yatra VIP Circuit',
    destination: 'Yamunotri, Gangotri, Kedarnath & Badrinath',
    duration: '10 Days / 9 Nights',
    style: 'Spiritual Pilgrimage & Moksha Darshan',
    bestSeason: 'May to June & September to November',
    estimatedCost: '₹42,500 - ₹48,000 / person',
    badge: 'Most Revered Holy Circuit',
    summary: 'A completely assisted divine journey to the four sacred Himalayan shrines with verified biometric passes, sevadar darshan support, clean satvik meals, and medical oxygen back-up.',
    days: [
      {
        day: 1,
        title: 'Haridwar / Dehradun to Barkot',
        activities: ['Meet Moksha sevadar at Haridwar', 'Scenic drive via Mussoorie and Kempty falls', 'Briefing on Yamunotri trek route and biometric verification'],
        highlight: 'Ganga Sankalp Puja',
        staySuggestion: 'Barkot Riverside Camp'
      },
      {
        day: 2,
        title: 'Yamunotri Dham Darshan',
        activities: ['Early drive to Janki Chatti', '6 km trek/pony to Yamunotri shrine', 'Holy dip in Surya Kund & cooking raw rice prasad', 'Evening return to Barkot'],
        highlight: 'Yamunotri Surya Kund Snan',
        staySuggestion: 'Barkot Riverside Camp'
      },
      {
        day: 3,
        title: 'Barkot to Uttarkashi (Kashi Vishwanath)',
        activities: ['Drive along Bhagirathi valley', 'Visit ancient Kashi Vishwanath temple & Shakti Trishul in Uttarkashi', 'Evening Ganga aarti at Uttarkashi ghat'],
        highlight: 'Uttarkashi Kashi Vishwanath Darshan',
        staySuggestion: 'Uttarkashi Deluxe Hotel'
      },
      {
        day: 4,
        title: 'Uttarkashi to Gangotri Dham & Return',
        activities: ['Drive through scenic Harsil apple orchards', 'Holy dip in icy Bhagirathi at Gangotri', 'Special Archana and Ganga puja', 'Return to Uttarkashi'],
        highlight: 'Gangotri Temple Archana',
        staySuggestion: 'Uttarkashi Deluxe Hotel'
      },
      {
        day: 5,
        title: 'Uttarkashi to Guptkashi / Sonprayag',
        activities: ['Scenic valley drive crossing Mandakini river', 'Medical check-up and biometric verification for Kedarnath', 'Evening rest preparing for the holy climb'],
        highlight: 'Mandakini Confluence',
        staySuggestion: 'Guptkashi Resort'
      },
      {
        day: 6,
        title: 'Trek to Kedarnath Jyotirlinga',
        activities: ['Early morning departure from Gaurikund', 'Trek/Helicopter to Kedarnath at 3,584m', 'Evening divine Sandhya Aarti at Kedarnath temple surrounded by snow peaks'],
        highlight: 'Evening Kedarnath Maha Aarti',
        staySuggestion: 'Kedarnath GMVN / Deluxe Ashrams'
      },
      {
        day: 7,
        title: 'Kedarnath Early Darshan & Descend to Chopta',
        activities: ['Morning 4:00 AM Maha Abhishek darshan at Kedarnath', 'Descend to Gaurikund and drive to mini-Switzerland Chopta', 'Night bonfire amidst rhododendron forests'],
        highlight: 'Morning Sanctum Sanctorum Puja',
        staySuggestion: 'Chopta Alpine Swiss Tents'
      },
      {
        day: 8,
        title: 'Chopta to Badrinath via Joshimath',
        activities: ['Drive through Narsingh temple Joshimath', 'Cross Govindghat and Vishnuprayag', 'Arrive at holy Badrinath Dham', 'Evening Aarti and Tapt Kund visit'],
        highlight: 'Badrinath Evening Deep Aarti',
        staySuggestion: 'Badrinath Pilgrim Lodge'
      },
      {
        day: 9,
        title: 'Badrinath Darshan, Mana Village & Rudraprayag',
        activities: ['Morning holy darshan of Badri Vishal', 'Visit Mana: First village of India, Vyas Gufa, and Bhim Pul', 'Drive to sacred confluence at Rudraprayag (Alaknanda & Mandakini)'],
        highlight: 'Mana Village & Saraswati River Origin',
        staySuggestion: 'Rudraprayag Riverside Hotel'
      },
      {
        day: 10,
        title: 'Rudraprayag to Rishikesh & Haridwar Departure',
        activities: ['Visit Devprayag (where Alaknanda & Bhagirathi meet to become Ganga)', 'Arrive in Rishikesh for Ram Jhula & Parmarth Ganga Aarti', 'Drop at Haridwar railway station / Dehradun airport'],
        highlight: 'Devprayag Holy Sangam Snan',
        staySuggestion: 'Journey Completion'
      }
    ],
    packingTips: [
      'Medical fitness certificate & valid Govt. ID card mandatory.',
      'Heavy woolens, thermals, raincoat, and sturdy trekking shoes.',
      'Personal emergency medicine kit and hot water thermos bottle.'
    ]
  },
  {
    id: 'plan-ladakh',
    title: 'Leh Ladakh Himalayan Bike & 4x4 Safari',
    destination: 'Leh, Nubra Valley, Pangong Tso & Khardung La',
    duration: '6 Days / 5 Nights',
    style: 'Adventure & Scenic Landscapes',
    bestSeason: 'June to October',
    estimatedCost: '₹27,500 - ₹32,000 / person',
    badge: 'Biker & Adventure Favorite',
    summary: 'Conquer the legendary Khardung La (5,359m), ride double-humped Bactrian camels across the silver sand dunes of Hunder, and camp beside the surreal blue waters of Pangong Lake.',
    days: [
      {
        day: 1,
        title: 'Arrival in Leh & Mandatory Acclimatization',
        activities: ['Fly into Leh Kushok Bakula Airport (3,500m)', 'Complete physical rest to prevent AMS', 'Gentle evening stroll to Leh Palace & Shanti Stupa'],
        highlight: 'Shanti Stupa Golden Sunset',
        staySuggestion: 'Leh Heritage Boutique Hotel'
      },
      {
        day: 2,
        title: 'Sham Valley: Magnetic Hill & Sangam',
        activities: ['Visit Hall of Fame military museum', 'Test gravity at Magnetic Hill', 'Marvel at Indus & Zanskar river confluence', 'Visit Gurudwara Pathar Sahib'],
        highlight: 'Indus-Zanskar River Confluence',
        staySuggestion: 'Leh Heritage Boutique Hotel'
      },
      {
        day: 3,
        title: 'Leh to Nubra Valley via Khardung La',
        activities: ['Cross highest motorable road Khardung La (5,359m)', 'Descend into fertile Nubra valley', 'Double-humped camel safari on white sand dunes of Hunder'],
        highlight: 'Khardung La Summit & Hunder Sand Dunes',
        staySuggestion: 'Hunder Organic Swiss Tents'
      },
      {
        day: 4,
        title: 'Nubra Valley to Pangong Tso via Shyok River',
        activities: ['Morning visit to giant Diskit Buddha statue', 'Scenic off-road ride alongside crystal Shyok river', 'Arrival at world-famous Pangong Lake (4,250m)'],
        highlight: 'Color-Changing Pangong Tso Sunset',
        staySuggestion: 'Pangong Glamping Tents'
      },
      {
        day: 5,
        title: 'Pangong Tso to Leh via Chang La',
        activities: ['Sunrise photography by the lake', 'Ascend second-highest pass Chang La (5,360m)', 'Visit Thiksey Monastery & Rancho School', 'Farewell dinner in Leh'],
        highlight: 'Pangong Sunrise & Thiksey Gompa',
        staySuggestion: 'Leh Heritage Boutique Hotel'
      },
      {
        day: 6,
        title: 'Leh Departure',
        activities: ['Transfer to Leh Airport with Himalayan memories and photography collection.'],
        highlight: 'Himalayan Farewell',
        staySuggestion: 'Flight Home'
      }
    ],
    packingTips: [
      'Inner line permits are included and managed by Moksha Gateways.',
      'Windproof riding gear, thermal undergarments, and polarized sunglasses.'
    ]
  },
  {
    id: 'plan-bali',
    title: 'Bali Island & Nusa Penida Tropical Gateway',
    destination: 'Ubud, Kintamani, Nusa Penida & Seminyak',
    duration: '6 Days / 5 Nights',
    style: 'Luxury Holiday & Island Exploration',
    bestSeason: 'All Year Round',
    estimatedCost: '₹34,500 - ₹39,000 / person',
    badge: 'Popular International Gateway',
    summary: 'Lush tropical rainforests of Ubud, emerald Tegallalang rice terraces, iconic Kelingking T-Rex cliff at Nusa Penida, and spectacular Uluwatu cliff temple sunsets.',
    days: [
      {
        day: 1,
        title: 'Arrival in Bali & Ubud Jungle Check-in',
        activities: ['Flower garland welcome at Denpasar Airport', 'Private transfer to private pool villa in Ubud', 'Traditional Balinese aroma massage'],
        highlight: 'Private Pool Villa Welcome',
        staySuggestion: 'Ubud Jungle Valley Resort'
      },
      {
        day: 2,
        title: 'Ubud Culture: Rice Terraces & Waterfall',
        activities: ['Visit Tegallalang green rice terraces & giant Bali swing', 'Sacred Monkey Forest sanctuary', 'Swim at scenic Tegenungan waterfall'],
        highlight: 'Iconic Bali Jungle Swing',
        staySuggestion: 'Ubud Jungle Valley Resort'
      },
      {
        day: 3,
        title: 'Kintamani Volcano & Coffee Plantation',
        activities: ['Panoramic view of active Mount Batur volcano & lake', 'Taste authentic Luwak coffee & herbal teas', 'Visit Tirta Empul holy spring water temple'],
        highlight: 'Mount Batur Volcano Vista',
        staySuggestion: 'Ubud Jungle Valley Resort'
      },
      {
        day: 4,
        title: 'Nusa Penida Island Day Cruise',
        activities: ['Fast boat to Nusa Penida island', 'Marvel at iconic Kelingking Beach (T-Rex cliff)', 'Visit Broken Beach and Angel’s Billabong natural infinity pool', 'Snorkeling with manta rays'],
        highlight: 'Kelingking T-Rex Cliff Panorama',
        staySuggestion: 'Seminyak Beachfront Resort'
      },
      {
        day: 5,
        title: 'Seminyak Leisure & Uluwatu Sunset Temple',
        activities: ['Morning shopping at Seminyak boutiques', 'Visit sea-cliff Uluwatu temple', 'Watch traditional Kecak fire dance against crimson Indian ocean sunset'],
        highlight: 'Uluwatu Sunset Kecak Fire Dance',
        staySuggestion: 'Seminyak Beachfront Resort'
      },
      {
        day: 6,
        title: 'Souvenir Shopping & Airport Departure',
        activities: ['Krisna Oleh Oleh handicraft shopping and airport drop.'],
        highlight: 'Island Memories',
        staySuggestion: 'Flight Back'
      }
    ],
    packingTips: [
      'Passport valid for at least 6 months required.',
      'Visa on Arrival (VoA) & tourist levy assisted by Moksha team.'
    ]
  }
];

export const AiPlannerModal: React.FC<AiPlannerModalProps> = ({
  isOpen,
  onClose,
  onConvertPlanToBooking
}) => {
  const [activeTab, setActiveTab] = useState<'static' | 'custom'>('static');
  const [selectedStaticPlan, setSelectedStaticPlan] = useState<StaticItinerary>(STATIC_CURATED_PLANS[0]);

  const [destination, setDestination] = useState('Spiti Valley, Himachal');
  const [days, setDays] = useState('7');
  const [travelers, setTravelers] = useState('2 adults');
  const [tripType, setTripType] = useState('Himalayan Pilgrimage & Trekking');
  const [preferences, setPreferences] = useState('Comfortable stays, scenic photo spots, oxygen back-up, delicious local meals');
  
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const createFallbackPlan = (dest: string, durationStr: string, trav: string, style: string, pref: string) => {
    const numDays = Math.max(2, Math.min(14, parseInt(durationStr) || 4));
    const targetDest = dest.trim() || 'Himalayas & Sacred Circuit';
    const cleanDest = targetDest.replace(/[,\.].*$/, '').trim();

    const dayTemplates = [
      {
        title: `Arrival & Sacred Welcome in ${cleanDest}`,
        activities: [
          `VIP pickup and seamless transfer to scenic heritage hotel`,
          `Traditional Aarti welcome with refreshing mountain herbal tea or holy charanamrit`,
          `Evening orientation and sunset stroll along the local riverside or spiritual promenade`
        ],
        spiritualHighlight: `Evening Mangala Aarti & blessing ceremony in ${cleanDest}`,
        staySuggestion: `Heritage Luxury Retreat / Alpine Boutique Stay`
      },
      {
        title: `Divine Darshans & Historic Sanctum Exploration`,
        activities: [
          `Special VIP queue assistance for morning sanctum sanctorum darshan`,
          `Guided heritage exploration with certified local priest/historian`,
          `Sattvic gourmet luncheon featuring authentic local delicacies`
        ],
        spiritualHighlight: `Auspicious morning Rudrabhishekam / Puja offering`,
        staySuggestion: `4-Star Deluxe Resort with mountain or river view`
      },
      {
        title: `Scenic Splendors, Meditation & Hidden Trails`,
        activities: [
          `Early sunrise meditation walk amidst panoramic Himalayan/riverfront viewpoints`,
          `Excursion to sacred caves, ancient shrines, and picturesque village hamlets`,
          `Evening acoustic devotional chanting and local artisans market visit`
        ],
        spiritualHighlight: `Peaceful mindfulness session at high-altitude viewpoint`,
        staySuggestion: `Scenic Valley Resort / Luxury Swiss Cottage`
      },
      {
        title: `Auspicious Morning Blessings & Homeward Journey`,
        activities: [
          `Dawn Surya Arghya and sacred water collection (Gangajal / Tirtham)`,
          `Souvenir shopping for pure brass mementos, handmade shawls and certified prasadam`,
          `Assisted airport / Vande Bharat express station transfer with souvenir gift box`
        ],
        spiritualHighlight: `Final departure blessings and sanctified mahaprasad distribution`,
        staySuggestion: `Departure to Home Destination`
      }
    ];

    const generatedDays = [];
    for (let i = 1; i <= numDays; i++) {
      const templateIndex = (i - 1) % dayTemplates.length;
      const base = dayTemplates[templateIndex];
      generatedDays.push({
        day: i,
        title: i === numDays ? `Day ${i}: Farewell & Journey Homeward from ${cleanDest}` : `Day ${i}: ${base.title}`,
        activities: base.activities.map(a => `${a} (${cleanDest})`),
        spiritualHighlight: base.spiritualHighlight,
        staySuggestion: i === numDays ? 'Departure' : base.staySuggestion
      });
    }

    return {
      title: `${numDays}-Day Sacred & Scenic Journey to ${targetDest}`,
      summary: `A personalized ${style || 'Spiritual & Leisure'} journey tailored for ${trav || '2 travelers'}, harmonizing VIP temple darshans, breathtaking nature vistas, and top-rated comfort based on your preference: "${pref || 'Comfort & Satvik Meals'}".`,
      bestSeason: 'April to June & September to November',
      estimatedCost: `₹${(numDays * 4200).toLocaleString('en-IN')} per person`,
      days: generatedDays,
      packingTips: [
        'Modest traditional clothing for temple sanctums and warm thermal layers for cool evenings',
        'Sturdy slip-resistant walking shoes and trekking socks',
        'Government ID proofs (Aadhar/Passport) for biometric registrations and VIP darshan passes',
        'Personal medications and altitude care essentials'
      ]
    };
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days,
          travelers,
          tripType,
          preferences
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.plan) {
          setGeneratedPlan(data.plan);
          return;
        }
      }
      // If endpoint returns non-ok (e.g. 404 on GitHub Pages or static hosting)
      const fallback = createFallbackPlan(destination, days, travelers, tripType, preferences);
      setGeneratedPlan(fallback);
    } catch {
      // Network error or offline - seamlessly provide rich offline/static plan
      const fallback = createFallbackPlan(destination, days, travelers, tripType, preferences);
      setGeneratedPlan(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappInquiryUrl = (planTitle: string) => {
    const text = `Namaste Moksha Gateways, I am interested in booking or customizing the "${planTitle}" itinerary planned with AI THAPA. Please share details.`;
    return `https://wa.me/917352883580?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden my-6 border border-slate-200">
        {/* Header - Styled with Brand Navy & Orange */}
        <div className="bg-gradient-to-r from-[#081729] via-[#0B2545] to-[#123159] text-white p-5 flex items-center justify-between border-b border-[#ff6a00]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6a00] to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-950/50">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-['Cinzel'] tracking-wide text-white">
                  AI THAPA
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#ff6a00] text-white uppercase tracking-wider shadow-xs">
                  Trip Planner
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                For Your Personal Trip Planner & Himalayan Adventure Architect
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              id="ai-thapa-static-tab-btn"
              onClick={() => setActiveTab('static')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'static'
                  ? 'bg-[#0B2545] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-[#0B2545] border border-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#ff6a00]" />
              <span>Ready Curated Itineraries (Instant Static Plans)</span>
            </button>

            <button
              id="ai-thapa-custom-tab-btn"
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'custom'
                  ? 'bg-[#0B2545] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-[#0B2545] border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff6a00]" />
              <span>Custom Plan Generator</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-semibold hidden md:inline">
            Verified with IRCTC & Govt. Tourism Standards
          </span>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {/* 1. Static Curated Itineraries Tab */}
          {activeTab === 'static' && (
            <div className="space-y-6">
              {/* Quick Destination Pill Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Select Popular Destination Circuit:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {STATIC_CURATED_PLANS.map((plan) => {
                    const isSelected = selectedStaticPlan.id === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        id={`static-plan-select-${plan.id}`}
                        onClick={() => setSelectedStaticPlan(plan)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#ff6a00] bg-orange-50/50 shadow-xs ring-1 ring-[#ff6a00]'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-[10px] font-bold text-[#ff6a00] uppercase truncate">
                          {plan.badge}
                        </div>
                        <div className="text-xs font-black text-slate-900 line-clamp-1 mt-0.5">
                          {plan.destination}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {plan.duration}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Curated Itinerary Display */}
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-5">
                {/* Itinerary Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-slate-200/80 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ff6a00]/10 text-[#ff6a00] text-[11px] font-extrabold uppercase mb-2">
                      <Sparkles className="w-3 h-3" />
                      <span>{selectedStaticPlan.badge}</span>
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 font-['Cinzel']">
                      {selectedStaticPlan.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                      {selectedStaticPlan.summary}
                    </p>
                  </div>

                  <div className="text-left md:text-right shrink-0 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Estimated Investment</span>
                    <span className="text-base font-black text-[#0B2545]">{selectedStaticPlan.estimatedCost}</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                      📅 Best: {selectedStaticPlan.bestSeason}
                    </span>
                  </div>
                </div>

                {/* Day by Day Details */}
                <div className="space-y-3">
                  <h5 className="text-xs font-extrabold uppercase text-slate-700 tracking-wider flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#ff6a00]" />
                    <span>Day-by-Day Detailed Schedule</span>
                  </h5>

                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedStaticPlan.days.map((day) => (
                      <div key={day.day} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-extrabold text-xs text-[#0B2545]">
                            Day {day.day}: {day.title}
                          </span>
                        </div>

                        <ul className="space-y-1 text-xs text-slate-600 mb-2">
                          {day.activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#ff6a00] font-bold">•</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 text-[11px]">
                          {day.highlight && (
                            <span className="bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                              <Flame className="w-3 h-3 text-[#ff6a00]" />
                              <span>{day.highlight}</span>
                            </span>
                          )}
                          {day.staySuggestion && (
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-500" />
                              <span>Stay: {day.staySuggestion}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advisory & Packing Tips */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                  <div className="font-extrabold text-[#0B2545] mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Moksha Gateways Travel Advisory</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    {selectedStaticPlan.packingTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <a
                    href={whatsappInquiryUrl(selectedStaticPlan.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Inquiry for This Plan</span>
                  </a>

                  <button
                    onClick={() => {
                      onConvertPlanToBooking(selectedStaticPlan);
                      onClose();
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#ff6a00] to-orange-600 hover:from-orange-500 hover:to-orange-600 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <span>BOOK THIS STATIC ITINERARY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Custom Generator Tab */}
          {activeTab === 'custom' && (
            <div>
              {!generatedPlan ? (
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div className="p-4 bg-orange-50/70 rounded-xl border border-orange-200 text-xs text-orange-950 leading-relaxed">
                    Tell <strong>AI THAPA</strong> about your dream pilgrimage or holiday. It will craft a bespoke day-by-day plan with auspicious timings, priority passes, stay recommendations, and meal spots.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Destination / Holy Shrine
                      </label>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. Spiti Valley, Kedarnath & Badrinath, Bali"
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-orange-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Duration (Days)
                      </label>
                      <select
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-orange-500"
                      >
                        <option value="3">3 Days (Weekend Getaway)</option>
                        <option value="4">4 Days (Short Circuit)</option>
                        <option value="5">5 Days (Popular Expedition)</option>
                        <option value="7">7 Days (Full Circuit)</option>
                        <option value="10">10 Days (Grand Yatra)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Travelers Details
                      </label>
                      <input
                        type="text"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        placeholder="e.g. 2 adults with elderly parents"
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Trip Style
                      </label>
                      <select
                        value={tripType}
                        onChange={(e) => setTripType(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-orange-500"
                      >
                        <option value="Himalayan Pilgrimage & Trekking">Himalayan Pilgrimage & Trekking</option>
                        <option value="Spiritual & Heritage Darshan">Spiritual & Heritage Darshan</option>
                        <option value="Off-road 4x4 & Adventure">Off-road 4x4 & Adventure</option>
                        <option value="Relaxed Family Vacation">Relaxed Family Vacation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Special Preferences / Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                      placeholder="e.g. Wheelchair assistance, satvik food, high-altitude oxygen cylinder, mountain view resort"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:outline-orange-500"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#0B2545] via-[#123159] to-[#ff6a00] hover:from-[#0B2545] hover:to-orange-500 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        <span>AI THAPA is architecting your personalized itinerary...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#ff6a00]" />
                        <span>GENERATE CUSTOM ITINERARY WITH AI THAPA</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Generated Plan */
                <div className="space-y-6">
                  <div className="p-4 bg-orange-50/80 rounded-xl border border-orange-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-orange-700 tracking-wider">
                          AI THAPA Custom Blueprint
                        </span>
                        <h4 className="text-xl font-black text-slate-900 font-['Cinzel'] mt-1">
                          {generatedPlan.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {generatedPlan.summary}
                        </p>
                      </div>
                      <button
                        onClick={() => setGeneratedPlan(null)}
                        className="text-xs text-[#ff6a00] font-bold hover:underline shrink-0"
                      >
                        Edit Query
                      </button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-orange-200/60 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
                      <span>📅 Best Season: <strong className="text-slate-900">{generatedPlan.bestSeason}</strong></span>
                      <span>💰 Est. Investment: <strong className="text-[#ff6a00]">{generatedPlan.estimatedCost}</strong></span>
                    </div>
                  </div>

                  {/* Day by Day Plan */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                      Day-by-Day Sacred Schedule
                    </h5>
                    {generatedPlan.days?.map((d: any, index: number) => (
                      <div key={index} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-extrabold text-xs text-slate-900">
                            Day {d.day}: {d.title}
                          </span>
                        </div>

                        <ul className="space-y-1 mb-2 text-xs text-slate-600">
                          {d.activities?.map((act: string, i: number) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#ff6a00] font-bold">•</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                          {d.spiritualHighlight && (
                            <span className="bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded flex items-center gap-1">
                              <Flame className="w-3 h-3 text-[#ff6a00]" />
                              <span>Highlight: {d.spiritualHighlight}</span>
                            </span>
                          )}
                          {d.staySuggestion && (
                            <span className="bg-slate-200/70 text-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-600" />
                              <span>Stay: {d.staySuggestion}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setGeneratedPlan(null)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      ← Plan Another Journey
                    </button>

                    <button
                      onClick={() => {
                        onConvertPlanToBooking(generatedPlan);
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#ff6a00] to-orange-600 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>BOOK THIS CUSTOM PACKAGE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
