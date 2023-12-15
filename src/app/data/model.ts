export interface EducationItem {
  heading: string;
  subheading: string;
  date: string;
  content: string;
  bulletPoints?: string[];
}

export interface LanguagePack {
  id: string;
  name: string;
  isoAlpha2: string;
  education: string;
  experience: string;
}
