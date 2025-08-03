import type { DirectiveBinding, VNode } from 'vue';
import { createBase64, createWaterMarkDom } from '@/utils/waterMark';

// 设置水印
export function setWaterMark(el: HTMLElement, binding: string) {
  // 创建 waterMark 父元素
  const waterMark = createWaterMarkDom();
  waterMark.style.background = `url(${createBase64(binding)}) left top repeat`;
  // 将对应图片的父容器作为定位元素
  if (el) {
    if (!el.style.position) {
      el.style.position = 'relative';
    }

    // 将图片元素移动到 waterMark 中
    el.appendChild(waterMark);
  }
}

export default {
  // 在绑定元素的父组件挂载之后调用
  mounted(el: HTMLElement, binding: DirectiveBinding<string>, _vnode: VNode) {
    setWaterMark(el, binding.value);
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated(el: HTMLElement, binding: DirectiveBinding, _vnode: VNode, _prevVNode: VNode) {
    const { oldValue, value } = binding;
    if (oldValue !== value) {
      const waterMarkEl = el.querySelector('.water-mark') as HTMLElement;
      if (waterMarkEl) {
        waterMarkEl.style.background = `url(${createBase64(value)}) left top repeat`;
      }
    }
  },
};
