import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {IMAGE_LOADER, ImageLoaderConfig} from "@angular/common";
import {provideRouter} from "@angular/router";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `${config.src}${config.width}.png`;
      }
    },
    provideAnimations(),
    provideRouter([])
  ]
};
