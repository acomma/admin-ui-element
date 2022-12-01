# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## 构建过程

使用 `pnpm create vite` 初始化项目，分别选择 `Vue` 和 `TypeScript` 选项。使用 `pnpm` 管理依赖包，使用 `Element Plus` 组件库，使用 `Vue Router` 管理路由，使用 `Pinia` 管理状态，使用 `Tailwind CSS` 处理样式，使用 `Axios` 处理网络请求。

Icon 来源 [https://www.iconfinder.com/icons/3316547/animal_duck_ducks_pato_icon](https://www.iconfinder.com/icons/3316547/animal_duck_ducks_pato_icon)。
