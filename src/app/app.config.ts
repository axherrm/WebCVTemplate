import { ApplicationConfig } from '@angular/core';
import {IMAGE_LOADER, ImageLoaderConfig} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `${config.src}${config.width}.png`;
      }
    }
  ]
};
