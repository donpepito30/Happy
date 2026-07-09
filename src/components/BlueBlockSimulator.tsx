import { useState } from 'react';
import { SIMULATION_SCENARIOS } from '../data';
import { Eye, ShieldCheck, Sparkles, AlertCircle, Gamepad2, Monitor, Smartphone, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BlueBlockSimulator() {
  const [selectedScenario, setSelectedScenario] = useState(SIMULATION_SCENARIOS[0]);
  const [filterValue, setFilterValue] = useState<number>(85); // Default filter level %

  // Calculate simulated health metrics based on filter percentage
  const blueLightFiltration = filterValue;
  const eyeFatigue = Math.max(8, Math.round(selectedScenario.blueLightLevel * (1 - filterValue / 100)));
  const melatoninPreservation = Math.min(99, Math.round(15 + filterValue * 0.84));

  // Determine health state label
  const getFatigueStatus = (fatigue: number) => {
    if (fatigue > 70) return { label: 'Extremo (Tensión)', color: 'text-red-500 bg-red-500/10' };
    if (fatigue > 40) return { label: 'Moderado (Fatiga)', color: 'text-amber-500 bg-amber-500/10' };
    return { label: 'Protegido (Relajado)', color: 'text-emerald-600 bg-emerald-500/10' };
  };

  const fatigueStatus = getFatigueStatus(eyeFatigue);

  // Scenario icon picker
  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'gaming': return <Gamepad2 className="w-5 h-5" />;
      case 'office': return <Monitor className="w-5 h-5" />;
      case 'scrolling': return <Smartphone className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant shadow-sm max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Control and Stats Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulador Interactivo</span>
            </div>
            <h3 className="font-headline-md text-3xl text-on-surface tracking-tight mb-2">
              Prueba la Diferencia BlueBlock
            </h3>
            <p className="text-sm text-on-surface-variant font-body-md leading-relaxed">
              Usa el control deslizante para simular cómo nuestras lentes bloquean la radiación de espectro azul de alta frecuencia y relajan tus ojos.
            </p>
          </div>

          {/* Scenario Toggles */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              1. Selecciona un Entorno:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {SIMULATION_SCENARIOS.map((scen) => {
                const isActive = selectedScenario.id === scen.id;
                return (
                  <button
                    key={scen.id}
                    onClick={() => setSelectedScenario(scen)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                        : 'bg-surface-container-low border-outline-variant/50 text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-white text-primary'}`}>
                      {getScenarioIcon(scen.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs truncate">{scen.name}</p>
                      <p className={`text-[11px] truncate ${isActive ? 'text-white/80' : 'text-on-surface-variant'}`}>
                        {scen.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider Control */}
          <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/40">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-on-surface-variant flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Gafas Filtro BlueBlock
              </span>
              <span className={`text-xs font-bold ${filterValue > 50 ? 'text-primary' : 'text-stone-500'}`}>
                {filterValue === 0 ? 'Sin Gafas' : `${filterValue}% Protección`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={filterValue}
              onChange={(e) => setFilterValue(Number(e.target.value))}
              className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-on-surface-variant mt-1 font-semibold">
              <span>Filtro Apagado</span>
              <span>Protección Óptima</span>
            </div>
          </div>
        </div>

        {/* Right Visual Simulator Frame */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border-4 border-stone-800 aspect-[16/10] flex flex-col">
            
            {/* Monitor Header Panel */}
            <div className="bg-stone-900 px-4 py-2 border-b border-stone-800 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-[10px] text-stone-500 font-mono tracking-wider">
                SIMULATION_MODE_ONLINE
              </span>
              <div className="w-12 h-1.5 rounded bg-stone-800"></div>
            </div>

            {/* Simulated Screen Body */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-neutral-900 select-none">
              
              {/* Backglow simulator */}
              <div 
                className="absolute inset-0 transition-all duration-300"
                style={{
                  background: filterValue > 10 
                    ? `radial-gradient(circle, rgba(217,119,6,${(100-filterValue)*0.003}) 0%, rgba(0,0,0,0.8) 100%)`
                    : 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0.9) 100%)',
                  boxShadow: filterValue < 40 
                    ? 'inset 0 0 40px rgba(59,130,246,0.25)' 
                    : 'inset 0 0 40px rgba(217,119,6,0.1)'
                }}
              />

              {/* Dynamic screen image / layout */}
              <div className="w-full h-full p-4 flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-white flex items-center gap-1.5 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span>{selectedScenario.name}</span>
                  </div>
                  <div className="bg-black/40 text-[10px] text-yellow-400 px-2 py-1 rounded font-mono border border-yellow-400/20">
                    EMISIÓN AZUL: {selectedScenario.blueLightLevel}%
                  </div>
                </div>

                {/* Scenario Graphic representation */}
                <div className="flex flex-col items-center justify-center my-auto py-2">
                  <span className="text-4xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] mb-2">
                    {selectedScenario.imagePlaceholder}
                  </span>
                  
                  {selectedScenario.id === 'gaming' && (
                    <div className="text-center max-w-xs">
                      <div className="h-2 w-40 bg-red-600/30 rounded-full mx-auto mb-1 overflow-hidden border border-red-500/20">
                        <div className="h-full bg-red-500 w-4/5 animate-pulse"></div>
                      </div>
                      <p className="text-[11px] text-stone-300 uppercase tracking-widest font-mono">Nivel 42 — Boss Fight</p>
                    </div>
                  )}

                  {selectedScenario.id === 'office' && (
                    <div className="w-48 bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col gap-1 text-[8px] font-mono text-left">
                      <div className="h-1.5 w-12 bg-emerald-500/50 rounded"></div>
                      <div className="grid grid-cols-4 gap-1 mt-1">
                        <div className="h-1 bg-white/20 rounded"></div>
                        <div className="h-1 bg-white/20 rounded"></div>
                        <div className="h-1 bg-white/40 rounded"></div>
                        <div className="h-1 bg-white/20 rounded"></div>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        <div className="h-1 bg-white/30 rounded"></div>
                        <div className="h-1 bg-emerald-500/30 rounded"></div>
                        <div className="h-1 bg-white/20 rounded"></div>
                        <div className="h-1 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  )}

                  {selectedScenario.id === 'scrolling' && (
                    <div className="w-32 bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-stone-600"></div>
                        <div className="h-1.5 w-12 bg-white/30 rounded"></div>
                      </div>
                      <div className="h-10 bg-white/10 rounded-lg"></div>
                      <div className="h-1 w-20 bg-white/20 rounded"></div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-[10px] text-stone-400">
                  <span>IPS Panel 144Hz</span>
                  <span>Contraste Dinámico</span>
                </div>
              </div>

              {/* Lens overlay - we apply CSS filters to simulate the BlueBlock lenses */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-300"
                style={{
                  backgroundColor: `rgba(217, 119, 6, ${filterValue * 0.0018})`, // Amber shade
                  backdropFilter: filterValue > 10 ? `contrast(${100 - filterValue * 0.08}%) saturate(${100 - filterValue * 0.1}%)` : 'none',
                  boxShadow: filterValue > 10 
                    ? `inset 0 0 80px rgba(153, 54, 139, ${filterValue * 0.0015})` // Soft magenta/secondary hint to lens coating
                    : 'none'
                }}
              />

              {/* Floating glasses lens indicator if filter is on */}
              {filterValue > 10 && (
                <div className="absolute right-4 top-4 bg-primary/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md z-30">
                  <ShieldCheck className="w-3 h-3" />
                  <span>BlueBlock Activo</span>
                </div>
              )}
            </div>
          </div>

          {/* Biometrics Display */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface-container-low border border-outline-variant/40 p-3.5 rounded-xl text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Luz Azul Filtrada
              </p>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="font-headline-md text-xl md:text-2xl text-primary font-bold">
                  {blueLightFiltration}%
                </span>
              </div>
              <div className="w-full bg-stone-200 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-primary h-full transition-all duration-300" style={{ width: `${blueLightFiltration}%` }} />
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/40 p-3.5 rounded-xl text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Tensión Ocular
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`font-headline-md text-xl md:text-2xl font-bold transition-colors duration-300 ${
                  eyeFatigue > 60 ? 'text-red-500' : eyeFatigue > 25 ? 'text-amber-500' : 'text-emerald-600'
                }`}>
                  {eyeFatigue}%
                </span>
              </div>
              <div className="w-full bg-stone-200 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className={`h-full transition-all duration-300 ${
                  eyeFatigue > 60 ? 'bg-red-500' : eyeFatigue > 25 ? 'bg-amber-500' : 'bg-emerald-600'
                }`} style={{ width: `${eyeFatigue}%` }} />
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant/40 p-3.5 rounded-xl text-center">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                Sueño / Melatonina
              </p>
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="font-headline-md text-xl md:text-2xl text-secondary font-bold">
                  {melatoninPreservation}%
                </span>
              </div>
              <div className="w-full bg-stone-200 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-secondary h-full transition-all duration-300" style={{ width: `${melatoninPreservation}%` }} />
              </div>
            </div>
          </div>

          {/* Education message block */}
          <div className="bg-secondary-container/10 border border-secondary-container/30 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-on-surface font-body-md leading-relaxed">
              <span className="font-bold text-secondary">¿Sabías qué? </span>
              La luz azul de alta energía artificial confunde a tu cerebro haciéndole creer que aún es mediodía. Esto bloquea la producción natural de melatonina e incrementa la fatiga ocular digital. El filtrado de Happy View ayuda a mantener tus ritmos circadianos estables.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
