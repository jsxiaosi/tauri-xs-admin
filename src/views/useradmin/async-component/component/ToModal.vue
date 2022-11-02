<script setup lang="ts">
  import { ref } from 'vue';
  import Table from '@/components/Table/index.vue';

  const data = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
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
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ]);
      }, 3000);
    });
  };

  const res = await data();
  const tabList = ref(res);

  const option = [
    {
      label: 'Date',
      prop: 'date',
    },
    {
      label: 'Name',
      prop: 'name',
    },
    {
      label: 'Address',
      prop: 'address',
    },
  ];
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>异步组件</span>
        </div>
      </template>
      <Table :data="tabList" border row-key="date" :option="option"> </Table>
    </el-card>
  </div>
</template>

<style lang="scss"></style>
