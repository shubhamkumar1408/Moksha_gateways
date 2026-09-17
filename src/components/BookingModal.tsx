import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Tag, 
  Users, 
  Clock, 
  Sparkles, 
  CreditCard, 
  QrCode, 
  Printer, 
  Luggage,
  Flame,
  Plane,
  Building2,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { Booking, Passenger, ServiceType } from '../types';
import { MokshaLogo } from './MokshaLogo';
import { UpiPaymentCard } from './UpiPaymentCard';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingItem: any; // Flight, Hotel, YatraPackage, etc.
  serviceType: ServiceType;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  bookingItem,
  serviceType,
  onBookingSuccess
}) => {
  if (!isOpen || !bookingItem) return null;

  // Passenger state
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: '', age: 35, gender: 'male', darshanPassRequired: true }
  ]);
  const [primaryName, setPrimaryName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('duttshubham68@gmail.com');
  const [primaryPhone, setPrimaryPhone] = useState('9876543210');
  
  // Add-ons
  const [addPrasadBox, setAddPrasadBox] = useState(true);
  const [addTravelInsurance, setAddTravelInsurance] = useState(true);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Payment step
  const [step, setStep] = useState<'details' | 'confirm'>('details');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Calculate Base Price
  const basePrice = Number(
    bookingItem.price || 
    bookingItem.pricePerNight || 
    bookingItem.estimatedTotal || 
    5000
  );

  const prasadCost = addPrasadBox ? 499 : 0;
  const insuranceCost = addTravelInsurance ? 199 : 0;
  const taxes = Math.round(basePrice * 0.05); // 5% GST
  const finalTotal = Math.max(0, basePrice + prasadCost + insuranceCost + taxes - discount);

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', age: 30, gender: 'male', darshanPassRequired: true }]);
  };

  const handleUpdatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const code = promoCode.trim().toUpperCase();
    if (code === 'MOKSHA1000') {
      setDiscount(1000);
      setCouponSuccess('₹1,000 Special Yatra discount applied successfully!');
    } else if (code === 'SENIORCARE') {
      setDiscount(1500);
      setCouponSuccess('₹1,500 Senior Citizen Blessing discount applied!');
    } else if (code === 'FLYDEV' || code === 'FIRSTTRIP') {
      setDiscount(600);
      setCouponSuccess('₹600 Welcome discount applied!');
    } else {
      setCouponError('Invalid coupon code. Try MOKSHA1000 or SENIORCARE.');
    }
  };

  const handleUpiConfirmed = (details: {
    utrNumber: string;
    paidAmount: number;
    paymentMode: 'full' | 'advance' | 'custom';
    paymentDate: string;
  }) => {
    const randomPnr = 'MG' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      id: 'bk-upi-' + Date.now(),
      pnr: randomPnr,
      serviceType,
      title: bookingItem.title || bookingItem.name || bookingItem.airline || 'Moksha Reservation',
      routeOrLocation: bookingItem.location || `${bookingItem.fromCity || 'Delhi'} → ${bookingItem.toCity || 'Varanasi'}`,
      travelDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      passengers: passengers.length > 0 && passengers[0].name ? passengers : [{ name: primaryName || 'Lead Traveler', age: 35, gender: 'male' }],
      primaryContact: {
        name: primaryName || 'Lead Traveler',
        email: primaryEmail,
        phone: primaryPhone
      },
      totalAmount: details.paidAmount,
      discountApplied: discount,
      promoCode: discount > 0 ? promoCode.toUpperCase() : undefined,
      status: 'Confirmed',
      bookedAt: new Date().toISOString(),
      details: {
        flightNumber: bookingItem.flightNumber,
        airline: bookingItem.airline,
        hotelName: bookingItem.name || bookingItem.destination,
        yatraCircuit: `Paid ₹${details.paidAmount.toLocaleString('en-IN')} via Paytm UPI QR (UTR: ${details.utrNumber})`
      }
    };

    setConfirmedBooking(newBooking);
    onBookingSuccess(newBooking);
    setStep('confirm');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();

    const randomPnr = 'MG' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      id: 'bk-' + Date.now(),
      pnr: randomPnr,
      serviceType,
      title: bookingItem.title || bookingItem.name || bookingItem.airline || 'Moksha Reservation',
      routeOrLocation: bookingItem.location || `${bookingItem.fromCity || 'Delhi'} → ${bookingItem.toCity || 'Varanasi'}`,
      travelDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      passengers: passengers.length > 0 && passengers[0].name ? passengers : [{ name: primaryName || 'Lead Yatri', age: 35, gender: 'male' }],
      primaryContact: {
        name: primaryName || 'Lead Yatri',
        email: primaryEmail,
        phone: primaryPhone
      },
      totalAmount: finalTotal,
      discountApplied: discount,
      promoCode: discount > 0 ? promoCode.toUpperCase() : undefined,
      status: 'Confirmed',
      bookedAt: new Date().toISOString(),
      details: {
        flightNumber: bookingItem.flightNumber,
        airline: bookingItem.airline,
        hotelName: bookingItem.name,
        yatraCircuit: bookingItem.circuit
      }
    };

    setConfirmedBooking(newBooking);
    onBookingSuccess(newBooking);
    setStep('confirm');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-6 border border-amber-500/30 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b1b2d] to-[#142942] text-white p-5 flex items-center justify-between border-b border-[#ff6a00]/30">
          <div className="flex items-center gap-3">
            <MokshaLogo variant="icon" size="sm" />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ff6a00]">
                Moksha Gateways • Secure Checkout
              </span>
              <h3 className="text-base sm:text-lg font-bold truncate max-w-xs sm:max-w-md text-white">
                {bookingItem.title || bookingItem.name || `${bookingItem.airline || 'Flight'} ${bookingItem.flightNumber || ''}`}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {step === 'details' ? (
            <form onSubmit={handleProcessPayment} className="space-y-6">
              {/* Primary Contact Info */}
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>Lead Traveler & Booking Communication</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={primaryName}
                      onChange={(e) => setPrimaryName(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs font-semibold focus:outline-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Email ID (for e-ticket) *</label>
                    <input
                      type="email"
                      required
                      value={primaryEmail}
                      onChange={(e) => setPrimaryEmail(e.target.value)}
                      placeholder="rajesh@example.com"
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs font-semibold focus:outline-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile (+91 SMS updates) *</label>
                    <input
                      type="tel"
                      required
                      value={primaryPhone}
                      onChange={(e) => setPrimaryPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full p-2 rounded-lg border border-slate-300 text-xs font-semibold focus:outline-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Yatris / Passenger Details */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Traveler Details (for Temple Darshan Slip / Boarding Pass)
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddPassenger}
                    className="text-xs text-amber-700 font-bold hover:underline"
                  >
                    + Add Another Traveler
                  </button>
                </div>

                <div className="space-y-3">
                  {passengers.map((p, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-6">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Traveler {idx + 1} Name as on Govt ID
                        </label>
                        <input
                          type="text"
                          required
                          value={p.name}
                          onChange={(e) => handleUpdatePassenger(idx, 'name', e.target.value)}
                          placeholder="As on Aadhar / Passport"
                          className="w-full p-1.5 rounded-md border border-slate-300 text-xs font-semibold bg-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Age</label>
                        <input
                          type="number"
                          min={1}
                          max={110}
                          value={p.age}
                          onChange={(e) => handleUpdatePassenger(idx, 'age', Number(e.target.value))}
                          className="w-full p-1.5 rounded-md border border-slate-300 text-xs font-semibold bg-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Gender</label>
                        <select
                          value={p.gender}
                          onChange={(e) => handleUpdatePassenger(idx, 'gender', e.target.value)}
                          className="w-full p-1.5 rounded-md border border-slate-300 text-xs font-semibold bg-white"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Pilgrimage Add-ons */}
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-3">
                <div className="text-xs font-bold uppercase text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Moksha Pilgrimage Care & Blessings</span>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addPrasadBox}
                    onChange={(e) => setAddPrasadBox(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Include Sacred Kashi Vishwanath Mahaprasad & Sealed Gangajal Box (+₹499)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Fresh temple-blessed dry prasad, Rudraksha, and sealed Gangajal tin delivered directly to your room or home.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addTravelInsurance}
                    onChange={(e) => setAddTravelInsurance(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Comprehensive Yatra Medical & Flight Delay Insurance (+₹199 per person)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Covers medical emergency, altitude sickness assistance, and zero-penalty cancellation refunds.
                    </div>
                  </div>
                </label>
              </div>

              {/* Coupon Code Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-600 block mb-2">
                  Have a Promo Code or Bank Coupon?
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Try MOKSHA1000 or SENIORCARE"
                    className="flex-1 p-2 rounded-lg border border-slate-300 text-xs font-bold uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>
                {couponSuccess && <p className="text-xs text-emerald-700 font-bold mt-1.5">{couponSuccess}</p>}
                {couponError && <p className="text-xs text-red-600 font-bold mt-1.5">{couponError}</p>}
              </div>

              {/* Fare Summary Breakdown */}
              <div className="border-t border-slate-200 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Base Booking Amount</span>
                  <span className="font-semibold">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                {addPrasadBox && (
                  <div className="flex justify-between text-slate-600">
                    <span>Sacred Mahaprasad Box</span>
                    <span className="font-semibold">₹{prasadCost}</span>
                  </div>
                )}
                {addTravelInsurance && (
                  <div className="flex justify-between text-slate-600">
                    <span>Yatra Comprehensive Insurance</span>
                    <span className="font-semibold">₹{insuranceCost}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Applicable GST & Convenience Fee</span>
                  <span className="font-semibold">₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Voucher Applied</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount Payable</span>
                  <span className="text-amber-700">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <span className="text-xs font-bold uppercase text-slate-500 block mb-2">
                  Select Payment Method
                </span>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { id: 'upi', label: '⚡ Official Paytm UPI QR (Instant)' },
                    { id: 'card', label: '💳 Credit / Debit Card' },
                    { id: 'netbanking', label: '🏦 Net Banking' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        paymentMethod === m.id
                          ? 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-500 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* UPI QR Payment View */}
                {paymentMethod === 'upi' && (
                  <div className="pt-1">
                    <UpiPaymentCard
                      amount={finalTotal}
                      packageTitle={bookingItem.title || bookingItem.name || 'Moksha Reservation'}
                      customerName={primaryName}
                      customerPhone={primaryPhone}
                      allowAdvance={true}
                      onPaymentConfirmed={handleUpiConfirmed}
                    />
                  </div>
                )}
              </div>

              {/* Confirm CTA for Card & Netbanking */}
              {paymentMethod !== 'upi' && (
                <button
                  type="submit"
                  id="confirm-booking-pay-btn"
                  className="w-full py-4 bg-gradient-to-r from-[#ff6a00] via-orange-600 to-[#ea580c] hover:from-orange-500 hover:to-[#ff6a00] text-white font-black text-sm rounded-xl shadow-xl shadow-orange-950/40 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span>PAY ₹{finalTotal.toLocaleString('en-IN')} & GENERATE E-TICKET / DARSHAN PASS</span>
                </button>
              )}
            </form>
          ) : (
            /* Booking Confirmed State */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">
                  Har Har Mahadev • Shubha Yatra!
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-['Cinzel'] mt-1">
                  Booking Confirmed Successfully!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your official PNR & Yatra Pass has been generated and sent to <strong className="text-slate-800">{primaryEmail}</strong>
                </p>
              </div>

              {/* e-Ticket Voucher Preview */}
              {confirmedBooking && (
                <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-5 text-left space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Booking Reference PNR</span>
                      <div className="text-xl font-black text-amber-700 tracking-wider font-mono">
                        {confirmedBooking.pnr}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                      <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                        CONFIRMED & ISSUED
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Service</span>
                      <span className="font-bold text-slate-800 capitalize">{confirmedBooking.serviceType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Travel Date</span>
                      <span className="font-bold text-slate-800">{confirmedBooking.travelDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Primary Traveler</span>
                      <span className="font-bold text-slate-800">{confirmedBooking.primaryContact.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Total Paid</span>
                      <span className="font-black text-slate-900">₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {confirmedBooking.details?.yatraCircuit && (
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-semibold">
                      Payment Note: {confirmedBooking.details.yatraCircuit}
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>Moksha Desk: Shubham Kumar (+91 9334789099)</span>
                    <span>UPI ID: 9334789099@pthdfc</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print E-Ticket</span>
                </button>

                {confirmedBooking && (
                  <a
                    href={`https://wa.me/919334789099?text=${encodeURIComponent(
                      `*Moksha Gateways - Booking & Payment Received*\n` +
                      `PNR: ${confirmedBooking.pnr}\n` +
                      `Package: ${confirmedBooking.title}\n` +
                      `Traveler: ${confirmedBooking.primaryContact.name} (${confirmedBooking.primaryContact.phone})\n` +
                      `Amount Paid: ₹${confirmedBooking.totalAmount.toLocaleString('en-IN')}\n` +
                      `Status: Confirmed`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Voucher (+91 9334789099)</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Close & View in 'My Bookings'
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
