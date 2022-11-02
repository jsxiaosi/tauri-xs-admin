import type { Options } from 'sortablejs';
import Sortable from 'sortablejs';
import { tryOnMounted } from '@vueuse/core';
import type { Ref } from 'vue';
import { unref } from 'vue';

function useSortable(el: Ref<HTMLElement | null>, options?: Options) {
  tryOnMounted(() => {
    if (!unref(el)) {
      console.error('SortableHooks Unable To Get HTML Element');
      return;
    }
    Sortable.create(unref(el as Ref<HTMLElement>), {
      group: 'name',
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
      ...options,
    });
  });
}

export default useSortable;
