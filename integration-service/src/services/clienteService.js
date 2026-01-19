import { isActiveClient } from '../rules/businessRules.js';

export async function loadClientes() {
  try {
    const response = await fetch('./data/clientes.json');
    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
    return [];
  }
}

export function filterActiveClientes(clientes) {
  return clientes.filter(isActiveClient);
}

export function mapClientes(clientes) {
  return clientes
    .filter(cliente => 
      cliente.client_id && 
      cliente.name && 
      cliente.email && 
      cliente.status
    )
    .map(cliente => ({
      id: cliente.client_id,
      name: cliente.name,
      email: cliente.email,
      segment: cliente.segment || null,
      status: cliente.status,
      converted_at: cliente.converted_at || null,
      lead_id: cliente.origin?.lead_id || null,
      channel: cliente.origin?.channel || null,
      owner: cliente.owner?.name || null,
      team: cliente.owner?.team || null,
      internal_notes: cliente.internal_notes || null
    }));
}