import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const NEWS = [
  {
    tag: 'Desarrollo',
    date: 'Mar 2024',
    title: 'Disponible la versión alpha del simulador',
    desc: 'Comenzó la etapa de testeo de los primeros escenarios clínicos inmersivos con foco en habilidades de comunicación.',
  },
  {
    tag: 'Piloto',
    date: 'Abr 2024',
    title: 'Prueba piloto en Medicina y Kinesiología',
    desc: 'Las carreras de la UNRN participan del piloto para ajustar las herramientas y recoger retroalimentación profesional.',
  },
  {
    tag: 'Capacitación',
    date: 'May 2024',
    title: 'Capacitaciones por zonas de Río Negro',
    desc: 'Se planifican instancias presenciales en las zonas andina, valle y costa junto a hospitales cabecera y residencias.',
  },
];

export function LandingNews() {
  return (
    <section id="noticias" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <span className="text-xs font-black text-[#00a3b0] uppercase tracking-[0.15em]">
            Novedades
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-[#002b36] tracking-tighter text-balance">
            Noticias y actualizaciones
          </h2>
        </div>
        <p className="text-sm text-slate-400 font-medium max-w-sm">
          Seguí el avance del proyecto a lo largo de sus etapas de desarrollo,
          pruebas y transferencia al sistema de salud.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {NEWS.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group flex flex-col p-6 bg-white rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-sky-900/5 transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-[#e2eff2] text-[#004d5a] rounded-full text-[10px] font-black uppercase tracking-wide">
                {item.tag}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{item.date}</span>
            </div>
            <h3 className="text-lg font-black text-[#002b36] tracking-tight leading-snug">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">{item.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#00a3b0] group-hover:gap-2 transition-all">
              Leer más
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
