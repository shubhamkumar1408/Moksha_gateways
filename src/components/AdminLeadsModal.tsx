import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  RefreshCw, 
  Phone, 
  MessageSquare, 
  Mail, 
  Calendar, 
  IndianRupee, 
  Clock, 
  ShieldCheck, 
  Download,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  MapPin,
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Activity,
  CalendarDays,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell,
  Legend
} from 'recharts';

export interface Lead {
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
  updatedAt?: string;
}

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SortField = 'date' | 'destination' | 'status' | 'amount' | 'name';
type SortDirection = 'asc' | 'desc';
type ChartViewMode = 'all' | 'bySource';

const STATUS_OPTIONS = [
  { label: 'New Lead', value: 'New Lead', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { label: 'Pending', value: 'Pending', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  { label: 'Contacted', value: 'Contacted', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { label: 'Converted', value: 'Converted', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { label: 'Lost / Closed', value: 'Lost', color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

interface DailyLeadStat {
  dateKey: string;
  fullDate: string;
  timestamp: number;
  totalLeads: number;
  booking: number;
  quickQr: number;
  callback: number;
  converted: number;
  totalAmount: number;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ configured: boolean; method: string; recipient: string } | null>(null);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  // Dashboard visibility & view mode
  const [showDashboard, setShowDashboard] = useState<boolean>(true);
  const [chartViewMode, setChartViewMode] = useState<ChartViewMode>('all');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');
  const [selectedLeadType, setSelectedLeadType] = useState<string>('all');

  // Sorting state
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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

  // Update lead status in backend and local state
  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    setUpdatingLeadId(leadId);
    try {
      const res = await fetch(`/api/leads/${encodeURIComponent(leadId)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  // Extract unique destinations
  const uniqueDestinations = useMemo(() => {
    const set = new Set<string>();
    leads.forEach(l => {
      if (l.destinationOrPackage && l.destinationOrPackage.trim()) {
        set.add(l.destinationOrPackage.trim());
      }
    });
    return Array.from(set).sort();
  }, [leads]);

  // Extract unique lead types
  const uniqueLeadTypes = useMemo(() => {
    const set = new Set<string>();
    leads.forEach(l => {
      if (l.leadType && l.leadType.trim()) {
        set.add(l.leadType.trim());
      }
    });
    return Array.from(set);
  }, [leads]);

  // Compute status summary counts
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: leads.length,
      'New Lead': 0,
      'Pending': 0,
      'Contacted': 0,
      'Converted': 0,
      'Lost': 0,
    };
    leads.forEach(l => {
      const s = l.status || 'New Lead';
      if (counts[s] !== undefined) {
        counts[s]++;
      } else {
        counts[s] = 1;
      }
    });
    return counts;
  }, [leads]);

  // Total potential value calculation
  const totalPotentialValue = useMemo(() => {
    return leads.reduce((sum, l) => sum + (l.budgetOrAmount || 0), 0);
  }, [leads]);

  // Daily Chart Metrics Aggregation
  const chartData = useMemo(() => {
    if (leads.length === 0) return [];

    const map = new Map<string, DailyLeadStat>();

    leads.forEach(lead => {
      const dateObj = new Date(lead.submittedAt);
      if (isNaN(dateObj.getTime())) return;

      // Group key by YYYY-MM-DD for stable chronological ordering
      const yyyyMmDd = dateObj.toISOString().slice(0, 10);
      const displayKey = dateObj.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
      });
      const fullDateStr = dateObj.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const existing = map.get(yyyyMmDd) || {
        dateKey: displayKey,
        fullDate: fullDateStr,
        timestamp: new Date(yyyyMmDd).getTime(),
        totalLeads: 0,
        booking: 0,
        quickQr: 0,
        callback: 0,
        converted: 0,
        totalAmount: 0,
      };

      existing.totalLeads += 1;
      const type = (lead.leadType || '').toLowerCase();
      if (type.includes('book')) {
        existing.booking += 1;
      } else if (type.includes('qr')) {
        existing.quickQr += 1;
      } else {
        existing.callback += 1;
      }

      if (lead.status === 'Converted') {
        existing.converted += 1;
      }

      existing.totalAmount += (lead.budgetOrAmount || 0);
      map.set(yyyyMmDd, existing);
    });

    // Sort chronologically ascending for timeline chart
    const sorted = Array.from(map.values()).sort((a, b) => a.timestamp - b.timestamp);
    return sorted;
  }, [leads]);

  // Peak Day & Conversion Rate calculations for summary cards
  const peakDayStat = useMemo(() => {
    if (chartData.length === 0) return null;
    let peak = chartData[0];
    chartData.forEach(d => {
      if (d.totalLeads > peak.totalLeads) {
        peak = d;
      }
    });
    return peak;
  }, [chartData]);

  const conversionRate = useMemo(() => {
    if (leads.length === 0) return 0;
    const convertedCount = leads.filter(l => l.status === 'Converted').length;
    return Math.round((convertedCount / leads.length) * 100);
  }, [leads]);

  // Filtered & Sorted leads
  const filteredAndSortedLeads = useMemo(() => {
    let result = [...leads];

    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(l => 
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.phone && l.phone.includes(q)) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.destinationOrPackage && l.destinationOrPackage.toLowerCase().includes(q)) ||
        (l.id && l.id.toLowerCase().includes(q)) ||
        (l.notes && l.notes.toLowerCase().includes(q))
      );
    }

    // 2. Status filter
    if (selectedStatus !== 'all') {
      result = result.filter(l => (l.status || 'New Lead') === selectedStatus);
    }

    // 3. Destination filter
    if (selectedDestination !== 'all') {
      result = result.filter(l => (l.destinationOrPackage || '').trim() === selectedDestination);
    }

    // 4. Lead type filter
    if (selectedLeadType !== 'all') {
      result = result.filter(l => (l.leadType || '').trim() === selectedLeadType);
    }

    // 5. Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'date': {
          const dateA = new Date(a.submittedAt).getTime() || 0;
          const dateB = new Date(b.submittedAt).getTime() || 0;
          comparison = dateA - dateB;
          break;
        }
        case 'destination': {
          const destA = (a.destinationOrPackage || '').toLowerCase();
          const destB = (b.destinationOrPackage || '').toLowerCase();
          comparison = destA.localeCompare(destB);
          break;
        }
        case 'status': {
          const priorityOrder: Record<string, number> = {
            'New Lead': 1,
            'Pending': 2,
            'Contacted': 3,
            'Converted': 4,
            'Lost': 5,
          };
          const pA = priorityOrder[a.status || 'New Lead'] || 99;
          const pB = priorityOrder[b.status || 'New Lead'] || 99;
          comparison = pA - pB;
          break;
        }
        case 'amount': {
          const amountA = a.budgetOrAmount || 0;
          const amountB = b.budgetOrAmount || 0;
          comparison = amountA - amountB;
          break;
        }
        case 'name': {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          comparison = nameA.localeCompare(nameB);
          break;
        }
        default:
          comparison = 0;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [leads, searchQuery, selectedStatus, selectedDestination, selectedLeadType, sortField, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      setSortField(field);
      if (field === 'date' || field === 'amount') {
        setSortDirection('desc');
      } else {
        setSortDirection('asc');
      }
    }
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedDestination('all');
    setSelectedLeadType('all');
    setSortField('date');
    setSortDirection('desc');
  };

  const hasActiveFilters = searchQuery !== '' || selectedStatus !== 'all' || selectedDestination !== 'all' || selectedLeadType !== 'all';

  const exportToCsv = () => {
    const listToExport = filteredAndSortedLeads;
    if (listToExport.length === 0) return;
    const headers = ['Lead ID', 'Date', 'Type', 'Status', 'Customer Name', 'Phone', 'Email', 'Destination/Package', 'Amount (INR)', 'Travelers', 'Notes'];
    const rows = listToExport.map(l => [
      l.id,
      new Date(l.submittedAt).toLocaleString('en-IN'),
      l.leadType || 'Inquiry',
      l.status || 'New Lead',
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
    link.setAttribute('download', `moksha_leads_${selectedStatus !== 'all' ? selectedStatus + '_' : ''}${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#0B2545] via-[#133E70] to-[#0B2545] p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#ff6a00] text-white text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
                Admin CRM Desk
              </span>
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                Real-Time Leads Manager
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black mt-1 flex items-center gap-2">
              Website Leads & Customer Inquiries
              <span className="text-xs bg-white/20 font-bold px-2 py-0.5 rounded-full">
                {filteredAndSortedLeads.length} of {leads.length}
              </span>
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Toggle Dashboard Analytics Button */}
            <button
              onClick={() => setShowDashboard(prev => !prev)}
              className={`p-2 rounded-lg transition-colors text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer border ${
                showDashboard 
                  ? 'bg-white/20 border-white/30 text-amber-200 shadow-inner' 
                  : 'bg-white/10 hover:bg-white/20 border-transparent'
              }`}
              title={showDashboard ? 'Hide Analytics Dashboard' : 'Show Analytics Dashboard'}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {showDashboard ? 'Hide Analytics' : 'Overview Chart'}
              </span>
            </button>

            <button
              onClick={fetchLeads}
              disabled={isLoading}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              title="Refresh Leads from server"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            {leads.length > 0 && (
              <button
                onClick={exportToCsv}
                className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Export current view to Excel / CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
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

        {/* Scrollable Container for Dashboard + Leads List */}
        <div className="flex-1 overflow-y-auto flex flex-col bg-slate-100/70">
          
          {/* Summary Dashboard with Recharts */}
          {showDashboard && (
            <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 p-3.5 sm:p-5 shrink-0 transition-all">
              
              {/* Top Row: Title + Chart View Mode Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800">
                      Recent Engagement Overview
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Incoming leads activity grouped chronologically by date
                    </p>
                  </div>
                </div>

                {/* Chart Mode Selector */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                  <button
                    onClick={() => setChartViewMode('all')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                      chartViewMode === 'all'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Total Inquiries
                  </button>
                  <button
                    onClick={() => setChartViewMode('bySource')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                      chartViewMode === 'bySource'
                        ? 'bg-white text-[#ff6a00] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    By Lead Type
                  </button>
                </div>
              </div>

              {/* Metric Highlights Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
                
                {/* Metric 1: Total Leads */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block truncate">
                      Total Inquiries
                    </span>
                    <span className="text-lg font-black text-slate-900 leading-tight">
                      {leads.length}
                    </span>
                  </div>
                </div>

                {/* Metric 2: Peak Activity Day */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block truncate">
                      Peak Day
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate block">
                      {peakDayStat ? `${peakDayStat.dateKey} (${peakDayStat.totalLeads} leads)` : 'None'}
                    </span>
                  </div>
                </div>

                {/* Metric 3: Conversion Rate */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block truncate">
                      Converted
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-purple-700 leading-tight">
                        {statusCounts['Converted'] || 0}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        ({conversionRate}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric 4: Total Pipeline Value */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block truncate">
                      Pipeline Value
                    </span>
                    <span className="text-sm sm:text-base font-black text-emerald-700 leading-tight truncate block">
                      ₹{totalPotentialValue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recharts Bar Chart Area */}
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
                {chartData.length === 0 ? (
                  <div className="h-44 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-4">
                    <CalendarDays className="w-8 h-8 mb-2 opacity-50 text-slate-400" />
                    <p className="font-bold text-slate-600">No date-wise lead data recorded yet</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      When visitors submit booking or inquiry forms, engagement bars will display here.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="h-48 sm:h-52 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 12, right: 12, left: -22, bottom: 4 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="dateKey" 
                            tick={{ fontSize: 11, fill: '#64748b' }} 
                            axisLine={{ stroke: '#e2e8f0' }} 
                            tickLine={false} 
                          />
                          <YAxis 
                            allowDecimals={false} 
                            tick={{ fontSize: 11, fill: '#94a3b8' }} 
                            axisLine={false} 
                            tickLine={false} 
                          />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload as DailyLeadStat;
                                return (
                                  <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-slate-200 text-xs space-y-1.5 min-w-[170px]">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 font-bold text-slate-800">
                                      <span>{data.fullDate}</span>
                                      <span className="bg-[#ff6a00] text-white text-[10px] px-1.5 py-0.2 rounded font-black">
                                        {data.totalLeads} {data.totalLeads === 1 ? 'Lead' : 'Leads'}
                                      </span>
                                    </div>
                                    <div className="space-y-1 text-slate-600 pt-0.5">
                                      <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                          Bookings:
                                        </span>
                                        <span className="font-bold text-slate-800">{data.booking}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                          Quick QR:
                                        </span>
                                        <span className="font-bold text-slate-800">{data.quickQr}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                          Callbacks / Inquiries:
                                        </span>
                                        <span className="font-bold text-slate-800">{data.callback}</span>
                                      </div>
                                      {data.totalAmount > 0 && (
                                        <div className="flex justify-between items-center pt-1 border-t border-slate-100 font-bold text-emerald-700">
                                          <span>Day Value:</span>
                                          <span>₹{data.totalAmount.toLocaleString('en-IN')}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          {chartViewMode === 'all' ? (
                            <Bar 
                              dataKey="totalLeads" 
                              name="Total Leads" 
                              fill="#ff6a00" 
                              radius={[5, 5, 0, 0]} 
                              maxBarSize={46}
                            >
                              {chartData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={
                                    peakDayStat && entry.dateKey === peakDayStat.dateKey
                                      ? '#ff6a00' 
                                      : '#3b82f6'
                                  } 
                                />
                              ))}
                            </Bar>
                          ) : (
                            <>
                              <Bar 
                                dataKey="booking" 
                                name="Bookings" 
                                fill="#10b981" 
                                stackId="a" 
                                radius={[0, 0, 0, 0]} 
                                maxBarSize={46} 
                              />
                              <Bar 
                                dataKey="quickQr" 
                                name="Quick QR" 
                                fill="#8b5cf6" 
                                stackId="a" 
                                radius={[0, 0, 0, 0]} 
                                maxBarSize={46} 
                              />
                              <Bar 
                                dataKey="callback" 
                                name="Inquiries" 
                                fill="#f59e0b" 
                                stackId="a" 
                                radius={[5, 5, 0, 0]} 
                                maxBarSize={46} 
                              />
                            </>
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Chart Legend / Guide */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 mt-1 border-t border-slate-100 text-[11px] text-slate-500">
                      <div className="flex items-center gap-3">
                        {chartViewMode === 'all' ? (
                          <>
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span>
                              Daily Inquiries
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-sm bg-[#ff6a00]"></span>
                              Peak Volume Day
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                              Bookings
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-sm bg-purple-500"></span>
                              Quick QR
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                              Inquiries / Callbacks
                            </span>
                          </>
                        )}
                      </div>

                      <span className="text-slate-400">
                        {chartData.length} {chartData.length === 1 ? 'active day recorded' : 'active days recorded'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Filter Status Tabs */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  selectedStatus === 'all'
                    ? 'bg-[#0B2545] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                All Leads ({leads.length})
              </button>
              <button
                onClick={() => setSelectedStatus('New Lead')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  selectedStatus === 'New Lead'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                }`}
              >
                New ({statusCounts['New Lead'] || 0})
              </button>
              <button
                onClick={() => setSelectedStatus('Pending')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  selectedStatus === 'Pending'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                Pending ({statusCounts['Pending'] || 0})
              </button>
              <button
                onClick={() => setSelectedStatus('Contacted')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  selectedStatus === 'Contacted'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                Contacted ({statusCounts['Contacted'] || 0})
              </button>
              <button
                onClick={() => setSelectedStatus('Converted')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  selectedStatus === 'Converted'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
                }`}
              >
                Converted ({statusCounts['Converted'] || 0})
              </button>
            </div>

            <div className="flex items-center gap-3 text-slate-600 font-medium">
              <span className="text-slate-500 text-[11px]">
                Showing: <strong className="text-slate-900">{filteredAndSortedLeads.length}</strong> items
              </span>
            </div>
          </div>

          {/* Filter & Sort Controls Panel */}
          <div className="bg-white border-b border-slate-200 p-3 sm:p-4 space-y-3 shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 items-center">
              
              {/* Search Input */}
              <div className="lg:col-span-4 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, phone, notes..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6a00] focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Destination / Package Filter */}
              <div className="lg:col-span-3">
                <div className="relative">
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-[#ff6a00] focus:bg-white text-slate-700 appearance-none font-medium truncate"
                  >
                    <option value="all">📍 All Destinations</option>
                    {uniqueDestinations.map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Source / Lead Type Filter */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <select
                    value={selectedLeadType}
                    onChange={(e) => setSelectedLeadType(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-[#ff6a00] focus:bg-white text-slate-700 appearance-none font-medium"
                  >
                    <option value="all">🏷️ All Types</option>
                    {uniqueLeadTypes.map(t => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Sort Dropdown & Toggle */}
              <div className="lg:col-span-3 flex items-center gap-1.5">
                <div className="relative flex-1">
                  <select
                    value={sortField}
                    onChange={(e) => handleSortChange(e.target.value as SortField)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:ring-2 focus:ring-[#ff6a00] focus:bg-white text-slate-700 appearance-none font-medium"
                  >
                    <option value="date">Sort: Date Submitted</option>
                    <option value="destination">Sort: Destination</option>
                    <option value="status">Sort: Status Priority</option>
                    <option value="amount">Sort: Budget / Amount</option>
                    <option value="name">Sort: Customer Name</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <button
                  onClick={toggleSortDirection}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-700 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                  title={`Sort ${sortDirection === 'asc' ? 'Ascending' : 'Descending'} (Click to toggle)`}
                >
                  {sortDirection === 'desc' ? (
                    <ArrowDown className="w-4 h-4 text-[#ff6a00]" />
                  ) : (
                    <ArrowUp className="w-4 h-4 text-[#ff6a00]" />
                  )}
                </button>
              </div>
            </div>

            {/* Active Filter Indicators & Reset Button */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-1.5 text-slate-500">
                  <span className="font-medium text-slate-400">Active filters:</span>
                  {searchQuery && (
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:text-red-500">×</button>
                    </span>
                  )}
                  {selectedStatus !== 'all' && (
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
                      Status: {selectedStatus}
                      <button onClick={() => setSelectedStatus('all')} className="hover:text-red-500">×</button>
                    </span>
                  )}
                  {selectedDestination !== 'all' && (
                    <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                      Dest: {selectedDestination}
                      <button onClick={() => setSelectedDestination('all')} className="hover:text-red-500">×</button>
                    </span>
                  )}
                  {selectedLeadType !== 'all' && (
                    <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                      Type: {selectedLeadType}
                      <button onClick={() => setSelectedLeadType('all')} className="hover:text-red-500">×</button>
                    </span>
                  )}
                </div>

                <button
                  onClick={resetAllFilters}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>

          {/* Leads List Cards */}
          <div className="p-3 sm:p-4 space-y-3">
            {isLoading && leads.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#ff6a00] mb-3" />
                <p className="font-semibold text-sm">Loading website leads...</p>
              </div>
            ) : filteredAndSortedLeads.length === 0 ? (
              <div className="p-12 text-center text-slate-500 bg-white rounded-xl border border-dashed border-slate-300">
                <Filter className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="font-bold text-base text-slate-700 mb-1">
                  {hasActiveFilters ? 'No leads match the selected filters' : 'No leads recorded yet'}
                </p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-3">
                  {hasActiveFilters 
                    ? 'Try changing the status, destination, or search query to see other leads.'
                    : 'Whenever a user submits an inquiry or booking on the website, their lead will appear here automatically.'}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="px-3.5 py-1.5 bg-[#0B2545] hover:bg-[#133E70] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              filteredAndSortedLeads.map((lead) => {
                const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Namaste ${lead.name || 'Customer'}, thank you for contacting Moksha Gateways regarding ${lead.destinationOrPackage || 'your tour'}!`)}`;
                const currentStatus = lead.status || 'New Lead';
                const isUpdatingThis = updatingLeadId === lead.id;

                return (
                  <div
                    key={lead.id}
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1 min-w-0">
                      
                      {/* Top Tag Row: Lead ID, Source Type, Status, Date */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {lead.id}
                        </span>

                        {/* Lead Type / Source Tag */}
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          lead.leadType === 'Quick QR' 
                            ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                            : lead.leadType === 'Booking'
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                          {lead.leadType || 'Inquiry'}
                        </span>

                        {/* Status Selector Dropdown */}
                        <div className="relative inline-flex items-center">
                          <select
                            value={currentStatus}
                            disabled={isUpdatingThis}
                            onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full border appearance-none pr-5 cursor-pointer focus:outline-none transition-colors ${
                              currentStatus === 'New Lead' 
                                ? 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200'
                                : currentStatus === 'Pending'
                                ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                                : currentStatus === 'Contacted'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                                : currentStatus === 'Converted'
                                ? 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200'
                                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                            }`}
                            title="Click to update lead status"
                          >
                            {STATUS_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-slate-500 absolute right-1.5 pointer-events-none" />
                          {isUpdatingThis && (
                            <RefreshCw className="w-3 h-3 animate-spin text-slate-500 ml-1.5" />
                          )}
                        </div>

                        {/* Date */}
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto">
                          <Clock className="w-3 h-3" />
                          {new Date(lead.submittedAt).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {/* Customer & Destination Row */}
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="text-base font-black text-slate-900">
                          {lead.name || 'Anonymous Visitor'}
                        </h4>
                        {lead.destinationOrPackage && (
                          <span className="text-sm font-bold text-[#ff6a00] flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#ff6a00] shrink-0" />
                            {lead.destinationOrPackage} {lead.duration ? `(${lead.duration})` : ''}
                          </span>
                        )}
                      </div>

                      {/* Contact & Amount Details */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
                        <span className="font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          📞 {lead.phone || 'No phone'}
                        </span>
                        {lead.email && (
                          <span className="text-slate-600">
                            ✉️ {lead.email}
                          </span>
                        )}
                        {lead.budgetOrAmount ? (
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                            <IndianRupee className="w-3 h-3" />
                            {lead.budgetOrAmount.toLocaleString('en-IN')}
                          </span>
                        ) : null}
                        {lead.travelersCount && lead.travelersCount > 1 && (
                          <span className="text-slate-500">
                            👥 {lead.travelersCount} Travelers
                          </span>
                        )}
                        {lead.travelDate && (
                          <span className="text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {lead.travelDate}
                          </span>
                        )}
                      </div>

                      {/* Customer Notes */}
                      {lead.notes && (
                        <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200 mt-1 italic">
                          "{lead.notes}"
                        </p>
                      )}
                    </div>

                    {/* Quick Action Buttons for Admin */}
                    <div className="flex sm:flex-col md:flex-row items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#0B2545] hover:bg-[#133E70] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                          title={`Call ${lead.name || 'Customer'}`}
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
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                          title={`Send WhatsApp to ${lead.name || 'Customer'}`}
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
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">
              Showing {filteredAndSortedLeads.length} of {leads.length} leads
            </span>
            {sortField && (
              <span className="text-slate-400 hidden sm:inline">
                (Sorted by {sortField} {sortDirection === 'desc' ? '▼' : '▲'})
              </span>
            )}
          </div>
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
