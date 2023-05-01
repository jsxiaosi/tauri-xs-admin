<script lang="ts" setup>
  import type { PropType } from 'vue';
  import TableChild from './src/components/TableChild.vue';
  defineProps({
    data: {
      type: Array as PropType<Recordable[]>,
      default: () => {
        return [];
      },
    },
    option: {
      type: Object as PropType<Recordable>,
      default: () => {},
    },
    border: {
      type: Boolean,
      default: false,
    },
  });
</script>

<template>
  <div>
    <el-table v-bind="$attrs" :data="data" :border="border" style="width: 100%">
      <TableChild v-for="(item, index) in option" :key="index" :item="item">
        <template v-for="soitem in Object.keys($slots)" #[soitem]="_data">
          <slot :name="soitem" v-bind="((_data || {}) as Recordable)"></slot>
        </template>
      </TableChild>
    </el-table>
  </div>
</template>
