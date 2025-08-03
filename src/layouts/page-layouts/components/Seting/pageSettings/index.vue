<script setup lang="ts">
  import { _storage } from '@jsxiaosi/utils';
  import { ref } from 'vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { usePermissionStoreHook } from '@/store/modules/permission';

  const { appConfig, setAppConfigMode } = useRootSetting();

  const { persistent } = usePermissionStoreHook();

  const labelPersistentRef = ref<boolean>(appConfig.value.tabPersistent);
  const labelPersistentChange = (e: string | number | boolean) => {
    if (!e) _storage.removeStorage('multiTabsList');
    else persistent();
    setAppConfigMode({ tabPersistent: Boolean(e) });
  };

  const hidePublicChange = () => {
    setAppConfigMode({});
  };
</script>

<template>
  <div>
    <div class="options">
      <span>{{ $t('layout.hideSidebar') }}</span>
      <el-switch v-model="appConfig.hideSidebar" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>{{ $t('layout.hideNavBart') }}</span>
      <el-switch v-model="appConfig.hideNavbart" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>{{ $t('layout.hideTabs') }}</span>
      <el-switch v-model="appConfig.hideTabs" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>{{ $t('layout.hideTabsConfig') }}</span>
      <el-switch v-model="appConfig.hideTabsConfig" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>{{ $t('layout.closeTabDrag') }}</span>
      <el-switch v-model="appConfig.closeTabDrag" @change="hidePublicChange" />
    </div>
    <div class="options">
      <span>{{ $t('layout.labelPersistent') }}</span>
      <el-switch v-model="labelPersistentRef" @change="labelPersistentChange" />
    </div>
    <div class="options">
      <span>{{ $t('layout.sidebarFold') }}</span>
      <el-select
        v-model="appConfig.sidebarFold"
        class="select"
        :placeholder="$t('layout.sidebarFold')"
        size="small"
        @change="hidePublicChange"
      >
        <el-option
          v-for="item in ['none', 'top', 'bottom']"
          :key="item"
          :label="$t(`layout.sidebarFoldList.${item}`)"
          :value="item"
        />
      </el-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

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

    .select {
      width: 100px;
    }
  }
</style>
