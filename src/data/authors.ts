export interface AuthorData {
  key: string;
  slug: string;
  name: string;
  image: string;
  jobTitle: string;
  linkedin: string;
  pageUrl: string;
  tooltipBio: string;
  sameAs: string[];
  organization: {
    name: string;
    url: string;
    logo?: string;
  };
  knowsAbout: string[];
  schemaDescription: string;
}

export const AUTHORS: Record<string, AuthorData> = {
  jesper: {
    key: 'jesper',
    slug: 'jesper-pallesen',
    name: 'Jesper Pallesen',
    image: '/jesper.webp',
    jobTitle: 'Founder & Developer',
    linkedin: 'https://www.linkedin.com/in/jesperpallesen20/',
    pageUrl: '/about-us/jesper-pallesen',
    tooltipBio: 'Developer with a Business & Economics degree. Data analytics enthusiast and passionate stock investor. Founder of calculations.tools. Former professional hockey player.',
    sameAs: [
      'https://www.linkedin.com/in/jesperpallesen20/',
      'https://gamesevenmarketing.com/',
      'https://getdutix.com/',
    ],
    organization: {
      name: 'Calculations.tools',
      url: 'https://calculations.tools',
      logo: 'https://calculations.tools/open-graph.webp',
    },
    knowsAbout: ['SEO', 'Software Development', 'Data Analytics', 'Technical SEO', 'Content Strategy'],
    schemaDescription: 'SEO strategist, software developer, and former professional hockey player. Founder of calculations.tools.',
  },

  nikki: {
    key: 'nikki',
    slug: 'nikki-condit',
    name: 'Nikki Condit',
    image: '/nikki.webp',
    jobTitle: 'M.S. ABA, BCBA',
    linkedin: 'https://www.linkedin.com/in/nikki-condit/',
    pageUrl: '/about-us/nikki-condit',
    tooltipBio: 'Board Certified Behavior Analyst (BCBA) with 10+ years in Applied Behavior Analysis. Co-CEO of LAB Learning and Behavior Institute GmbH, Dusseldorf.',
    sameAs: [
      'https://www.linkedin.com/in/nikki-condit/',
      'https://www.lab-institute.com/',
    ],
    organization: {
      name: 'LAB Learning and Behavior Institute GmbH',
      url: 'https://www.lab-institute.com/',
    },
    knowsAbout: [
      'Applied Behavior Analysis',
      'Autism Spectrum Disorder',
      'ADHD',
      'Behavioral Interventions',
      'Child Development',
      'Special Education',
      'Psychology',
    ],
    schemaDescription: 'Board Certified Behavior Analyst (BCBA, #1-18-29226) and Co-CEO of LAB Learning and Behavior Institute GmbH. 10+ years in ABA with expertise in autism, ADHD, and behavioral interventions.',
  },
};

export const CATEGORY_AUTHORS: Record<string, string> = {
  baking: 'nikki',
};

export function getAuthorForPath(pathname: string): AuthorData {
  const segment = (pathname.split('/')[1] ?? '').toLowerCase();
  const key = CATEGORY_AUTHORS[segment] ?? 'jesper';
  return AUTHORS[key] ?? AUTHORS.jesper;
}
