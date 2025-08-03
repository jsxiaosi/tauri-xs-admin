<script lang="ts"></script>

<script lang="ts" setup>
  import { useIntervalFn } from '@vueuse/core';
  import { onMounted, useTemplateRef } from 'vue';
  import type { Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import type { createEChartsOption } from '@/hooks/web/useECharts';

  const chartRef = useTemplateRef<HTMLDivElement | null>('chart-ref');
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const data: number[] = [];
  for (let i = 0; i < 5; ++i) {
    data.push(Math.round(Math.random() * 200));
  }

  const options: createEChartsOption = {
    xAxis: {
      max: 'dataMax',
    },
    yAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 3, // only the largest 3 bars will be displayed
    },
    grid: {
      left: '1%',
      right: '10%',
      top: '5%',
      bottom: 0,
      containLabel: true,
    },
    series: [
      {
        realtimeSort: true,
        type: 'bar',
        data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true,
        },
        itemStyle: {
          color: '#409eff',
        },
      },
    ],
    legend: {
      show: true,
    },
    animationDuration: 3000,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  };

  onMounted(() => {
    setOptions(options);
    useIntervalFn(
      () => {
        run();
      },
      3000,
      { immediate: true },
    );
  });

  function run() {
    for (let i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000);
      } else {
        data[i] += Math.round(Math.random() * 200);
      }
    }
    setOptions(options, false);
  }
</script>

<template>
  <div>
    <h3>动态柱状图</h3>
    <div ref="chart-ref" class="chart-ref" />
  </div>
</template>

<style scoped lang="scss">
  .chart-ref {
    width: 100%;
    height: 380px;
  }
</style>
