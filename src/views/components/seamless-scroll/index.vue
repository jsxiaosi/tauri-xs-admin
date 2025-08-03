<script setup lang="ts">
  import { reactive, ref, unref, useTemplateRef } from 'vue';
  import SeamlessScroll from '@/components/SeamlessScroll/index.vue';

  const scroll = useTemplateRef<InstanceType<typeof SeamlessScroll>>('scroll');

  const listData = ref([
    {
      title: '无缝滚动第一行无缝滚动第一行！！！！！！！！！！',
    },
    {
      title: '无缝滚动第二行无缝滚动第二行！！！！！！！！！！',
    },
    {
      title: '无缝滚动第三行无缝滚动第三行！！！！！！！！！！',
    },
    {
      title: '无缝滚动第四行无缝滚动第四行！！！！！！！！！！',
    },
    {
      title: '无缝滚动第五行无缝滚动第五行！！！！！！！！！！',
    },
    {
      title: '无缝滚动第六行无缝滚动第六行！！！！！！！！！！',
    },
    {
      title: '无缝滚动第七行无缝滚动第七行！！！！！！！！！！',
    },
    {
      title: '无缝滚动第八行无缝滚动第八行！！！！！！！！！！',
    },
    {
      title: '无缝滚动第九行无缝滚动第九行！！！！！！！！！！',
    },
  ]);

  const classOption = reactive({
    direction: 'top',
  });

  function changeDirection(val: string) {
    unref(scroll)?.reset();
    unref(classOption).direction = val;
  }
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>无缝滚动示例</span>
        <el-button class="button" @click="changeDirection('top')">
          <span :style="{ color: classOption.direction === 'top' ? 'red' : '' }">向上滚动</span>
        </el-button>
        <el-button class="button" @click="changeDirection('bottom')">
          <span
            :style="{
              color: classOption.direction === 'bottom' ? 'red' : '',
            }"
          >
            向下滚动
          </span>
        </el-button>
        <el-button class="button" @click="changeDirection('left')">
          <span :style="{ color: classOption.direction === 'left' ? 'red' : '' }">向左滚动</span>
        </el-button>
        <el-button class="button" @click="changeDirection('right')">
          <span :style="{ color: classOption.direction === 'right' ? 'red' : '' }">向右滚动</span>
        </el-button>
      </div>
    </template>
    <SeamlessScroll ref="scroll" :data="listData" :class-option="classOption" class="warp">
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          {{ item.title }}
        </li>
      </ul>
    </SeamlessScroll>
  </el-card>
</template>

<style lang="scss" scoped>
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin-right: 20px;
    }
  }

  .warp {
    width: 400px;
    height: 200px;
    margin: 0 auto;
    overflow: hidden;

    ul {
      width: 100%;
      height: 100%;
    }
  }
</style>
