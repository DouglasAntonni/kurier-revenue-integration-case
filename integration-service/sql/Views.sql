
-- VIEWS FOR ANALYTICS
-- ================================

-- Revenue by source channel (canal)
CREATE OR REPLACE VIEW revenue_by_source AS
SELECT 
  COALESCE(l.source, 'Sem Canal') as canal,
  COUNT(DISTINCT v.id) as total_vendas,
  SUM(v.amount) as receita_total,
  AVG(v.amount) as ticket_medio,
  COUNT(DISTINCT c.id) as total_clientes
FROM vendas v
LEFT JOIN clientes c ON c.id = v.client_id
LEFT JOIN leads l ON l.id = c.lead_id
WHERE v.status = 'fechada'
GROUP BY l.source
ORDER BY receita_total DESC;

-- Revenue by campaign
CREATE OR REPLACE VIEW revenue_by_campaign AS
SELECT 
  COALESCE(l.campaign, 'Sem Campanha') as campaign,
  COUNT(DISTINCT v.id) as total_vendas,
  SUM(v.amount) as receita_total,
  AVG(v.amount) as ticket_medio
FROM vendas v
LEFT JOIN clientes c ON c.id = v.client_id
LEFT JOIN leads l ON l.id = c.lead_id
WHERE v.status = 'fechada'
GROUP BY l.campaign
ORDER BY receita_total DESC;

-- Revenue by segment
CREATE OR REPLACE VIEW revenue_by_segment AS
SELECT 
  COALESCE(c.segment, 'Sem Segmento') as segment,
  COUNT(DISTINCT v.id) as total_vendas,
  SUM(v.amount) as receita_total,
  AVG(v.amount) as ticket_medio
FROM vendas v
LEFT JOIN clientes c ON c.id = v.client_id
WHERE v.status = 'fechada'
GROUP BY c.segment
ORDER BY receita_total DESC;

-- Revenue by product
CREATE OR REPLACE VIEW revenue_by_product AS
SELECT 
  product,
  COUNT(*) as total_vendas,
  SUM(amount) as receita_total,
  AVG(amount) as ticket_medio
FROM vendas
WHERE status = 'fechada'
GROUP BY product
ORDER BY receita_total DESC;

-- Funnel conversion
CREATE OR REPLACE VIEW funnel_conversion AS
SELECT 
  COUNT(DISTINCT l.id) as total_leads,
  COUNT(DISTINCT c.id) as total_clientes,
  COUNT(DISTINCT v.id) as total_vendas,
  ROUND(COUNT(DISTINCT c.id)::NUMERIC / NULLIF(COUNT(DISTINCT l.id), 0) * 100, 2) as taxa_conversao_leads,
  ROUND(COUNT(DISTINCT v.id)::NUMERIC / NULLIF(COUNT(DISTINCT c.id), 0) * 100, 2) as taxa_conversao_vendas
FROM leads l
LEFT JOIN clientes c ON l.id = c.lead_id
LEFT JOIN vendas v ON c.id = v.client_id;

-- Monthly revenue
CREATE OR REPLACE VIEW revenue_by_month AS
SELECT 
  date_trunc('month', sale_date) as mes,
  SUM(amount) as receita,
  COUNT(*) as total_vendas,
  AVG(amount) as ticket_medio
FROM vendas
WHERE status = 'fechada'
GROUP BY mes
ORDER BY mes;
