import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Calendar, 
  Users, 
  ArrowRight,
  Printer,
  ChevronDown
} from 'lucide-react';
import { UpiPaymentCard } from './UpiPaymentCard';
import { MokshaLogo } from './MokshaLogo';
import { MOCK_HOLIDAYS, MOCK_YATRAS } from '../data/mockData';
import { Booking } from '../types';

interface QuickQrPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
  preselectedPackage?: any;
}

export const QuickQrPaymentModal: React.FC<QuickQrPaymentModalProps> = ({
  isOpen,
  onClose,
  onBookingSuccess,
  preselectedPackage
}) => {
  if (!isOpen) return null;

  // Combine top packages for quick selection
  const allPackages = [
    ...MOCK_HOLIDAYS.map(h => ({
      id: h.id,
      title: h.title,
      price: h.price,
      duration: h.duration,
      location: h.location || h.destination,
      type: 'holidays' as const
    })),
    ...MOCK_YATRAS.map(y => ({
      id: y.id,
      title: y.title,
      price: y.price,
      duration: `${y.days} Days / ${y.nights} Nights`,
      location: y.location,
      type: 'yatras' as const
    }))
  ];

  const defaultPkg = preselectedPackage 
    ? {
        id: preselectedPackage.id,
        title: preselectedPackage.title || preselectedPackage.name,
        price: preselectedPackage.price || 15000,
        duration: preselectedPackage.duration || 'Flexible',
        location: preselectedPackage.location || 'Himalayas / India',
        type: (preselectedPackage.circuit ? 'yatras' : 'holidays') as 'yatras' | 'holidays'
      }
    : allPackages[0];

  const [selectedPkgId, setSelectedPkgId] = useState<string>(defaultPkg.id);
  const currentPkg = allPackages.find(p => p.id === selectedPkgId) || defaultPkg;

  // Traveler info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [travelDate, setTravelDate] = useState('2026-10-15');
  const [travelersCount, setTravelersCount] = useState(2);
  const [step, setStep] = useState<'info' | 'pay' | 'success'>('info');

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your full name and mobile number.');
      return;
    }
    setStep('pay');
  };

  const handlePaymentConfirmed = (details: {
    utrNumber: string;
    paidAmount: number;
    paymentMode: 'full' | 'advance' | 'custom';
    paymentDate: string;
  }) => {
    const randomPnr = 'MG' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      id: 'bk-qr-' + Date.now(),
      pnr: randomPnr,
      serviceType: currentPkg.type,
      title: currentPkg.title,
      routeOrLocation: currentPkg.location,
      travelDate: new Date(travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      passengers: [{ name, age: 30, gender: 'male' }],
      primaryContact: {
        name,
        email: email || `${phone}@mokshagateways.com`,
        phone
      },
      totalAmount: currentPkg.price,
      discountApplied: 0,
      status: 'Confirmed',
      bookedAt: new Date().toISOString(),
      details: {
        hotelName: `${travelersCount} Traveler(s) - Reserved via Direct UPI QR`,
        yatraCircuit: details.utrNumber ? `UPI UTR: ${details.utrNumber}` : 'UPI Direct Payment'
      }
    };

    setConfirmedBooking(newBooking);
    onBookingSuccess(newBooking);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden my-6 border border-amber-500/30 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00baf2] via-[#052b61] to-[#002970] text-white p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <QrCode className="w-6 h-6 text-[#00baf2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
                  ⚡ Direct UPI QR Booking
                </span>
                <span className="text-[10px] text-amber-300 font-bold">
                  Zero Extra Convenience Fee
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Instant UPI Payment & Seat Reservation
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500">
          <div className={`flex items-center gap-1.5 ${step === 'info' ? 'text-teal-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'info' ? 'bg-teal-700 text-white' : 'bg-slate-300 text-slate-700'}`}>1</span>
            <span>Traveler Info</span>
          </div>
          <span className="text-slate-300">───</span>
          <div className={`flex items-center gap-1.5 ${step === 'pay' ? 'text-[#00baf2] font-black' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'pay' ? 'bg-[#002970] text-white' : 'bg-slate-300 text-slate-700'}`}>2</span>
            <span>Scan Paytm UPI QR</span>
          </div>
          <span className="text-slate-300">───</span>
          <div className={`flex items-center gap-1.5 ${step === 'success' ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>3</span>
            <span>Confirmed Ticket</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[78vh] overflow-y-auto">
          {step === 'info' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              {/* Package Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Select Tour / Pilgrimage Package *
                </label>
                <div className="relative">
                  <select
                    value={selectedPkgId}
                    onChange={(e) => setSelectedPkgId(e.target.value)}
                    className="w-full p-3 pr-10 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 appearance-none focus:outline-teal-500"
                  >
                    {allPackages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.title} • ₹{pkg.price.toLocaleString('en-IN')} ({pkg.duration})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Package Snapshot Card */}
              <div className="bg-teal-50/80 p-3.5 rounded-2xl border border-teal-200/70 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-teal-800 tracking-wider">
                    Selected Tour Package
                  </div>
                  <div className="text-xs font-black text-slate-900 line-clamp-1">
                    {currentPkg.title}
                  </div>
                  <div className="text-[11px] text-teal-900 font-medium">
                    {currentPkg.location} • {currentPkg.duration}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Package Fare</div>
                  <div className="text-base font-black text-amber-700">
                    ₹{currentPkg.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Traveler Details Form */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>Primary Traveler Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile (+91 SMS / WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9334789099"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Email ID (for e-ticket receipt)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Travel Date</label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Travelers</label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={travelersCount}
                        onChange={(e) => setTravelersCount(Math.max(1, Number(e.target.value)))}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-teal-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#00baf2] via-[#002970] to-[#001845] hover:opacity-95 text-white font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <span>PROCEED TO PAYTM UPI QR SCANNER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'pay' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="text-xs text-teal-700 font-bold hover:underline cursor-pointer"
                >
                  ← Back to Traveler Details
                </button>
                <span className="text-xs text-slate-500 font-semibold">
                  Traveler: <strong className="text-slate-800">{name}</strong> ({phone})
                </span>
              </div>

              {/* Paytm UPI Card Embedded */}
              <UpiPaymentCard
                amount={currentPkg.price}
                packageTitle={currentPkg.title}
                customerName={name}
                customerPhone={phone}
                allowAdvance={true}
                onPaymentConfirmed={handlePaymentConfirmed}
              />
            </div>
          )}

          {step === 'success' && confirmedBooking && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">
                  Payment Submitted Successfully!
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-['Cinzel'] mt-1">
                  Booking Confirmed!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Thank you, <strong>{name}</strong>! Your seat has been reserved with Moksha Gateways.
                </p>
              </div>

              {/* Voucher Card */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-5 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Booking Reference PNR</span>
                    <div className="text-xl font-black text-amber-700 tracking-wider font-mono">
                      {confirmedBooking.pnr}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Payment Status</span>
                    <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                      UPI VERIFICATION SUBMITTED
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Tour Package</span>
                    <span className="font-bold text-slate-800">{confirmedBooking.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Travel Date</span>
                    <span className="font-bold text-slate-800">{confirmedBooking.travelDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Primary Contact</span>
                    <span className="font-bold text-slate-800">{name} ({phone})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Official Desk</span>
                    <span className="font-bold text-slate-800">Shubham Kumar (+91 9334789099)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Payee: 9334789099@pthdfc</span>
                  <span>Moksha 24x7 Helpline: +91 9334789099</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Done & View in 'My Bookings'
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
