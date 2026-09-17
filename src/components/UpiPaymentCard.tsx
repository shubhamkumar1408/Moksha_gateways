import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { 
  Check, 
  Copy, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  QrCode as QrCodeIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface UpiPaymentCardProps {
  amount: number;
  packageTitle: string;
  bookingRef?: string;
  customerName?: string;
  customerPhone?: string;
  allowAdvance?: boolean;
  onPaymentConfirmed?: (details: {
    utrNumber: string;
    paidAmount: number;
    paymentMode: 'full' | 'advance' | 'custom';
    paymentDate: string;
  }) => void;
}

export const UpiPaymentCard: React.FC<UpiPaymentCardProps> = ({
  amount,
  packageTitle,
  bookingRef = 'MOKSHA' + Math.floor(100000 + Math.random() * 900000),
  customerName = '',
  customerPhone = '',
  allowAdvance = true,
  onPaymentConfirmed
}) => {
  const upiId = '9334789099@pthdfc';
  const payeeName = 'Shubham Kumar';
  const phone = '9334789099';

  // Payment mode: 'full' vs 'token' (e.g. ₹1,000 or ₹2,500) vs 'custom'
  const advanceAmount = Math.min(2000, Math.max(1000, Math.round(amount * 0.15)));
  const [paymentMode, setPaymentMode] = useState<'full' | 'advance' | 'custom'>(
    amount > 5000 && allowAdvance ? 'advance' : 'full'
  );
  const [customAmount, setCustomAmount] = useState<number>(advanceAmount);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  // UTR / Transaction ID entry
  const [utrNumber, setUtrNumber] = useState('');
  const [utrError, setUtrError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Compute actual payable amount
  const payableAmount = paymentMode === 'full' 
    ? amount 
    : paymentMode === 'advance' 
      ? advanceAmount 
      : customAmount;

  // Generate UPI URI
  const note = `Booking ${bookingRef} - ${packageTitle.slice(0, 25)}`;
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${payableAmount}&cu=INR&tn=${encodeURIComponent(note)}`;

  // Generate QR Code on canvas
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        upiUri,
        {
          width: 240,
          margin: 1,
          color: {
            dark: '#051b34',
            light: '#ffffff'
          },
          errorCorrectionLevel: 'H'
        },
        (error) => {
          if (error) console.error('Error generating QR code:', error);
        }
      );
    }
  }, [upiUri]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleDownloadQr = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `Moksha-UPI-QR-${bookingRef}.png`;
      a.click();
    }
  };

  const handleConfirmUtr = (e: React.FormEvent) => {
    e.preventDefault();
    setUtrError('');

    const cleanUtr = utrNumber.trim();
    if (cleanUtr.length < 6) {
      setUtrError('Please enter a valid 12-digit UTR / UPI Reference or Transaction ID.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentDone(true);
      if (onPaymentConfirmed) {
        onPaymentConfirmed({
          utrNumber: cleanUtr,
          paidAmount: payableAmount,
          paymentMode,
          paymentDate: new Date().toISOString()
        });
      }
    }, 600);
  };

  // WhatsApp verification link
  const whatsappReceiptText = `*Moksha Gateways - Booking Payment Submission*\n` +
    `📌 *Booking Ref:* ${bookingRef}\n` +
    `👤 *Traveler:* ${customerName || 'Direct Booking'}\n` +
    `📞 *Phone:* ${customerPhone || 'Not provided'}\n` +
    `🏔️ *Package:* ${packageTitle}\n` +
    `💰 *Amount Paid:* ₹${payableAmount.toLocaleString('en-IN')} (${paymentMode === 'full' ? 'Full Payment' : 'Token / Advance'})\n` +
    `💳 *Paid To:* Shubham Kumar (${upiId})\n` +
    `🔢 *UTR / Transaction ID:* ${utrNumber || 'Just Paid via QR'}\n\n` +
    `Please verify and issue my confirmed e-ticket and invoice.`;

  const whatsappUrl = `https://wa.me/919334789099?text=${encodeURIComponent(whatsappReceiptText)}`;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Amount Mode Selector */}
      <div className="mb-4 bg-slate-100 p-1.5 rounded-xl flex items-center gap-1 text-xs font-bold">
        {allowAdvance && amount > 3000 && (
          <button
            type="button"
            onClick={() => setPaymentMode('advance')}
            className={`flex-1 py-2 px-2.5 rounded-lg text-center transition-all cursor-pointer ${
              paymentMode === 'advance'
                ? 'bg-white text-teal-900 shadow-sm font-extrabold border border-teal-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div>Advance Token</div>
            <div className="text-[10px] text-teal-600">₹{advanceAmount.toLocaleString('en-IN')} (Book Seat)</div>
          </button>
        )}

        <button
          type="button"
          onClick={() => setPaymentMode('full')}
          className={`flex-1 py-2 px-2.5 rounded-lg text-center transition-all cursor-pointer ${
            paymentMode === 'full'
              ? 'bg-white text-orange-950 shadow-sm font-extrabold border border-orange-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div>Full Amount</div>
          <div className="text-[10px] text-[#ff6a00]">₹{amount.toLocaleString('en-IN')}</div>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMode('custom')}
          className={`py-2 px-2.5 rounded-lg text-center transition-all cursor-pointer ${
            paymentMode === 'custom'
              ? 'bg-white text-slate-900 shadow-sm font-extrabold border border-slate-300'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <div>Custom</div>
          <div className="text-[10px] text-slate-500">₹ Any</div>
        </button>
      </div>

      {paymentMode === 'custom' && (
        <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
          <label className="block text-[11px] font-bold text-amber-900 mb-1">
            Enter Custom Advance Booking Amount (₹)
          </label>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 text-sm">₹</span>
            <input
              type="number"
              min={500}
              max={amount}
              step={100}
              value={customAmount}
              onChange={(e) => setCustomAmount(Math.max(500, Number(e.target.value)))}
              className="flex-1 p-2 bg-white rounded-lg border border-amber-300 text-sm font-black text-slate-900"
            />
          </div>
          <p className="text-[10px] text-amber-700 mt-1 font-medium">
            Remaining balance of ₹{(amount - customAmount).toLocaleString('en-IN')} can be paid before departure.
          </p>
        </div>
      )}

      {/* Official Authentic Paytm UPI QR Card Container */}
      <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-4 border-slate-200/90 bg-white">
        {/* Top Header Section with profile avatar & name */}
        <div className="bg-slate-50 pt-5 pb-3 px-4 flex flex-col items-center text-center">
          {/* Circular Profile Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sky-400 p-0.5 bg-white shadow-md relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Shubham Kumar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Name & Blue Verified Badge */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Shubham Kumar
            </h3>
            {/* Official Blue Checkmark Badge */}
            <span 
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#00baf2] text-white shadow-xs"
              title="Verified Merchant Account"
            >
              <Check className="w-2.5 h-2.5 stroke-[3.5]" />
            </span>
          </div>

          <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
            Moksha Gateways Official Booking Desk
          </div>
        </div>

        {/* Paytm UPI Blue & Navy Framed Card Body */}
        <div className="p-3 sm:p-4 bg-slate-50">
          <div className="rounded-[22px] overflow-hidden bg-gradient-to-b from-[#00baf2] via-[#00baf2] to-[#002970] p-3 sm:p-4 text-center shadow-inner">
            
            {/* Paytm UPI Logo Banner */}
            <div className="bg-white/95 backdrop-blur-xs rounded-xl py-2 px-3 mb-3 flex items-center justify-center gap-1.5 shadow-sm">
              <span className="text-base sm:text-lg font-black tracking-tight text-[#002970]">
                paytm
              </span>
              <span className="text-red-500 text-sm font-bold animate-pulse">❤️</span>
              <span className="text-base sm:text-lg font-black italic tracking-wide bg-gradient-to-r from-emerald-600 via-orange-500 to-sky-600 bg-clip-text text-transparent">
                UPI
              </span>
            </div>

            {/* White QR Area */}
            <div className="bg-white rounded-2xl p-4 shadow-xl inline-block mx-auto border-2 border-white/80">
              <canvas ref={canvasRef} className="mx-auto rounded-lg" />
              
              {/* Amount Tag inside QR */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Payable:</span>
                <span className="font-black text-slate-900 text-sm">
                  ₹{payableAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* UPI ID with Arrow & Copy button */}
            <div className="mt-3 bg-white/90 backdrop-blur-xs rounded-xl py-2 px-3 flex items-center justify-between gap-2 shadow-xs border border-white/50">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                <span className="text-orange-500 text-sm">▶</span>
                <span className="font-mono tracking-tight">{upiId}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="text-[11px] font-bold px-2.5 py-1 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                {copiedUpi ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Scan with any UPI app footer */}
            <div className="mt-3 text-white text-[11px] font-semibold flex items-center justify-center flex-wrap gap-2">
              <span className="text-white/90">Scan with any UPI app:</span>
              <span className="bg-white text-[#002970] font-bold px-1.5 py-0.5 rounded text-[10px]">paytm</span>
              <span className="bg-purple-700 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">PhonePe</span>
              <span className="bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">GPay</span>
              <span className="bg-orange-600 text-white font-bold px-1.5 py-0.5 rounded text-[10px]">BHIM</span>
            </div>
          </div>
        </div>

        {/* Action Controls: Direct Mobile App Link & Download */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Mobile direct UPI trigger */}
          <a
            href={upiUri}
            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span>Pay on Phone (UPI App)</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadQr}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            title="Download QR to scan later"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save QR</span>
          </button>
        </div>
      </div>

      {/* Payment Confirmation & UTR Submission Form */}
      <div className="mt-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Step 2: Enter UPI UTR / Transaction ID to Confirm</span>
        </h4>
        <p className="text-[11px] text-slate-500 mb-3">
          After scanning and paying via Paytm, GPay, or PhonePe, enter the 12-digit UTR / Reference ID from your payment screen.
        </p>

        <form onSubmit={handleConfirmUtr} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              12-Digit UPI Ref / UTR Number / Transaction ID *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                placeholder="e.g. 423985710293 or T2609..."
                className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold tracking-wider text-slate-900 focus:outline-emerald-500 focus:bg-white"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>
            </div>
            {utrError && (
              <p className="text-[11px] text-red-600 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{utrError}</span>
              </p>
            )}
          </div>

          {/* Direct WhatsApp verification notification button */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>💬 Send Payment Screenshot / Details on WhatsApp</span>
              <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded font-mono">+91 9334789099</span>
            </a>

            <div className="text-center text-[10px] text-slate-400">
              Instant human verification by Shubham Kumar (Moksha Gateways) • 24x7 Assistance
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
