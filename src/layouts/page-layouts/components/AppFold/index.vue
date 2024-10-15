<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';

  // 当前是否折叠导航栏
  const { appConfig, setAppConfigMode } = useRootSetting();
  // 折叠菜单事件
  const handerShowElmenu = () => {
    setAppConfigMode({ collapseMenu: !appConfig.value.collapseMenu });
  };
</script>

<template>
  <SvgIcon
    class="breadcrumb-fold cursor"
    :class="{ 'breadcrumb-unfold': appConfig.collapseMenu }"
    name="fold"
    color="#e3e3e3"
    @click="handerShowElmenu"
  />
</template>

<style lang="scss">
  .breadcrumb-unfold {
    transform: rotate(180deg);
  }
</style>
