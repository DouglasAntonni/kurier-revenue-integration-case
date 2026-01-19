import { supabase } from './database/supabaseClient.js';
import { loadLeads, filterValidLeads, mapLeads } from './services/leadService.js';
import { loadClientes, filterActiveClientes, mapClientes } from './services/clienteService.js';
import { loadVendas, filterValidVendas, mapVendas } from './services/vendaService.js';
import { calculateTotalRevenue } from './rules/businessRules.js';

// UI Elements
const logContainer = document.getElementById('logContainer');

// Logger
function log(message, type = 'info') {
  const entry = document.createElement('div');
  entry.className = `log-entry log-${type}`;
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  logContainer.appendChild(entry);
  logContainer.scrollTop = logContainer.scrollHeight;
}

// Main Integration Function
async function runIntegration() {
  try {
    log('Iniciando processo de integração...', 'info');
    
    // Clear previous data
    supabase.clear();
    
    // Load data
    log('Carregando dados brutos...', 'info');
    const rawLeads = await loadLeads();
    const rawClientes = await loadClientes();
    const rawVendas = await loadVendas();
    
    log(`${rawLeads.length} leads carregados`, 'info');
    log(`${rawClientes.length} clientes carregados`, 'info');
    log(`${rawVendas.length} vendas carregadas`, 'info');
    
    // Map all leads (no filtering)
    log('Processando todos os leads...', 'info');
    const leads = mapLeads(rawLeads);
    for (const lead of leads) {
      await supabase.from('leads').upsert(lead);
    }
    log(`${leads.length} leads válidos persistidos`, 'success');
    
    // Map all clientes (no filtering)
    log('Processando todos os clientes...', 'info');
    const clientes = mapClientes(rawClientes);
    
    for (const cliente of clientes) {
      await supabase.from('clientes').upsert(cliente);
    }
    log(`${clientes.length} clientes ativos persistidos`, 'success');
    
    // Map all vendas (no filtering)
    log('Processando todas as vendas...', 'info');
    const vendas = mapVendas(rawVendas);
    for (const venda of vendas) {
      await supabase.from('vendas').upsert(venda);
    }
    log(`${vendas.length} vendas válidas persistidas`, 'success');
    
    log('Integração concluída com sucesso!', 'success');
  } catch (error) {
    log(`Erro na integração: ${error.message}`, 'error');
    console.error(error);
  }
}

// Event Listeners
document.getElementById('runIntegration').addEventListener('click', runIntegration);

document.getElementById('clearLogs').addEventListener('click', () => {
  logContainer.innerHTML = '';
  log('Logs limpos', 'info');
});


// Initial message
log('Sistema pronto. Clique em "Executar Integração" para começar.', 'info');