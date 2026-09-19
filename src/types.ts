export type ServiceType = 'flights' | 'hotels' | 'yatras' | 'holidays' | 'trains' | 'cabs' | 'ai-planner';

export type TripType = 'oneway' | 'roundtrip' | 'multicity';
export type CabinClass = 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
export type FareType = 'regular' | 'senior' | 'student' | 'armed_forces' | 'pilgrim';

export interface CityOption {
  city: string;
  code: string;
  name: string;
  state: string;
  isPilgrimage?: boolean;
}

export interface FlightSearchQuery {
  tripType: TripType;
  from: CityOption;
  to: CityOption;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: CabinClass;
  fareType: FareType;
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  price: number;
  originalPrice: number;
  seatsLeft: number;
  refundable: boolean;
  cabinClass: CabinClass;
  baggage: string;
  mealIncluded: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  location: string;
  starRating: number;
  userRating: number;
  reviewsCount: number;
  pricePerNight: number;
  originalPrice: number;
  image: string;
  amenities: string[];
  spiritualHighlights?: string;
  distanceToTemple?: string;
  satvikFood: boolean;
  freeCancellation: boolean;
  badge?: string;
}

export interface YatraDay {
  day: number;
  title: string;
  description: string;
  stay: string;
  meals: string;
}

export interface YatraPackage {
  id: string;
  title: string;
  subtitle: string;
  circuit: 'Char Dham' | 'Jyotirlinga' | 'North Sacred' | 'South Sacred' | 'Buddhist' | 'Himalayan';
  location: string;
  days: number;
  nights: number;
  placesCovered: string[];
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  image: string;
  highlights: string[];
  itinerary: YatraDay[];
  inclusions: string[];
  badge?: string;
  hasHelicopterOption?: boolean;
  nextDates: string[];
}

export interface HolidayDurationOption {
  duration: string;
  nights: number;
  days: number;
  price: number;
  originalPrice: number;
  badge?: string;
  description?: string;
}

export interface HolidayPackage {
  id: string;
  title: string;
  destination: string;
  location: string;
  duration: string;
  nights?: number;
  days?: number;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  image: string;
  theme: string;
  tags: string[];
  category?: 'all' | 'himachal' | 'uttarakhand' | 'ladakh' | 'kashmir' | 'sacred' | 'international' | 'rajasthan';
  region?: string;
  reasonToVisit?: string;
  highlights?: string[];
  inclusions?: string[];
  itinerary?: { day: number; title: string; description: string; stay?: string; meals?: string }[];
  isInternational?: boolean;
  badge?: string;
  durationOptions?: HolidayDurationOption[];
}

export interface TrainClassAvailability {
  code: '1A' | '2A' | '3A' | 'CC' | 'EC' | 'SL';
  className: string;
  price: number;
  status: 'AVAILABLE' | 'RAC' | 'WL';
  seats: number;
}

export interface Train {
  id: string;
  trainNumber: string;
  trainName: string;
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  runDays: string[];
  classes: TrainClassAvailability[];
  type: 'Vande Bharat' | 'Rajdhani' | 'Superfast' | 'Tejas';
}

export interface Cab {
  id: string;
  model: string;
  category: 'Sedan' | 'SUV' | 'MUV' | 'Tempo Traveller' | 'Luxury Van' | 'Luxury Bus';
  capacity: number;
  luggage: number;
  pricePerKm: number;
  baseFare: number;
  estimatedTotal: number;
  features: string[];
  image: string;
  rating: number;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  darshanPassRequired?: boolean;
  seatPreference?: string;
}

export interface Booking {
  id: string;
  pnr: string;
  serviceType: ServiceType;
  title: string;
  routeOrLocation: string;
  travelDate: string;
  passengers: Passenger[];
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  totalAmount: number;
  discountApplied: number;
  promoCode?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  bookedAt: string;
  specialRequests?: string;
  details: {
    flightNumber?: string;
    airline?: string;
    hotelName?: string;
    roomType?: string;
    yatraCircuit?: string;
    trainNumber?: string;
    cabModel?: string;
  };
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  category: ServiceType | 'all';
  discountValue: number;
  minBooking: number;
  badge: string;
  validTill: string;
}

export interface LeadData {
  id?: string;
  leadType: 'Booking' | 'Inquiry' | 'Callback' | 'Customization' | 'Quick QR' | 'Login';
  name: string;
  phone: string;
  email?: string;
  serviceType?: ServiceType;
  destinationOrPackage?: string;
  duration?: string;
  travelDate?: string;
  travelersCount?: number;
  budgetOrAmount?: number | string;
  couponCode?: string;
  notes?: string;
  sourceUrl?: string;
  submittedAt?: string;
}
