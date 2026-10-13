import HeroSection from '../sections/HeroSection';
import TerminalSection from '../sections/TerminalSection';
import AboutSection from '../sections/AboutSection';
import ServicesSection from '../sections/ServicesSection';
import ProjectsSection from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection';
import CertificatesSection from '../sections/CertificatesSection';
import Footer from '../sections/Footer';

/** The single-page portfolio, unchanged — now served at "/". */
export default function Home() {
  return (
    <>
      <HeroSection />
      <TerminalSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <CertificatesSection />
      <Footer />
    </>
  );
}
