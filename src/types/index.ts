export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string; // icon name identifier
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  layout: "2col" | "4col";
  services: ServiceItem[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  variant: "filled" | "outlined";
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  initials: string;
  name: string;
  company: string;
  quote: string;
}

export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
