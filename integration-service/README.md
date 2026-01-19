# 🚀 Integration Service – Revenue Operations (RevOps)

Sistema de integração de dados para **Revenue Operations**, responsável por **extrair, transformar e carregar (ETL)** dados de **Leads, Clientes e Vendas** em um **Data Warehouse no Supabase (PostgreSQL)**, disponibilizando informações confiáveis para **análise em Business Intelligence (Power BI)**.

---

## 📋 Visão Geral

Este projeto implementa um **pipeline de dados desacoplado**, focado em consolidar informações provenientes de diferentes domínios do negócio (Marketing, Comercial e Financeiro), garantindo:

- Padronização dos dados  
- Aplicação consistente de regras de negócio  
- Governança antes do consumo analítico  
- Facilidade de integração com ferramentas de BI  

A solução foi pensada seguindo conceitos de **Revenue Operations**, onde a unificação de dados é essencial para tomada de decisão orientada por métricas.

---

## 🔄 Fluxo de Dados (ETL)

1. **Extração (Extract)**  
   Consumo de dados estruturados representando fontes de Marketing, CRM e Vendas.

2. **Transformação (Transform)**  
   - Normalização de campos  
   - Validação de tipos  
   - Aplicação de regras de negócio  
   - Consolidação entre entidades relacionadas  

3. **Carga (Load)**  
   Persistência dos dados tratados no **Supabase (PostgreSQL)**.

4. **Exposição Analítica**  
   - Criação de **Views SQL analíticas**
   - Exposição via **API REST automática do Supabase**
   - Consumo direto pelo **Power BI**

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem / Core**
  - JavaScript (ES Modules)
  - HTML5

- **Banco de Dados**
  - Supabase (PostgreSQL)

- **Persistência Analítica**
  - Views SQL para métricas e agregações

- **Integração BI**
  - Power BI Desktop
  - Consumo via REST API

---

## 🏗️ Estrutura do Projeto

```text
/
├── index.html               # Interface do Painel de Integração
├── powerbi-integration.md   # Guia de integração com Power BI
├── schema.sql               # Criação das tabelas e views analíticas
├── data/                    # Fontes de dados
│   ├── leads.json           # Dados de Marketing
│   ├── clientes.json        # Dados de Clientes
│   └── vendas.json          # Dados de Vendas
└── src/
    ├── database/
    │   └── supabaseClient.js # Cliente de conexão com Supabase
    ├── rules/
    │   └── businessRules.js  # Regras de negócio centralizadas
    ├── services/
    │   ├── leadService.js    # ETL de Leads
    │   ├── clienteService.js # ETL de Clientes
    │   └── vendaService.js   # ETL de Vendas
    └── index.js              # Orquestrador do pipeline ETL
