import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Proyecto', href: '#proyecto' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Noticias', href: '#noticias' },
];

export function LandingHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Marca */}
        <div className="flex items-center gap-3">
          <img
            src="/unrn-logo.png"
            alt="Universidad Nacional de Río Negro"
            className="h-10 w-auto"
          />
          <div className="hidden sm:flex flex-col leading-none border-l border-slate-200 pl-3">
            <span className="text-lg font-black text-[#003d4c] tracking-tighter">MedSim</span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.15em]">
              Simulación clínica
            </span>
          </div>
        </div>

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-[#003d4c] hover:bg-slate-50 rounded-xl transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Acceso */}
        <button
          onClick={() => navigate('/simulador')}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#003d4c] text-white text-sm font-bold rounded-xl hover:bg-[#004d5a] transition-all shadow-lg shadow-sky-900/10"
        >
          <LogIn className="w-4 h-4" />
          Iniciar sesión
        </button>
      </div>
    </header>
  );
}
