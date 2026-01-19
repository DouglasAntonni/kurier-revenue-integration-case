/**
 * Regras de Negócio Centralizadas
 * Revenue Operations Integration Service
 */

export function isActiveClient(cliente) {
  return cliente.status === 'ativo';
}

export function isValidSale(venda) {
  return venda.status === 'fechada' && venda.amount > 0;
}

export function isLeadConverted(lead) {
  return lead.status === 'convertido';
}

export function isLeadDuplicate(lead) {
  return lead.metadata?.duplicate === true;
}

export function isTestLead(lead) {
  return lead.metadata?.test_flag === true;
}

export function calculateTotalRevenue(vendas) {
  return vendas
    .filter(isValidSale)
    .reduce((total, venda) => total + venda.amount, 0);
}