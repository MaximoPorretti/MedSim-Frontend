import { LandingHeader } from '../components/landing/LandingHeader';
import { LandingHero } from '../components/landing/LandingHero';
import { LandingBenefits } from '../components/landing/LandingBenefits';
import { LandingNews } from '../components/landing/LandingNews';
import { LandingFooter } from '../components/landing/LandingFooter';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f0f7f9] text-slate-900 font-sans">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingBenefits />
        <LandingNews />
      </main>
      <LandingFooter />
    </div>
  );
}
