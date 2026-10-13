import { GraduationCap } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const credentials = [
    {
    name: 'BSc Software Engineering',
    issuer: 'Lead City University, Ibadan',
  },
  { name: 'CS50x', issuer: 'HarvardX / edX' },
  { name: 'Front End Development', issuer: 'freeCodeCamp' },
];

export default function CertificatesSection() {
  return (
    <section
      id="credentials"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-4 pb-16 sm:pb-20 md:pb-24 relative z-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-12 sm:mb-16"
          style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}
        >
          Credentials
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {credentials.map((credential, i) => (
          <FadeIn key={credential.name} delay={i * 0.1} y={30}>
            <div className="flex flex-col items-center text-center gap-3">
              <GraduationCap size={32} className="text-[#D7E2EA]" />
              <h3 className="text-[#D7E2EA] font-medium uppercase leading-tight text-base sm:text-lg">
                {credential.name}
              </h3>
              <p className="text-[#D7E2EA]/60 font-light text-sm">
                {credential.issuer}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
