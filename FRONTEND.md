Prompt Sugerido
"Atue como um Arquiteto de Software Frontend especializado em React e TypeScript. Preciso que você estruture a base de um projeto de uma aplicação de 'Bolão da Copa do Mundo 2026'.

Objetivos Técnicos:

Arquitetura: Utilize uma estrutura de pastas orientada a módulos (feature-based), alinhada aos princípios de Clean Architecture. Separe claramente a lógica de negócio (services/hooks de estado) da UI (components/presentation).

Componentização: Projete componentes que sigam o princípio de responsabilidade única e sejam altamente reaproveitáveis. Preciso especificamente de:

CardPartida: Exibe dois times, data/hora, status (pendente/finalizado) e um slot para o input de palpite.

InputPlpite: Componente de formulário controlado, com validação de tipos e estados de loading/error.

FormWrapper: Container base para formulários com tratamento de onSubmit e feedback visual.

LayoutShell: Layout base com navbar responsiva e footer.

Funcionalidades da Landing Page:

Hero section com chamada para ação (CTA) para login/cadastro.

Seção de 'Como funciona'.

Preview da rodada atual.

Requisitos Adicionais:

Aplique tipagem estrita com TypeScript para todas as interfaces de dados (Ex: Match, Prediction, User).

Sugira uma estratégia de gerenciamento de estado global (Zustand ou Context API) para evitar prop drilling.

Forneça um exemplo de como estruturar o hooks/usePalpite.ts para encapsular a lógica de envio de palpites para a API.

Utilize Tailwind CSS para estilização e garanta que todos os componentes sejam mobile-first."

Dicas para o seu projeto ("Vendas" e "Palpites")
Como você está mantendo um padrão de arquitetura modular, aqui estão algumas recomendações práticas para aplicar ao seu novo projeto de bolão:

Design de Componentes (Atomic Design): Para os palpites, use componentes atômicos. O InputPalpite deve ser um componente "burro" (dumb component) que apenas recebe o valor e dispara um evento onChange, enquanto o container (que você chamará de "smart component") gerencia o estado da requisição.

Gestão de Estado: Dada a natureza de uma aplicação de palpites (muitas atualizações simultâneas em vários jogos), o uso de React Query (TanStack Query) é altamente recomendado. Ele cuidará do caching dos jogos e da revalidação automática, facilitando muito sua vida em comparação a um gerenciamento manual com useEffect.

Arquitetura de Pastas: Considere algo como:

src/modules/matches/: Contém tudo relacionado a partidas (types, services, hooks, components).

Estrutura de Pastas Sugerida (Feature-Based)
Seguindo o padrão de separar o que é de domínio do que é genérico:

src/
├── app/               # Configuração do app (rotas, providers)
├── components/        # Componentes globais (Shared)
│   ├── ui/            # Botões, inputs, modais (Design System)
│   └── layout/        # Navbar, Footer
├── modules/           # Features da aplicação
│   ├── matches/       # Módulo de partidas
│   │   ├── components/ # CardPartida, ListagemPartidas
│   │   ├── hooks/      # useMatches, usePrediction
│   │   ├── services/   # api.ts (chamadas axios/fetch)
│   │   └── types/      # Interfaces de Partida e Palpite
│   └── auth/          # Módulo de autenticação
└── shared/            # Lógica utilitária, temas, consts

Exemplo de Componente: CardPartida.tsx
Como você busca reaproveitamento, aqui está como você pode estruturar um componente de partida com tipagem forte:

// src/modules/matches/components/CardPartida.tsx
import { InputPalpite } from '@/components/ui/InputPalpite';
import { Partida } from '../types';

interface CardPartidaProps {
  partida: Partida;
  onSavePalpite: (homeScore: number, awayScore: number) => void;
}

export const CardPartida = ({ partida, onSavePalpite }: CardPartidaProps) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <span>{partida.timeCasa.sigla}</span>
        <InputPalpite 
          onChange={(val) => onSavePalpite(val, partida.placarVisitante)} 
        />
        <span>vs</span>
        <InputPalpite 
          onChange={(val) => onSavePalpite(partida.placarCasa, val)} 
        />
        <span>{partida.timeVisitante.sigla}</span>
      </div>
      <span className="text-sm text-gray-500">{partida.dataHora}</span>
    </div>
  );
};

Detalhamento da Estrutura Modular
Para os seus requisitos, aqui estão os pontos chave para a implementação:

Reaproveitamento (InputPalpite):

O InputPalpite não deve saber nada sobre "Copa do Mundo". Ele deve ser um componente controlado que recebe value, onChange e error via props. Isso permite que você o reutilize no seu projeto de Vendas ou em qualquer outro formulário.

Lógica (hooks/usePrediction):

Crie um hook que encapsule o useMutation do TanStack Query.

Exemplo de assinatura: const { mutate, isLoading } = usePrediction(partidaId);

Isso isola a lógica de endpoint do componente UI, mantendo seu código limpo.

Landing Page:

Divida-a em componentes menores: Hero.tsx, About.tsx, e RodadaPreview.tsx.

O RodadaPreview.tsx pode consumir o mesmo hook de listagem de partidas, garantindo que você não repita a lógica de busca de dados.

Estrutura de Pastas Adaptada (Next.js App Router)

src/
├── app/                  # Rotas (Pages/Layouts)
│   ├── (auth)/           # Agrupamento de rotas de login/cadastro
│   ├── (dashboard)/      # Agrupamento da área logada
│   │   └── palpites/     # Página principal do bolão
│   ├── layout.tsx        # Layout raiz
│   └── page.tsx          # Landing Page
├── components/           # Shared UI
│   └── ui/               # Componentes atômicos (Input, Button)
├── modules/              # Features (Domínio)
│   ├── matches/
│   │   ├── components/   # Server/Client components da feature
│   │   ├── hooks/        # Lógica de Client (useMutation, useQuery)
│   │   └── services/     # Server Actions ou funções de fetch
├── lib/                  # Configs (axios, prisma, etc)

Implementação Estratégica: Server Actions vs Client
Como você busca performance e Clean Architecture, o segredo no Next.js é:

Landing Page (app/page.tsx):

Deve ser um Server Component.

Busque os dados das próximas partidas diretamente no banco/API via service e renderize o componente. Isso elimina o estado de loading inicial para o usuário.

Formulários de Palpite (components/ui/InputPalpite.tsx):

Devem ser Client Components (use 'use client').

Utilize Server Actions ("use server") para o envio do palpite. Isso simplifica drasticamente a necessidade de criar endpoints de API (/api/palpites/...), pois você chama a função de backend diretamente do componente.

Exemplo de Server Action para o Palpite
No Next.js, você pode colocar a lógica de "escrita" de dados no arquivo de service da feature:

TypeScript

src/modules/auth/: Lógica de autenticação.

src/shared/: Componentes globais (botões, inputs de texto, modais) que não possuem lógica de domínio.

Performance: Como a Copa do Mundo gera picos de acesso, garanta que suas listagens de jogos utilizem memo e useCallback corretamente para evitar renderizações desnecessárias quando o usuário altera o palpite de um único jogo na lista.

// src/modules/matches/services/palpite-actions.ts
'use server'

export async function salvarPalpite(formData: FormData) {
  const partidaId = formData.get('partidaId');
  const score = formData.get('score');
  
  // Aqui você chama sua camada de caso de uso/prisma
  // await prisma.palpite.create({ ... });
  
  revalidatePath('/palpites'); // Atualiza a página automaticamente após o salvamento
}

Otimização para o seu perfil (Clean Architecture)
Considerando que você gosta de organizar por "Screaming Architecture", recomendo fortemente que cada pasta dentro de modules/ contenha um arquivo index.ts que exporte apenas o que for público. Isso mantém suas dependências encapsuladas:

Evite: import { CardPartida } from '@/modules/matches/components/CardPartida'

Prefira: import { CardPartida } from '@/modules/matches' (onde o index.ts em matches gerencia as exportações).