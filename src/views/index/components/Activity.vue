<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import SeamlessScroll from '@/components/SeamlessScroll/index.vue';

  const classOption = reactive({
    direction: 'top',
  });

  const listData = ref([
    {
      date: '2022-01-01',
      name: 'vue-xs-admin',
      star: '1000',
    },
    {
      date: '2022-01-02',
      name: 'vue-xs-admin',
      star: '1100',
    },
    {
      date: '2022-01-03',
      name: 'vue-xs-admin',
      star: '1200',
    },
    {
      date: '2022-01-04',
      name: 'vue-xs-admin',
      star: '1300',
    },
    {
      date: '2022-01-05',
      name: 'vue-xs-admin',
      star: '1400',
    },
    {
      date: '2022-01-06',
      name: 'vue-xs-admin',
      star: '1500',
    },
    {
      date: '2022-01-07',
      name: 'vue-xs-admin',
      star: '1600',
    },
    {
      date: '2022-01-08',
      name: 'vue-xs-admin',
      star: '1700',
    },
    {
      date: '2022-01-09',
      name: 'vue-xs-admin',
      star: '1800',
    },
    {
      date: '2022-01-10',
      name: 'vue-xs-admin',
      star: '1900',
    },
    {
      date: '2022-01-11',
      name: 'vue-xs-admin',
      star: '2000',
    },
    {
      date: '2022-01-12',
      name: 'vue-xs-admin',
      star: '2100',
    },
    {
      date: '2022-01-13',
      name: 'vue-xs-admin',
      star: '2200',
    },
    {
      date: '2022-01-14',
      name: 'vue-xs-admin',
      star: '2300',
    },
  ]);
</script>

<template>
  <div class="infinite">
    <ul class="top">
      <li>更新日期</li>
      <li>项目名称</li>
      <li>下载数量</li>
    </ul>
    <SeamlessScroll :data="listData" :class-option="classOption" class="warp">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span v-text="item.date" />
          <span v-text="item.name" />
          <span v-text="item.star" />
        </li>
      </ul>
    </SeamlessScroll>
  </div>
</template>

<style lang="scss" scoped>
  .infinite {
    height: 410px;
    border: 1px solid var(--border-color-light);

    .top {
      display: flex;
      // width: 95%;
      height: 40px;
      margin: 0 auto;
      border-bottom: 1px solid var(--border-color-light);
      background: var(--sub-main-bg-content);
      font-size: var(--font-size-base);
      // color: #909399;
      font-weight: 400;
      line-height: 40px;

      li {
        width: 34%;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .warp {
      width: 95%;
      height: 365px;
      margin: 0 auto;
      overflow: hidden;

      ul {
        margin: 0;

        li {
          display: flex;
          height: 30px;
          font-size: var(--font-size-medium);
          line-height: 30px;
        }
      }

      span {
        width: 34%;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
