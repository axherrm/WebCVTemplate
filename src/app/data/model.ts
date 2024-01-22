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
  id: string;
  name: string;
  rating: number;
  text: string;
  subSkills?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  /**
   * Maximum of 20 skills is supported.
   */
  skills: Skill[];
}

export interface ILanguagePack {
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
  heading: string;
  subheading: string;
  home: string;
  education: string;
  experience: string;
  skills: string;
  about: string;
}

export class LanguagePack implements ILanguagePack {
  id: string;
  name: string;
  isoAlpha2: string;
  heading: string;
  subheading: string;
  home: string;
  education: string;
  experience: string;
  skills: string;
  about: string;

  sections: Section[];

  constructor(langPack: ILanguagePack) {
    this.id = langPack.id;
    this.name = langPack.name;
    this.isoAlpha2 = langPack.isoAlpha2;
    this.heading = langPack.heading;
    this.subheading = langPack.subheading;
    this.home = langPack.home;
    this.education = langPack.education;
    this.experience = langPack.experience;
    this.skills = langPack.skills;
    this.about = langPack.about;

    this.sections = [
      {name: this.home, id: "home-start", position: 0},
      {name: this.education, id: "education-start", position: 1},
      {name: this.experience, id: "experience-start", position: 2},
      {name: this.skills, id: "skills-start", position: 3},
      {name: this.about, id: "about-start", position: 4},
    ];
  }
}

export interface Section {
  name: string;
  id: string;
  position: number;
}
