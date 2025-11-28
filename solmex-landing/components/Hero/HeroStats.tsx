export default function HeroStats() {
  const stats = [
    {
      label: 'Disponibilidad',
      value: '98.7',
      unit: '%',
      trend: 'up',
    },
    {
      label: 'Tiempos promedio de estancia',
      value: '12.4',
      unit: 'h',
      trend: 'down',
    },
    {
      label: 'Incidentes resueltos',
      value: '100',
      unit: '%',
      trend: 'stable',
    },
  ];
  
  return (
    <div className="hero-stats lg:col-span-4 flex items-center justify-center lg:justify-end">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-sm w-full">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-solmex-orange rounded-full animate-pulse" />
          <h3 className="text-white/80 text-sm font-medium uppercase tracking-wider">
            KPIs en Tiempo Real
          </h3>
        </div>
        
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-white/60 text-sm">{stat.label}</span>
                {stat.trend === 'up' && (
                  <svg className="w-4 h-4 text-safety-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {stat.trend === 'down' && (
                  <svg className="w-4 h-4 text-solmex-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {stat.trend === 'stable' && (
                  <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                  </svg>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-lg text-white/60">{stat.unit}</span>
              </div>
              <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${parseFloat(stat.value)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}