<script lang="ts" setup>
  import type { PropType } from 'vue';
  import TableChild from './src/components/TableChild.vue';
  defineProps({
    attribute: {
      type: Object as PropType<Recordable>,
      default: () => {},
    },
    option: {
      type: Object as PropType<Recordable>,
      default: () => {},
    },
  });
</script>

<template>
  <div>
    <el-table v-bind="$attrs" style="width: 100%">
      <TableChild v-for="(item, index) in option" :key="index" :item="item">
        <template v-for="soitem in Object.keys($slots)" #[soitem]="data">
          <slot :name="soitem" v-bind="((data || {}) as Recordable)"></slot>
        </template>
      </TableChild>
    </el-table>
  </div>
</template>
