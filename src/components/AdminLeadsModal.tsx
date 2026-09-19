import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Phone, MessageSquare, Mail, Calendar, Users, IndianRupee, Clock, ShieldCheck, Download } from 'lucide-react';

interface Lead {
  id: string;
  leadType: string;
  name: string;
  phone: string;
  email?: string;
  destinationOrPackage?: string;
  duration?: string;
  travelDate?: string;
  travelersCount?: number;
  budgetOrAmount?: number;
  notes?: string;
  submittedAt: string;
  status?: string;
}

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ configured: boolean; method: string; recipient: string } | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error('Error fetching leads', e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmailStatus = async () => {
    try {
      const res = await fetch('/api/email-status');
      const data = await res.json();
      setEmailStatus(data);
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
      fetchEmailStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const exportToCsv = () => {
    if (leads.length === 0) return;
    const headers = ['Lead ID', 'Date', 'Type', 'Customer Name', 'Phone', 'Email', 'Package', 'Amount', 'Travelers', 'Notes'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.submittedAt).toLocaleString('en-IN'),
      l.leadType || 'Inquiry',
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${(l.destinationOrPackage || '').replace(/"/g, '""')}"`,
      l.budgetOrAmount || 0,
      l.travelersCount || 1,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moksha_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B2545] to-[#133E70] p-4 sm:p-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#ff6a00] text-white text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full">
                Admin CRM Desk
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Real-Time Leads Manager
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black mt-1">
              Website Leads & Customer Inquiries ({leads.length})
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              disabled={isLoading}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              title="Refresh Leads"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            {leads.length > 0 && (
              <button
                onClick={exportToCsv}
                className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                title="Export to Excel / CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download CSV</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Email Status Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              All inquiries, bookings & QR payments are automatically saved instantly in database.
            </span>
          </div>
          <div className="text-[11px] font-medium text-slate-500">
            Alerts target: <span className="font-bold text-slate-700">{emailStatus?.recipient || 'duttshubham68@gmail.com, mokshagateways@gmail.com'}</span>
          </div>
        </div>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-100/60">
          {isLoading && leads.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#ff6a00] mb-3" />
              <p className="font-semibold text-sm">Loading website leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="font-bold text-base text-slate-700 mb-1">No leads recorded yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Whenever a user submits a callback request, booking, or scans the Paytm UPI QR, their lead will appear here immediately.
              </p>
            </div>
          ) : (
            leads.map((lead) => {
              const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
              const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
              const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Namaste ${lead.name || 'Customer'}, thank you for reaching out to Moksha Gateways!`)}`;

              return (
                <div
                  key={lead.id}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {lead.id}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        lead.leadType === 'Quick QR' 
                          ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                          : lead.leadType === 'Booking'
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {lead.leadType || 'Inquiry'}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(lead.submittedAt).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h4 className="text-base font-black text-slate-900">
                        {lead.name || 'Anonymous Visitor'}
                      </h4>
                      {lead.destinationOrPackage && (
                        <span className="text-sm font-bold text-[#ff6a00]">
                          {lead.destinationOrPackage} {lead.duration ? `(${lead.duration})` : ''}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="font-bold text-slate-800">
                        📞 {lead.phone || 'No phone'}
                      </span>
                      {lead.email && (
                        <span className="text-slate-500">
                          ✉️ {lead.email}
                        </span>
                      )}
                      {lead.budgetOrAmount ? (
                        <span className="font-bold text-emerald-700 flex items-center gap-0.5">
                          <IndianRupee className="w-3 h-3" />
                          {lead.budgetOrAmount.toLocaleString('en-IN')}
                        </span>
                      ) : null}
                    </div>

                    {lead.notes && (
                      <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100 mt-1">
                        "{lead.notes}"
                      </p>
                    )}
                  </div>

                  {/* Quick Action Buttons for Admin */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    {lead.phone && (
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B2545] hover:bg-[#133E70] text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                    )}
                    {lead.phone && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Auto-refreshes on open</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
