<script setup lang="ts">
  import { _storage } from '@jsxiaosi/utils';
  import { ref, watch } from 'vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import type { SidebarMode } from '@/store/types';
  import pageSettings from './pageSettings/index.vue';
  import ThemeSettings from './ThemeSettings/index.vue';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const drawer = ref<boolean>(props.modelValue);
  watch(
    () => props.modelValue,
    (count: boolean) => {
      drawer.value = count;
      /* ... */
    },
  );

  const { appConfig, setAppConfigMode } = useRootSetting();

  const sidebarSeting: { label: string; value: SidebarMode }[] = [
    {
      label: '左侧菜单模式',
      value: 'vertical',
    },
    {
      label: '顶部菜单模式',
      value: 'horizontal',
    },
    {
      label: '混合菜单模式',
      value: 'blend',
    },
  ];

  // 折叠菜单事件
  const handerShowElmenu = (vale: SidebarMode) => {
    setAppConfigMode({ sidebarMode: vale });
  };

  const handerClearStorage = () => {
    _storage.clearStorage();
    window.location.reload();
  };
</script>

<template>
  <div class="setting">
    <el-drawer v-model="drawer" :title="$t('layout.setup')" :size="320" @close="emit('update:modelValue', false)">
      <div class="drawer-content">
        <el-divider content-position="center">
          {{ $t('layout.layoutSettings') }}
        </el-divider>
        <div class="layout-seting">
          <div class="sidebar-seting">
            <el-tooltip v-for="item in sidebarSeting" :key="item.value" :content="item.label" placement="bottom">
              <div
                class="sidebar-mode cursor"
                :class="{
                  'sidebar-mode-select': appConfig.sidebarMode === item.value,
                }"
                @click="handerShowElmenu(item.value)"
              >
                <div class="sidebar-mode__left" />
                <div class="sidebar-mode__top" />
              </div>
            </el-tooltip>
          </div>
        </div>
        <el-divider content-position="center">
          {{ $t('layout.themeSettings') }}
        </el-divider>
        <div>
          <ThemeSettings />
        </div>
        <el-divider content-position="center">
          {{ $t('layout.pageSettings') }}
        </el-divider>
        <div>
          <pageSettings />
        </div>
        <el-button class="clear-storage" type="danger" @click="handerClearStorage">
          {{ $t('layout.clearStorage') }}
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
  .setting :deep(.el-drawer__header) {
    margin-bottom: 0;
  }

  .drawer-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .layout-seting {
      .sidebar-seting {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .sidebar-mode-select {
          border: 2px solid var(--main-color);
        }

        .sidebar-mode {
          position: relative;
          width: 80px;
          height: 60px;
          overflow: hidden;
          border-radius: 5px;
          background: #f0f2f5;
          box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

          &:nth-child(1) {
            .sidebar-mode__left {
              width: 30%;
              height: 100%;
              background: var(--main-color);
            }

            .sidebar-mode__top {
              position: absolute;
              top: 0;
              right: 0;
              width: 70%;
              height: 30%;
              background: #fff;
              box-shadow: 0 0 1px #888;
            }
          }

          &:nth-child(2) {
            .sidebar-mode__top {
              width: 100%;
              height: 30%;
              background: var(--main-color);
              box-shadow: 0 0 1px #888;
            }
          }

          &:nth-child(3) {
            .sidebar-mode__left {
              width: 30%;
              height: 100%;
              background: #fff;
            }

            .sidebar-mode__top {
              position: absolute;
              top: 0;
              right: 0;
              width: 100%;
              height: 30%;
              background: var(--main-color);
              box-shadow: 0 0 1px #888;
            }
          }
        }
      }
    }

    :deep(.el-divider__text) {
      text-align: center;
    }

    .clear-storage {
      width: 100%;
      margin-top: 24px;
    }
  }
</style>
