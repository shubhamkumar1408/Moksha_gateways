import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { submitLead } from '../utils/leadService';
import { MokshaLogo } from './MokshaLogo';

interface LeadInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
  defaultDuration?: string;
  sourceTitle?: string;
}

export const LeadInquiryModal: React.FC<LeadInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultDestination = '',
  defaultDuration = '',
  sourceTitle = 'General Website Inquiry',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState(defaultDestination);
  const [travelDate, setTravelDate] = useState('');
  const [travelersCount, setTravelersCount] = useState('2');
  const [budget, setBudget] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadRefId, setLeadRefId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await submitLead({
        leadType: 'Callback',
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        destinationOrPackage: destination.trim() || sourceTitle || 'Custom Holiday / Pilgrimage',
        duration: defaultDuration,
        travelDate: travelDate || 'Flexible / Next 30 Days',
        travelersCount: Number(travelersCount) || 2,
        budgetOrAmount: budget.trim(),
        notes: notes.trim(),
      });

      if (response.success) {
        setLeadRefId(response.leadId || `LEAD-${Date.now().toString().slice(-5)}`);
        setSubmitted(true);
      } else {
        setErrorMessage(response.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error sending lead');
    } finally {
      setLoading(false);
    }
  };

  const cleanPhone = phone.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden my-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b1b2d] via-[#10243d] to-[#1c3554] text-white p-5 flex items-center justify-between border-b border-[#ff6a00]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Headphones className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Instant Lead & Callback Desk
                </span>
              </div>
              <h3 className="text-base font-black text-white mt-0.5">Request a Free Callback & Quote</h3>
            </div>
          </div>
          <button
            id="lead-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Close lead inquiry"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500 shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Inquiry Submitted Successfully
            </span>
            <h4 className="text-xl font-black text-slate-900 mt-3 mb-2">
              Namaste, {name}!
            </h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto mb-4 leading-relaxed">
              We have received your request for <strong>{destination || sourceTitle}</strong>. Our travel specialist has been notified via instant email and will call you at <strong className="text-slate-900">{phone}</strong> within 15 minutes.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 max-w-xs mx-auto mb-6 text-left text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-semibold">Lead Reference:</span>
                <span className="font-mono font-bold text-slate-900">{leadRefId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-semibold">Destination:</span>
                <span className="font-bold text-slate-900 truncate max-w-[150px]">{destination || sourceTitle}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-semibold">Notification Sent:</span>
                <span className="font-bold text-emerald-600">✓ Delivered to Desk</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Moksha Gateways, I just submitted an inquiry (${leadRefId}) for ${destination || sourceTitle}. Please share custom itinerary.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>💬 WhatsApp Quick Chat</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Best Price Guarantee:</strong> Fill your details below and our pilgrimage & vacation planners will provide custom packages with zero convenience fee!
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lead-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  Mobile / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lead-phone-input"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  Email Address (Optional)
                </label>
                <input
                  id="lead-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@gmail.com"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  Destination / Package
                </label>
                <input
                  id="lead-dest-input"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Manali, Kedarnath, Varanasi, Goa"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Travel Date
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  Travelers
                </label>
                <select
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-amber-500 bg-white"
                >
                  <option value="1">1 Solo Traveler</option>
                  <option value="2">2 Adults (Couple/Duo)</option>
                  <option value="4">3-4 People (Family)</option>
                  <option value="8">5+ People (Group)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Approx Budget (₹)
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. ₹15,000 / person"
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                Any Specific Requirement / Message
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Need hotel near temple, senior citizen friendly, satvik food required..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-amber-500"
              />
            </div>

            <div className="pt-2">
              <button
                id="submit-lead-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#ff6a00] to-[#ee0979] hover:from-[#e55e00] hover:to-[#d8086d] text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-[0.99]"
              >
                {loading ? (
                  <span>Submitting Lead & Sending Alert...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry & Get Instant Callback</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Privacy Protected • Instant Email Notification to Desk</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
