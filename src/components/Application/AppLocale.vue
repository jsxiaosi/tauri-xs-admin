<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { localesList, useI18n } from '@/hooks/web/useI18n';
  import type { localeKey } from '@/locales/types';

  const i18n = useI18n();
  const { setAppConfigMode } = useRootSetting();

  const tolochos = (key: localeKey) => {
    i18n.locale.value = key;
    setAppConfigMode({ locale: key });
  };
</script>

<template>
  <el-dropdown trigger="click" @command="tolochos">
    <SvgIcon class="icon cursor" name="locales" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in localesList" :key="item.locale" :command="item.locale">
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
  .icon {
    color: var(--text-color-primary);
    font-size: var(--font-size-extra-large);
  }
</style>
