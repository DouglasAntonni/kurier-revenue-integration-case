import { isValidSale } from '../rules/businessRules.js';

export async function loadVendas() {
  try {
    const response = await fetch('./data/vendas.json');
    return await response.json();
  } catch (error) {
    console.error('Erro ao carregar vendas:', error);
    return [];
  }
}

export function filterValidVendas(vendas) {
  return vendas.filter(isValidSale);
}

export function mapVendas(vendas) {
  return vendas
    .filter(venda => 
      venda.sale_id && 
      venda.client_id && 
      venda.amount != null && 
      venda.amount > 0 &&
      venda.status &&
      venda.sale_date
    )
    .map(venda => ({
      id: venda.sale_id,
      client_id: venda.client_id,
      amount: venda.amount,
      status: venda.status,
      product: venda.product || null,
      sale_date: venda.sale_date,
      payment_method: venda.payment?.method || null,
      installments: venda.payment?.installments || null,
      discount: venda.extra?.discount || 0,
      notes: venda.extra?.notes || null
    }));
}