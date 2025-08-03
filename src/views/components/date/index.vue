<script lang="tsx" setup>
  import { onMounted, ref } from 'vue';
  import type { DateCell } from 'element-plus/lib/components/date-picker/src/date-picker.type';
  import calendar from '@/utils/date/calendar/index.js';

  defineOptions({
    name: 'RtDate',
  });

  onMounted(() => {
    console.log('缓存');
  });

  const value = ref<string>();

  const disabledDate = (time: Date) => {
    return time.getTime() < Date.now();
  };

  const DateItem = (v: DateCell) => {
    console.log(v);
    const { date } = v;
    const year = date?.getFullYear();
    const month = (date?.getMonth() as number) + 1;
    const day = date?.getDate();
    const day1 = calendar.solar2lunar(year, month, day);
    let color = '';
    if (day1.festival) color = '#f5222d';
    if (day1.Term) color = '#096dd9';
    return (
      <div class="el-date-table-cell">
        <span class="el-date-table-cell__text">
          <span>{day1.cDay}</span>
          <span style={{ color }}>{day1.festival || day1.Term || day1.IDayCn}</span>
        </span>
      </div>
    );
  };

  DateItem.inheritAttrs = false;
</script>

<template>
  <div class="page-container">
    日期：
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="Pick a day"
      :teleported="false"
      :disabled-date="disabledDate"
    >
      <template #default="picker">
        <DateItem v-bind="picker" />
      </template>
    </el-date-picker>
  </div>
</template>

<style scoped lang="scss">
  .page-container {
    :deep(.el-picker__popper) {
      .el-date-range-picker {
        width: 800px;
      }

      .el-picker-panel__content {
        .el-date-table-cell {
          height: 42px;

          .el-date-table-cell__text {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            line-height: 15px;
          }
        }

        .el-date-table td.start-date .el-date-table-cell {
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }

        .el-date-table td.end-date .el-date-table-cell {
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
      }
    }
  }
</style>
