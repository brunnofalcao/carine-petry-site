# Site Premium — Next.js + Sanity + Tradução Automática PT/EN

Site premium com:
- **Tradução automática PT → EN** no momento de publicar (via Claude)
- **Painel admin de blog** (Sanity Studio) para você e a equipe subirem posts sem código
- **SEO + GEO** de ponta: sitemap, schema.org (Article + FAQ), meta dinâmica, URLs limpas
- Estética **dark luxury** (preto + dourado, Cormorant Garamond + DM Sans)
- Deploy na **Vercel**

---

## Como funciona (visão geral)

1. Você escreve o post **em português** no painel `/studio`.
2. Ao publicar, uma webhook chama a API da Anthropic e gera a versão em **inglês** automaticamente.
3. O visitante escolhe **PT** ou **EN** pelo seletor no topo. Cada idioma tem sua própria URL indexável.

---

## Passo a passo de instalação (uma vez só)

### 1. Pré-requisitos
- Node.js 18+ instalado
- Conta gratuita no [Sanity](https://sanity.io/manage)
- Chave de API da [Anthropic](https://console.anthropic.com)
- Conta na [Vercel](https://vercel.com) (você já usa)

### 2. Instalar dependências
```bash
npm install
```

### 3. Criar o projeto Sanity
```bash
npx sanity@latest init --env
```
Isso gera seu **Project ID**. Copie-o.

### 4. Configurar variáveis de ambiente
Copie `.env.example` para `.env.local` e preencha:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=  (do passo 3)
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=  (Sanity Manage > API > Tokens > criar token "Editor")
ANTHROPIC_API_KEY=   (console.anthropic.com)
NEXT_PUBLIC_SITE_URL=https://seudominio.com
```

### 5. Rodar localmente
```bash
npm run dev          # site em http://localhost:3000
```
O painel admin fica em `http://localhost:3000/studio` (configure abaixo) ou rode separado:
```bash
npm run sanity       # Sanity Studio
```

### 6. Conectar a webhook de tradução
No [Sanity Manage](https://sanity.io/manage) > seu projeto > **API > Webhooks > Create**:
- **URL:** `https://SEU-DOMINIO.vercel.app/api/translate`
- **Trigger on:** Create, Update
- **Filter:** `_type == "post"`
- **HTTP method:** POST

Pronto — toda vez que publicar um post em PT, o EN é gerado sozinho.

### 7. Deploy na Vercel
```bash
# suba o projeto pro GitHub, depois:
# 1. vercel.com > New Project > importe o repositório
# 2. cole as mesmas variáveis de ambiente do .env.local
# 3. Deploy
```

---

## Quem faz o quê

| Tarefa | Onde | Quem |
|---|---|---|
| Escrever/publicar post | `/studio` | Você + equipe |
| Tradução EN | automática | (sistema) |
| Imagens | upload no Studio (ou Cloudinary) | Você + equipe |
| SEO por post | campos no Studio | Você + equipe |
| Código/design | repositório | Dev |

---

## Estrutura

```
src/
  app/[locale]/          → site (PT na raiz, EN em /en)
    page.tsx             → home
    blog/page.tsx        → lista de posts
    blog/[slug]/page.tsx → post individual + schema SEO/GEO
  app/api/translate/     → webhook de tradução PT→EN
  app/sitemap.ts         → sitemap automático
  components/            → Header (lang switch), Footer
  lib/sanity.ts          → queries do CMS
  messages/              → textos da interface (pt.json, en.json)
sanity/schemas/post.ts   → estrutura do post no painel
sanity.config.ts         → config do painel admin
```

---

## GEO — por que esse site é citado por IA

- **Schema FAQ** em cada post → ChatGPT/Perplexity extraem respostas diretas
- **Author schema** com sua autoridade (Forbes, livros)
- HTML semântico limpo, performance alta
- Conteúdo bilíngue indexável nativamente

Preencha o campo **FAQ** em cada post para maximizar a citação por motores generativos.

---

## ⚠️ Imagens a substituir (placeholders)

Dois pontos usam o logo como placeholder até você ter os assets finais:

1. **Retrato no hero** (`src/app/[locale]/page.tsx`, const `PORTRAIT`)
   → troque pela foto profissional da Dra. Carine (vertical, 3:4).
2. **Logo no rodapé** (`src/components/Footer.tsx`)
   → idealmente a versão negativa do logo (`logo_v4_negativo`) para fundo escuro.

Todas as imagens podem ser hospedadas no Cloudinary (`dlzrfhwin`), já liberado no `next.config.mjs`.

## Identidade aplicada (do brandbook v2.0)

- **Cores:** Borgonha #4A1942 · Magenta #9D174D · Creme #FFF9FB
- **Fontes:** Cormorant Garamond (display) + Inter (corpo)
- **Tom:** investigação + empatia validadora; respeita palavras proibidas do CFM 2.336/2023
- **Estrutura:** Home, Clínica, Mentorias, Palestras, Conteúdo (blog) — PT/EN
- **CTAs:** os três pesos iguais (consulta, mentoria, palestra)
