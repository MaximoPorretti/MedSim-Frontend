import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Headset } from 'lucide-react';

export function LandingHero() {
  const navigate = useNavigate();

  return (
    <section id="proyecto" className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#e2eff2] text-[#004d5a] rounded-full text-xs font-bold uppercase tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Realidad Virtual + Inteligencia Artificial
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#002b36] tracking-tighter leading-[1.05] text-balance">
            Entrená habilidades clínicas en un entorno{' '}
            <span className="text-[#00a3b0]">seguro y realista</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed text-pretty max-w-xl">
            MedSim es un sistema de simulación para la enseñanza y el aprendizaje
            de habilidades profesionales del equipo de salud. Practicá la comunicación
            con pacientes, la toma de decisiones y el trabajo en equipo con
            retroalimentación inmediata impulsada por IA.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/simulador')}
              className="group flex items-center gap-2 px-6 py-3.5 bg-[#003d4c] text-white font-bold rounded-2xl hover:bg-[#004d5a] transition-all shadow-xl shadow-sky-900/15"
            >
              Acceder al simulador
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#beneficios"
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#003d4c] font-bold rounded-2xl border border-slate-200 hover:border-[#00c4cc] transition-all"
            >
              Conocer más
            </a>
          </div>

          <p className="mt-6 text-sm text-slate-400 font-medium">
            Un proyecto de la Universidad Nacional de Río Negro junto al Ministerio de Salud de Río Negro.
          </p>
        </motion.div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl shadow-sky-900/10">
            <img
              src="/hero-simulacion.png"
              alt="Profesional de la salud usando un visor de realidad virtual en una simulación clínica"
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-slate-100 px-5 py-4 flex items-center gap-3">
            <div className="p-2.5 bg-[#e2eff2] rounded-xl text-[#004d5a]">
              <Headset className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-black text-[#002b36]">Inmersión total</p>
              <p className="text-xs text-slate-400 font-medium">Escenarios clínicos reales</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
