export interface Role {
  company: string;
  title: string;
  period: string;
  /** e.g. Internship, Full-time. Shown as quiet metadata. */
  employment?: string;
  location?: string;
  summary: string;
  tools: string[];
}

export const experience: Role[] = [
  {
    company: 'Stardelite LTD',
    title: 'Mobile Developer',
    period: 'Mar 2025 to Sep 2025',
    employment: 'Internship',
    location: 'Remote · Lagos, Nigeria',
    summary:
      'Built and shipped mobile app screens in React Native and Expo, working against the team API and collaborating day to day with designers and backend engineers.',
    tools: ['React Native', 'Expo', 'JavaScript', 'Postman', 'Slack'],
  },
];
