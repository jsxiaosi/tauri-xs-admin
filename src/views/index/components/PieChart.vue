<script lang="ts"></script>

<script lang="ts" setup>
  import type { Ref } from 'vue';
  import { onMounted, ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    setOptions({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        // top: '5%',
        bottom: '1%',
        left: 'center',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 20, name: 'React' },
            { value: 70, name: 'Vue' },
            { value: 10, name: 'Angular' },
          ],
        },
      ],
    });
  });
</script>

<template>
  <div ref="chartRef" class="chart-ref"></div>
</template>

<style scoped lang="scss">
  .chart-ref {
    width: 100%;
    height: 362px;
  }
</style>
