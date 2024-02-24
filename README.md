[//]: # (Design from: https://github.com/Louis3797/awesome-readme-template)
<div align="center">
  <!-- <img src="assets/logo.png" alt="logo" width="200" height="auto" /> -->
  <h1>WebCVTemplate</h1>

  <p>
    Easy to use Open-Source Template for your own self-hosted CV website! See <a href="https://axherrm.github.io/CV/" target="_blank">demo</a>
  </p>

  <!-- Badges -->
  <p>
    <a href="https://github.com/axherrm/WebCVTemplate-core/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/axherrm/WebCVTemplate-core" alt="contributors" />
    </a>
    <a href="">
      <img src="https://img.shields.io/github/last-commit/axherrm/WebCVTemplate-core" alt="last update" />
    </a>
    <a href="https://github.com/axherrm/WebCVTemplate-core/network/members">
      <img src="https://img.shields.io/github/forks/axherrm/WebCVTemplate-core" alt="forks" />
    </a>
    <a href="https://github.com/axherrm/WebCVTemplate/stargazers">
      <img src="https://img.shields.io/github/stars/axherrm/WebCVTemplate" alt="stars" />
    </a>
    <a href="https://github.com/axherrm/WebCVTemplate-core/issues/">
      <img src="https://img.shields.io/github/issues/axherrm/WebCVTemplate-core" alt="open issues" />
    </a>
    <a href="https://github.com/axherrm/WebCVTemplate/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/axherrm/WebCVTemplate.svg" alt="license" />
    </a>
  </p>

  <p>
    This website was designed as a template with the aim of enabling anyone to create their own website quickly and easily. 
    Anyone should be able to create a modern CV website within a few minutes. 
    The code is open source, and I am very happy about further use or contributions! 
    Due to the early planning of this in the design, no code needs to be adapted to use the template. 
    Therefore, not much programming experience is necessary; all data for the website is easily configurable in JSON files. 
    In the future, a simple web tool is planned with which the template can be filled out to make the process even easier. 
    After customizing the template with your own data, it can be easily published via GitHub Pages. 
    The description for all these steps is given below.
  </p>
  <a href="https://axherrm.github.io/CV/" target="_blank">
    <img src="docs/demo.gif" alt="this slowpoke moves" />
  </a>
</div>

## 1. How to use the template

Using this template consists of 4 easy steps:

 1. Click `Use this template` in the top right corner of this page and create your own CV repository
 2. Clone your repo: `git clone git@github.com:username/project.git --recurse-submodules` (note that fetching the submodule is necessary for the project to work locally)
 3. Activate GitHub Pages deployment: Under `Settings` -> `Pages` -> `Build and deployment` set `Source` to `GitHub Actions`
    - As you probably do this after the first run of the continuous deployment workflow has ended, this will probably fail. Just rerun it after you changed this setting.
 4. Fill the template with your own information

### 1.1 Fill the template

All data displayed on the CV is stored in `input/data`  
Use the following steps to insert your own data:

#### `general.json`

This file contains a definition of the languages that can be used in the CV as well as a definition of section headings etc. for each language.
If all languages you want to use are defined you only need to adjust the languages array.

| Field                 | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `languages`           | Array of IDs of all available languages                                                     |
| `defaultLanguage`     | ID of language that should be used when no locale could be determined                       |
| `${IDs of languages}` | Each of the above listed languages needs a `LanguagePack` object like defined in [model.ts] |
 
#### Other JSON files

The other JSON in `input/data/` contain the user specific data.
All languages that are configured in the previous step in `general.json` need an entry in each of these files.
For the definition of the objects to define refer to [model.ts].

#### Assets

Assets are mostly images that are required for the website to work. An overview of the required assets:

| Asset                                 | Description                                                                                                                                                                                                                |
|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `input/assets/avatar/*`               | This folder contains the background image in different resolutions. Providing multiple resolutions can improve performance while sustaining high quality on bigger screens. This must be configured inside background.json |
| `input/assets/chat-avatar/avatar.png` | Low resolution avatar used in the chat box. Aspect ratio should be 1:1.                                                                                                                                                    |
| `input/assets/CV-static.pdf`          | PDF CV which gets used as fallback for noscript devices and mobile devices.                                                                                                                                                |

## 2. Start server in development

```shell
cd core
npm install
npm start         # dev server at http://localhost:4200/ with hot reload
npm run build     # builds application to core/dist/
```

## 3. Project Structure

In order to separate template logic from code this project was divided into 2 parts:
 - This repository: documentation for using the template, scripts for the template, documentation of the whole project
 - [core]: code base the whole project

This separation enables users to more easily update the code after applying the template because using a template repository creates an entire separate Git history.

To update the core, use:
```shell
git submodule update
```

[core]: https://github.com/axherrm/WebCVTemplate-core
[model.ts]: core/src/app/data/model.ts
