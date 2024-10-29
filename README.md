<div align="center"> <a href="https://github.com/jsxiaosi/tauri-xs-admin"><h1>tauri-xs-admin</h1></a>
</div>

**中文** | [English](./README.EN.md)

## 简介

基于[vue-xs-admin](https://github.com/jsxiaosi/vue-xs-admin)开发的 tauri 后台框架模板

## 预览地址

- [github 站点](https://jsxiaosi.github.io/vue-xs-admin/)
- [gitee 站点](https://jsxiaosi.gitee.io/vue-xs-admin)

账号：admin  
密码：admin123

## 文档

- [github 站点](https://jsxiaosi.github.io/vue-xs-admin-docs/)
- [gitee 站点](https://jsxiaosi.gitee.io/vue-xs-admin-docs)

## 简易版

- [min-xs-admin](https://github.com/jsxiaosi/min-xs-admin)

## 完整版

- [vue-xs-admin](https://github.com/jsxiaosi/vue-xs-admin)

## electron 版

- [electron-xs-admin](https://github.com/jsxiaosi/electron-xs-admin)

## 特性

- **最新技术栈**：使用 Vue3/Vite3 等前端前沿技术开发
- **主题**：可配置的主题
- **国际化**：内置完善的国际化方案
- **常用组件**：内置完善的常用组件封装
- **Tauri**：Tauri 编译桌面应用
- **PWA**：内置 PWA

## 准备

- [Node](https://nodejs.org/zh-cn/) 和 [Git](https://git-scm.com/) -项目开发环境
- [Vite](https://cn.vitejs.dev/) - 熟悉 Vite 特性
- [Vue3](https://v3.cn.vuejs.org/) - 熟悉 Vue 基础语法
- [Es6+](https://es6.ruanyifeng.com/) - 熟悉 Es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/zh/) - 熟悉 Vue-Router 基本使用
- [Element-Plus](https://element-plus.gitee.io/#/zh-CN/) - Ui 基本使用

## 安装使用

### 1. 准备

首先您必需要安装 Rust 及其他系统依赖。 [安装 Rust](https://tauri.app/zh/v1/guides/getting-started/prerequisites)

### 2. 获取项目代码（Https or SSH）

```bash
git clone https://github.com/jsxiaosi/tauri-xs-admin.git

git clone git@github.com:jsxiaosi/tauri-xs-admin.git
```

或者通过[`xs-cli`](https://github.com/jsxiaosi/xs-cli)快速创建

```bash
npx @jsxiaosi/xs-cli create [project-name]
```

### 3. 安装依赖

```bash
cd vite-vue3-Template
```

推荐使用`pnpm`

```bash
pnpm i
```

`npm`安装

```bash
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
# 如果下载依赖慢可以使用淘宝镜像源安装依赖
npm install --registry=https://registry.npm.taobao.org

```

### 4. 运行

```bash
npm run tauri dev
```

### 5. 打包应用

```bash
npm run tauri build
```

## 项目地址

- [tauri-xs-admin](https://github.com/jsxiaosi/tauri-xs-admin)

## 如何贡献

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feature/xxxx`
3. 提交你的修改: `git commit -m 'feature: add xxxxx'`
4. 推送您的分支: `git push origin feature/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范

  - `feat` 新增功能
  - `fix` 修复缺陷
  - `docs` 文档变更
  - `style` 代码格式
  - `refactor` 代码重构
  - `perf` 性能优化
  - `test` 添加疏漏测试或已有测试改动
  - `build` 构建流程、外部依赖变更 (如升级 npm 包、修改打包配置等)
  - `ci` 修改 CI 配置、脚本
  - `revert` 回滚 commit
  - `chore` 对构建过程或辅助工具和库的更改 (不影响源文件)
  - `wip` 正在开发中
  - `types` 类型定义文件修改

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 项目中使用的相关仓库

### vite 相关

- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression/) - 资源压缩支持 Gzip or brotli
- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import/) - 动态引入组件库样式
- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons/) - SVG 雪碧图
- [vite-plugin-theme-preprocessor](https://github.com/GitOfZGT/vite-plugin-theme-preprocessor/) - 动态改变主题样式
- [vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/) - PWA

### 规范相关

- [EsLint](https://eslint.org/) - js 语法检测
- [StyleLint](https://stylelint.io/) - 样式语法检测
- [CommitLint](https://commitlint.js.org/#/) - git commit 提交规范检测

## 项目目录结构

```base
.
├── build                         #全局公共配置目录
├── public                        #公共静态文件目录
├── src                           #项目代码目录
│   ├── App.vue                   #主vue模块
│   ├── assets                    #项目静态文件目录
│   ├── components                #公共组件
│   ├── config                    #项目配置
│   ├── enum                      #枚举
│   ├── layouts                   #布局目录
│   ├── locales                   #国际化配置
│   ├── instruct                  #指令
│   ├── main.js                   #入口文件
│   ├── router                    #路由
│   ├── server                    #请求存放目录
│   ├── store                     #vuex
│   ├── styles                    #公共样式
│   ├── utils                     #公共方法
│   └── views                     #存放vue页面目录
├── src-tauri                     #tauri配置
├── LICENSE
├── README.md
├── .editorconfig                 #规范编译器编码样式文件
├── .env.development              #开发环境变量
├── .env.production               #生产环境变量
├── .env.staging                  #测试环境变量
├── .eslintrc.js                  #esLint配置文件
├── .eslintrcignore               #esLint忽略配置文件
├── stylelint.config.js           #styleLint配置文件
├── .stylelintignore              #styleLint忽略配置文件
├── commitlint.config.js          #commitLint配置文件
├── prettier.config.js            #prettier配置文件
├── .prettierignore               #prettier忽略配置文件
├── index.html                    #根模板
├── jsconfig.json
├── package-lock.json
├── package.json
└── vite.config.js                #vite配置文件
```

## 感谢以下作者项目提供帮助

- [vue-vben-admin](https://github.com/anncwb/vue-vben-admin)
- [vue-pure-admin](https://github.com/xiaoxian521/vue-pure-admin)
- [vue-office](https://github.com/501351981/vue-office)

## 维护者

[@jsxiaosi](https://github.com/jsxiaosi)

## License

[MIT © 2022](./LICENSE)
