import React from 'react';
import { 
  X, 
  Luggage, 
  Printer, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Trash2,
  Plane,
  Building2,
  Flame,
  TrainTrack,
  Car
} from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking
}) => {
  if (!isOpen) return null;

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'flights': return Plane;
      case 'hotels': return Building2;
      case 'yatras': return Flame;
      case 'trains': return TrainTrack;
      case 'cabs': return Car;
      default: return Luggage;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-6 border border-slate-200">
        {/* Header */}
        <div className="bg-[#08182b] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Luggage className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold">My Bookings & Yatra Vouchers</h3>
              <p className="text-xs text-slate-400">View e-tickets, boarding passes and temple darshan slips</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Luggage className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-700">No active bookings yet</h4>
              <p className="text-xs text-slate-500 mt-1">
                Explore sacred yatras, flights or hotel stays to plan your upcoming journeys.
              </p>
            </div>
          ) : (
            bookings.map((b) => {
              const Icon = getServiceIcon(b.serviceType);
              return (
                <div
                  key={b.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 shadow-xs transition-all bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-amber-600 shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          PNR: {b.pnr}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                          {b.title}
                        </h4>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {b.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Date</span>
                      <span className="font-semibold text-slate-800">{b.travelDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Lead Traveler</span>
                      <span className="font-semibold text-slate-800 truncate">{b.primaryContact.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Paid Amount</span>
                      <span className="font-bold text-amber-800">₹{b.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Service Type</span>
                      <span className="font-semibold capitalize text-slate-800">{b.serviceType}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => window.print()}
                      className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Voucher</span>
                    </button>

                    <button
                      onClick={() => onCancelBooking(b.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
