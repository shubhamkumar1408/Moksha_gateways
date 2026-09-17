import React from 'react';
import { ShieldCheck, HeartHandshake, Utensils, Award, Clock, Sparkles } from 'lucide-react';

export const WhyMoksha: React.FC = () => {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Guaranteed Temple VIP Darshan',
      description: 'Pre-booked Sugam passes for Kashi Vishwanath, Tirumala Balaji, Kedarnath & Ayodhya Ram Mandir so you never wait in long queues.'
    },
    {
      icon: HeartHandshake,
      title: 'Senior Citizen & Sevadar Care',
      description: 'Personal assistance at airports, station platforms, and temple parikramas with dedicated golf carts, battery rickshaws, and wheelchairs.'
    },
    {
      icon: Utensils,
      title: 'Certified Pure Satvik Dining',
      description: 'Wholesome, onion-garlic-free satvik food prepared by traditional cooks using holy Gangajal and fresh mountain ingredients.'
    },
    {
      icon: Award,
      title: 'Govt. & IRCTC Approved Partner',
      description: 'Accredited with Indian Railway Catering and Tourism Corporation (IRCTC) and Ministry of Tourism for sacred tourism circuits.'
    },
    {
      icon: Clock,
      title: '24x7 Emergency Yatra Helpline',
      description: 'Immediate on-ground response team across Uttarakhand, Uttar Pradesh, Andhra Pradesh and Kashmir for medical or travel needs.'
    },
    {
      icon: Sparkles,
      title: 'Instant 100% Moneyback Refunds',
      description: 'Zero hassle cancellation policies with direct bank credit within 15 minutes for flight schedule alterations or weather delays.'
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-12 sm:py-16 px-3 sm:px-6 lg:px-8 relative overflow-hidden my-6 sm:my-8 w-full min-w-0 max-w-full">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full min-w-0">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest">
            The Moksha Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-['Cinzel'] tracking-wide mt-1">
            Why Millions of Yatris Trust Moksha Gateways
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            Blending contemporary MakeMyTrip convenience with centuries of sacred Indian hospitality and reverence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/60 hover:bg-slate-800 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
