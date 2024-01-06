export interface TimelineItem {
  heading: string;
  subheading: string;
  date: string;
  content: string;
  bulletPoints?: string[];
}

export interface EducationItem extends TimelineItem {

}

export interface ExperienceItem extends TimelineItem {
  skills?: Skill[];
}

export interface Skill {

}

export interface LanguagePack {
  /**
   * This is the identifier which is used in the languages array and for definition of the object.
   */
  id: string;
  name: string;
  /**
   * This is required for usage of <a href="https://github.com/lipis/flag-icons#usage">flag-icons library</a>.
   * Use <a href="https://www.iso.org/obp/ui/#search/code/">ISO 3166-1-alpha-2 code</a> of the desired flag.
   */
  isoAlpha2: string;
  education: string;
  experience: string;
  skills: string;
}
