'use client';

export const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Crie sua Conta',
      description: 'Registre-se gratuitamente e comece a participar do bolão.',
      icon: '📝',
    },
    {
      number: '2',
      title: 'Faça seus Palpites',
      description: 'Prediga o placar de cada partida da Copa do Mundo 2026.',
      icon: '🎯',
    },
    {
      number: '3',
      title: 'Ganhe Pontos',
      description: 'Acumule pontos ao acertar os resultados das partidas.',
      icon: '⭐',
    },
    {
      number: '4',
      title: 'Suba no Ranking',
      description: 'Compita com amigos e chegue ao topo da tabela de classificação.',
      icon: '🏆',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-neutral-50">
      <div className="container-base">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Quatro passos simples para começar sua jornada no bolão da Copa.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Card */}
              <div className="bg-white rounded-lg p-6 shadow-base border border-neutral-200 h-full flex flex-col">
                {/* Number circle */}
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4 flex-shrink-0">
                  <span className="text-lg font-bold text-primary-600">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4">{step.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-neutral-600 text-sm flex-grow">{step.description}</p>
              </div>

              {/* Connector line (hidden on mobile, shown on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Features section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Sistema de Pontuação',
              description: 'Ganhe pontos pela precisão: 25 pontos por acerto exato, 10 pontos por acerto de resultado.',
            },
            {
              title: 'Ranking em Tempo Real',
              description: 'Acompanhe sua posição no ranking e compare com seus amigos em tempo real.',
            },
            {
              title: 'Estatísticas Detalhadas',
              description: 'Visualize suas estatísticas, precisão e desempenho em cada rodada.',
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-white rounded-lg p-6 border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-2">{feature.title}</h4>
              <p className="text-neutral-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
