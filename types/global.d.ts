// /// <reference types="vue/macros-global" />
// declare module '*.vue' {
//   import { DefineComponent } from 'vue';
//   const Component: DefineComponent<{}, {}, any>;
//   export default Component;
// }

declare type RefType<T> = T | null;

declare type Recordable<T = any> = Record<string, T>;

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
