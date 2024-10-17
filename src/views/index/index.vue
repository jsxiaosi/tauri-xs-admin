<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import VisitAnalysis from './components/AnalysisChart.vue';
  import Comment from './components/Comment.vue';
  import PieChart from './components/PieChart.vue';
  import WordCloud from './components/WordCloud.vue';

  defineOptions({
    name: 'RtWelcome',
  });

  const speedList = [
    {
      title: '待办事项',
      online: 24,
      total: 70,
    },
    {
      title: '待办任务',
      online: 39,
      total: 100,
    },
    {
      title: '目标计划',

      online: 5,
      total: 10,
    },
    {
      title: '评论回复',
      online: 10,
      total: 40,
    },
  ];

  const value = (online: number, total: number) => {
    return Math.round((online / total) * 100);
  };
</script>

<template>
  <div>
    <el-row :gutter="20" class="enter-y">
      <el-col v-for="(item, index) in speedList" :key="index" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header cursor">
              <span>{{ item.title }}</span>
              <SvgIcon name="iEL-arrow-right" />
            </div>
          </template>
          <div class="card-content">
            <div class="numerical-value">
              <span class="number">{{ item.online }}/{{ item.total }}</span>
              <span>Online/Total</span>
            </div>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="value(item.online, item.total)" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="enter-y">
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
        <el-card class="box-card">
          <template #header>
            <div class="card-header cursor">
              <span>任务数据</span>
            </div>
          </template>
          <VisitAnalysis />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header cursor">
              <span>任务数据</span>
            </div>
          </template>
          <PieChart />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="enter-y">
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
        <el-card class="box-card">
          <template #header>
            <div class="card-header cursor">
              <span>评论列表</span>
            </div>
          </template>
          <Comment />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
        <el-card class="box-card">
          <template #header>
            <div class="card-header cursor">
              <span>词云</span>
            </div>
          </template>
          <WordCloud />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  .box-card {
    margin-bottom: 20px;

    :deep(.el-card__header) {
      padding-bottom: 0;
      border: none;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
    }

    .card-content {
      :deep(.el-progress-bar__outer) {
        height: 17px !important;
      }

      .numerical-value {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 10px;

        .number {
          color: var(--text-color-primary);
          font-size: var(--font-size-extra-large);
          font-weight: 600;
        }
      }
    }
  }
</style>
