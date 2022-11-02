import type { Ref } from 'vue';
import { nextTick, ref, unref } from 'vue';
import type { EChartsOption } from 'echarts';
import { useDebounceFn, tryOnUnmounted } from '@vueuse/core';
import echarts from '@/utils/plugin/echarts';
import { useEventListener } from '@/hooks/event/useEventListener';

export type createEChartsOption = EChartsOption;

export function useECharts(elRef: Ref<HTMLDivElement>) {
  let chartInstance: echarts.ECharts | null = null;
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let resizeFn: Fn = resize;
  let removeResizeFn: Fn = () => {};
  resizeFn = useDebounceFn(resize, 200);

  // 创建echarts
  function initCharts() {
    // 获取ref demo
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstance = echarts.init(el, 'light');

    // 监听window宽度变化重新渲染echarts
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
  }

  // 配置echarts属性，如果chartInstance为空就创建echarts实例;
  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;
    nextTick(() => {
      // 判断是否创建echarts实例
      if (!chartInstance) {
        initCharts();
        if (!chartInstance) return;
      }

      // 清空当前实例，会移除实例中所有的组件和图表
      clear && chartInstance?.clear();
      chartInstance?.setOption(unref(cacheOptions), true);
    });
  }

  // 改变图表大小
  function resize() {
    chartInstance?.resize();
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  return {
    echarts,
    setOptions,
    resize,
  };
}
