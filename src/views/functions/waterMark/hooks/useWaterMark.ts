import type { Ref } from 'vue';
import { onBeforeUnmount, shallowRef, ref, unref } from 'vue';
import type { WaterMarkOptions } from '@/utils/waterMark';
import { createBase64, createWaterMarkDom } from '@/utils/waterMark';

export const useWaterMark = (
  appendEl: Ref<HTMLElement | undefined> = ref(document.body) as Ref<HTMLElement>,
  options?: WaterMarkOptions,
) => {
  const watermarkEl = shallowRef<HTMLElement>();

  const updateWatermark = (text: string) => {
    const el = unref(watermarkEl);
    if (!el) return;
    el.style.background = `url(${createBase64(text, options)}) left top repeat`;
  };

  const createWatermark = (text: string) => {
    if (unref(watermarkEl)) {
      updateWatermark(text);
      return;
    }

    // 创建 waterMark 父元素
    const waterMark = createWaterMarkDom();
    watermarkEl.value = waterMark;
    const el = unref(appendEl);
    if (!el) return;
    updateWatermark(text);
    el.style.position = 'relative';
    el.appendChild(waterMark);
  };

  const setWaterMark = (text: string) => {
    createWatermark(text);
  };

  onBeforeUnmount(() => {
    close();
  });

  const close = () => {
    const el = unref(appendEl);
    if (!el) return;
    const waterMark = unref(watermarkEl);
    if (!waterMark) return;
    watermarkEl.value = undefined;
    el.removeChild(waterMark);
  };

  return { setWaterMark, close };
};
