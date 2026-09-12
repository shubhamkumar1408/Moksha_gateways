import { CityOption, Flight, Hotel, YatraPackage, HolidayPackage, Train, Cab, Offer } from '../types';

export const POPULAR_CITIES: CityOption[] = [
  { city: 'New Delhi', code: 'DEL', name: 'Indira Gandhi International Airport', state: 'Delhi' },
  { city: 'Varanasi', code: 'VNS', name: 'Lal Bahadur Shastri International Airport', state: 'Uttar Pradesh', isPilgrimage: true },
  { city: 'Dehradun / Rishikesh', code: 'DED', name: 'Jolly Grant Airport (Gateway to Kedarnath)', state: 'Uttarakhand', isPilgrimage: true },
  { city: 'Ayodhya', code: 'AYJ', name: 'Maharishi Valmiki International Airport', state: 'Uttar Pradesh', isPilgrimage: true },
  { city: 'Mumbai', code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', state: 'Maharashtra' },
  { city: 'Tirupati', code: 'TIR', name: 'Tirupati Airport (Gateway to Tirumala Balaji)', state: 'Andhra Pradesh', isPilgrimage: true },
  { city: 'Goa', code: 'GOI', name: 'Dabolim / Mopa International Airport', state: 'Goa' },
  { city: 'Srinagar', code: 'SXR', name: 'Sheikh ul-Alam International Airport', state: 'Jammu & Kashmir' },
  { city: 'Bengaluru', code: 'BLR', name: 'Kempegowda International Airport', state: 'Karnataka' },
  { city: 'Kochi', code: 'COK', name: 'Cochin International Airport', state: 'Kerala' },
  { city: 'Jaipur', code: 'JAI', name: 'Jaipur International Airport', state: 'Rajasthan' },
  { city: 'Amritsar', code: 'ATQ', name: 'Sri Guru Ram Dass Jee Airport (Golden Temple)', state: 'Punjab', isPilgrimage: true },
  { city: 'Bodh Gaya', code: 'GAY', name: 'Gaya International Airport', state: 'Bihar', isPilgrimage: true }
];

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'fl-1',
    airline: 'Air India',
    airlineLogo: 'AI',
    flightNumber: 'AI 406',
    fromCode: 'DEL',
    fromCity: 'New Delhi',
    toCode: 'VNS',
    toCity: 'Varanasi',
    departureTime: '06:15',
    arrivalTime: '07:35',
    duration: '1h 20m',
    stops: 0,
    price: 4620,
    originalPrice: 5800,
    seatsLeft: 4,
    refundable: true,
    cabinClass: 'Economy',
    baggage: '15 Kgs Check-in + 7 Kgs Cabin',
    mealIncluded: true
  },
  {
    id: 'fl-2',
    airline: 'IndiGo',
    airlineLogo: '6E',
    flightNumber: '6E 2145',
    fromCode: 'DEL',
    fromCity: 'New Delhi',
    toCode: 'VNS',
    toCity: 'Varanasi',
    departureTime: '09:40',
    arrivalTime: '11:05',
    duration: '1h 25m',
    stops: 0,
    price: 4190,
    originalPrice: 5200,
    seatsLeft: 8,
    refundable: true,
    cabinClass: 'Economy',
    baggage: '15 Kgs Check-in + 7 Kgs Cabin',
    mealIncluded: false
  },
  {
    id: 'fl-3',
    airline: 'Vistara',
    airlineLogo: 'UK',
    flightNumber: 'UK 992',
    fromCode: 'DEL',
    fromCity: 'New Delhi',
    toCode: 'DED',
    toCity: 'Dehradun / Rishikesh',
    departureTime: '07:05',
    arrivalTime: '08:00',
    duration: '55m',
    stops: 0,
    price: 3850,
    originalPrice: 4800,
    seatsLeft: 3,
    refundable: true,
    cabinClass: 'Economy',
    baggage: '15 Kgs Check-in + 7 Kgs Cabin',
    mealIncluded: true
  },
  {
    id: 'fl-4',
    airline: 'SpiceJet',
    airlineLogo: 'SG',
    flightNumber: 'SG 8162',
    fromCode: 'DEL',
    fromCity: 'New Delhi',
    toCode: 'AYJ',
    toCity: 'Ayodhya',
    departureTime: '10:30',
    arrivalTime: '11:55',
    duration: '1h 25m',
    stops: 0,
    price: 3699,
    originalPrice: 4500,
    seatsLeft: 5,
    refundable: false,
    cabinClass: 'Economy',
    baggage: '15 Kgs Check-in + 7 Kgs Cabin',
    mealIncluded: false
  },
  {
    id: 'fl-5',
    airline: 'Akasa Air',
    airlineLogo: 'QP',
    flightNumber: 'QP 1332',
    fromCode: 'BOM',
    fromCity: 'Mumbai',
    toCode: 'GOI',
    toCity: 'Goa',
    departureTime: '13:15',
    arrivalTime: '14:30',
    duration: '1h 15m',
    stops: 0,
    price: 3240,
    originalPrice: 4100,
    seatsLeft: 6,
    refundable: true,
    cabinClass: 'Economy',
    baggage: '15 Kgs Check-in + 7 Kgs Cabin',
    mealIncluded: false
  },
  {
    id: 'fl-6',
    airline: 'Air India Express',
    airlineLogo: 'IX',
    flightNumber: 'IX 871',
    fromCode: 'BLR',
    fromCity: 'Bengaluru',
    toCode: 'TIR',
    toCity: 'Tirupati',
    departureTime: '08:10',
    arrivalTime: '09:05',
    duration: '55m',
    stops: 0,
    price: 2890,
    originalPrice: 3600,
    seatsLeft: 9,
    refundable: true,
    cabinClass: 'Economy',
    baggage: '15 Kgs Check-in + 7 Kgs Cabin',
    mealIncluded: false
  },
  {
    id: 'fl-7',
    airline: 'IndiGo',
    airlineLogo: '6E',
    flightNumber: '6E 5021',
    fromCode: 'DEL',
    fromCity: 'New Delhi',
    toCode: 'SXR',
    toCity: 'Srinagar',
    departureTime: '11:20',
    arrivalTime: '12:50',
    duration: '1h 30m',
    stops: 0,
    price: 5490,
    originalPrice: 6900,
    seatsLeft: 2,
    refundable: true,
    cabinClass: 'Economy',
    baggage: '15 Kgs Check-in + 7 Kgs Cabin',
    mealIncluded: false
  }
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'ht-1',
    name: 'BrijRama Palace, Varanasi - Heritage Grand on Darbhanga Ghat',
    city: 'Varanasi',
    location: 'Darbhanga Ghat, Old City, Varanasi',
    starRating: 5,
    userRating: 4.9,
    reviewsCount: 1420,
    pricePerNight: 21500,
    originalPrice: 26000,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Ghat Access', 'Satvik Gourmet Dining', 'Live Ganga Aarti View', 'Bajra Boat Transfers', 'Spa'],
    spiritualHighlights: 'Direct historic elevator from private boat on Ganga river; 5 mins walk to Kashi Vishwanath corridor.',
    distanceToTemple: '300 meters from Kashi Vishwanath Temple',
    satvikFood: true,
    freeCancellation: true,
    badge: 'Moksha Signature Luxury'
  },
  {
    id: 'ht-2',
    name: 'Taj Rishikesh Resort & Spa, Uttarakhand',
    city: 'Rishikesh',
    location: 'Singthali, Rishikesh by Holy Ganges',
    starRating: 5,
    userRating: 4.8,
    reviewsCount: 980,
    pricePerNight: 28000,
    originalPrice: 34000,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Ganga Beach', 'Jiva Ayurvedic Spa', 'Daily Yoga & Havan', 'Mountain View Pools'],
    spiritualHighlights: 'Morning Vedic chanting sessions and evening personalized Ganga Aarti on private river deck.',
    distanceToTemple: 'Private spiritual sanctuary on Ganga banks',
    satvikFood: true,
    freeCancellation: true,
    badge: 'Spiritual Wellness Sanctuary'
  },
  {
    id: 'ht-3',
    name: 'Lemon Tree Premier, Ayodhya',
    city: 'Ayodhya',
    location: 'Civil Lines, Near Ram Mandir Corridor',
    starRating: 4,
    userRating: 4.6,
    reviewsCount: 760,
    pricePerNight: 6800,
    originalPrice: 8500,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    amenities: ['Pure Vegetarian Kitchen', 'Temple Shuttle Service', 'Fitness Center', '24x7 Room Dining'],
    spiritualHighlights: 'Complimentary morning golf-cart drop to Ram Janmabhoomi Complex.',
    distanceToTemple: '1.2 km from Shri Ram Janmabhoomi Mandir',
    satvikFood: true,
    freeCancellation: true,
    badge: 'Best Seller Near Mandir'
  },
  {
    id: 'ht-4',
    name: 'Marasa Sarovar Premiere, Tirupati',
    city: 'Tirupati',
    location: 'Upadhyaya Nagar, Karakambadi Road, Tirupati',
    starRating: 5,
    userRating: 4.7,
    reviewsCount: 1840,
    pricePerNight: 5900,
    originalPrice: 7200,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['Navarasa Theme Architecture', 'Pure Veg Lotus Restaurant', 'Temple Travel Desk', 'Swimming Pool'],
    spiritualHighlights: 'Official TTD Darshan assistance counter inside lobby.',
    distanceToTemple: '15 mins drive to Alipiri Toll Gate',
    satvikFood: true,
    freeCancellation: true,
    badge: 'Top Pilgrim Choice'
  },
  {
    id: 'ht-5',
    name: 'The Leela Palace, Udaipur',
    city: 'Udaipur',
    location: 'Lake Pichola, Udaipur',
    starRating: 5,
    userRating: 4.9,
    reviewsCount: 2100,
    pricePerNight: 36000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    amenities: ['Lake View Suites', 'Royal Boat Arrival', 'Ayurvedic Spa', 'Bespoke Dining'],
    spiritualHighlights: 'Sunset boat cruise to Jag Mandir with heritage flute melodies.',
    distanceToTemple: 'Near historic Jagdish Mandir',
    satvikFood: true,
    freeCancellation: true,
    badge: 'Royal Holiday Getaway'
  },
  {
    id: 'ht-6',
    name: 'Radisson Blu Resort, Cavelossim Beach, Goa',
    city: 'Goa',
    location: 'Cavelossim Beach, South Goa',
    starRating: 5,
    userRating: 4.6,
    reviewsCount: 1530,
    pricePerNight: 10400,
    originalPrice: 13000,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    amenities: ['Direct Beach Access', 'Ayurveda & Spa', 'Multiple Restaurants', 'Kids Play Zone'],
    spiritualHighlights: 'Peaceful serene south coast waters away from party noise.',
    distanceToTemple: '10 mins to historic Shanta Durga Temple',
    satvikFood: false,
    freeCancellation: true,
    badge: 'Relaxation Retreat'
  }
];

export const MOCK_YATRAS: YatraPackage[] = [
  {
    id: 'yt-1',
    title: 'Char Dham Deluxe Helicopter Yatra 2026',
    subtitle: 'Yamunotri • Gangotri • Kedarnath • Badrinath with VIP Darshans',
    circuit: 'Char Dham',
    location: 'Garhwal Himalayas (Dehradun, Yamunotri, Gangotri, Kedarnath, Badrinath), Uttarakhand, India',
    days: 6,
    nights: 5,
    placesCovered: ['Dehradun', 'Kharsali (Yamunotri)', 'Harsil (Gangotri)', 'Kedarnath Helipad', 'Badrinath'],
    rating: 4.95,
    reviewsCount: 840,
    price: 185000,
    originalPrice: 210000,
    image: './destinations/kedarnath.jpg',
    highlights: [
      'Same-day helicopter transfers between all 4 dhams',
      'VIP priority entry slip included at all 4 temples',
      '4-star & luxury Swiss tent accommodation',
      'Pure satvik meals prepared by personal Maharaj',
      'Doctor & oxygen support throughout high altitudes'
    ],
    inclusions: ['Helicopter tickets', 'All meals (Satvik)', 'VIP Darshan pass', 'Palki / Pony at Yamunotri', 'GST included'],
    badge: 'Most Revered • VIP Heli',
    hasHelicopterOption: true,
    nextDates: ['May 15, 2026', 'June 02, 2026', 'Sept 10, 2026', 'Oct 04, 2026'],
    itinerary: [
      { day: 1, title: 'Dehradun Arrival & Briefing', description: 'Arrival at Dehradun, transfer to luxury hotel, meet tour captain & receive duffle bags.', stay: 'Hyatt Regency Dehradun', meals: 'Dinner' },
      { day: 2, title: 'Yamunotri Dham Darshan', description: 'Heli fly to Kharsali, palki to Yamunotri temple, darshan and holy dip at Surya Kund.', stay: 'Kalindi Resort Kharsali', meals: 'All Meals' },
      { day: 3, title: 'Gangotri Dham Darshan', description: 'Fly to beautiful Harsil valley, VIP darshan at Gangotri Temple by Bhagirathi river.', stay: 'Prakriti The Retreat Harsil', meals: 'All Meals' },
      { day: 4, title: 'Kedarnath Jyotirlinga Darshan', description: 'Helicopter transfer to Kedarnath top. VIP Darshan, evening Aarti amidst the snowy peaks.', stay: 'Kedar Suites / Kedar River Retreat', meals: 'All Meals' },
      { day: 5, title: 'Badrinath Dham Maha Abhishek', description: 'Early morning flight to Badrinath. Special Maha Abhishek Puja & Mana village visit.', stay: 'Sarovar Portico Badrinath', meals: 'All Meals' },
      { day: 6, title: 'Return to Dehradun', description: 'Scenic morning helicopter drop to Sahastradhara Helipad Dehradun with sacred prasadam.', stay: 'Departure', meals: 'Breakfast' }
    ]
  },
  {
    id: 'yt-cd-10n',
    title: 'Char Dham Sacred Road Yatra 2026',
    subtitle: 'Yamunotri • Gangotri • Kedarnath • Badrinath with Haridwar & Rishikesh Aarti',
    circuit: 'Char Dham',
    location: 'Garhwal Himalayas (Yamunotri, Gangotri, Kedarnath, Badrinath), Uttarakhand, India',
    days: 11,
    nights: 10,
    placesCovered: ['Haridwar', 'Barkot', 'Yamunotri', 'Uttarkashi', 'Gangotri', 'Guptkashi', 'Kedarnath', 'Badrinath', 'Rishikesh'],
    rating: 4.93,
    reviewsCount: 1950,
    price: 23500,
    originalPrice: 29500,
    image: './destinations/badrinath.jpg',
    highlights: [
      'Complete 10 Nights / 11 Days pilgrimage covering all 4 sacred Dhams',
      'Guaranteed temple darshan coordination and VIP queue assistance',
      'Comfortable deluxe hotel and scenic river retreat stays',
      'Pure satvik meals prepared daily without onion and garlic',
      'Experienced mountain driver with verified hill certification'
    ],
    inclusions: ['AC Transport', '10 Nights Hotel Stays', 'All Satvik Meals (Breakfast & Dinner)', 'Temple Darshan passes', 'Tolls & Driver Allowances'],
    badge: 'Best Seller • 10N/11D ₹23,500',
    hasHelicopterOption: true,
    nextDates: ['May 10, 2026', 'May 25, 2026', 'June 12, 2026', 'Sept 05, 2026'],
    itinerary: [
      { day: 1, title: 'Haridwar Arrival & Drive to Barkot', description: 'Pickup from Haridwar/Rishikesh, scenic drive through Mussoorie & Kempty Falls to Barkot base.', stay: 'Barkot Mountain Camp', meals: 'Dinner' },
      { day: 2, title: 'Yamunotri Dham Darshan', description: 'Trek from Janki Chatti to Yamunotri Temple, hot spring bath in Surya Kund and Divya Shila puja.', stay: 'Barkot Mountain Camp', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Barkot to Uttarkashi (Kashi Vishwanath Temple)', description: 'Drive to sacred Uttarkashi, visit ancient Kashi Vishwanath Mandir and Shakti Temple.', stay: 'Uttarkashi River Lodge', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'Gangotri Dham Darshan', description: 'Drive through beautiful Harsil valley along Bhagirathi river, darshan at Gangotri temple.', stay: 'Uttarkashi River Lodge', meals: 'Breakfast & Dinner' },
      { day: 5, title: 'Uttarkashi to Guptkashi / Sonprayag', description: 'Scenic mountain drive towards Mandakini valley with views of Mandakini river.', stay: 'Guptkashi Valley Retreat', meals: 'Breakfast & Dinner' },
      { day: 6, title: 'Kedarnath Jyotirlinga Darshan', description: 'Ascent to Kedarnath via Gaurikund trek or helicopter shuttle. Evening divine Aarti at temple.', stay: 'Kedarnath Temple Guest House', meals: 'All Meals' },
      { day: 7, title: 'Morning Puja & Return to Guptkashi', description: 'Attend morning Bhasma Aarti, descend to Sonprayag and rest at Guptkashi resort.', stay: 'Guptkashi Valley Retreat', meals: 'Breakfast & Dinner' },
      { day: 8, title: 'Guptkashi to Badrinath Dham', description: 'Drive via Chopta and Joshimath to holy Badrinath Dham situated between Nar & Narayan peaks.', stay: 'Badrinath Sarovar Inn', meals: 'Breakfast & Dinner' },
      { day: 9, title: 'Badrinath Darshan & Mana Village', description: 'Holy bath in Tapt Kund, darshan of Lord Badri Vishal, visit Mana (First Indian Village) and Vyas Gufa.', stay: 'Badrinath / Pipalkoti', meals: 'Breakfast & Dinner' },
      { day: 10, title: 'Drive to Rishikesh (Holy Ganga Aarti)', description: 'Scenic drive along Panch Prayags (Devprayag Sangam). Evening famous Ganga Aarti at Parmarth Niketan.', stay: 'Rishikesh Divine Resort', meals: 'Breakfast & Dinner' },
      { day: 11, title: 'Rishikesh to Haridwar & Departure', description: 'Morning holy dip at Triveni Ghat, visit Ram Jhula and drop at Haridwar / Dehradun.', stay: 'Departure', meals: 'Breakfast' }
    ]
  },
  {
    id: 'yt-kedar-3n',
    title: 'Kedarnath Dham Pilgrimage (3N / 4D)',
    subtitle: 'Rishikesh • Guptkashi • Sonprayag • Kedarnath Jyotirlinga Darshan',
    circuit: 'Himalayan',
    location: 'Kedarnath Dham, Rudraprayag District, Uttarakhand, India',
    days: 4,
    nights: 3,
    placesCovered: ['Rishikesh', 'Devprayag Sangam', 'Guptkashi', 'Sonprayag', 'Kedarnath Temple'],
    rating: 4.91,
    reviewsCount: 1420,
    price: 8000,
    originalPrice: 10500,
    image: './destinations/kedarnath.jpg',
    highlights: [
      'Dedicated 3 Nights / 4 Days Kedarnath package at ₹8,000',
      'VIP queue registration & biometric yatra slip assistance',
      'Clean accommodations at Guptkashi base & Kedarnath top',
      'Pure satvik meals and warm hot water facilities'
    ],
    inclusions: ['Transport from Rishikesh', '3 Nights stay', 'Breakfast & Dinner', 'Yatra Registration', 'First Aid Support'],
    badge: 'Popular • 3N/4D ₹8,000',
    hasHelicopterOption: true,
    nextDates: ['Daily Departures May-Oct', 'Every Weekend Batch'],
    itinerary: [
      { day: 1, title: 'Rishikesh to Guptkashi', description: 'Drive via Devprayag (Alaknanda-Bhagirathi sangam) and Rudraprayag to Guptkashi.', stay: 'Guptkashi Camps', meals: 'Dinner' },
      { day: 2, title: 'Ascent to Holy Kedarnath Mandir', description: 'Early morning transfer to Sonprayag, trek to Kedarnath top, attend evening Aarti.', stay: 'Kedarnath Temple Stay', meals: 'All Meals' },
      { day: 3, title: 'Darshan, Bhairavnath & Return to Guptkashi', description: 'Morning darshan of Shiva Lingam, hike to Bhairavnath Temple, descent to Guptkashi.', stay: 'Guptkashi Camps', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'Guptkashi to Rishikesh & Departure', description: 'Scenic drive back to Rishikesh, visit Ram Jhula and drop at station/airport.', stay: 'Departure', meals: 'Breakfast' }
    ]
  },
  {
    id: 'yt-chopta-2n',
    title: 'Chopta Tungnath & Chandrashila Peak Yatra (2N / 3D)',
    subtitle: 'World\'s Highest Shiva Temple • Mini Switzerland • Deoria Tal Lake',
    circuit: 'Himalayan',
    location: 'Chopta & Tungnath, Rudraprayag & Chamoli, Uttarakhand, India',
    days: 3,
    nights: 2,
    placesCovered: ['Rishikesh', 'Sari Village', 'Deoria Tal', 'Chopta', 'Tungnath Temple', 'Chandrashila Peak (13,100 ft)'],
    rating: 4.89,
    reviewsCount: 890,
    price: 5000,
    originalPrice: 6800,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Affordable 2 Nights / 3 Days pilgrimage & mountain trek at ₹5,000',
      'Darshan at Tungnath - the highest Shiva temple in the world (3,680m)',
      'Sunrise panoramic views of Nanda Devi, Trishul & Chaukhamba peaks from Chandrashila',
      'Scenic camping in pristine alpine meadows'
    ],
    inclusions: ['Transport from Rishikesh', '2 Nights Alpine Tent / Lodge Stay', 'All Meals', 'Trek Leader', 'Permits'],
    badge: 'Trek & Temple • 2N/3D ₹5,000',
    hasHelicopterOption: false,
    nextDates: ['Departures Every Friday & Tuesday'],
    itinerary: [
      { day: 1, title: 'Rishikesh to Sari & Deoria Tal Camping', description: 'Drive along holy rivers to Sari village, trek 2.5km to serene Deoria Tal with mountain reflections.', stay: 'Deoria Tal Camps', meals: 'Dinner' },
      { day: 2, title: 'Tungnath Temple Darshan & Chandrashila Summit', description: 'Early morning trek through rhododendron forests to Tungnath Temple and climb to Chandrashila Peak.', stay: 'Chopta Meadow Swiss Camps', meals: 'All Meals' },
      { day: 3, title: 'Chopta to Rishikesh Return', description: 'Morning leisure in alpine meadows, drive back to Rishikesh with blessings and photos.', stay: 'Departure', meals: 'Breakfast' }
    ]
  },
  {
    id: 'yt-vof-5n',
    title: 'Valley of Flowers & Sri Hemkund Sahib Yatra (5N / 6D)',
    subtitle: 'UNESCO Biosphere Reserve • High Altitude Sikh Shrine at 15,200 ft',
    circuit: 'Himalayan',
    location: 'Valley of Flowers National Park, Chamoli District, Uttarakhand, India',
    days: 6,
    nights: 5,
    placesCovered: ['Haridwar', 'Joshimath', 'Govindghat', 'Ghangaria', 'Valley of Flowers', 'Hemkund Sahib'],
    rating: 4.94,
    reviewsCount: 760,
    price: 8000,
    originalPrice: 11000,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Comprehensive 5 Nights / 6 Days floral and spiritual expedition at ₹8,000',
      'Witness over 500 varieties of wild Himalayan flowers in full bloom',
      'Holy snan and darshan at Sri Hemkund Sahib - highest Gurudwara on Earth',
      'Breathtaking waterfalls and Pushpawati river valley'
    ],
    inclusions: ['Transport from Haridwar', '5 Nights Accommodation', 'All Veg Meals', 'Forest Entry Permits', 'Certified Guide'],
    badge: 'UNESCO Heritage • 5N/6D ₹8,000',
    hasHelicopterOption: false,
    nextDates: ['June 20, 2026', 'July 05, 2026', 'Aug 10, 2026', 'Sept 02, 2026'],
    itinerary: [
      { day: 1, title: 'Haridwar to Govindghat / Joshimath', description: 'Drive along Alaknanda river passing Karnaprayag and Nandaprayag to Govindghat.', stay: 'Govindghat Lodge', meals: 'Dinner' },
      { day: 2, title: 'Trek Govindghat to Ghangaria Base', description: 'Scenic 10 km trek alongside Pushpawati river to base camp Ghangaria.', stay: 'Ghangaria Mountain Stay', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Valley of Flowers Exploration', description: 'Enter UNESCO national park, walk through carpets of Himalayan flora and streams.', stay: 'Ghangaria Mountain Stay', meals: 'All Meals' },
      { day: 4, title: 'Holy Pilgrimage to Sri Hemkund Sahib', description: 'Ascent to Hemkund Sahib Gurudwara (4,632m), holy bath in glacial lake and langar prasad.', stay: 'Ghangaria Mountain Stay', meals: 'All Meals' },
      { day: 5, title: 'Descend to Govindghat & Drive to Joshimath', description: 'Trek back to Govindghat, drive to Joshimath, visit Shankaracharya Math.', stay: 'Joshimath Hotel', meals: 'Breakfast & Dinner' },
      { day: 6, title: 'Joshimath to Haridwar Return', description: 'Drive back to Haridwar with lifetime memories and divine blessings.', stay: 'Departure', meals: 'Breakfast' }
    ]
  },
  {
    id: 'yt-kedarkantha-4n',
    title: 'Kedarkantha Winter Summit Yatra & Snow Trek (4N / 5D)',
    subtitle: 'Sankri Base • Juda Ka Talab • 12,500 ft Himalayan Summit Panorama',
    circuit: 'Himalayan',
    location: 'Sankri, Govind Pashu Vihar Sanctuary, Uttarkashi, Uttarakhand, India',
    days: 5,
    nights: 4,
    placesCovered: ['Dehradun', 'Mori', 'Sankri', 'Juda Ka Talab', 'Kedarkantha Base', 'Kedarkantha Peak (12,500 ft)'],
    rating: 4.88,
    reviewsCount: 1120,
    price: 6000,
    originalPrice: 8500,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Complete 4 Nights / 5 Days snow peak expedition at ₹6,000',
      'Spectacular 360-degree views of 13 Himalayan peaks including Swargarohini & Bandarpoonch',
      'Camp beside frozen Juda Ka Talab alpine lake surrounded by pine forests',
      'Microspikes, gaiters, sleeping bags and warm meals included'
    ],
    inclusions: ['Transport from Dehradun', '4 Nights Camp/Homestay', 'All Meals (Veg)', 'Trek Equipment', 'Certified Mountaineering Guide'],
    badge: 'Summit Trek • 4N/5D ₹6,000',
    hasHelicopterOption: false,
    nextDates: ['Departures Daily during Winter & Spring'],
    itinerary: [
      { day: 1, title: 'Dehradun to Sankri Village', description: 'Drive along Yamuna & Tons rivers to scenic heritage village of Sankri.', stay: 'Sankri Homestay', meals: 'Dinner' },
      { day: 2, title: 'Trek Sankri to Juda Ka Talab', description: '4 km trek through pine and oak woods to mystical frozen lake Juda Ka Talab.', stay: 'Juda Ka Talab Camps', meals: 'All Meals' },
      { day: 3, title: 'Juda Ka Talab to Kedarkantha Base Camp', description: 'Ascend to base camp with open panoramic views of snow-covered Himalayan giants.', stay: 'Base Camp Tents', meals: 'All Meals' },
      { day: 4, title: 'Summit Push (12,500 ft) & Descend to Sankri', description: 'Early 3:30 AM summit hike to witness golden sunrise, descend back to Sankri.', stay: 'Sankri Homestay', meals: 'All Meals' },
      { day: 5, title: 'Sankri to Dehradun Departure', description: 'Scenic drive back to Dehradun railway station or airport.', stay: 'Departure', meals: 'Breakfast' }
    ]
  },
  {
    id: 'yt-2',
    title: 'Divine Kashi Vishwanath & Ayodhya Ram Mandir Spiritual Circuit',
    subtitle: 'Varanasi Ganga Aarti • Sarnath • Ayodhya Ram Lalla Darshan • Prayagraj Sangam',
    circuit: 'North Sacred',
    location: 'Varanasi, Ayodhya & Prayagraj, Uttar Pradesh, India',
    days: 4,
    nights: 3,
    placesCovered: ['Varanasi', 'Sarnath', 'Ayodhya', 'Prayagraj Triveni Sangam'],
    rating: 4.88,
    reviewsCount: 1650,
    price: 19800,
    originalPrice: 24500,
    image: './destinations/ayodhya.jpg',
    highlights: [
      'Guaranteed Sugam VIP Darshan at Shri Kashi Vishwanath Temple',
      'Private Bajra boat for the grand Dashashwamedh Ghat Ganga Aarti',
      'Exclusive darshan pass for newly inaugurated Ram Janmabhoomi Mandir',
      'Private AC Innova Crysta throughout with veteran sevadar driver'
    ],
    inclusions: ['4-star heritage stays', 'All Satvik breakfasts & dinners', 'VIP Temple passes', 'Private boat rides', 'All toll & transfers'],
    badge: 'Trending Yatra 2026',
    hasHelicopterOption: false,
    nextDates: ['Departures Daily', 'Every Friday & Monday'],
    itinerary: [
      { day: 1, title: 'Welcome to Kashi & Mystical Ganga Aarti', description: 'Airport pickup, check-in to heritage hotel, evening private boat for world-famous Ganga Aarti.', stay: 'BrijRama / Clarks Varanasi', meals: 'Dinner' },
      { day: 2, title: 'Sugam Darshan & Holy Sarnath', description: 'Early morning Rudrabhishek at Kashi Vishwanath, Annapurna Temple, followed by peaceful Sarnath stupa.', stay: 'Clarks Varanasi', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Ayodhya Shri Ram Lalla Darshan', description: 'Drive in private Innova to Ayodhya. Darshan at Ram Janmabhoomi, Hanuman Garhi, and Kanak Bhawan.', stay: 'Lemon Tree Premier Ayodhya', meals: 'Breakfast & Dinner' },
      { day: 4, title: 'Prayagraj Triveni Sangam & Homeward', description: 'Morning holy snan at Triveni Sangam (Ganga, Yamuna, Saraswati) & Anand Bhavan. Return drop to Varanasi airport.', stay: 'Departure', meals: 'Breakfast' }
    ]
  },
  {
    id: 'yt-4',
    title: 'Tirupati Balaji Sheegra VIP Darshan & Kanipakam Tour',
    subtitle: 'Lord Venkateswara VIP Break Darshan • Padmavathi Temple • Sri Kalahasti Rahu Ketu Kshetra',
    circuit: 'South Sacred',
    location: 'Tirupati & Sri Kalahasti, Andhra Pradesh, India',
    days: 3,
    nights: 2,
    placesCovered: ['Chennai / Tirupati', 'Tirumala Hills', 'Sri Kalahasti', 'Kanipakam'],
    rating: 4.92,
    reviewsCount: 2200,
    price: 14500,
    originalPrice: 18000,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Confirmed ₹300 / VIP Break Darshan ticket booking',
      'Authentic Tirumala Tirupati Devasthanams (TTD) Laddus included',
      'Special Rahu-Ketu Sarpadosha Nivarana Puja at Sri Kalahasti',
      'Luxury 5-star hotel stay with Pure South Indian Sattvic meals'
    ],
    inclusions: ['5-star stay', 'VIP Darshan pass', 'Private AC Cab', 'All South Indian meals', 'Temple guides'],
    badge: 'Highest Rated',
    hasHelicopterOption: false,
    nextDates: ['Daily Departures', 'Custom dates available'],
    itinerary: [
      { day: 1, title: 'Arrival at Tirupati & Padmavathi Ammavari Temple', description: 'Reception at airport/railway station, check-in to Marasa Sarovar, afternoon darshan at Tiruchanur Padmavathi Temple.', stay: 'Marasa Sarovar Premiere', meals: 'Dinner' },
      { day: 2, title: 'Tirumala Hills & Lord Balaji VIP Darshan', description: 'Early morning drive to Tirumala hills. Hair tonsuring assistance, VIP Sheegra Darshan of Lord Venkateswara, laddu collection.', stay: 'Marasa Sarovar Premiere', meals: 'Breakfast & Dinner' },
      { day: 3, title: 'Sri Kalahasti Temple & Farewell', description: 'Visit Sri Kalahasteeswara temple (Vayu Lingam) and Kanipakam Vinayaka, departure transfer.', stay: 'Departure', meals: 'Breakfast' }
    ]
  }
];

export const MOCK_HOLIDAYS: HolidayPackage[] = [
  // 1. Spiti Valley (6N/7D, Price 20000)
  {
    id: 'hol-spiti',
    title: 'Spiti Valley Road Trip & High Altitude Exploration',
    destination: 'Kaza • Tabo • Chandratal Lake • Kibber • Kunzum Pass',
    location: 'Spiti Valley, Himachal Pradesh, India',
    duration: '6 Nights / 7 Days',
    nights: 6,
    days: 7,
    rating: 4.92,
    reviewsCount: 820,
    price: 20000,
    originalPrice: 26000,
    image: './destinations/spiti.jpg',
    theme: 'Himalayan Adventure',
    category: 'himachal',
    isInternational: false,
    badge: 'Trending Himalayan Trip',
    tags: ['Chandratal Camp', 'Key Monastery', 'Kunzum Pass 15,000ft', 'Stargazing'],
    highlights: [
      '6 Nights / 7 Days high altitude circuit at flat ₹20,000',
      'Overnight camp stay beside turquoise Chandratal Lake',
      'Visit 1,000-year-old Tabo Monastery & highest post office Hikkim',
      'Drive across dramatic Kunzum Pass at 14,931 ft'
    ],
    inclusions: ['Tempo Traveller / SUV with expert hill driver', 'All 6 Nights stays (Camps & Homestays)', 'Breakfast & Dinner', 'Oxygen cylinder support', 'Inner line permits'],
    itinerary: [
      { day: 1, title: 'Manali to Kaza via Atal Tunnel & Kunzum Pass', description: 'Scenic drive crossing Atal Tunnel, Batal, and crossing high Kunzum Pass into Spiti Valley.' },
      { day: 2, title: 'Kaza Local - Key Monastery & Kibber', description: 'Visit iconic Key Gompa perched on a cliff, walk through high altitude village of Kibber.' },
      { day: 3, title: 'Hikkim, Komic & Langza Fossil Village', description: 'Post letters from world\'s highest post office (Hikkim) and visit Buddha statue at Langza.' },
      { day: 4, title: 'Kaza to Pin Valley & Dhankar Monastery', description: 'Explore lush Pin Valley National Park and spectacular cliff-hanging Dhankar Gompa.' },
      { day: 5, title: 'Kaza to Chandratal Lake Camping', description: 'Drive to sacred crescent Chandratal Lake, sunset walk and glamping under Milky Way.' },
      { day: 6, title: 'Chandratal to Manali via Rohtang', description: 'Drive along Chandra river back to Manali for farewell dinner.' },
      { day: 7, title: 'Manali Checkout & Departure', description: 'Morning leisure in Old Manali, Volvo transfer back to Delhi.' }
    ]
  },

  // 2. Leh Ladakh (9N/10D, Price 35000)
  {
    id: 'hol-ladakh',
    title: 'Leh Ladakh Grand Odyssey - Lakes & High Passes',
    destination: 'Leh • Pangong Tso • Nubra Valley • Khardung La • Magnetic Hill',
    location: 'Leh & Ladakh (UT), India',
    duration: '9 Nights / 10 Days',
    nights: 9,
    days: 10,
    rating: 4.95,
    reviewsCount: 1460,
    price: 35000,
    originalPrice: 44000,
    image: './destinations/ladakh.jpg',
    theme: 'Epic Himalayan Odyssey',
    category: 'ladakh',
    isInternational: false,
    badge: 'Bestseller 9N/10D',
    tags: ['Pangong Lake Tents', 'Khardung La 17,982ft', 'Bactrian Camel Safari', 'Magnetic Hill'],
    highlights: [
      'Comprehensive 9 Nights / 10 Days expedition at ₹35,000',
      'Overnight luxury stay by crystal blue Pangong Tso Lake',
      'Drive across Khardung La (one of the highest motorable roads in the world)',
      'Double-hump Bactrian camel safari in Hunder sand dunes, Nubra Valley'
    ],
    inclusions: ['Airport pickup & drop at Leh', '9 Nights stay in 3/4-star hotels & deluxe swiss tents', 'Buffet Breakfast & Dinner daily', 'Inner Line Permits & Wildlife fees', 'Dedicated vehicle throughout'],
    itinerary: [
      { day: 1, title: 'Arrival in Leh & Full Day Acclimatization', description: 'Rest and hydrate at hotel in Leh to acclimatize to high altitude.' },
      { day: 2, title: 'Leh Local Sightseeing & Hall of Fame', description: 'Visit Shanti Stupa, Leh Palace, Hall of Fame War Memorial and local bazaar.' },
      { day: 3, title: 'Sham Valley - Magnetic Hill & Sangam', description: 'Experience defying gravity at Magnetic Hill, Confluence of Indus & Zanskar rivers, Gurudwara Pathar Sahib.' },
      { day: 4, title: 'Leh to Nubra Valley via Khardung La', description: 'Scale mighty Khardung La Pass (17,982 ft) to descend into mystical Nubra Valley.' },
      { day: 5, title: 'Nubra Valley - Diskit & Turtuk Border Village', description: 'Visit Diskit Monastery giant Maitreya Buddha, day excursion to Indo-Pak border village Turtuk.' },
      { day: 6, title: 'Nubra to Pangong Tso via Shyok River', description: 'Direct off-road route alongside Shyok river reaching mesmerizing Pangong Tso lake.' },
      { day: 7, title: 'Pangong Tso Sunrise & Return to Leh via Chang La', description: 'Witness color-changing waters at dawn, drive back over Chang La pass (17,590 ft).' },
      { day: 8, title: 'Leh to Tso Moriri / Hemis Exploration', description: 'Excursion to remote Hemis Monastery and Shey Palace.' },
      { day: 9, title: 'Leh Cultural Day & Souvenir Shopping', description: 'Free day in Leh for Tibetan handicrafts, pashmina shawls and apricot products.' },
      { day: 10, title: 'Departure from Leh Airport', description: 'Transfer to Kushok Bakula Rimpochee Airport with unforgettable Himalayan memories.' }
    ]
  },

  // 3. Char Dham (10N/11D, Price 23500)
  {
    id: 'hol-chardham',
    title: 'Char Dham Complete Sacred Pilgrimage Yatra',
    destination: 'Yamunotri • Gangotri • Kedarnath • Badrinath • Haridwar',
    location: 'Garhwal Himalayas (Yamunotri, Gangotri, Kedarnath, Badrinath), Uttarakhand, India',
    duration: '10 Nights / 11 Days',
    nights: 10,
    days: 11,
    rating: 4.94,
    reviewsCount: 2180,
    price: 23500,
    originalPrice: 29500,
    image: './destinations/badrinath.jpg',
    theme: 'Sacred Maha Yatra',
    category: 'sacred',
    isInternational: false,
    badge: 'Maha Yatra • 10N/11D ₹23,500',
    tags: ['All 4 Dhams', 'Pure Satvik Food', 'Haridwar Ganga Aarti', 'Kedarnath VIP Slip'],
    highlights: [
      'Complete 10 Nights / 11 Days Char Dham circuit at flat ₹23,500',
      'Pre-arranged biometric yatra registration and temple darshan support',
      'Pure satvik meals prepared by personal Maharaj (no onion, no garlic)',
      'Covers Yamunotri, Gangotri, Kedarnath Jyotirlinga, and Badrinath Dham'
    ],
    inclusions: ['10 Nights Hotel & Lodge Accommodation', 'Comfortable AC Pushback Coach / Innova', 'All Breakfasts & Dinners (Satvik)', 'Darshan Passes & Assistance', 'Experienced Yatra Escort'],
    itinerary: [
      { day: 1, title: 'Haridwar / Rishikesh to Barkot', description: 'Scenic drive to Barkot base camp with views of Mussoorie and Yamuna valley.' },
      { day: 2, title: 'Yamunotri Dham Darshan', description: 'Holy bath in Surya Kund and sacred darshan at Yamunotri Temple.' },
      { day: 3, title: 'Barkot to Uttarkashi', description: 'Drive along Bhagirathi river, visit ancient Kashi Vishwanath Mandir Uttarkashi.' },
      { day: 4, title: 'Gangotri Dham Darshan', description: 'Scenic drive through Harsil Apple Valley, darshan at Gangotri Mandir.' },
      { day: 5, title: 'Uttarkashi to Guptkashi', description: 'Drive to Guptkashi with views of the Mandakini river valley.' },
      { day: 6, title: 'Kedarnath Jyotirlinga Darshan', description: 'Trek from Gaurikund or take heli to Kedarnath top; divine evening Aarti.' },
      { day: 7, title: 'Morning Puja & Return to Guptkashi', description: 'Early morning darshan of Kedarnath and descent back to base.' },
      { day: 8, title: 'Guptkashi to Badrinath Dham', description: 'Drive via Chopta meadows and Joshimath to holy Badrinath.' },
      { day: 9, title: 'Badrinath Darshan & Mana Village', description: 'Holy bath at Tapt Kund, darshan of Lord Badri Vishal, visit Mana.' },
      { day: 10, title: 'Badrinath to Rishikesh', description: 'Drive via Devprayag Sangam to Rishikesh, attend Parmarth Niketan Ganga Aarti.' },
      { day: 11, title: 'Rishikesh to Haridwar Departure', description: 'Holy dip at Har Ki Pauri and drop at station/airport.' }
    ]
  },

  // 4. Manali Kasol (3N/4D, Price 7000)
  {
    id: 'hol-manali-kasol',
    title: 'Manali & Kasol Parvati Valley Mountain Getaway',
    destination: 'Solang Valley • Old Manali • Kasol • Manikaran Sahib Gurudwara',
    location: 'Kullu & Parvati Valley, Himachal Pradesh, India',
    duration: '3 Nights / 4 Days',
    nights: 3,
    days: 4,
    rating: 4.86,
    reviewsCount: 1320,
    price: 7000,
    originalPrice: 9500,
    image: 'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=80',
    theme: 'Mountain Vibe & Cafe Trails',
    category: 'himachal',
    isInternational: false,
    badge: 'Super Value 3N/4D ₹7,000',
    tags: ['Manikaran Hot Springs', 'Solang Adventure', 'Parvati River Camp', 'Riverside Cafes'],
    highlights: [
      '3 Nights / 4 Days complete tour at flat ₹7,000',
      'Experience healing natural sulfur hot springs at Manikaran Sahib Gurudwara',
      'Solang Valley snow activities, paragliding and zorbing',
      'Riverside campfire and cafe hopping in magical Kasol'
    ],
    inclusions: ['3 Nights stay in 3-star hotel & riverside Swiss camp', 'Daily Breakfast & Dinner', 'All local sightseeing transfers', 'Campfire & music evening'],
    itinerary: [
      { day: 1, title: 'Arrival in Manali & Local Exploration', description: 'Check-in, visit Hadimba Devi Temple, Vashisht Hot Springs and Mall Road.' },
      { day: 2, title: 'Solang Valley Adventure & Atal Tunnel', description: 'Explore Solang Valley for ropeway, paragliding and drive through Atal Tunnel.' },
      { day: 3, title: 'Drive to Kasol & Manikaran Sahib', description: 'Head to Parvati Valley, holy dip at Manikaran Sahib hot springs and Kasol market.' },
      { day: 4, title: 'Kasol Riverside Walk & Departure', description: 'Morning leisure by Parvati River, Chalal village hike and return transfer.' }
    ]
  },

  // 5. Jibhi Sojha (2N/3D, Price 7000)
  {
    id: 'hol-jibhi-sojha',
    title: 'Jibhi & Sojha Tirthan Valley Offbeat Retreat',
    destination: 'Jibhi Waterfall • Jalori Pass • Serolsar Lake • Sojha Pine Woods',
    location: 'Tirthan Valley, Himachal Pradesh, India',
    duration: '2 Nights / 3 Days',
    nights: 2,
    days: 3,
    rating: 4.89,
    reviewsCount: 640,
    price: 7000,
    originalPrice: 9000,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    theme: 'Offbeat Serenity',
    category: 'himachal',
    isInternational: false,
    badge: 'Hidden Gem 2N/3D ₹7,000',
    tags: ['Jalori Pass 10,800ft', 'Serolsar Lake Trek', 'Wooden Cottages', 'Chehni Kothi'],
    highlights: [
      '2 Nights / 3 Days serene mountain escape at flat ₹7,000',
      'Scenic trek to crystal clear Serolsar Lake through dense oak and pine forests',
      'Panoramic 360-degree views from Jalori Pass at 10,800 ft',
      'Cozy traditional wooden chalet stay with home-cooked Himachali meals'
    ],
    inclusions: ['2 Nights accommodation in wooden cottage / luxury camp', 'All Breakfasts & Dinners', 'Guide for Serolsar Lake trek', 'Local transport for sightseeing'],
    itinerary: [
      { day: 1, title: 'Arrival in Jibhi & Waterfall Walk', description: 'Arrive at pristine Jibhi, check into wooden cottage, hike to soothing Jibhi Waterfall.' },
      { day: 2, title: 'Jalori Pass & Serolsar Lake Trek', description: 'Drive to Jalori Pass (10,800 ft), 5km trek to sacred Serolsar Lake & Budhi Nagin Temple.' },
      { day: 3, title: 'Sojha Pine Woods & Chehni Kothi Departure', description: 'Visit scenic hamlet of Sojha, historic multi-story tower Chehni Kothi, and departure.' }
    ]
  },

  // 6. Kedarnath (3N/4D, Price 8000)
  {
    id: 'hol-kedarnath',
    title: 'Kedarnath Dham Pilgrimage & Jyotirlinga Yatra',
    destination: 'Haridwar / Rishikesh • Sonprayag • Gaurikund • Kedarnath Mandir',
    location: 'Kedarnath Dham, Rudraprayag District, Uttarakhand, India',
    duration: '3 Nights / 4 Days',
    nights: 3,
    days: 4,
    rating: 4.93,
    reviewsCount: 1980,
    price: 8000,
    originalPrice: 10500,
    image: './destinations/kedarnath.jpg',
    theme: 'Sacred Jyotirlinga',
    category: 'sacred',
    isInternational: false,
    badge: 'Pilgrim Special 3N/4D ₹8,000',
    tags: ['VIP Darshan Slip', 'Evening Aarti at 11,755ft', 'Sonprayag Stay', 'Bhairavnath Mandir'],
    highlights: [
      'Dedicated 3 Nights / 4 Days Kedarnath package at flat ₹8,000',
      'Guaranteed biometric yatra registration and darshan slot booking',
      'Night stay near Kedarnath temple premises with heater facilities',
      'Attend the blissful evening Sandhya Aarti with hundreds of devotees'
    ],
    inclusions: ['3 Nights stay (Guptkashi base + Kedarnath top)', 'AC / Non-AC mountain vehicle from Rishikesh', 'Satvik Breakfast & Dinner daily', 'First-aid & oxygen support'],
    itinerary: [
      { day: 1, title: 'Rishikesh to Guptkashi / Sonprayag', description: 'Drive via Devprayag Sangam along holy Mandakini river to Guptkashi.' },
      { day: 2, title: 'Sonprayag to Kedarnath Temple', description: 'Early morning shuttle to Gaurikund, trek or pony to Kedarnath top, check-in and evening Aarti.' },
      { day: 3, title: 'Morning Darshan & Descent to Guptkashi', description: 'Morning Shiva Lingam Darshan, visit Bhairavnath Temple, trek down to Sonprayag and stay at Guptkashi.' },
      { day: 4, title: 'Guptkashi to Rishikesh Return', description: 'Drive back to Rishikesh/Haridwar with sacred Mahaprasad.' }
    ]
  },

  // 7. Chopta Tungnath (2N/3D, Price 5000)
  {
    id: 'hol-chopta-tungnath',
    title: 'Chopta Tungnath & Chandrashila Peak Trek',
    destination: 'Chopta Meadows • Tungnath Temple • Chandrashila Peak • Deoria Tal',
    location: 'Chopta & Tungnath, Rudraprayag & Chamoli, Uttarakhand, India',
    duration: '2 Nights / 3 Days',
    nights: 2,
    days: 3,
    rating: 4.9,
    reviewsCount: 940,
    price: 5000,
    originalPrice: 6800,
    image: './destinations/tungnath.jpg',
    theme: 'Mini Switzerland of India',
    category: 'uttarakhand',
    isInternational: false,
    badge: 'Trek & Temple 2N/3D ₹5,000',
    tags: ['World Highest Shiva Temple', 'Chandrashila 13,100ft', 'Deoria Tal Lake', 'Snow Peaks'],
    highlights: [
      '2 Nights / 3 Days trek & spiritual journey at flat ₹5,000',
      'Pay homage at Tungnath - the highest Shiva temple on the planet (3,680m)',
      'Catch surreal sunrise from Chandrashila Peak (13,100 ft) overlooking Nanda Devi',
      'Scenic alpine meadow camping in Chopta'
    ],
    inclusions: ['2 Nights Alpine Tent / Lodge Stay', 'All Veg Meals during trek', 'Transport from Rishikesh / Haridwar', 'Certified Trek Leader & First Aid'],
    itinerary: [
      { day: 1, title: 'Rishikesh to Sari Village & Deoria Tal', description: 'Drive to Sari village, short 2.5km hike to beautiful Deoria Tal reflecting Chaukhamba peaks.' },
      { day: 2, title: 'Chopta to Tungnath & Chandrashila Summit', description: 'Summit hike to Tungnath Shiva Temple and Chandrashila 360-degree Himalayan viewpoint.' },
      { day: 3, title: 'Chopta to Rishikesh Departure', description: 'Descent and drive back along Ganga river to Rishikesh.' }
    ]
  },

  // 8. Valley of Flowers (5N/6D, Price 8000)
  {
    id: 'hol-vof',
    title: 'Valley of Flowers & Hemkund Sahib Trek',
    destination: 'Govindghat • Ghangaria • Valley of Flowers National Park • Hemkund Sahib',
    location: 'Valley of Flowers & Hemkund Sahib, Chamoli, Uttarakhand, India',
    duration: '5 Nights / 6 Days',
    nights: 5,
    days: 6,
    rating: 4.93,
    reviewsCount: 880,
    price: 8000,
    originalPrice: 11000,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    theme: 'UNESCO Floral Paradise',
    category: 'uttarakhand',
    isInternational: false,
    badge: 'UNESCO Heritage 5N/6D ₹8,000',
    tags: ['Rare Alpine Flora', 'Hemkund Sahib 15,200ft', 'Ghangaria Base', 'Glacial Streams'],
    highlights: [
      '5 Nights / 6 Days UNESCO world heritage expedition at flat ₹8,000',
      'Witness over 500 species of blooming wild Himalayan flowers and herbs',
      'Sacred pilgrimage to Sri Hemkund Sahib - highest Gurudwara in the world',
      'Surreal views of Rataban and Tipra glacier peaks'
    ],
    inclusions: ['5 Nights Hotel & Lodge stay', 'All Vegetarian Meals', 'Forest entry permits', 'Transport from Haridwar/Rishikesh', 'Certified Trek Leader'],
    itinerary: [
      { day: 1, title: 'Haridwar to Govindghat / Joshimath', description: 'Drive passing Panch Prayag confluences to base at Govindghat.' },
      { day: 2, title: 'Govindghat to Ghangaria Base Trek', description: '10km trek alongside gushing Pushpawati river to high mountain hamlet of Ghangaria.' },
      { day: 3, title: 'Valley of Flowers National Park Trek', description: 'Full day exploring the colorful meadows of the UNESCO floral valley.' },
      { day: 4, title: 'Trek to Sacred Sri Hemkund Sahib', description: 'Ascent to glacial lake and Hemkund Sahib Gurudwara at 15,200 ft.' },
      { day: 5, title: 'Ghangaria to Govindghat & Joshimath', description: 'Trek down to Govindghat and transfer to Joshimath hotel.' },
      { day: 6, title: 'Joshimath to Haridwar Return', description: 'Drive back to Haridwar with heart full of peace and memories.' }
    ]
  },

  // 9. Mcleodganj (2N/3D, Price 7000)
  {
    id: 'hol-mcleodganj',
    title: 'Mcleodganj & Dharamshala Tibetan Cultural Getaway',
    destination: 'Tsuglagkhang Dalai Lama Temple • Bhagsu Falls • Dharamkot • Triund Base',
    location: 'Mcleodganj, Kangra District, Himachal Pradesh, India',
    duration: '2 Nights / 3 Days',
    nights: 2,
    days: 3,
    rating: 4.87,
    reviewsCount: 780,
    price: 7000,
    originalPrice: 9000,
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80',
    theme: 'Tibetan Peace & Nature',
    category: 'himachal',
    isInternational: false,
    badge: 'Weekend Special 2N/3D ₹7,000',
    tags: ['Dalai Lama Temple', 'Bhagsunath Waterfall', 'Tibetan Handicrafts', 'Triund Views'],
    highlights: [
      '2 Nights / 3 Days peaceful cultural getaway at flat ₹7,000',
      'Audience with Tibetan spirituality at His Holiness Dalai Lama Temple',
      'Hike to Bhagsu Waterfall and vibrant hippie cafes of Dharamkot',
      'Panoramic vistas of the towering Dhauladhar snow mountains'
    ],
    inclusions: ['2 Nights stay in boutique hotel', 'Daily Breakfast & Dinner', 'Private Cab for all Dharamshala & Mcleodganj sightseeing'],
    itinerary: [
      { day: 1, title: 'Arrival in Mcleodganj & Dalai Lama Complex', description: 'Arrive, check-in, visit Tsuglagkhang Complex, Tibet Museum and evening monastery prayers.' },
      { day: 2, title: 'Bhagsunath Temple, Waterfall & Dharamkot', description: 'Visit ancient Bhagsunath Shiva Mandir, waterfall hike, and chill at Dharamkot cafes.' },
      { day: 3, title: 'St. John in the Wilderness & Departure', description: 'Visit historic neo-Gothic Church in cedar woods, shopping in Tibetan market, and departure.' }
    ]
  },

  // 10. Kedarkantha (4N/5D, Price 6000)
  {
    id: 'hol-kedarkantha',
    title: 'Kedarkantha Winter Summit Snow Trek',
    destination: 'Sankri Base Village • Juda Ka Talab • Kedarkantha Base Camp • 12,500ft Summit',
    location: 'Sankri, Uttarkashi District, Uttarakhand, India',
    duration: '4 Nights / 5 Days',
    nights: 4,
    days: 5,
    rating: 4.91,
    reviewsCount: 1650,
    price: 6000,
    originalPrice: 8500,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    theme: 'Himalayan Snow Trek',
    category: 'uttarakhand',
    isInternational: false,
    badge: 'Top Snow Trek 4N/5D ₹6,000',
    tags: ['12,500 ft Summit Sunrise', 'Frozen Juda Ka Talab', 'Snow Camping', 'Sankri Village'],
    highlights: [
      '4 Nights / 5 Days snow summit expedition at flat ₹6,000',
      'Catch unforgettable sunrise over 13 Himalayan peaks from 12,500 ft summit',
      'Camp beside the mystical frozen alpine lake Juda Ka Talab',
      'All high-grade mountaineering gear: microspikes, gaiters and tents included'
    ],
    inclusions: ['4 Nights stay (Sankri homestay + alpine camps)', 'All nutritious vegetarian meals', 'Trek leader & guide team', 'Mountaineering equipment', 'Permits'],
    itinerary: [
      { day: 1, title: 'Dehradun to Sankri Village', description: 'Drive through Mussoorie and Tons river gorge to base camp village of Sankri.' },
      { day: 2, title: 'Trek Sankri to Juda Ka Talab', description: 'Trek through thick pine and maple forests to frozen lake Juda Ka Talab.' },
      { day: 3, title: 'Juda Ka Talab to Kedarkantha Base Camp', description: 'Ascend to base camp with 180-degree view of snow-capped Himalayan ranges.' },
      { day: 4, title: 'Summit Day (12,500 ft) & Return to Sankri', description: 'Early morning 3 AM summit climb for sunrise, descend all the way back to Sankri homestay.' },
      { day: 5, title: 'Sankri to Dehradun Departure', description: 'Scenic drive back to Dehradun with achievement certificate.' }
    ]
  },

  // 11. Humtapass (Hampta Pass) (5N/6D, Price 6000)
  {
    id: 'hol-humtapass',
    title: 'Hampta Pass & Chandratal High Mountain Crossover Trek',
    destination: 'Manali • Jobra • Chika • Balu Ka Ghera • Hampta Pass (14,065 ft) • Chandratal',
    location: 'Hampta Pass & Chandratal, Pir Panjal, Himachal Pradesh, India',
    duration: '5 Nights / 6 Days',
    nights: 5,
    days: 6,
    rating: 4.92,
    reviewsCount: 1100,
    price: 6000,
    originalPrice: 8500,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
    theme: 'Classic Mountain Crossover',
    category: 'himachal',
    isInternational: false,
    badge: 'Crossover Trek 5N/6D ₹6,000',
    tags: ['14,065 ft Pass', 'Chandratal Moon Lake', 'Chika Green Meadows', 'Lahaul Desert'],
    highlights: [
      '5 Nights / 6 Days dramatic valley-to-desert crossover trek at flat ₹6,000',
      'Cross from lush green Kullu valley into the stark moonscapes of Lahaul & Spiti',
      'Stand atop Hampta Pass at 14,065 ft surrounded by hanging glaciers',
      'Excursion to the legendary crescent moon lake Chandratal'
    ],
    inclusions: ['5 Nights alpine camping in high-altitude tents', 'All vegetarian meals and energy drinks', 'Certified mountaineering guides', 'Transport from Manali & Chandratal visit'],
    itinerary: [
      { day: 1, title: 'Manali to Jobra Drive & Trek to Chika', description: 'Drive past Prini to Jobra, trek through pine forests to green meadows of Chika.' },
      { day: 2, title: 'Chika to Balu Ka Ghera', description: 'Trek alongside Rani river across boulder fields to the sandy haven of Balu Ka Ghera.' },
      { day: 3, title: 'Balu Ka Ghera over Hampta Pass to Shea Goru', description: 'Steep ascent to Hampta Pass (14,065 ft) with views of Mt. Indrasan, descend to Shea Goru stream.' },
      { day: 4, title: 'Shea Goru to Chatru & Drive to Chandratal', description: 'River crossing, descend to Chatru roadhead, vehicle drive to magical Chandratal Lake.' },
      { day: 5, title: 'Chandratal to Manali via Atal Tunnel', description: 'Drive back to Manali crossing Atal Tunnel and celebrating completion.' },
      { day: 6, title: 'Manali Checkout & Departure', description: 'Morning leisure in Manali town, evening Volvo transfer.' }
    ]
  },

  // --- INTERNATIONAL PACKAGES ---

  // 12. Vietnam (5N/6D, Price 38000)
  {
    id: 'hol-vietnam',
    title: 'Exotic Vietnam - Halong Bay Luxury Cruise & Golden Hand Bridge',
    destination: 'Hanoi Old Quarter • Halong Bay Overnight Cruise • Da Nang • Ba Na Hills • Hoi An',
    location: 'Hanoi, Halong Bay & Da Nang, Vietnam',
    duration: '5 Nights / 6 Days',
    nights: 5,
    days: 6,
    rating: 4.94,
    reviewsCount: 1540,
    price: 38000,
    originalPrice: 48000,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    theme: 'International Discovery',
    category: 'international',
    isInternational: true,
    badge: 'Trending International',
    tags: ['Halong Bay Cruise', 'Ba Na Hills Golden Bridge', 'Hoi An Lanterns', 'Vietnamese Street Food'],
    highlights: [
      '5 Nights / 6 Days luxury Vietnam experience at ₹38,000',
      'Overnight 5-star cruise on emerald waters of Halong Bay with kayaking & caves',
      'Walk upon the world-famous Golden Bridge held by giant stone hands in Ba Na Hills',
      'Lantern boat ride through the fairy-tale streets of ancient UNESCO town Hoi An'
    ],
    inclusions: ['4-star hotel stays + 1 Night luxury Halong Bay Cruise', 'All domestic Vietnam transfers & sightseeing', 'Daily Breakfasts + Special Cruise Meals', 'Cable car ticket to Ba Na Hills', 'Visa assistance'],
    itinerary: [
      { day: 1, title: 'Arrival in Hanoi & French Quarter', description: 'Welcome to Vietnam, transfer to hotel, explore Hanoi Old Quarter and Hoan Kiem Lake.' },
      { day: 2, title: 'Hanoi to Halong Bay 5-Star Cruise', description: 'Board luxury cruise through limestone karsts, kayak into Surprise Cave, evening sunset party.' },
      { day: 3, title: 'Halong Bay Sunrise & Flight to Da Nang', description: 'Morning Tai Chi on sundeck, cruise through Titov island, flight to coastal Da Nang.' },
      { day: 4, title: 'Ba Na Hills & Golden Giant Hands Bridge', description: 'World\'s longest cable car ride to Ba Na Hills, walk on iconic Golden Bridge, French Village.' },
      { day: 5, title: 'Ancient Town of Hoi An & Lantern River', description: 'Visit Japanese Covered Bridge, lantern-lit night market, and traditional basket boat tour.' },
      { day: 6, title: 'Da Nang Departure', description: 'Souvenir shopping, beachside breakfast, and transfer to Da Nang International Airport.' }
    ]
  },

  // 13. Thailand (4N/5D, Price 24000)
  {
    id: 'hol-thailand',
    title: 'Vibrant Thailand - Bangkok Palaces & Pattaya Coral Island',
    destination: 'Bangkok Temples • Wat Arun • Pattaya Coral Island • Chao Phraya Cruise',
    location: 'Bangkok & Pattaya, Thailand',
    duration: '4 Nights / 5 Days',
    nights: 4,
    days: 5,
    rating: 4.88,
    reviewsCount: 2450,
    price: 24000,
    originalPrice: 32000,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    theme: 'Tropical & Cultural Gateway',
    category: 'international',
    isInternational: true,
    badge: 'Visa-Free Special',
    tags: ['Coral Island Speedboat', 'Wat Pho Reclining Buddha', 'Chao Phraya Dinner Cruise', 'Alcazar Show'],
    highlights: [
      '4 Nights / 5 Days Bangkok & Pattaya package at flat ₹24,000',
      'Speedboat transfer to crystal clear Coral Island with water sports & lunch',
      'Lavish international buffet dinner cruise down Chao Phraya River with live music',
      'Guided tour of iconic Golden Buddha and Wat Arun Temple of Dawn'
    ],
    inclusions: ['2 Nights Pattaya + 2 Nights Bangkok 4-star hotels', 'Daily Buffet Breakfast', 'Coral Island tour by Speedboat with lunch', 'Chao Phraya Luxury Dinner Cruise', 'Airport private transfers'],
    itinerary: [
      { day: 1, title: 'Arrival at Bangkok & Transfer to Pattaya', description: 'Meet and greet at Suvarnabhumi Airport, scenic drive to Pattaya, evening Alcazar Cabaret Show.' },
      { day: 2, title: 'Coral Island Speedboat Tour', description: 'Speedboat to Coral Island, snorkeling, parasailing, white sand beach relaxation and seafood lunch.' },
      { day: 3, title: 'Pattaya to Bangkok & Chao Phraya Cruise', description: 'Drive to Bangkok, check-in, evening 2-hour luxury dinner cruise along illuminated temples.' },
      { day: 4, title: 'Bangkok City & Temple Tour', description: 'Visit Wat Traimit (Solid Gold Buddha), Wat Pho (Reclining Buddha), and shopping at MBK / Iconsiam.' },
      { day: 5, title: 'Bangkok Departure', description: 'Last minute duty-free shopping and drop to Bangkok airport.' }
    ]
  },

  // 14. Bali (6N/7D, Price 36000)
  {
    id: 'hol-bali',
    title: 'Magical Bali - Island of Gods, Temples & Nusa Penida',
    destination: 'Ubud Cultural Heartland • Kuta Beach • Nusa Penida Island • Tanah Lot',
    location: 'Ubud, Kuta & Nusa Penida, Bali, Indonesia',
    duration: '6 Nights / 7 Days',
    nights: 6,
    days: 7,
    rating: 4.96,
    reviewsCount: 1890,
    price: 36000,
    originalPrice: 46000,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    theme: 'Tropical Sanctuary & Temples',
    category: 'international',
    isInternational: true,
    badge: 'Luxury Island Getaway',
    tags: ['Tanah Lot Sunset', 'Nusa Penida T-Rex Cliff', 'Tegallalang Rice Terraces', 'Private Pool Villa'],
    highlights: [
      '6 Nights / 7 Days ultimate Bali journey at flat ₹36,000',
      'Stay in authentic private pool villa in Ubud and beachfront hotel in Kuta',
      'Day excursion to Nusa Penida island: Kelingking Beach, Broken Beach & Angel\'s Billabong',
      'Sunset at holy sea temple Tanah Lot and fiery Kecak Dance performance'
    ],
    inclusions: ['4 Nights Kuta hotel + 2 Nights Ubud Private Pool Villa', 'Daily Breakfast', 'Nusa Penida West Island tour with speedboat transfers', 'Full Day Kintamani & Ubud tour', 'Private AC car with English-speaking driver'],
    itinerary: [
      { day: 1, title: 'Arrival at Denpasar Bali & Sunset at Kuta', description: 'Welcome flower garland at Ngurah Rai Airport, transfer to resort, sunset cocktail at Kuta beach.' },
      { day: 2, title: 'Nusa Penida Island Tour', description: 'Fast boat to Nusa Penida, witness dinosaur-shaped Kelingking T-Rex cliff and Angel\'s Billabong.' },
      { day: 3, title: 'Water Sports at Tanjung Benoa & Uluwatu', description: 'Banana boat ride and parasailing, followed by cliffside Uluwatu Temple and Kecak dance.' },
      { day: 4, title: 'Transfer to Ubud via Celuk & Batubulan', description: 'Traditional silver crafting village, coffee plantation tasting, check-in to Ubud Private Villa.' },
      { day: 5, title: 'Kintamani Volcano & Tegallalang Rice Terraces', description: 'View of active Mt. Batur volcano, famous Bali Jungle Swing over cascading rice terraces.' },
      { day: 6, title: 'Tanah Lot Sunset Temple & Seminyak', description: 'Visit sacred offshore Tanah Lot temple surrounded by breaking waves at golden sunset.' },
      { day: 7, title: 'Ubud Market & Farewell Bali', description: 'Browse Ubud Art Market for bamboo goods, drop to Denpasar Airport.' }
    ]
  },

  // 15. Bhutan (5N/6D, Price 32000)
  {
    id: 'hol-bhutan',
    title: 'Mystical Bhutan - Land of Thunder Dragon & Tiger\'s Nest',
    destination: 'Paro Valley • Tiger\'s Nest Monastery • Thimphu • Punakha Dzong',
    location: 'Paro, Thimphu & Punakha, Kingdom of Bhutan',
    duration: '5 Nights / 6 Days',
    nights: 5,
    days: 6,
    rating: 4.96,
    reviewsCount: 720,
    price: 32000,
    originalPrice: 42000,
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
    theme: 'Himalayan Spiritual Kingdom',
    category: 'international',
    isInternational: true,
    badge: 'Soulful Kingdom',
    tags: ['Tiger\'s Nest Cliffside Hike', 'Buddha Dordenma Giant Statue', 'Punakha Suspension Bridge', 'Dochula 108 Chortens'],
    highlights: [
      '5 Nights / 6 Days royal Bhutan exploration at flat ₹32,000',
      'Hike to iconic Paro Taktsang (Tiger\'s Nest Monastery) clinging to a 3,000 ft granite cliff',
      'Panoramic views of the high Eastern Himalayas from Dochula Pass (108 memorial chortens)',
      'Marvel at majestic Punakha Dzong situated at the confluence of Pho Chhu and Mo Chhu rivers'
    ],
    inclusions: ['5 Nights 3-star deluxe hotel stays in Thimphu, Punakha & Paro', 'All 3 Meals daily (Breakfast, Lunch & Dinner)', 'Bhutan SDF Sustainable Development Fee assistance & entry permits', 'Dedicated Bhutanese licensed guide & private vehicle'],
    itinerary: [
      { day: 1, title: 'Arrival at Paro & Scenic Drive to Thimphu', description: 'Breathtaking mountain flight into Paro, drive along Paro & Thimphu rivers to capital city.' },
      { day: 2, title: 'Thimphu Cultural Marvels', description: 'Visit giant 169-ft Buddha Dordenma, National Memorial Chorten, Motithang Takin Preserve.' },
      { day: 3, title: 'Thimphu to Punakha via Dochula Pass', description: 'Cross Dochula Pass (3,100m) with 108 stupas, visit breathtaking Punakha Dzong and suspension bridge.' },
      { day: 4, title: 'Punakha to Paro Valley', description: 'Drive to beautiful Paro valley, visit Ta Dzong (National Museum) and Rinpung Dzong.' },
      { day: 5, title: 'Hike to Majestic Tiger\'s Nest (Paro Taktsang)', description: 'Sacred pilgrimage hike to the cliffside Tiger\'s Nest Monastery, prayer flags and herbal bath.' },
      { day: 6, title: 'Farewell Bhutan Departure', description: 'Tashi Delek! Transfer to Paro International Airport for onward journey.' }
    ]
  }
];

export const MOCK_TRAINS: Train[] = [
  {
    id: 'tr-1',
    trainNumber: '22436',
    trainName: 'Varanasi Vande Bharat Express',
    fromStation: 'New Delhi (NDLS)',
    toStation: 'Varanasi Jn (BSB)',
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '8h 00m',
    runDays: ['Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    type: 'Vande Bharat',
    classes: [
      { code: 'CC', className: 'AC Chair Car', price: 1750, status: 'AVAILABLE', seats: 48 },
      { code: 'EC', className: 'Exec. Chair Car', price: 3300, status: 'AVAILABLE', seats: 12 }
    ]
  },
  {
    id: 'tr-2',
    trainNumber: '22458',
    trainName: 'Dehradun Vande Bharat Express',
    fromStation: 'Anand Vihar (ANVT)',
    toStation: 'Dehradun (DDN)',
    departureTime: '17:50',
    arrivalTime: '22:35',
    duration: '4h 45m',
    runDays: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun'],
    type: 'Vande Bharat',
    classes: [
      { code: 'CC', className: 'AC Chair Car', price: 1065, status: 'AVAILABLE', seats: 34 },
      { code: 'EC', className: 'Exec. Chair Car', price: 1890, status: 'AVAILABLE', seats: 8 }
    ]
  },
  {
    id: 'tr-3',
    trainNumber: '22426',
    trainName: 'Ayodhya Dham Vande Bharat Express',
    fromStation: 'Anand Vihar (ANVT)',
    toStation: 'Ayodhya Dham (AY)',
    departureTime: '06:10',
    arrivalTime: '14:30',
    duration: '8h 20m',
    runDays: ['Daily except Wed'],
    type: 'Vande Bharat',
    classes: [
      { code: 'CC', className: 'AC Chair Car', price: 1625, status: 'AVAILABLE', seats: 62 },
      { code: 'EC', className: 'Exec. Chair Car', price: 2965, status: 'AVAILABLE', seats: 16 }
    ]
  },
  {
    id: 'tr-4',
    trainNumber: '12424',
    trainName: 'Dibrugarh Rajdhani Express (via Prayagraj)',
    fromStation: 'New Delhi (NDLS)',
    toStation: 'Pt. Deen Dayal Upadhyaya (DDU)',
    departureTime: '16:20',
    arrivalTime: '01:25',
    duration: '9h 05m',
    runDays: ['Daily'],
    type: 'Rajdhani',
    classes: [
      { code: '3A', className: 'AC 3 Tier', price: 1890, status: 'AVAILABLE', seats: 24 },
      { code: '2A', className: 'AC 2 Tier', price: 2650, status: 'AVAILABLE', seats: 14 },
      { code: '1A', className: 'First AC', price: 4200, status: 'AVAILABLE', seats: 4 }
    ]
  }
];

export const MOCK_CABS: Cab[] = [
  {
    id: 'cab-1',
    model: 'Toyota Innova Crysta',
    category: 'SUV',
    capacity: 6,
    luggage: 4,
    pricePerKm: 18,
    baseFare: 3200,
    estimatedTotal: 4800,
    features: ['Plush Leather Captain Seats', 'Dual AC with Rear Vents', 'Experienced Yatra Chauffeur', 'Carrier for Pooja Samagri'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    rating: 4.9
  },
  {
    id: 'cab-2',
    model: 'Maruti Suzuki Dzire',
    category: 'Sedan',
    capacity: 4,
    luggage: 2,
    pricePerKm: 12,
    baseFare: 2100,
    estimatedTotal: 3100,
    features: ['Clean Sanitized Interior', 'Quiet AC Cab', 'Fastag Enabled Tolls', 'Doorstep Pickup'],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    rating: 4.75
  },
  {
    id: 'cab-3',
    model: 'Force Urbania Luxury Tempo',
    category: 'Tempo Traveller',
    capacity: 12,
    luggage: 10,
    pricePerKm: 28,
    baseFare: 6500,
    estimatedTotal: 9800,
    features: ['Recliner Pushback Seats', 'Individual AC Vents & USB Charger', 'Ideal for Family Pilgrimages', 'Hill-Certified Driver'],
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80',
    rating: 4.95
  }
];

export const MOCK_OFFERS: Offer[] = [
  {
    id: 'off-1',
    code: 'MOKSHA1000',
    title: 'Flat ₹1,000 OFF on First Pilgrimage Yatra',
    description: 'Use coupon on any Char Dham, Kashi Vishwanath or Ayodhya tour package.',
    category: 'yatras',
    discountValue: 1000,
    minBooking: 10000,
    badge: 'NEW USER SPECIAL',
    validTill: '31 Dec 2026'
  },
  {
    id: 'off-2',
    code: 'HDFCFEST',
    title: 'Up to ₹2,500 Instant Discount with HDFC Cards',
    description: 'Valid on domestic flights, luxury hotel stays and holidays across India.',
    category: 'all',
    discountValue: 1250,
    minBooking: 8000,
    badge: 'BANK OFFER',
    validTill: '30 Oct 2026'
  },
  {
    id: 'off-3',
    code: 'SENIORCARE',
    title: '₹1,500 Special Blessing Discount for Senior Citizens',
    description: 'Applicable on bookings with at least one traveler aged 60+.',
    category: 'all',
    discountValue: 1500,
    minBooking: 12000,
    badge: 'SENIOR CITIZEN',
    validTill: 'Ongoing 2026'
  },
  {
    id: 'off-4',
    code: 'FLYDEV',
    title: 'Flat ₹600 OFF on Pilgrimage Route Flights',
    description: 'Book flights to Varanasi, Dehradun, Ayodhya, Tirupati or Amritsar.',
    category: 'flights',
    discountValue: 600,
    minBooking: 3500,
    badge: 'POPULAR FLIGHTS',
    validTill: 'Limited Period'
  }
];
