import { LeadData } from '../types';

export interface SubmitLeadResponse {
  success: boolean;
  leadId?: string;
  emailSent?: boolean;
  emailRecipient?: string;
  message?: string;
  error?: string;
}

export async function submitLead(lead: LeadData): Promise<SubmitLeadResponse> {
  const payload: LeadData = {
    ...lead,
    submittedAt: lead.submittedAt || new Date().toISOString(),
    sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
  };

  // Also save locally as a safety backup
  try {
    const existing = JSON.parse(localStorage.getItem('moksha_client_leads') || '[]');
    existing.unshift({ ...payload, clientRecordedAt: new Date().toISOString() });
    localStorage.setItem('moksha_client_leads', JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not save lead to local storage backup:', err);
  }

  try {
    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error('Failed to submit lead to server:', err);
    return {
      success: false,
      error: err?.message || 'Network error while submitting lead',
    };
  }
}
