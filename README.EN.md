<div align="center">
<a href="https://github.com/jsxiaosi/vue-xs-admin">
<h1>vue-xs-admin</h1>
</a>
</div>

**English** | [中文](./README.md)

## Brief Introduction

The out of the box background template developed based on mainstream technologies such as `Vue3`、`Vite3`、`Element Plus`, built-in `I18n` translation, routing permission control and other solutions can meet the needs of most enterprise management systems!

## Preview address

- [github site](https://jsxiaosi.github.io/vue-xs-admin/)
- [gitee site](http://jsxiaosi.gitee.io/vue-xs-admin)

Account: admin  
Password: admin123

## Document

- [github site](https://jsxiaosi.github.io/vue-xs-admin-docs/)
- [gitee site](https://jsxiaosi.gitee.io/vue-xs-admin-docs)

## Electron Edition

- [electron-xs-admin](https://github.com/jsxiaosi/electron-xs-admin)

## Tauri Edition

- [tauri-xs-admin](https://github.com/jsxiaosi/tauri-xs-admin)

## Characteristic

- **The latest technology stack**: developed using front-end cutting-edge technologies such as Vue3/Vite3

- **Theme**: configurable theme

- **Internationalization**: built-in perfect internationalization scheme

- **Common components**: complete built-in package of common components

- **PWA**: built-in PWA

## Prepare

- [Node](http://nodejs.org/) And [Git](https://git-scm.com/) - Project development environment
- [Vite](https://cn.vitejs.dev/) - Familiar with Vite features
- [Vue3](https://v3.cn.vuejs.org/) - familiar with Vue basic syntax
- [Es6+](http://es6.ruanyifeng.com/) - familiar with the basic syntax of Es6
- [Vue-Router-Next](https://next.router.vuejs.org/zh/) - Familiar with the basic use of Vue Router
- [Element-Plus](https://element-plus.gitee.io/#/zh-CN/) - Ui Basic Usage

## Installation and use

### 1. Get project code (Https or SSH)

```bash
git clone https://github.com/jsxiaosi/vue-xs-admin.git

git clone git@github.com:jsxiaosi/vue-xs-admin.git
```

Alternatively, you can use the [`xs-cli`](https://github.com/jsxiaosi/xs-cli)to quickly create one

```bash
npx @jsxiaosi/xs-cli create [project-name]
```

### 2.Installation Dependencies

```bash
cd vue-xs-admin
```

Recommended`pnpm`

```bash
pnpm i
```

`npm` install

```bash
npm install
```

### 3.Developer

```bash
npm run dev
```

### 4.Production

```bash
npm run build
```

## Project address

- [vue-xs-admin](https://github.com/jsxiaosi/vue-xs-admin)

## How to contribute

**Pull Request:**

1. Fork Code!
2. Create your own branch: `git checkout -b feature/xxxx`
3. Submit your changes: `git commit -m 'feature: add xxxxx'`
4. Push your branch: `git push origin feature/xxxx`
5. Submit: `pull request`

## Git Contribution submission specification

- Refer to [Vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification

  - `feat` New Features
  - `fix` Repair defects
  - `docs` Document change
  - `style` Code format
  - `refactor` Code refactoring
  - `perf` Performance optimization
  - `test` Add neglected tests or changes to existing tests
  - `build` Build processes, external dependency changes (such as upgrading npm packages, modifying packaging configurations, etc.)
  - `ci` Modify CI configuration and scripts
  - `revert` Roll back the commit
  - `chore` Changes to the build process or tools and libraries (do not affect source files)
  - `wip` Under development
  - `types` Type definition file modification

## Browser Support

Chrome 80+ is recommended for local development

Supports modern browsers, not Internet Explorer

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Related warehouses used in the project

### Vite related

- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression/) - Resource compression supports gzip or brotli

- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import/) - Dynamically introduce component library styles

- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons/) - SVG Sprite figure
- [vite-plugin-theme-preprocessor](https://github.com/GitOfZGT/vite-plugin-theme-preprocessor/) - Change the theme style dynamically
- [vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/) - PWA

### Specifications related to

- [EsLint](https://eslint.org/) - js Grammar testing

- [StyleLint](https://stylelint.io/) - Style syntax checking

- [CommitLint](https://commitlint.js.org/#/) - git commit Commits a canonical detection

## Project directory Structure

```base
.
├── build                         #Global public configuration directory
├── public                        #Public static file directory
├── src                           #Project Code Directory
│   ├── App.vue                   #The vue module
│   ├── assets                    #Project static file directory
│   ├── components                #Common components
│   ├── layouts                   #Layout of the directory
│   ├── locales                   #Internationalization Configuration
│   ├── main.js                   #Entrance to the file
│   ├── router                    #Router
│   ├── store                     #Pinia
│   ├── styles                    #Common style
│   ├── utils                     #Public methods
│   └── views                     #Directory for storing vue pages
├── LICENSE
├── README.md
├── .editorconfig                 #The specification compiler encodes style files
├── .env.development              #Development environment variables
├── .env.production               #Production environment variables
├── .env.staging                  #Test environment variables
├── .eslintrc.js                  #EsLint configuration files
├── .eslintrcignore               #EsLint Ignoring configuration files
├── stylelint.config.js           #StyleLint configuration files
├── .stylelintignore              #StyleLint Ignoring configuration files
├── commitlint.config.js          #CommitLint configuration files
├── prettier.config.js            #Prettier configuration files
├── .prettierignore               #Prettier Ignoring configuration files
├── index.html                    #The root template
├── jsconfig.json
├── package-lock.json
├── package.json
└── vite.config.js                #vite configuration files
```

## Thanks to the following author projects for help

- [vue-vben-admin](https://github.com/anncwb/vue-vben-admin)
- [vue-pure-admin](https://github.com/xiaoxian521/vue-pure-admin)
- [vue-office](https://github.com/501351981/vue-office)

## maintainers

[@jsxiaosi](https://github.com/jsxiaosi)

## License

[MIT © 2022](./LICENSE)
