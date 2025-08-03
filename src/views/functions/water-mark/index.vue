<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue';
  import waterMark from '@/instruct/waterMark';
  import { useWaterMark } from './hooks/useWaterMark';

  const vWaterMark = waterMark;

  const { setWaterMark, close } = useWaterMark();
  const overallName = ref<string>('vue-xs-admin');
  const creatOverall = () => {
    setWaterMark(overallName.value);
  };
  const closeOverall = () => {
    close();
  };

  const name = ref<string>('vue-xs-admin');
  const markName = ref<string>(name.value);
  const updateName = () => {
    markName.value = name.value;
  };

  const hooksDeom = useTemplateRef<HTMLElement | undefined>('hooks-deom');
  const { setWaterMark: hooksSetWaterMark, close: hooksCloseChange } = useWaterMark(hooksDeom);
  const hooksName = ref<string>('这是一个水印');
  const hooksUpdateName = () => {
    hooksSetWaterMark(hooksName.value);
  };
  const hooksClose = () => {
    hooksCloseChange();
  };
</script>

<template>
  <div>
    <div class="config">
      修改水印名称：
      <ElInput v-model="overallName" style="margin-bottom: 12px">
        <template #append>
          <el-button @click="creatOverall"> 确定 </el-button>
        </template>
      </ElInput>
      （全局）
      <el-button @click="closeOverall"> 清除 </el-button>
    </div>

    <div class="config">
      修改水印名称：
      <ElInput v-model="hooksName" style="width: 200px">
        <template #append>
          <el-button @click="hooksUpdateName()"> 确定 </el-button>
        </template>
      </ElInput>
      （hooks）
      <el-button @click="hooksClose"> 清除 </el-button>
    </div>
    <div ref="hooks-deom" class="region" />

    <div class="config">
      修改水印名称：
      <ElInput v-model="name" style="width: 200px">
        <template #append>
          <el-button @click="updateName"> 确定 </el-button>
        </template>
      </ElInput>
      （指令）
    </div>
    <div v-water-mark="markName" class="region" />
  </div>
</template>

<style lang="scss" scoped>
  .config {
    display: flex;
    align-items: center;
    margin-top: 12px;
  }

  .region {
    width: 100%;
    height: 500px;
    margin-top: 12px;
    overflow-y: auto;
    border: 1px solid #e3e3e3;
  }
</style>
