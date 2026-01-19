# 📊 Case Técnico — Integração e Dados (Revenue Ops)

## 📌 Contexto

Este projeto simula um cenário real onde as áreas de **Marketing** e **Comercial** utilizam sistemas distintos para gestão de leads, clientes e vendas, dificultando a construção de uma visão unificada de **Revenue**.

O desafio foi consolidar essas informações, aplicar regras de negócio e disponibilizar dados confiáveis para análise e tomada de decisão.

---

## 🎯 Objetivo da Solução

Criar um ambiente de dados centralizado, capaz de:

- Integrar dados de diferentes fontes  
- Normalizar e consolidar informações  
- Aplicar regras de negócio  
- Disponibilizar dados estruturados para visualização no Power BI  

---

## 🏗️ Arquitetura da Solução

Arquivos JSON (Marketing / CRM)
↓
Camada de Integração (JavaScript)
↓
Supabase (PostgreSQL)
↓
Views Analíticas (SQL)
↓
API REST (Supabase)
↓
Power BI (Dashboard)

A arquitetura foi pensada para **desacoplar a visualização das fontes**, garantindo **governança**, **consistência** e **escalabilidade**.

---

## 🧱 Modelagem de Dados

A modelagem considera três entidades principais:

- **Leads**: dados originados do Marketing  
- **Clientes**: leads convertidos  
- **Vendas**: transações associadas aos clientes  

### Relacionamento

Leads (1) → Clientes (N) → Vendas (N)


Essa estrutura permite análises de **funil**, **conversão** e **receita ao longo do tempo**.

---

## ⚙️ Regras de Negócio Aplicadas

As principais regras de negócio foram aplicadas **no banco de dados**, garantindo consistência antes do consumo no BI:

- Um lead se torna cliente quando possui status **“convertido”**  
- Apenas vendas com status **“fechada”** são consideradas como receita  
- Um cliente pode possuir múltiplas vendas  
- Métricas de conversão e receita são calculadas a partir dessas regras  

---

## 📦 Camada de Integração

A camada intermediária foi desenvolvida em **JavaScript**, sendo responsável por:

- Leitura e tratamento dos arquivos JSON  
- Consolidação dos dados  
- Preparação das informações para persistência no banco  
- Aplicação inicial de validações e normalizações  

---

## 📊 Visualização e Análise (Power BI)

O **Power BI** consome os dados a partir das **APIs REST automáticas do Supabase**, utilizando **views analíticas** como fonte.

O dashboard permite responder perguntas estratégicas como:

- Quantos leads viram clientes?  
- Quanto cada canal de marketing gera de receita?  
- Como a receita evolui mês a mês?  
- Onde estão os gargalos do funil?  

Foram utilizadas **medidas DAX apenas para análises complementares**, como crescimento mensal e percentuais.

---

## 🚀 Possíveis Evoluções

- Integração direta com CRMs reais (ex: RD Station, Salesforce)  
- Atualização incremental dos dados  
- Alertas automáticos de queda de conversão  
- Segmentações mais avançadas por perfil de cliente  

---

## 📎 Materiais Complementares

- Scripts SQL de criação de tabelas e views  
- Arquivo Power BI (.pbix)  
- Screenshots do dashboard  
- Documentação da arquitetura e decisões técnicas  

## 🧠 Decisões Técnicas e Justificativas

As tecnologias e abordagens adotadas neste projeto foram escolhidas com foco em **simplicidade, escalabilidade e aderência a cenários reais de Revenue Operations**.

### JavaScript (Camada de Integração)
O JavaScript foi utilizado na camada de integração por permitir:
- Execução simples e portátil
- Facilidade na manipulação de dados estruturados (JSON)
- Implementação clara das regras de negócio
- Separação de responsabilidades entre extração, transformação e carga

Essa abordagem facilita a manutenção e a evolução do pipeline.

---

### Supabase (PostgreSQL)
O Supabase foi escolhido como camada de persistência por oferecer:
- PostgreSQL gerenciado
- Criação rápida de tabelas, views e índices
- Exposição automática de APIs REST
- Controle de acesso via Row Level Security (RLS)

Isso permite desacoplar completamente o consumo analítico da lógica de ingestão.

---

### Views SQL para Camada Analítica
As métricas principais foram implementadas diretamente no banco através de **views SQL**, garantindo:
- Fonte única de verdade (Single Source of Truth)
- Performance superior em consultas agregadas
- Redução da complexidade no Power BI
- Reutilização dos mesmos dados por diferentes consumidores

Essa decisão segue boas práticas de Data Warehousing.

---

### API REST (Supabase)
A utilização da API REST automática do Supabase permite:
- Integração direta com ferramentas de BI
- Eliminação de conectores proprietários
- Facilidade de autenticação via headers
- Possibilidade de expansão para outros consumidores (front-end, serviços, etc.)

---

### Power BI
O Power BI foi adotado como camada de visualização por:
- Forte capacidade analítica
- Suporte nativo a APIs REST
- Uso de DAX apenas para análises complementares
- Separação clara entre dados, métricas e visualização

A maior parte da lógica permanece no banco, garantindo consistência.

---

### Organização em Camadas
A arquitetura foi estruturada em camadas bem definidas:
- Integração
- Persistência
- Camada analítica
- Visualização

Essa separação facilita manutenção, testes e evolução da solução.


## 🧠 Considerações Finais

O foco da solução foi entregar **dados confiáveis, consistentes e prontos para decisão**, simulando um cenário real de **Revenue Operations**.