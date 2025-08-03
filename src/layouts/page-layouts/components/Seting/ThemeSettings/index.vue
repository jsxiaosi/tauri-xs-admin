<script setup lang="ts">
  import { ref, watch } from 'vue';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import type { AppConfig } from '@/store/types';
  import { themeHtmlClassName, updateColor } from '@/utils/theme/transformTheme';

  const { appConfig, setAppConfigMode } = useRootSetting();

  const { primaryColor, greyMode, colorWeaknessMode } = appConfig.value;

  const pureColor = ref(primaryColor || '#409eff');

  const colorList = ['#722ed1', '#eb2f96', '#52c41a', '#13c2c2', '#fadb14', '#fa541c', '#f5222d'];

  watch([pureColor], () => {
    setAppConfigMode({ primaryColor: pureColor.value });
    updateColor(pureColor.value, appConfig.value.themeMode);
  });

  const htmlGrey = ref<boolean>(greyMode || false);
  const htmlWeakness = ref<boolean>(colorWeaknessMode || false);

  const themeChange = (e: boolean, key: string) => {
    themeHtmlClassName(key, e);
    const appData = {} as AppConfig;
    if (key === 'html-grey') appData.greyMode = e;
    else appData.colorWeaknessMode = e;
    setAppConfigMode(appData);
  };
</script>

<template>
  <div>
    <div class="color-list">
      <div
        v-for="i in colorList"
        :key="i"
        class="cursor color-list-item"
        :style="{ backgroundColor: i }"
        @click="() => (pureColor = i)"
      >
        <SvgIcon v-if="i === pureColor" class="icon" name="iEL-select" />
      </div>
    </div>
    <div class="options">
      <span>{{ $t('layout.customTheme') }}</span>
      <el-color-picker v-model="pureColor" />
    </div>
    <div class="options">
      <span>灰色模式</span>
      <el-switch v-model="htmlGrey" @change="(e: string | number | boolean) => themeChange(Boolean(e), 'html-grey')" />
    </div>
    <div class="options">
      <span>色弱模式</span>
      <el-switch
        v-model="htmlWeakness"
        @change="(e: string | number | boolean) => themeChange(Boolean(e), 'html-weakness')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .color-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    .color-list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;

      .icon {
        color: #fff;
      }
    }
  }

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

      .mask {
        position: fixed;
        z-index: 98;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
      }

      :deep(.vc-colorpicker) {
        position: absolute;
        z-index: 99;
        top: 30px;
        right: 0;
      }
    }
  }
</style>
