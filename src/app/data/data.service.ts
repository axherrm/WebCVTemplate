import {EventEmitter, Injectable} from '@angular/core';
import {
  AboutCard,
  ContactMessages,
  EducationItem,
  ExperienceItem,
  LanguagePack,
  MailSettings,
  Skill,
  SkillCategory, SocialMediaItem
} from "./model";
import {MenuItem} from "primeng/api";
import * as educationJson from '../../data/education.json';
import * as generalJson from '../../data/general.json';
import * as experienceJson from '../../data/experience.json';
import * as skillsJson from '../../data/skills.json';
import * as aboutJson from '../../data/about.json';
import * as contactJson from '../../data/contact.json';

/**
 * Service that imports all the customizable JSON data and stores them.
 * Access user data through this service.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  defaultLang: string = generalJson.defaultLanguage;
  loadedLanguages: string[] = generalJson.languages;
  languagesMenuItems: MenuItem[] = [];
  mailSettings: MailSettings = contactJson["mail-settings"];
  socialMedia: SocialMediaItem[] = contactJson["social-media"];

  /**
   * Language specific data
   */
  lang: string;
  languagePack: LanguagePack;
  education: EducationItem[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  skills: Skill[];
  about: AboutCard[];
  contact: ContactMessages;

  /**
   * Emitted when the user switches language
   */
  langChange: EventEmitter<void> = new EventEmitter<void>(true);

  constructor() {
    this.determineLanguage();
  }

  loadData(): void {
    console.log("Loading data for lang", this.lang);
    // @ts-ignore
    this.languagePack = new LanguagePack(generalJson[this.lang]);
    // @ts-ignore
    this.education = educationJson[this.lang];
    // @ts-ignore
    this.experience = experienceJson[this.lang];
    // @ts-ignore
    this.skillCategories = skillsJson[this.lang];
    this.skills = [];
    for (let skillCategory of this.skillCategories) {
      this.skills = this.skills.concat(skillCategory.skills);
    }
    // @ts-ignore
    this.about = aboutJson[this.lang];
    // @ts-ignore
    this.contact = contactJson[this.lang];
    this.fillLanguageButton();
  }

  determineLanguage(): void {
    let lang = localStorage.getItem("lang");
    if (lang) {
      this.setLang(lang);
      return;
    }
    lang = navigator.language;
    if (lang) {
      lang = lang.trim().split("-")[0];
      if (this.loadedLanguages.includes(lang)) {
        this.setLang(lang);
        return;
      }
    }
    this.setLang(this.defaultLang);
  }

  fillLanguageButton(): void {
    this.languagesMenuItems = [];
    for (const lang of this.loadedLanguages) {
      // @ts-ignore
      const langPack: LanguagePack = generalJson[lang];
      let flagActive: string = "";
      if (lang === this.lang) {
        flagActive = " flag-active";
      }
      this.languagesMenuItems.push({
        id: langPack.id,
        icon: `fi fis fi-${langPack.isoAlpha2} flag-icon${flagActive}`,
        command: () => {
          this.setLang(lang);
          this.langChange.emit();
        }
      })
    }

    // put active language first
    this.languagesMenuItems.sort((a: MenuItem, b: MenuItem): number => {
      if (a.id === this.lang) {
        return -1;
      }
      return 1;
    })
  }

  /**
   * Sets new active language, writes it to local storage and (re-)loads data for language
   * @param newLang
   */
  setLang(newLang: string): void {
    this.lang = newLang;
    localStorage.setItem("lang", this.lang);
    this.loadData();
  }
}
