import { tryOnUnmounted, useDebounceFn } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { nextTick, ref, unref, watch } from 'vue';
import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';
import { useEventListener } from '@/hooks/event/useEventListener';
import { useAppStoreHook } from '@/store/modules/app';
import echarts from '@/utils/plugin/echarts';

export type createEChartsOption = EChartsOption;

export function useECharts(elRef: Ref<HTMLDivElement>) {
  let chartInstance: echarts.ECharts | null = null;
  const cacheOptions = ref({}) as Ref<EChartsOption>;
  let resizeFn: Fn = resize;
  let removeResizeFn: Fn = () => {};
  resizeFn = useDebounceFn(resize, 200);

  const appStore = useAppStoreHook();

  const { appConfigMode } = storeToRefs(appStore);

  watch(
    () => appStore.appConfigMode.themeMode,
    () => {
      if (chartInstance) {
        chartInstance.dispose();
        initCharts();
        setOptions(unref(cacheOptions), false);
      }
    },
  );

  // 创建echarts
  function initCharts() {
    // 获取ref demo
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstance = echarts.init(el, appConfigMode.value.themeMode);

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
