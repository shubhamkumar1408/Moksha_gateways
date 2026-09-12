import React, { useState } from 'react';
import { Tag, Copy, Check, Sparkles, Percent } from 'lucide-react';
import { MOCK_OFFERS } from '../data/mockData';

export const OffersSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-amber-600 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Moksha Privileges</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cinzel']">
            Offers & Blessed Savings
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
          Use code at checkout for instant cash discounts
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_OFFERS.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {offer.badge}
                </span>
                <span className="text-[11px] text-slate-400">{offer.validTill}</span>
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 leading-snug mb-1.5">
                {offer.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {offer.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono font-black text-xs text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span>{offer.code}</span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(offer.code)}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                {copiedCode === offer.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
