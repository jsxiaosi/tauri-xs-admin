<script lang="ts" setup generic="T extends Recordable">
  import { ElTable } from 'element-plus';
  import type { TableProps } from 'element-plus';
  import TableChild from './src/components/TableChild';
  import type { TableColumnProps } from './types/table';

  const props = defineProps<TableProps<T> & { option: TableColumnProps<T>[] }>();
</script>

<template>
  <div>
    <ElTable v-bind="{ ...props, ...$attrs }" :data="data" :border="border" fit show-header>
      <TableChild v-for="(item, index) in option" :key="index" :item="item">
        <template v-for="soitem in Object.keys($slots)" #[soitem]="data">
          <slot :name="soitem" v-bind="data" />
        </template>
      </TableChild>
    </ElTable>
  </div>
</template>
