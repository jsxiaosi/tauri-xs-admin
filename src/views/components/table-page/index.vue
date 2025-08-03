<script lang="tsx" setup>
  import { h, ref } from 'vue';
  import Table from '@/components/Table/index.vue';
  import type { TableColumnProps } from '@/components/Table/types/table';

  interface TableData {
    date: string;
    name: string;
    address: string;
    children?: TableData[];
  }

  const option: TableColumnProps<TableData>[] = [
    {
      label: 'Date',
      prop: 'date',
      sortable: true,
    },
    {
      label: 'PreName',
      children: [
        {
          label: 'Name',
          prop: 'name',
          isSlots: true,
        },
      ],
    },
    {
      label: 'Address',
      prop: 'address',
      render_header: (slotData: any) => {
        return h('span', {}, `render_header：${slotData.customItem.label}`);
      },
      render: (slotData: any) => {
        return h('span', {}, `render：${slotData.row.address}`);
      },
    },
  ];

  const tabList = ref<TableData[]>([
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      children: [
        {
          date: '2016-05-05',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-06',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]);

  const nestingOption: TableColumnProps<TableData>[] = [
    {
      type: 'expand',
      render: (slotData: any) => {
        const ngOption = [
          {
            label: 'Date',
            prop: 'date',
            sortable: true,
          },
          {
            label: 'Name',
            prop: 'name',
            isSlots: true,
          },
        ];
        return (
          <div style={{ padding: '0 8px' }}>
            <Table data={[slotData.row]} border option={ngOption}></Table>
          </div>
        );
      },
    },
    {
      label: 'Date',
      prop: 'date',
      sortable: true,
    },
    {
      label: 'Name',
      prop: 'name',
      isSlots: true,
    },
    {
      label: 'Address',
      prop: 'address',
      render_header: (slotData: any) => {
        return h('span', {}, `render_header：${slotData.customItem.label}`);
      },
      render: (slotData: any) => {
        return h('span', {}, `render：${slotData.row.address}`);
      },
    },
  ];
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>表格</span>
        </div>
      </template>

      <Table :data="tabList" border row-key="date" :option="option">
        <template #name_header="slotData">
          <span>{{ `插槽：${slotData.customItem.label}` }}</span>
        </template>
        <template #name="slotData">
          <span>{{ slotData.row.name }}</span>
        </template>
      </Table>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>嵌套表格</span>
        </div>
      </template>
      <Table :data="tabList" border row-key="date" :option="nestingOption">
        <template #name_header="slotData">
          <span>{{ `插槽：${slotData.customItem.label}` }}</span>
        </template>
        <template #name="slotData">
          <span>{{ slotData.row.name }} </span>
        </template>
      </Table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
  .box-card {
    margin-bottom: 20px;
  }

  .nesting {
    padding: 0 20px;
  }
</style>
