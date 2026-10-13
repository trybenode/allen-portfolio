import { Globe, Smartphone, Rocket, Server, PenTool } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  name: string;
  description: string;
  /** Used by the Skills section's compact "Specialties" cards. */
  Icon: LucideIcon;
}

/**
 * Single source of truth: rendered as the numbered list in ServicesSection and
 * as compact icon cards in the Skills section's "Specialties" tab.
 */
export const services: Service[] = [
  {
    name: 'Full-Stack Web Development',
    description:
      'Production web apps built end to end, usually Next.js and React on Firebase, or my own API on Postgres or MongoDB when the product needs one. From first commit to deployed and hosted.',
    Icon: Globe,
  },
  {
    name: 'Mobile App Development',
    description:
      'Cross-platform mobile apps with React Native and Expo, built for real users and shipped end to end.',
    Icon: Smartphone,
  },
  {
    name: 'Product & MVP Engineering',
    description:
      'Taking an idea from a rough concept to a working product that can grow. That’s how TrybeMarket, TrybeTickets, and CribNConnect got built.',
    Icon: Rocket,
  },
  {
    name: 'API & Backend Systems',
    description:
      'REST APIs, auth, payments, and data pipelines with Node, Express and Fastify, or FastAPI and Django on the Python side. Postgres, SQL and Oracle where a relational database fits, Firestore and MongoDB where it does not. I’ve wired Paystack into two products with proper server-side verification.',
    Icon: Server,
  },
  {
    name: 'UI/UX Design',
    description:
      'Product design in Figma, paired with the engineering to actually build it. Not just mockups.',
    Icon: PenTool,
  },
];
