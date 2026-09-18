import React, { useState } from 'react';
import { X, User, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileOrEmail.trim()) {
      setOtpSent(true);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'Rahul';
    onLoginSuccess(finalName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#08182b] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">Login / Sign In</h3>
              <p className="text-xs text-slate-400">Moksha Gateways Pilgrimage & Holiday Portal</p>
            </div>
          </div>
          <button
            id="login-modal-close-btn"
            onClick={onClose}
            className="px-2.5 py-1.5 rounded-full bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white flex items-center gap-1 text-xs font-bold transition-all cursor-pointer border border-slate-700 shadow-xs active:scale-95"
            title="Close / बाद में करें"
            aria-label="Close login popup"
          >
            <span className="text-[11px] font-bold">Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number / Email Address *
                </label>
                <input
                  type="text"
                  required
                  value={mobileOrEmail}
                  onChange={(e) => setMobileOrEmail(e.target.value)}
                  placeholder="Enter 10-digit mobile or email"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer uppercase tracking-wider active:scale-95 transition-all"
              >
                CONTINUE WITH OTP
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs font-bold text-slate-500 hover:text-[#ff6a00] transition-colors cursor-pointer text-center block"
              >
                Skip for now & explore website →
              </button>

              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                By logging in, you agree to Moksha Gateways Terms of Pilgrimage Service & Privacy Policy.
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>One-Time Password sent to {mobileOrEmail}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter 4-digit OTP (any 4 digits for demo)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  className="w-full p-3 rounded-xl border border-slate-300 text-center text-xl tracking-widest font-mono font-bold focus:outline-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer uppercase tracking-wider"
              >
                VERIFY & ENTER PORTAL
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
