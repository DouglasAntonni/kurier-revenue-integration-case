import { isLeadDuplicate, isTestLead } from '../rules/businessRules.js';

export async function loadLeads() {
  try {
    const response = await fetch('./data/leads.json');
    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar leads:', error);
    return [];
  }
}

export function filterValidLeads(leads) {
  return leads.filter(lead => !isLeadDuplicate(lead) && !isTestLead(lead));
}

export function mapLeads(leads) {
  return leads
    .filter(lead => 
      lead.lead_id && 
      lead.contact?.name && 
      lead.contact?.email && 
      lead.status
    )
    .map(lead => ({
      id: lead.lead_id,
      name: lead.contact.name,
      email: lead.contact.email,
      phone: lead.contact?.phone || null,
      source: lead.marketing?.channel || null,
      campaign: lead.marketing?.utm_campaign || null,
      status: lead.status,
      score: lead.metadata?.score || null,
      duplicate: lead.metadata?.duplicate || false,
      test_flag: lead.metadata?.test_flag || false,
      created_at: lead.created_at,
      processed_at: new Date().toISOString()
    }));
}