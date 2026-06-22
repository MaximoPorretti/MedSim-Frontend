import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Brain,
  MessagesSquare,
  RefreshCw,
  Stethoscope,
  Users,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Entorno seguro',
    desc: 'Practicá habilidades esenciales en un espacio controlado, sin riesgo para pacientes reales.',
  },
  {
    icon: Brain,
    title: 'Aprendizaje adaptativo',
    desc: 'La inteligencia artificial ajusta cada escenario a tu ritmo y nivel de conocimiento.',
  },
  {
    icon: MessagesSquare,
    title: 'Comunicación efectiva',
    desc: 'Entrená cómo explicar diagnósticos complejos y comunicar noticias difíciles.',
  },
  {
    icon: RefreshCw,
    title: 'Retroalimentación inmediata',
    desc: 'Recibí devoluciones al instante para corregir y mejorar tu desempeño.',
  },
  {
    icon: Stethoscope,
    title: 'Escenarios realistas',
    desc: 'Desde situaciones clínicas frecuentes hasta los casos más complejos y poco habituales.',
  },
  {
    icon: Users,
    title: 'Trabajo en equipo',
    desc: 'Fortalecé la toma de decisiones y la coordinación dentro del equipo de salud.',
  },
];

export function LandingBenefits() {
  return (
    <section id="beneficios" className="bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-black text-[#00a3b0] uppercase tracking-[0.15em]">
            Beneficios
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#002b36] tracking-tighter text-balance">
            Por qué simular antes de la práctica real
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed text-pretty">
            La simulación combina inmersión, realismo y devolución inmediata para
            que estudiantes y profesionales adquieran competencias clave con confianza.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 bg-[#f8fbfc] rounded-3xl border border-slate-100 hover:border-[#00c4cc] hover:shadow-lg hover:shadow-sky-900/5 transition-all"
            >
              <div className="inline-flex p-3 bg-[#003d4c] text-white rounded-2xl">
                <benefit.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-lg font-black text-[#002b36] tracking-tight">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
