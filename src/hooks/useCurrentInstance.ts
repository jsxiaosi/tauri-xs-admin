import { getCurrentInstance } from 'vue';
import type { ComponentInternalInstance } from 'vue';

export function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const globalProperties = appContext.config.globalProperties;
  return {
    ...globalProperties,
  };
}
