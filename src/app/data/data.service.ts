import {Injectable} from '@angular/core';
import * as educationJson from '../../data/education.json';
import * as languagesJson from '../../data/languages.json';
import * as experienceJson from '../../data/experience.json';
import {EducationItem, ExperienceItem, LanguagePack} from "./model";
import {MenuItem} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  defaultLang: string = languagesJson.defaultLanguage;
  loadedLanguages: string[] = languagesJson.languages;
  languagesMenuItems: MenuItem[] = [];

  lang: string;
  languagePack: LanguagePack;
  education: EducationItem[];
  experience: ExperienceItem[];

  afterLanguageLoad: () => void = () => {};

  constructor() {
    this.determineLanguage();
  }

  loadData(): void {
    console.log("Loading data for lang", this.lang);
    // @ts-ignore
    this.education = educationJson[this.lang];
    // @ts-ignore
    this.languagePack = languagesJson[this.lang];
    // @ts-ignore
    this.experience = experienceJson[this.lang];
    this.fillLanguageButton();
    this.afterLanguageLoad();
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
      const langPack: LanguagePack = languagesJson[lang];
      let flagActive: string = "";
      if (lang === this.lang) {
        flagActive = " flag-active";
      }
      this.languagesMenuItems.push({
        id: langPack.id,
        icon: `fi fis fi-${langPack.isoAlpha2} flag-icon${flagActive}`,
        command: () => this.setLang(lang)
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
