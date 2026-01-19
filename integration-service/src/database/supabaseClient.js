import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL = 'https://jdjvxtyfcqlqadptbfpr.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkanZ4dHlmY3FscWFkcHRiZnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2OTcxOTcsImV4cCI6MjA3NjI3MzE5N30.HkQOCFAkQNxqpqEKc7Y8H_dXmUUMbY3WiApFZM4gzYs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Keep mock-like interface for development preview
const mockStorage = {
  leads: [],
  clientes: [],
  vendas: []
};

// Helper methods for local preview
supabase.getStorage = () => mockStorage;

supabase.clear = () => {
  mockStorage.leads = [];
  mockStorage.clientes = [];
  mockStorage.vendas = [];
};

// Override from to add local storage sync
const originalFrom = supabase.from.bind(supabase);
supabase.from = (table) => {
  const tableClient = originalFrom(table);
  const originalUpsert = tableClient.upsert.bind(tableClient);
  
  tableClient.upsert = async (data) => {
    // Update local storage for preview
    if (mockStorage[table]) {
      const index = mockStorage[table].findIndex(item => item.id === data.id);
      if (index >= 0) {
        mockStorage[table][index] = data;
      } else {
        mockStorage[table].push(data);
      }
    }
    
    // Call real Supabase
    return await originalUpsert(data);
  };
  
  return tableClient;
};