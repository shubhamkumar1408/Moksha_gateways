import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { FlightResults } from './components/FlightResults';
import { HotelResults } from './components/HotelResults';
import { YatraResults } from './components/YatraResults';
import { TrainAndCabResults } from './components/TrainAndCabResults';
import { HolidaysSection } from './components/HolidaysSection';
import { OffersSection } from './components/OffersSection';
import { WhyMoksha } from './components/WhyMoksha';
import { BookingModal } from './components/BookingModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { AiPlannerModal } from './components/AiPlannerModal';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { WhatsAppContactBar } from './components/WhatsAppContactBar';
import { LiveBookingPopup } from './components/LiveBookingPopup';
import { ServiceType, Booking, Flight, Hotel, YatraPackage, HolidayPackage, Train, Cab, TrainClassAvailability } from './types';
import { MOCK_YATRAS } from './data/mockData';

export default function App() {
  const [activeService, setActiveService] = useState<ServiceType>('holidays');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem('moksha_user_name') || 'Shubham Dutt';
  });

  // Modal controls
  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Active item to book
  const [itemToBook, setItemToBook] = useState<any>(null);
  const [checkoutServiceType, setCheckoutServiceType] = useState<ServiceType>('flights');

  // Search parameters from HeroSearch
  const [searchQuery, setSearchQuery] = useState<any>(null);

  // Stored bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('moksha_saved_bookings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default sample booking to provide immediate delight
    return [
      {
        id: 'bk-demo-1',
        pnr: 'MG948201',
        serviceType: 'yatras',
        title: 'Divine Kashi Vishwanath & Ayodhya Ram Mandir Spiritual Circuit',
        routeOrLocation: 'Varanasi • Ayodhya • Prayagraj Sangam',
        travelDate: '24 Sep 2026',
        passengers: [{ name: 'Shubham Dutt', age: 29, gender: 'male', darshanPassRequired: true }],
        primaryContact: {
          name: 'Shubham Dutt',
          email: 'duttshubham68@gmail.com',
          phone: '+91 9876543210'
        },
        totalAmount: 19800,
        discountApplied: 1000,
        promoCode: 'MOKSHA1000',
        status: 'Confirmed',
        bookedAt: new Date().toISOString(),
        details: {
          yatraCircuit: 'North Sacred'
        }
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('moksha_saved_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Error saving bookings to localStorage:', e);
    }
  }, [bookings]);

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    localStorage.setItem('moksha_user_name', name);
  };

  // Triggers for booking
  const startFlightBooking = (flight: Flight) => {
    setItemToBook(flight);
    setCheckoutServiceType('flights');
    setIsCheckoutOpen(true);
  };

  const startHotelBooking = (hotel: Hotel) => {
    setItemToBook(hotel);
    setCheckoutServiceType('hotels');
    setIsCheckoutOpen(true);
  };

  const startYatraBooking = (yatra: YatraPackage) => {
    setItemToBook(yatra);
    setCheckoutServiceType('yatras');
    setIsCheckoutOpen(true);
  };

  const startHolidayBooking = (holiday: HolidayPackage) => {
    setItemToBook(holiday);
    setCheckoutServiceType('holidays');
    setIsCheckoutOpen(true);
  };

  const startTrainBooking = (train: Train, cls: TrainClassAvailability) => {
    setItemToBook({
      title: `${train.trainName} (${train.trainNumber}) - ${cls.className}`,
      name: `${train.trainName} (${cls.code})`,
      price: cls.price,
      location: `${train.fromStation} → ${train.toStation}`,
      airline: train.trainName,
      flightNumber: train.trainNumber
    });
    setCheckoutServiceType('trains');
    setIsCheckoutOpen(true);
  };

  const startCabBooking = (cab: Cab) => {
    setItemToBook({
      title: `${cab.model} (${cab.category}) Outstation Cab`,
      name: cab.model,
      price: cab.estimatedTotal,
      location: 'Outstation Pilgrimage Transfer'
    });
    setCheckoutServiceType('cabs');
    setIsCheckoutOpen(true);
  };

  const handleConvertAiPlanToBooking = (plan: any) => {
    setItemToBook({
      title: plan.title,
      name: plan.title,
      price: 24500,
      circuit: 'Custom AI Yatra',
      location: plan.summary
    });
    setCheckoutServiceType('yatras');
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f5f9] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <Header
        activeService={activeService}
        onSelectService={(s) => {
          setActiveService(s);
          // Scroll smoothly to top search card
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookingsCount={bookings.length}
        onOpenBookings={() => setIsBookingsModalOpen(true)}
        onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        userName={userName}
        language={language}
        onToggleLanguage={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
      />

      {/* Main Hero Search Component */}
      <HeroSearch
        activeService={activeService}
        onSelectService={setActiveService}
        onSearch={(params) => setSearchQuery(params)}
        onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
        language={language}
      />

      {/* Results / Service View Area */}
      <main className="flex-1">
        {activeService === 'flights' && (
          <FlightResults
            onBookFlight={startFlightBooking}
            fromCityName={searchQuery?.query?.from?.city || 'New Delhi'}
            toCityName={searchQuery?.query?.to?.city || 'Varanasi'}
            departureDate={searchQuery?.query?.departureDate || '2026-09-18'}
          />
        )}

        {activeService === 'hotels' && (
          <HotelResults
            onBookHotel={startHotelBooking}
            searchedCity={searchQuery?.query?.city}
          />
        )}

        {activeService === 'yatras' && (
          <YatraResults
            onBookYatra={startYatraBooking}
            filterCircuit={searchQuery?.query?.circuit}
          />
        )}

        {activeService === 'holidays' && (
          <HolidaysSection onBookHoliday={startHolidayBooking} />
        )}

        {activeService === 'trains' && (
          <TrainAndCabResults
            mode="trains"
            onBookTrain={startTrainBooking}
            onBookCab={startCabBooking}
            fromCityName={searchQuery?.query?.from?.city}
            toCityName={searchQuery?.query?.to?.city}
          />
        )}

        {activeService === 'cabs' && (
          <TrainAndCabResults
            mode="cabs"
            onBookTrain={startTrainBooking}
            onBookCab={startCabBooking}
            fromCityName={searchQuery?.query?.from}
            toCityName={searchQuery?.query?.to}
          />
        )}

        {/* Offers Section */}
        <OffersSection />

        {/* Why Book with Moksha Gateways Trust Section */}
        <WhyMoksha />
      </main>

      {/* Direct WhatsApp & Contact Info Section */}
      <WhatsAppContactBar />

      {/* Real-time Dynamic Booking Updates Popup */}
      <LiveBookingPopup />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <BookingModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        bookingItem={itemToBook}
        serviceType={checkoutServiceType}
        onBookingSuccess={handleBookingSuccess}
      />

      <MyBookingsModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

      <AiPlannerModal
        isOpen={isAiPlannerOpen}
        onClose={() => setIsAiPlannerOpen(false)}
        onConvertPlanToBooking={handleConvertAiPlanToBooking}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
