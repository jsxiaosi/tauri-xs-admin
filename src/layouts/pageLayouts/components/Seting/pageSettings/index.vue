<script setup lang="ts">
  import { ref } from 'vue';
  import { useAppStoreHook } from '@/store/modules/app';
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import { removeStorage } from '@/utils/storage';

  const appStore = useAppStoreHook();

  const { persistent } = usePermissionStoreHook();

  const { hideTabs, labelPersistent } = appStore.appConfigMode;

  const hideTabsRef = ref<boolean>(hideTabs);
  const hideTabsChange = (e: boolean) => {
    appStore.setAppConfigMode({ hideTabs: e });
  };

  const labelPersistentRef = ref<boolean>(labelPersistent);
  const labelPersistentChange = (e: boolean) => {
    if (!e) removeStorage('multiTabsList');
    else persistent();
    appStore.setAppConfigMode({ labelPersistent: e });
  };
</script>

<template>
  <div>
    <div class="options">
      <span>{{ $t('layout.hideTabs') }}</span>
      <el-switch v-model="hideTabsRef" @change="hideTabsChange" />
    </div>
    <div class="options">
      <span>{{ $t('layout.labelPersistent') }}</span>
      <el-switch v-model="labelPersistentRef" @change="labelPersistentChange" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    .color-picker {
      position: relative;
      width: 50px;
      height: 24px;
      span {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
