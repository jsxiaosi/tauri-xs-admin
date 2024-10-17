<script lang="tsx" setup>
  import calendar from '@/utils/date/calendar/index.js';

  const DateItem = (v: Recordable) => {
    const { day } = v.data;
    const date = new Date(day);
    const year = date?.getFullYear();
    const month = (date?.getMonth() as number) + 1;
    const vDay = date?.getDate();
    const day1 = calendar.solar2lunar(year, month, vDay);
    let color = '';
    if (day1.festival) color = '#f5222d';
    if (day1.Term) color = '#096dd9';
    return (
      <div class="day-item">
        <span>{day1.cDay}</span>
        <span class="festival" style={{ color }}>
          {day1.festival || day1.Term || day1.IDayCn}
        </span>
      </div>
    );
  };

  DateItem.inheritAttrs = false;
</script>

<template>
  <div class="page-container">
    <el-calendar>
      <template #date-cell="defDate">
        <DateItem v-bind="defDate" />
      </template>
    </el-calendar>
  </div>
</template>

<style scoped lang="scss">
  .page-container {
    :deep(.el-calendar) {
      .day-item {
        .festival {
          margin-left: 10px;
        }
      }
    }
  }
</style>
