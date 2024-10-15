import { createPinia } from 'pinia';
import type { App } from 'vue';

const store = createPinia();

export const configMainStore = (app: App<Element>) => {
  app.use(createPinia());
};

export { store };
