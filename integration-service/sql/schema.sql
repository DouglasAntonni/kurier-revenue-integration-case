-- REVENUE OPERATIONS DATABASE SCHEMA
-- Integration Service - Supabase
-- ================================

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS vendas CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;
DROP TABLE IF EXISTS leads CASCADE;

-- ================================
-- LEADS TABLE
-- ================================
CREATE TABLE leads (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100),
  campaign VARCHAR(100),
  status VARCHAR(50),
  score INTEGER,
  duplicate BOOLEAN DEFAULT FALSE,
  test_flag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP,
  processed_at TIMESTAMP
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at);

-- ================================
-- CLIENTES TABLE
-- ================================
CREATE TABLE clientes (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  segment VARCHAR(100),
  status VARCHAR(50),
  converted_at DATE,
  lead_id VARCHAR(50),
  channel VARCHAR(100),
  owner VARCHAR(255),
  team VARCHAR(100),
  internal_notes TEXT,
  
  CONSTRAINT fk_lead FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL
);

CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_clientes_status ON clientes(status);
CREATE INDEX idx_clientes_segment ON clientes(segment);
CREATE INDEX idx_clientes_lead_id ON clientes(lead_id);
CREATE INDEX idx_clientes_converted_at ON clientes(converted_at);

-- ================================
-- VENDAS TABLE
-- ================================
CREATE TABLE vendas (
  id VARCHAR(50) PRIMARY KEY,
  client_id VARCHAR(50),
  amount DECIMAL(12,2),
  status VARCHAR(50),
  product VARCHAR(255),
  sale_date DATE,
  payment_method VARCHAR(50),
  installments INTEGER,
  discount DECIMAL(5,2) DEFAULT 0,
  notes TEXT,
  
  CONSTRAINT fk_cliente FOREIGN KEY (client_id) REFERENCES clientes(id) ON DELETE RESTRICT
);

CREATE INDEX idx_vendas_client_id ON vendas(client_id);
CREATE INDEX idx_vendas_status ON vendas(status);
CREATE INDEX idx_vendas_sale_date ON vendas(sale_date);
CREATE INDEX idx_vendas_product ON vendas(product);

-- ================================
-- ROW LEVEL SECURITY (OPTIONAL)
-- ================================

-- Enable RLS on tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Enable read access for all users" ON leads FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON leads FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON clientes FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON clientes FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON clientes FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON vendas FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON vendas FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON vendas FOR UPDATE USING (true);

-- ================================

-- Total revenue
-- SELECT SUM(amount) as receita_total FROM vendas WHERE status = 'fechada';

-- Top performing channels
-- SELECT * FROM receita_por_canal LIMIT 5;

-- Revenue by product
-- SELECT * FROM receita_por_produto;

-- Conversion funnel
-- SELECT * FROM funil_conversao;

-- Sales by month
-- SELECT 
--   DATE_TRUNC('month', sale_date) as mes,
--   COUNT(*) as total_vendas,
--   SUM(amount) as receita
-- FROM vendas
-- WHERE status = 'fechada'
-- GROUP BY mes
-- ORDER BY mes DESC;
