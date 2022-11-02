import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

export const configMainStore = (app: App<Element>) => {
  app.use(createPinia());
};

export { store };
