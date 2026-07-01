Prompt Refinado — Frontend Next.js Landing Page Copa 2026

Atue como um Frontend Engineer Senior especialista em React, Next.js 15+ (App Router), TypeScript e Tailwind CSS v4.

Sua tarefa é construir o frontend de uma Landing Page premium para uma plataforma de palpites e simulação da Copa do Mundo FIFA 2026, seguindo fielmente o design da imagem de referência image_0.png.

Objetivo

Criar uma landing page moderna, responsiva e visualmente sofisticada, com estética inspirada em plataformas esportivas premium (ex: dashboards esportivos, FIFA portals e betting platforms), priorizando:

Alta qualidade visual
Clean UI
Responsividade perfeita
Componentização reutilizável
Código limpo e escalável
Stack Obrigatória
Next.js 15+ (App Router)
React 19
TypeScript
Tailwind CSS
Lucide React (ícones)
next/image para imagens otimizadas
Regras de Implementação
Arquitetura de Pastas

Utilize estrutura modular:

src/
 ├── app/
 │   ├── layout.tsx
 │   └── page.tsx
 │
 ├── components/
 │   ├── layout/
 │   │   └── Navbar.tsx
 │   ├── hero/
 │   │   ├── HeroSection.tsx
 │   │   ├── HostCountryCard.tsx
 │   │   └── StatsCard.tsx
 │   └── shared/
 │       └── Button.tsx
 │
 └── lib/
Design System
Tema

Dark mode premium.

Backgrounds
Primary background: #060B16
Secondary background: #101826
Card background: rgba(255,255,255,0.05)
Accent Colors
Gold primary: #D4AF37
Gold hover: #E5C158
Yellow accent: #FFC857
Text Colors
Primary text: #FFFFFF
Secondary text: #A0AEC0
Muted text: #718096
Regras Visuais

A interface deve transmitir:

Luxo
Tecnologia
Prestígio esportivo
Profissionalismo

Aplicar:

sombras suaves
glassmorphism leve
bordas translúcidas
blur em cards
gradientes discretos
animações sutis de hover

Exemplo de estilo de card:

backdrop-blur-md
bg-white/5
border border-white/10
rounded-2xl
shadow-xl
Responsividade

Definir breakpoints:

Desktop
1440px+

Hero em 3 colunas.

Tablet
768px–1439px

Hero em 2 colunas.

Mobile
<768px

Layout em coluna única.

Requisitos mobile:

Navbar colapsável
CTA em largura total
Cards empilhados verticalmente
Layout Base

Arquivo:

app/layout.tsx

Responsabilidades:

aplicar fonte global moderna (preferencialmente Inter)
fundo global escuro
centralização do conteúdo
max width de 1440px

Estrutura:

<body className="bg-[#060B16] text-white antialiased">
Navbar

Criar componente:

components/layout/Navbar.tsx

Requisitos:

Altura aproximada:

h-20

Estrutura:

Esquerda

Logo composta por:

ícone esportivo/globo
texto: Portal Copa26

Tipografia:

bold
tracking largo
Centro

Links:

Home
Jogos
Grupos
Equipes
Ranking
Simulador

Desktop:

inline horizontal

Mobile:

menu hambúrguer
Direita

Botão:

ícone globo
texto: FIFA 2026

Estilo:

fundo dourado
texto escuro
rounded full
Hero Section

Criar componente:

components/hero/HeroSection.tsx

Arquivo usado em:

app/page.tsx

Hero ocupa:

min-h-[80vh]

Layout:

grid lg:grid-cols-3 gap-12 items-center
Coluna Esquerda (Texto)
Badge superior

Texto:

COPA DO MUNDO FIFA

Estilo:

uppercase
tracking extra wide
border dourada
rounded full
inline-flex
Headline

Texto:

O Mundo inteiro no seu portal

Regras:

tamanho grande
peso bold
line-height compacto

Destacar a palavra:

portal

com:

gradiente dourado
font extra bold

Exemplo:

bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent
Descrição

Texto:

Acompanhe jogos, estatísticas, grupos, rankings e simulações completas da Copa do Mundo FIFA 2026 em uma única plataforma.

Limite de largura:

max-w-xl

Cor:

texto secundário

CTAs

Dois botões lado a lado.

Primário
ícone Play
texto: Abrir Simulador

Estilo:

fundo dourado
hover animado
sombra dourada
Secundário
transparente
borda branca
texto: Ver Jogos
Coluna Central (Imagem Hero)

Renderizar usando:

next/image

Exibir:

Taça oficial da Copa
fundo com logo “26”

Regras:

centralizada
object-contain
glow suave atrás da taça

Adicionar pseudo efeito:

absolute blur-3xl opacity-30
Coluna Direita (Cards Países Sede)

Criar:

HostCountryCard.tsx

Países:

Estados Unidos
Canadá
México

Cada card contém:

bandeira circular
nome
descrição

Dados:

Estados Unidos

País Sede — 11 estádios

Canadá

País Sede — 2 estádios

México

País Sede — 3 estádios

Estilo:

glassmorphism
padding grande
hover com translateY

Hover:

hover:-translate-y-1 transition-all
Seção de Estatísticas

Criar grid abaixo do hero.

4 cards uniformes.

Cada card contém:

ícone Lucide
número grande
label

Dados:

Número	Label
48	Seleções
12	Grupos
104	Jogos
16	Estádios

Layout:

grid md:grid-cols-2 lg:grid-cols-4 gap-6

Card:

altura fixa
alinhamento central
Seção Próximos Jogos

Abaixo das estatísticas.

Cabeçalho:

Esquerda:

Próximos Jogos

Direita:
Botão/link:

Ver todos
Meta Informações

Badge de data:

Quinta-feira, 11 de Junho de 2026

Badge secundária:

2 JOGOS

Ambos com estilo pill.

Requisitos de Código

Gerar código completo dos arquivos:

app/layout.tsx
app/page.tsx
components/layout/Navbar.tsx
components/hero/HeroSection.tsx
components/hero/HostCountryCard.tsx
components/hero/StatsCard.tsx

Requisitos adicionais:

TypeScript estrito
Props tipadas
Sem uso de any
Sem lógica de backend
Sem hooks desnecessários
Sem state management
Sem handlers onClick
Apenas UI estática
Qualidade Esperada

O resultado deve parecer produção real de empresa grande.

Priorize:

código limpo
separação de responsabilidades
sem duplicação
alta legibilidade
design visual premium

Retorne somente o código dos arquivos completos, com comentários mínimos e sem explicações extras.