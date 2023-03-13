<script setup lang="ts">
  import { ref, computed, watch, onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ElDropdown } from 'element-plus';
  import { useTabsView } from './hooks/useTabsView';
  import { useTabsChange } from './hooks/useTabsChange';
  import { translateI18n } from '@/hooks/web/useI18n';
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import type { MultiTabsType } from '@/store/types';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { emitter } from '@/utils/mitt';

  const { appConfig, setAppConfigMode } = useRootSetting();

  const route = useRoute();
  const router = useRouter();

  const multiTabs = computed<MultiTabsType[]>(() => usePermissionStoreHook().multiTabs);

  const { visible, rightClickTags, rightViewStyle, contextmenu, rightViewChange } =
    useTabsView(multiTabs);

  const { setTabPaneKey, addRouteTabs, onFresh, removeTab } = useTabsChange(multiTabs);

  const editableTabsValue = ref(setTabPaneKey(route));

  watch(
    () => [route.path],
    async () => {
      editableTabsValue.value = setTabPaneKey(route);
    },
  );

  onBeforeMount(() => {
    emitter.on('siteBarChange', ({ routeRaw }) => {
      addRouteTabs(routeRaw as unknown as MultiTabsType);
    });
  });

  const tabRemoveChange = (e: string) => {
    const item = multiTabs.value.find((i) => setTabPaneKey(i) === e);
    if (item) removeTab(item);
  };

  const changeTab = (e: MultiTabsType) => {
    router.push({
      path: e.path,
      query: e.query,
    });
  };

  const fullScreenChange = () => {
    const { hideNavbart, hideSidebar } = appConfig.value;
    if (hideNavbart && hideSidebar) {
      setAppConfigMode({ hideNavbart: false, hideSidebar: false });
    } else {
      setAppConfigMode({ hideNavbart: true, hideSidebar: true });
    }
  };

  const elDropdownRef = ref<InstanceType<typeof ElDropdown>>();

  const tabPaneMenu = (item: MultiTabsType, event: MouseEvent) => {
    elDropdownRef.value?.handleClose();
    contextmenu(item, event);
  };
</script>

<template>
  <div v-if="!appConfig.hideTabs" class="main-container-tabs">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="tabs-view"
      :closable="multiTabs.length > 1"
      @tab-remove="tabRemoveChange"
    >
      <el-tab-pane v-for="item in multiTabs" :key="setTabPaneKey(item)" :name="setTabPaneKey(item)">
        <template #label>
          <div
            class="tabs-view-item"
            @click="changeTab(item)"
            @contextmenu.prevent="tabPaneMenu(item, $event)"
          ></div>
          <span>{{ translateI18n(item.meta.title) }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <transition name="el-zoom-in-top">
      <ul v-show="visible" class="right-view" :style="rightViewStyle">
        <li
          v-for="(item, key) in rightClickTags"
          :key="key"
          class="right-view-item cursor"
          :class="{ disabled: item.disabled }"
          @click="rightViewChange(item)"
        >
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </transition>
    <div v-if="!appConfig.hideTabsConfig" class="right-button">
      <ul>
        <li class="cursor" @click="onFresh()">
          <SvgIcon class="rotate" name="iEL-refresh"></SvgIcon>
        </li>
        <li>
          <ElDropdown
            ref="elDropdownRef"
            trigger="click"
            placement="bottom-end"
            @visible-change="(e:boolean)=>e && contextmenu(route)"
          >
            <SvgIcon class="action-item cursor" name="iEL-arrow-down"></SvgIcon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(item, key) in rightClickTags"
                  :key="key"
                  :command="{ key, item }"
                  :disabled="item.disabled"
                  @click="rightViewChange(item)"
                >
                  {{ item.text }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </ElDropdown>
        </li>
        <li class="cursor" @click="fullScreenChange">
          <SvgIcon name="full_screen_page"></SvgIcon>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .main-container-tabs {
    display: flex;
    position: relative;

    // .el-tabs :deep(.el-tabs__header) {
    //   margin: 0;
    // }
    .tabs-view {
      .tabs-view-item {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
      }
    }

    .el-tabs {
      width: 0;
      height: $tabsPageHeight;
      flex: 1;
      margin: 0 10px;

      :deep(.el-tabs__header) {
        height: 100%;
        margin: 0;
        border: none;
        // display: flex;
        // align-items: center;
        .el-tabs__nav-wrap,
        .el-tabs__nav-scroll {
          height: 100%;
        }

        .el-tabs__nav-scroll {
          display: flex;
          align-items: center;

          .el-tabs__nav {
            border: none;
            border-radius: 0;

            .el-tabs__item {
              height: 100%;
              line-height: $tabsPageHeight - 10;
              border-radius: 4px;
              border: 1px solid var(--border-color-light);
              margin-right: 4px;
            }
          }
        }

        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          height: $tabsPageHeight;
          line-height: $tabsPageHeight;
        }
        // .el-tabs__nav-*{

        // }
      }
    }

    .right-view {
      position: fixed;
      z-index: 999;
      background-color: var(--main-bg-color);
      border: 1px solid var(--border-color-light);
      border-radius: 5px;
      padding: 5px;
      box-shadow: 0 0 12px rgb(28 29 30 / 8%);

      .right-view-item {
        padding: 5px 10px;
        font-size: var(--font-size-base);
        display: flex;
        align-items: center;
        border-radius: 5px;

        .right-view-item-icon {
          margin-right: 5px;
        }

        &:hover {
          background-color: var(--sub-color-8);
        }
      }
    }

    .right-button {
      ul {
        display: flex;

        li {
          width: $tabsPageHeight;
          text-align: center;
          height: $tabsPageHeight;
          font-size: var(--font-size-medium);
          border-left: 1px solid var(--border-color-light);
          display: flex;
          align-items: center;
          justify-content: center;

          .action-item {
            font-size: var(--font-size-medium);
            height: $tabsPageHeight;
          }
        }

        /* 刷新按钮动画效果 */
        .refresh-button {
          animation: rotate 600ms linear infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(-360deg);
          }
        }
      }
    }
  }
</style>
