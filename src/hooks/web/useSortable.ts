import { tryOnMounted } from '@vueuse/core';
import Sortable from 'sortablejs';
import { isRef, ref, unref } from 'vue';
import type { Options } from 'sortablejs';
import type { Ref } from 'vue';

/**
 *
 * @param options sortableJs配置项
 * @param elRef Ref<HTMLElement | null>
 * @returns
 *   - initSortable(el: Ref<HTMLElement | null> | (HTMLElement | null)): 初始化排序功能。
 *   - destroy: 销毁排序实例，并完全删除可排序功能。
 *   - sortableJs: SortableJS 实例。
 */

function useSortable(options?: Options, elRef?: Ref<HTMLElement | null>) {
  const sortableJs = ref<Sortable | null>(null);

  const createSortable = (el: HTMLElement) => {
    sortableJs.value = new Sortable(el, {
      animation: 300,
      delay: 400,
      delayOnTouchOnly: true,
      ...options,
    });
  };

  const initSortable = (el: Ref<HTMLElement | null> | (HTMLElement | null)) => {
    if (sortableJs.value) return;

    let element: HTMLElement | null;
    if (isRef(el)) {
      element = unref(el);
    } else {
      element = el;
    }

    if (element) createSortable(element);
  };

  tryOnMounted(() => {
    if (elRef) initSortable(elRef);
  });

  const destroy = () => {
    sortableJs.value?.destroy();
    sortableJs.value = null;
  };

  return { initSortable, destroy, sortableJs };
}

export default useSortable;
