<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { ColorPicker } from 'vue3-colorpicker';
  import 'vue3-colorpicker/style.css';
  import { useAppStoreHook } from '@/store/modules/app';
  import { useTransformTheme } from '@/hooks/useTransformTheme';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import type { AppConfig } from '@/store/types';

  const { updateColor, themeHtmlClassName } = useTransformTheme();

  const appStore = useAppStoreHook();

  const { primaryColor, greyMode, colorWeaknessMode } = appStore.appConfigMode;

  const pureColor = ref(primaryColor || '#409eff');

  const showPicker = ref<boolean>(false);

  const colorList = ['#722ed1', '#eb2f96', '#52c41a', '#13c2c2', '#fadb14', '#fa541c', '#f5222d'];

  watch([pureColor], () => {
    appStore.appConfigMode.primaryColor = pureColor.value;
    appStore.setAppConfigMode(appStore.appConfigMode);
    updateColor();
  });

  const htmlGrey = ref<boolean>(greyMode || false);
  const htmlWeakness = ref<boolean>(colorWeaknessMode || false);

  const themeChange = (e: boolean, key: string) => {
    themeHtmlClassName(key, e);
    const appData = {} as AppConfig;
    if (key === 'html-grey') appData['greyMode'] = e;
    else appData['colorWeaknessMode'] = e;
    appStore.setAppConfigMode(appData);
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
        <SvgIcon v-if="i === pureColor" class="icon" name="iEL-select"></SvgIcon>
      </div>
    </div>
    <div class="options">
      <span>{{ $t('layout.customTheme') }}</span>
      <div class="color-picker">
        <span
          class="cursor"
          :style="{ backgroundColor: pureColor }"
          @click="() => (showPicker = !showPicker)"
        ></span>
        <div v-show="showPicker" class="picker">
          <div class="mask" @click="() => (showPicker = !showPicker)"></div>
          <ColorPicker
            v-model:pureColor="pureColor"
            format="hex"
            :disable-alpha="true"
            :is-widget="true"
          />
        </div>
      </div>
    </div>
    <div class="options">
      <span>灰色模式</span>
      <el-switch v-model="htmlGrey" @change="(e:boolean) => themeChange(e,'html-grey')" />
    </div>
    <div class="options">
      <span>色弱模式</span>
      <el-switch v-model="htmlWeakness" @change="(e:boolean) => themeChange(e,'html-weakness')" />
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
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        color: #fff;
      }
    }
  }
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
      .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        z-index: 98;
      }
      :deep(.vc-colorpicker) {
        position: absolute;
        top: 30px;
        right: 0;
        z-index: 99;
      }
    }
  }
</style>
