<script lang="ts" setup>
  import { onMounted, useTemplateRef } from 'vue';
  import type { Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';

  const chartRef = useTemplateRef<HTMLDivElement | null>('chart-ref');
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      grid: {
        left: '0%',
        right: '2%',
        bottom: '0%',
        top: '2%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
          splitLine: {
            show: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
          },
          splitArea: {
            show: true,
          },
        },
      ],
      series: [
        {
          name: '任务',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          smooth: true,
          emphasis: {
            focus: 'series',
          },

          data: [50, 134, 191, 280, 90, 30, 10],
        },
        {
          name: '事项',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          smooth: true,
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '目标任务',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          smooth: true,
          emphasis: {
            focus: 'series',
          },

          data: [150, 154, 201, 299, 190, 330, 410],
        },
      ],
    });
  });
</script>

<template>
  <div ref="chart-ref" class="chart-ref" />
</template>

<style scoped lang="scss">
  .chart-ref {
    width: 100%;
    height: 362px;
  }
</style>
