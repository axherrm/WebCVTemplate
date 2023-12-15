# CV - Axel Herrmann

This is the development project for the Curriculum Vitae of Axel Herrmann.  
See the newest deployed version at https://axherrm.github.io/CV/

## How to fill the template

All data displayed on the CV is stored in [src/data].  
Use the following steps to insert your own data:
> ### 1. [languages.json]
> 
> This file contains a definition of the languages that can be used in the CV as well as a definition of section headings etc. for each language.
> if all languages you want to use are defined you only need to adjust the languages array.
> 
> | Field                 | Description                                                                                 |
> |-----------------------|---------------------------------------------------------------------------------------------|
> | `languages`           | Array of IDs of all available languages                                                     |
> | `defaultLanguage`     | ID of language that should be used when no locale could be determined                       |
> | `${IDs of languages}` | Each of the above listed languages needs a `LanguagePack` object like defined in [model.ts] |
> 
> ### 2. Other JSON files
> 
> The other JSON in [src/data] contain the user specific data.
> All languages that are configured in the previous step in [languages.json] need an entry in each of these files.
> For the definition of the obejcts to define refer to [model.ts].
> 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

[src/data]: src/data
[languages.json]: src/data/languages.json
[model.ts]: src/app/data/model.ts
