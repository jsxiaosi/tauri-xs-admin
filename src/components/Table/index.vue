<script lang="ts" setup generic="T">
  import type { TableProps } from 'element-plus';
  import { ElTable } from 'element-plus';
  import TableChild from './src/components/TableChild.vue';

  defineProps<TableProps<T> & { option: any[] }>();
</script>

<template>
  <div>
    <ElTable v-bind="$attrs" :data="data" :border="border" style="width: 100%">
      <TableChild v-for="(item, index) in option" :key="index" :item="item">
        <template v-for="soitem in Object.keys($slots)" #[soitem]="data">
          <slot :name="soitem" v-bind="data"></slot>
        </template>
      </TableChild>
    </ElTable>
  </div>
</template>
