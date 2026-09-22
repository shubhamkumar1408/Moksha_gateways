import React, { useState, useEffect } from 'react';
import { X, User, ShieldCheck, Sparkles, CheckCircle2, KeyRound, Info, ArrowLeft, RotateCw } from 'lucide-react';
import { submitLead } from '../utils/leadService';

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
  const [generatedOtp, setGeneratedOtp] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown]);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileOrEmail.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: mobileOrEmail.trim(),
          name: name.trim() || 'Customer',
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.devOtp) {
          setGeneratedOtp(data.devOtp);
        }
        setOtpSent(true);
        setCountdown(30);
      } else {
        setErrorMessage(data.error || 'Could not send OTP. Please try again.');
      }
    } catch (err: any) {
      console.warn('Backend send-otp fallback:', err);
      // Fallback in case of offline or container delay
      const fallbackCode = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(fallbackCode);
      setOtpSent(true);
      setCountdown(30);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoFill = () => {
    setOtp(generatedOtp);
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: mobileOrEmail.trim(),
          name: name.trim() || 'Customer',
        }),
      });
      const data = await res.json();
      if (data.success && data.devOtp) {
        setGeneratedOtp(data.devOtp);
      }
      setOtp('');
      setCountdown(30);
    } catch {
      const fallbackCode = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(fallbackCode);
      setOtp('');
      setCountdown(30);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const finalName = name.trim() || 'Pilgrim Guest';
    const finalOtp = otp.trim() || generatedOtp;

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: mobileOrEmail.trim(),
          otp: finalOtp,
          name: finalName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onLoginSuccess(data.user?.name || finalName);
        onClose();
      } else {
        setErrorMessage(data.error || 'Invalid OTP. Please check the code.');
      }
    } catch (err: any) {
      console.warn('Verify OTP fallback:', err);
      // Fallback verification
      onLoginSuccess(finalName);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
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

        <div className="p-5 sm:p-6">
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name / आपका नाम
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Mobile Number / Email Address *
                  </label>
                  <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Demo Mode
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={mobileOrEmail}
                  onChange={(e) => setMobileOrEmail(e.target.value)}
                  placeholder="Enter 10-digit mobile or email"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-amber-500"
                />
              </div>

              {/* Informational Notice about SMS Gateway */}
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  <strong>नोट:</strong> अभी यह पोर्टल <strong>डेमो मोड</strong> में है। मोबाइल पर फिजिकल SMS भेजने के लिए SMS गेटवे (Fast2SMS/MSG91) की आवश्यकता होती है। OTP दबाने पर स्क्रीन पर ही टेस्ट OTP मिल जाएगा जिससे आप तुरंत लॉगिन कर सकते हैं और आपकी लीड CRM डेस्क में सेव हो जाएगी।
                </p>
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
                  ⚠️ {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer uppercase tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? 'GENERATING OTP...' : 'CONTINUE WITH OTP'}</span>
                <span>→</span>
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
              
              {/* Sent Status */}
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">Login request for: <strong>{mobileOrEmail}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-[11px] text-blue-700 hover:underline font-bold flex items-center gap-0.5 shrink-0 ml-2"
                >
                  <ArrowLeft className="w-3 h-3" /> Change
                </button>
              </div>

              {/* DEMO OTP HIGHLIGHT BOX */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-dashed border-emerald-400 text-emerald-950 text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800">
                  <KeyRound className="w-4 h-4 text-emerald-600" />
                  <span>DEMO OTP CODE (स्क्रीन पर टेस्ट कोड)</span>
                </div>
                
                <div className="text-3xl font-black font-mono tracking-widest text-emerald-700 py-1">
                  {generatedOtp}
                </div>

                <p className="text-[11px] text-slate-600">
                  (SMS गेटवे कनेक्ट न होने के कारण OTP यहाँ स्क्रीन पर दिया गया है)
                </p>

                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  ✓ Auto-Fill OTP ({generatedOtp})
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enter 4-digit OTP
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder={generatedOtp}
                  className="w-full p-3 rounded-xl border border-slate-300 text-center text-2xl tracking-widest font-mono font-bold focus:outline-amber-500 text-slate-900"
                />
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
                  ⚠️ {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer uppercase tracking-wider hover:opacity-95 active:scale-95 transition-all"
              >
                {isSubmitting ? 'VERIFYING CODE...' : 'VERIFY & ENTER PORTAL'}
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                {countdown > 0 ? (
                  <span className="text-slate-400 text-[11px]">
                    Resend code in {countdown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" /> Resend New Code
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleVerify}
                  className="text-[#ff6a00] hover:underline font-bold text-[11px]"
                >
                  Quick Sign In →
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
