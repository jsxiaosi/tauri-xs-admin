<script lang="ts" setup>
  import { onMounted, useTemplateRef } from 'vue';
  import type { EChartsOption } from 'echarts';
  import type { Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';

  const chartRef = useTemplateRef<HTMLDivElement | null>('chart-ref');
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    let data = [
      { name: 'Vue', value: 0 },
      { name: 'React', value: 0 },
      { name: 'Angular', value: 0 },
      { name: 'ECharts', value: 0 },
      { name: 'Wechat', value: 0 },
      { name: 'Element', value: 0 },
      { name: 'Vite', value: 0 },
      { name: 'Node', value: 0 },
      { name: 'Router', value: 0 },
      { name: 'I18n', value: 0 },
      { name: 'VitePress', value: 0 },
      { name: 'Umi', value: 0 },
      { name: 'And Design', value: 0 },
    ];
    data = data.map(i => {
      i.value = Math.random() * 30 + 8;
      return i;
    });

    setOptions({
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'wordCloud',
          //maskImage: maskImage,
          shape: 'alias',
          sizeRange: [15, 60],
          rotationRange: [-90, 90],
          rotationStep: 90,
          gridSize: 8,
          width: '100%',
          height: '100%',
          layoutAnimation: true,
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color() {
              // Random color
              return `rgb(${[
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255),
                Math.round(Math.random() * 255),
              ].join(',')})`;
            },
          },

          emphasis: {
            focus: 'self',
          },
          data,
        },
      ],
    } as EChartsOption);
  });
</script>

<template>
  <div ref="chart-ref" class="chart-ref" />
</template>

<style scoped lang="scss">
  .chart-ref {
    width: 100%;
    height: 410px;
  }
</style>
