/**
 * Single source of truth for project content.
 *
 * Rendered in two places:
 *   - ProjectsSection  (homepage cards: name, status, category, description, cardImages)
 *   - ProjectDetail    (/projects/:slug: everything else)
 * Adding a project = adding an entry here; nothing else needs changing.
 *
 * Copy style: no em dashes, plain first-person voice.
 */

// Eagerly resolve every processed project image to its hashed build URL.
const files = import.meta.glob('../assets/projects/*.{png,jpg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

/** Resolve by filename; throws at build/dev time if an asset is missing. */
function img(name: string): string {
  const url = files[`../assets/projects/${name}`];
  if (!url) {
    throw new Error(
      `Missing project image "${name}". Available: ${Object.keys(files)
        .map((k) => k.split('/').pop())
        .join(', ')}`
    );
  }
  return url;
}

const phone = (name: string): GalleryImage => ({ src: img(name), kind: 'phone' });
const web = (name: string): GalleryImage => ({ src: img(name), kind: 'web' });


export interface Repo {
  label: string;
  url: string;
}

export interface StackRow {
  layer: string;
  choice: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Highlight {
  title: string;
  body: string;
}

/** 'phone' = tall mobile screenshot, 'web' = desktop/landscape capture. */
export interface GalleryImage {
  src: string;
  kind: 'phone' | 'web';
}

export interface Project {
  slug: string;
  name: string;
  status: string;
  category: string;
  /** Short, for the homepage card. */
  description: string;
  /** Exactly three screenshots for the homepage card, all the same kind. */
  cardImages: [GalleryImage, GalleryImage, GalleryImage];
  overview: string;
  /** Hard numbers, rendered as a mono strip on the detail page. */
  metrics: Metric[];
  stack: StackRow[];
  highlights: Highlight[];
  limitations: string;
  gallery: GalleryImage[];
  tags: string[];
  repos: Repo[];
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'cribnconnect',
    name: 'CribNConnect',
    status: 'In active development',
    category: 'Personal · Founder',
    description:
      'A Nigeria-focused mobile marketplace for apartments, paid events, and social linkups. Every event can spin up its own group chat, backed by host flows, offline ticket scanning, wallets, and realtime chat.',
    cardImages: [
      phone('cribnconnect-host.png'),
      phone('cribnconnect-profile.png'),
      phone('cribnconnect-groups.png'),
    ],
    overview:
      "A Nigeria-focused mobile marketplace for apartments, paid events, and social “linkups,” with full guest and host flows, ticketing, wallets, and chat. It's currently about 48.8k lines across 194 source files, with 542 commits since July 2025, and it talks to roughly 77 API endpoints.",
    metrics: [
      { value: '48.8k', label: 'lines' },
      { value: '194', label: 'files' },
      { value: '542', label: 'commits' },
      { value: '~77', label: 'endpoints' },
    ],
    stack: [
      { layer: 'Framework', choice: 'Expo SDK 57, React Native 0.86, React 19.2' },
      { layer: 'Routing', choice: 'Expo Router, with file-based route groups: (auth), (tabs), (hosting), (screens)' },
      { layer: 'State', choice: 'Zustand with AsyncStorage persistence, plus an Auth context' },
      { layer: 'Auth', choice: 'Firebase Auth. An Axios interceptor attaches the ID token to every request' },
      { layer: 'Realtime', choice: 'Firestore (onSnapshot)' },
      { layer: 'Payments', choice: 'Paystack, through a custom WebView flow' },
      { layer: 'Device APIs', choice: 'expo-camera, expo-location, expo-network, expo-video, haptics, react-native-maps' },
      { layer: 'UI', choice: 'NativeWind (Tailwind), Reanimated, Gesture Handler, Bottom Sheet' },
    ],
    highlights: [
      {
        title: 'Offline-first QR ticket scanner',
        body: 'Door staff can validate tickets with no signal at all. Duplicate detection uses a capped, expiring cache (5,000 tickets, 48-hour FIFO), and offline scans queue up and sync later. It also has a torch toggle, haptics, staff roles, and a scan statistics screen.',
      },
      {
        title: 'Paystack WebView payment flow',
        body: "The stock package's post-payment callback kept hitting a DNS error, so I intercept the navigation and verify the payment server-side instead, with a ref guarding against double verification. It supports USSD, bank transfer, and mobile money.",
      },
      {
        title: 'Realtime Firestore chat across three types',
        body: 'Linkup groups, event chats, and private DMs, with unread tracking, admin promotion and demotion, system messages, and different join flows for public and private groups.',
      },
      {
        title: 'An 880-line persistent hosting wizard',
        body: 'Listing an apartment takes about 10 steps and an event about 8. Drafts sync to the server, expire after 30 days, and re-validate their media when you come back to them.',
      },
      {
        title: 'Heartbeat presence and local-first favorites',
        body: "Presence pings every 3 minutes and pauses when the app is in the background. Favorites update optimistically, cache for 24 hours, and queue any changes until you're back online.",
      },
    ],
    limitations:
      'Offline duplicate detection is per device, so two offline scanners could admit the same ticket. The server reconciles that on sync. Some pieces are still being wired in, including the favorites system.',
    gallery: [
      phone('cribnconnect-welcome.png'),
      phone('cribnconnect-host.png'),
      phone('cribnconnect-event-type.png'),
      phone('cribnconnect-event-details.png'),
      phone('cribnconnect-profile.png'),
      phone('cribnconnect-groups.png'),
      phone('cribnconnect-linkups.png'),
      phone('cribnconnect-scan.png'),
      phone('cribnconnect-events.png'),
    ],
    tags: ['Expo / React Native', 'Firebase Auth', 'Firestore', 'Paystack', 'Zustand'],
    repos: [
      { label: 'Mobile', url: 'https://github.com/Tsunamiisking/cribnconnect-mobile' },
      { label: 'API', url: 'https://github.com/Tsunamiisking/cribnconnect-api' },
    ],
    // liveUrl: not deployed yet, so the Live Project button stays hidden.
  },
  {
    slug: 'trybemarket',
    name: 'TrybeMarket',
    status: 'Live in production',
    category: 'Trybenode · Co-Founder',
    description:
      'A Next.js and Firebase marketplace for Nigerian university students, with paid seller tiers, an app-credit economy, badges, and ranking. Anything worth money is enforced on the server and never trusted from the client.',
    cardImages: [
      phone('trybemarket-m1-products.webp'),
      phone('trybemarket-m2-services.webp'),
      phone('trybemarket-m3-messages.webp'),
    ],
    overview:
      "A campus marketplace with a real payments and trust layer. About 230 source files, 27k lines, 37 API route files, and 444 commits since May 2025. It's in production with live data: 237 users and 75 listings at last count.",
    metrics: [
      { value: '27k', label: 'lines' },
      { value: '230', label: 'files' },
      { value: '444', label: 'commits' },
      { value: '37', label: 'API routes' },
      { value: '237', label: 'users' },
    ],
    stack: [
      { layer: 'Framework', choice: 'Next.js 15 (App Router plus Pages Router API routes), React 18' },
      { layer: 'Data & auth', choice: 'Firebase Auth, Firestore, Firestore Security Rules, Firebase Admin SDK' },
      { layer: 'Payments', choice: 'Paystack: inline popup, server-side verification, and an HMAC-SHA512 webhook' },
      { layer: 'UI', choice: 'Tailwind, shadcn/ui on Radix, Framer Motion, Zustand, react-hook-form with Zod' },
      { layer: 'Services', choice: 'Google Cloud Vision (ID verification for KYC), Resend and Nodemailer for email' },
      { layer: 'Ops', choice: 'Vercel, with 8 scheduled crons, Analytics, and Speed Insights' },
    ],
    highlights: [
      {
        title: 'Server-authoritative trust on a client-writable database',
        body: 'Firestore lets clients write by default, so I audited it for real privilege escalation paths (self-granted boosts, spoofed verification, self-assigned VIP tiers) and closed them with security rules and Admin SDK only writes on every field that touches money.',
      },
      {
        title: 'A credit economy with a reserve → commit → void lifecycle',
        body: 'Credit is reserved in a Firestore transaction before Paystack opens, committed on a verified webhook, and voided on cancel, decline, or timeout. IDs are idempotent, webhooks are HMAC-SHA512 verified, and concurrency tests confirm balances never go negative.',
      },
      {
        title: 'Anti-abuse by design',
        body: 'Credit only counts once both sides confirm a sale. There are daily and weekly caps per pair and per user, and every blocked attempt gets logged instead of silently dropped.',
      },
      {
        title: "Fair ranking that can't be gamed",
        body: "Rank combines tier, VIP status, and a small persisted random tiebreaker, capped so it can never cross a paid-tier line. Only a daily cron rerolls it, so re-saving a listing won't bump it up.",
      },
      {
        title: 'One transaction history from four collections',
        body: 'Four Firestore collections get reconciled into a single row per real purchase, including partial charges that were covered by credit.',
      },
    ],
    limitations:
      "Credit spending is switched off in production on purpose until a live-money Paystack test is done. It's a release decision, not a missing feature. There's no automated test suite yet; so far, verification has been integration scripts run against live Firestore.",
    gallery: [
      web('trybemarket-web-1.png'),
      web('trybemarket-web-2.png'),
      web('trybemarket-web-3.png'),
      web('trybemarket-collage.png'),
      phone('trybemarket-m1-products.webp'),
      phone('trybemarket-m2-services.webp'),
      phone('trybemarket-m3-messages.webp'),
      phone('trybemarket-mobile-1.jpg'),
      phone('trybemarket-mobile-2.jpg'),
      phone('trybemarket-mobile-3.jpg'),
      phone('trybemarket-mobile-4.jpg'),
    ],
    tags: ['Next.js', 'React', 'Firebase', 'Firestore', 'Paystack', 'Tailwind'],
    repos: [
      { label: 'Web', url: 'https://github.com/trybenode/trybemarket-web' },
      { label: 'Admin', url: 'https://github.com/trybenode/trybemarket-admin' },
    ],
    // TODO(allen): it's live in production, so add its public URL here to show
    // the Live Project button. (trybenode.online is the company site, not this.)
  },
  {
    slug: 'network-analyser',
    name: 'Network Analyser',
    status: 'In active development',
    category: 'Personal',
    description:
      'A crowdsourced mobile network quality monitor for Nigeria. Phones measure their own signal and outages, a Node, Mongo, and Redis backend clusters the results geospatially, and a web dashboard shows which carrier actually works where.',
    // NOTE: these source files are only 148x320 and get upscaled here, so they
    // look soft. Re-export at >=750px wide to match the CribNConnect tiles.
    cardImages: [
      phone('network-analyzer-3.png'),
      phone('network-analyzer-1.png'),
      phone('network-analyzer-2.png'),
    ],
    overview:
      "Nigerian carriers publish coverage maps, but that's marketing, not measurement. This system has phones measure their own connection, tag it with a location, and pool the results into a real picture of network quality. It's three apps (mobile, API, and web) in one repo: about 7,500 lines and 129 commits, with a full internal documentation set.",
    metrics: [
      { value: '~7.5k', label: 'lines' },
      { value: '129', label: 'commits' },
      { value: '3', label: 'apps' },
    ],
    stack: [
      { layer: 'Mobile', choice: 'React Native 0.81, Expo SDK 54, expo-router, background task manager, expo-location/cellular/network/battery, react-native-maps' },
      { layer: 'Backend', choice: 'Node.js, Express 5, Mongoose, DBSCAN clustering (density-clustering), ngeohash, Redis' },
      { layer: 'Data', choice: 'MongoDB Atlas with a 2dsphere index, geohash cells, aggregation pipelines, and $geoNear' },
      { layer: 'Web dashboard', choice: 'React 19, Vite, Tailwind CSS, Recharts, React Router' },
    ],
    highlights: [
      {
        title: 'Catches outages other tools miss',
        body: "A failed health-check ping flags a real outage even when the OS still says you're connected, because that's often exactly what a dead zone looks like. Failed samples queue offline and sync later, so none of them get lost.",
      },
      {
        title: 'Real spatial analytics, not pins on a map',
        body: 'DBSCAN clustering with a Haversine metric (radius in metres, not degrees) powers dead-zone detection and per-carrier clusters. A 2dsphere index answers “best carrier near me,” and geohash cells keep heatmap aggregation cheap.',
      },
      {
        title: 'Honest engineering under real platform limits',
        body: "Expo can't read raw signal strength and iOS hides carrier names. So signal is a documented, latency-based proxy used the same way across the whole stack, and placeholder carrier values are left out of rankings instead of showing up as fake data.",
      },
      {
        title: 'Battery-aware data collection',
        body: 'Sampling speeds up after a signal drop, background collection pauses below 15% battery, and users can start a “check this spot” session themselves.',
      },
      {
        title: 'Production-minded backend patterns',
        body: 'Redis caching that degrades gracefully if Redis goes down, plausibility checks on incoming data, and reverse geocoding that runs after the response so it never slows a submission down.',
      },
    ],
    limitations:
      "There's no authentication yet. That's deliberate, to keep crowdsourcing low friction, so trust comes from volume and median aggregation rather than verified users. Signal strength stays a proxy until a native module can read real values. Automated tests aren't in place yet, and clustering has so far been checked against synthetic data.",
    gallery: [
      phone('network-analyzer-3.png'),
      phone('network-analyzer-1.png'),
      phone('network-analyzer-2.png'),
      web('network-analyzer-4.png'),
      web('network-analyzer-5.png'),
    ],
    tags: ['Expo / React Native', 'Node.js', 'Express', 'MongoDB', 'Redis', 'React (dashboard)'],
    // TODO(allen): confirm which repos are current:
    // `network-analyser`, or `ConfamNetwork-Web` + `ConfamNetwork-Mobile`?
    repos: [],
  },
  {
    slug: 'primsett',
    name: 'Primsett',
    status: 'In active development',
    category: 'Personal · Founder',
    description:
      'A booking assistant for Nigerian beauty pros: nail techs, lash techs and makeup artists. It replaces DM back-and-forth with a booking link, takes deposits that go straight to the vendor’s bank, and keeps a memory of every client.',
    cardImages: [
      phone('primsett-booking.png'),
      phone('primsett-today.png'),
      phone('primsett-hours.png'),
    ],
    overview:
      'Most beauty vendors in Nigeria run their business through WhatsApp DMs. Bookings get negotiated by hand, deposits are chased one transfer at a time, and the cancellation policy gets retyped into every chat. Ghost bookings and no-shows are routine, and there is no record of who is reliable. Primsett gives each vendor a booking page that shows only the times they are actually free, and takes the deposit at booking. Paystack splits that deposit and pays it to the vendor’s own bank, so the platform never holds money. Behind it sits a mobile-first dashboard: today’s schedule, client profiles with no-show history, trusted and blocked clients, working hours and days off, rescheduling and refunds, and intake questions per service. Every product decision traces back to interviews with five vendor types, from an informal solo nail tech to a multi-staff salon. The build targets the solo, fixed-location vendor first.',
    metrics: [
      { value: '~12.1k', label: 'lines' },
      { value: '101', label: 'files' },
      { value: '99', label: 'commits' },
      { value: '42', label: 'endpoints' },
      { value: '14', label: 'tables' },
    ],
    stack: [
      { layer: 'Monorepo', choice: 'Turborepo (web, api, worker, shared packages)' },
      { layer: 'Framework', choice: 'Next.js 14 (App Router), TypeScript' },
      { layer: 'Styling', choice: 'Tailwind CSS, Radix primitives' },
      { layer: 'State', choice: 'TanStack Query' },
      { layer: 'API', choice: 'Fastify, with Zod validation' },
      { layer: 'Database', choice: 'PostgreSQL (Supabase), Drizzle ORM' },
      { layer: 'Jobs', choice: 'BullMQ on Redis' },
      { layer: 'Auth', choice: 'Clerk' },
      { layer: 'Payments', choice: 'Paystack split payments, a subaccount per vendor' },
      { layer: 'Messaging', choice: 'WhatsApp Cloud API' },
      { layer: 'Media', choice: 'Cloudinary, with signed direct uploads' },
      { layer: 'Analytics', choice: 'PostHog (server side, plus a lazily loaded browser SDK)' },
    ],
    highlights: [
      {
        title: 'Deposits without escrow',
        body: 'Each vendor gets a Paystack subaccount, and every payment is split as it is made: a flat platform fee to Primsett, the rest straight to the vendor’s bank. The client covers Paystack’s fee on top, and since that fee is tiered and capped, the charge is solved for so the vendor receives the exact deposit.',
      },
      {
        title: 'Race-safe booking and payment',
        body: 'The double-booking check runs inside a transaction that locks the overlapping rows. Payment confirmation can arrive two ways at once, from Paystack’s webhook and from the client returning from checkout, so whichever lands first confirms the booking and the other does nothing. Clients never get two confirmations.',
      },
      {
        title: 'Rescheduling that keeps history',
        body: 'Moving a booking does not edit it. The original is marked rescheduled and linked to its replacement, so the full history survives, the deposit stays attached to the original, and reminders already queued for the old time cancel themselves.',
      },
      {
        title: 'Built for Nigerian networks',
        body: 'Booking went from roughly 5s to 3.4s by running lookups in parallel and sending independent writes together, measured from Lagos against a database in Ireland. The analytics library only loads once the page has shown, which keeps the booking page inside its 100KB first-load JavaScript budget.',
      },
      {
        title: 'Privacy-aware trust',
        body: 'Trusted regulars skip the deposit, and the booking form checks for this as soon as the number is typed. Blocked and unknown numbers get the same answer back, so a block is never revealed. Reputation stats are split by a written rule into what is public and what stays vendor-only.',
      },
    ],
    limitations:
      'Not deployed, and there are no real users yet. WhatsApp confirmations and reminders are built but not live, since they need a business number and Meta template approval. Refunds are recorded rather than processed: the vendor sends the money and logs it, because Paystack appears to fund split-payment refunds from the platform’s own balance. There is no automated test suite, so changes were checked with integration scripts against a development database. Supabase row-level security is not enabled yet, so access control currently lives in the API.',
    gallery: [
      phone('primsett-booking.png'),
      phone('primsett-today.png'),
      phone('primsett-hours.png'),
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Fastify',
      'PostgreSQL',
      'Drizzle',
      'BullMQ',
      'Redis',
      'Paystack',
      'WhatsApp API',
      'PWA',
      'Mobile-first',
    ],
    // TODO(allen): only 8 of 99 commits are pushed. Once the rest are up, add:
    // { label: 'Monorepo', url: 'https://github.com/Tsunamiisking/primsett' }
    repos: [],
  },
];

export const getProject = (slug?: string) =>
  projects.find((p) => p.slug === slug);
