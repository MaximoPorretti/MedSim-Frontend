import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function LandingFooter() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#002b36] text-white">
      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-[2.5rem] bg-[#003d4c] border border-white/10 px-8 py-12 md:px-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-balance">
              Empezá a practicar en el simulador
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">
              Accedé con tu cuenta institucional y comenzá tu primera sesión de
              simulación clínica.
            </p>
          </div>
          <button
            onClick={() => navigate('/simulador')}
            className="group shrink-0 flex items-center gap-2 px-7 py-4 bg-[#00c4cc] text-[#002b36] font-black rounded-2xl hover:bg-white transition-all"
          >
            Iniciar sesión
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Pie institucional */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-xl p-1.5">
              <img
                src="/unrn-logo.png"
                alt="Universidad Nacional de Río Negro"
                className="h-12 w-auto"
              />
            </div>
            <div className="leading-tight">
              <p className="font-black tracking-tight">Universidad Nacional de Río Negro</p>
              <p className="text-sm text-white/60">
                En colaboración con el Ministerio de Salud de Río Negro
              </p>
            </div>
          </div>
          <p className="text-xs text-white/40 text-center md:text-right">
            Proyecto Federal de Innovación · PFI 2023
            <br />
            Realidad virtual e IA para la formación del equipo de salud
          </p>
        </div>
      </div>
    </footer>
  );
}
