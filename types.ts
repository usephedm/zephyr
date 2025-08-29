
export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  bgImageUrl?: string;
}

export interface Service {
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}