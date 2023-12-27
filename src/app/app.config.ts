import { ApplicationConfig } from '@angular/core';
import {IMAGE_LOADER, ImageLoaderConfig} from "@angular/common";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `${config.src}${config.width}.png`;
      }
    }
  ]
};
