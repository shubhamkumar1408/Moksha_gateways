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
import { QuickQrPaymentModal } from './components/QuickQrPaymentModal';
import { LeadInquiryModal } from './components/LeadInquiryModal';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { Footer } from './components/Footer';
import { WhatsAppContactBar } from './components/WhatsAppContactBar';
import { LiveBookingPopup } from './components/LiveBookingPopup';
import { DestinationDetailPage } from './components/DestinationDetailPage';
import { ServiceType, Booking, Flight, Hotel, YatraPackage, HolidayPackage, Train, Cab, TrainClassAvailability } from './types';
import { MOCK_YATRAS, MOCK_HOLIDAYS } from './data/mockData';

export default function App() {
  const [activeService, setActiveService] = useState<ServiceType>('holidays');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem('moksha_user_name') || 'Rahul';
  });

  // Modal controls - Login modal opens automatically on page load as requested
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [isAiPlannerOpen, setIsAiPlannerOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuickQrOpen, setIsQuickQrOpen] = useState(false);
  const [quickQrTarget, setQuickQrTarget] = useState<{ title?: string; price?: number } | undefined>(undefined);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isAdminLeadsOpen, setIsAdminLeadsOpen] = useState(false);
  const [leadModalContext, setLeadModalContext] = useState<{ destination?: string; duration?: string; title?: string }>({});

  const handleOpenLeadModal = (item?: any) => {
    if (item) {
      setLeadModalContext({
        destination: item.location || item.title || item.name || '',
        duration: item.duration || '',
        title: item.title || item.name || 'Trip Inquiry',
      });
    } else {
      setLeadModalContext({
        destination: '',
        duration: '',
        title: 'General Website Inquiry',
      });
    }
    setIsLeadModalOpen(true);
  };

  // Dedicated destination page routing (URL sync with ?destination=...)
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('destination') || params.get('dest') || params.get('package') || null;
    }
    return null;
  });

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedDestinationId(params.get('destination') || params.get('dest') || params.get('package') || null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectDestination = (pkgOrId: HolidayPackage | string) => {
    const id = typeof pkgOrId === 'string' ? pkgOrId : pkgOrId.id;
    setSelectedDestinationId(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('destination', id);
      window.history.pushState({ destinationId: id }, '', url.toString());
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDestinations = () => {
    setSelectedDestinationId(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('destination');
      url.searchParams.delete('dest');
      url.searchParams.delete('package');
      window.history.pushState(null, '', url.pathname + (url.search ? url.search : ''));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active destination package
  const currentDestination = React.useMemo(() => {
    if (!selectedDestinationId) return null;
    const cleanId = selectedDestinationId.toLowerCase().trim();

    // 1. Direct match in MOCK_HOLIDAYS
    const foundInHolidays = MOCK_HOLIDAYS.find(
      h => h.id.toLowerCase() === cleanId ||
           h.id.replace('hol-', '').toLowerCase() === cleanId ||
           h.title.toLowerCase().includes(cleanId) ||
           h.destination.toLowerCase().includes(cleanId)
    );
    if (foundInHolidays) return foundInHolidays;

    // 2. Direct match in MOCK_YATRAS mapped to HolidayPackage
    const foundInYatra = MOCK_YATRAS.find(
      y => y.id.toLowerCase() === cleanId ||
           y.title.toLowerCase().includes(cleanId) ||
           y.location.toLowerCase().includes(cleanId)
    );
    if (foundInYatra) {
      return {
        id: foundInYatra.id,
        title: foundInYatra.title,
        destination: foundInYatra.placesCovered.join(' • '),
        location: foundInYatra.location,
        duration: `${foundInYatra.nights}N / ${foundInYatra.days}D`,
        nights: foundInYatra.nights,
        days: foundInYatra.days,
        rating: foundInYatra.rating,
        reviewsCount: foundInYatra.reviewsCount,
        price: foundInYatra.price,
        originalPrice: foundInYatra.originalPrice,
        image: foundInYatra.image,
        theme: foundInYatra.circuit,
        tags: foundInYatra.placesCovered,
        highlights: foundInYatra.highlights,
        inclusions: foundInYatra.inclusions,
        itinerary: foundInYatra.itinerary,
        badge: foundInYatra.badge || 'Spiritual Circuit',
        reasonToVisit: `A holy sacred circuit covering ${foundInYatra.location} with verified priest darshan, IRCTC certified transfers, and pure satvik meals.`
      } as HolidayPackage;
    }

    return null;
  }, [selectedDestinationId]);

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
        passengers: [{ name: 'Rahul', age: 29, gender: 'male', darshanPassRequired: true }],
        primaryContact: {
          name: 'Rahul',
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

  const handleQuickQrBookingConfirmed = (confirmedBooking: Booking) => {
    setBookings((prev) => {
      const updated = [confirmedBooking, ...prev];
      localStorage.setItem('moksha_saved_bookings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f5f9] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] w-full max-w-full overflow-x-hidden relative">
      {/* Header */}
      <Header
        activeService={activeService}
        onSelectService={(s) => {
          setActiveService(s);
          if (selectedDestinationId) {
            handleBackToDestinations();
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookingsCount={bookings.length}
        onOpenBookings={() => setIsBookingsModalOpen(true)}
        onOpenAiPlanner={() => setIsAiPlannerOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenLeadModal={() => handleOpenLeadModal()}
        onOpenAdminLeads={() => setIsAdminLeadsOpen(true)}
        userName={userName}
        language={language}
        onToggleLanguage={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
      />

      {/* If a destination is selected, open dedicated DestinationDetailPage with share options */}
      {currentDestination ? (
        <DestinationDetailPage
          destination={currentDestination}
          onBack={handleBackToDestinations}
          onBook={startHolidayBooking}
          onQuickQrPay={(pkg) => {
            setQuickQrTarget({ title: pkg.title, price: pkg.price });
            setIsQuickQrOpen(true);
          }}
          onSelectOtherDestination={handleSelectDestination}
          onOpenLeadModal={(pkg) => handleOpenLeadModal(pkg)}
          allDestinations={MOCK_HOLIDAYS}
        />
      ) : (
        <>
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
                onSelectDestination={handleSelectDestination}
              />
            )}

            {activeService === 'holidays' && (
              <HolidaysSection 
                onBookHoliday={startHolidayBooking} 
                onQuickQrPay={(pkg) => {
                  setQuickQrTarget({ title: pkg.title, price: pkg.price });
                  setIsQuickQrOpen(true);
                }}
                onSelectDestination={handleSelectDestination}
                onOpenLeadModal={(pkg) => handleOpenLeadModal(pkg)}
              />
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
        </>
      )}

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

      <QuickQrPaymentModal
        isOpen={isQuickQrOpen}
        onClose={() => setIsQuickQrOpen(false)}
        defaultPackageTitle={quickQrTarget?.title}
        defaultAmount={quickQrTarget?.price}
        onBookingConfirmed={handleQuickQrBookingConfirmed}
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

      <LeadInquiryModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultDestination={leadModalContext.destination}
        defaultDuration={leadModalContext.duration}
        sourceTitle={leadModalContext.title}
      />

      <AdminLeadsModal
        isOpen={isAdminLeadsOpen}
        onClose={() => setIsAdminLeadsOpen(false)}
      />
    </div>
  );
}
