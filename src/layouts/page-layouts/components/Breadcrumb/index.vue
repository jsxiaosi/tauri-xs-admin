<script setup lang="ts">
  import { isEqual } from 'lodash-es';
  import { onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { translateI18n } from '@/hooks/web/useI18n';
  import type { AppRouteRecordRaw } from '@/router/type';
  import { findRouteByPath, getParentPaths } from '@/router/utils';
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import AppFold from '../AppFold/index.vue';

  const { multiTabs } = usePermissionStoreHook();

  const levelList = ref<Array<AppRouteRecordRaw>>([]);
  // 获取路由配置
  const router = useRouter();
  // 当前路由
  const route = useRoute();

  const routes = (useRouter().options.routes.find(i => i.path === '/')?.children || []) as AppRouteRecordRaw[];

  // 解析路由匹配的数组
  const getBreadcrumb = () => {
    const matched: AppRouteRecordRaw[] = [];
    const parentRoutes = getParentPaths(router.currentRoute.value.matched[1].path || '', routes || []);
    // 获取每个父级路径对应的路由信息
    parentRoutes.forEach(path => {
      if (path !== '/') {
        matched.push(findRouteByPath(path, routes || []) as AppRouteRecordRaw);
      }
    });
    const item = multiTabs.find(item => {
      let itemQuery = {};
      if (item.query) {
        itemQuery = JSON.parse(JSON.stringify(item.query));
      }
      if (matched.find(i => i.path === item.path)) return false;
      return route.name === item.name && isEqual(route.query, itemQuery) && route.path === item.path;
    });
    if (item) matched.push(item as unknown as AppRouteRecordRaw);
    levelList.value = matched.filter(item => item && item.meta && item.meta.title && !item.meta.breadcrumb);
  };

  // 手动解析path中可能存在的参数
  const pathCompile = (path: any) => {
    const toPath = path;
    return toPath(route.params);
  };
  // 跳转连接处理
  const handleLink = (item: any) => {
    const { redirect, path } = item;
    if (redirect) {
      router.push(redirect);
      return;
    }
    // console.log();
    router.push(pathCompile(path));
  };
  // 首次调用
  onMounted(getBreadcrumb);

  // 监控route的变化，避免组件复用信息同步问题
  watch(route, getBreadcrumb);

  const { appConfig } = useRootSetting();
</script>

<template>
  <div class="breadcrumb">
    <AppFold v-if="appConfig.sidebarFold === 'top'" class="app-fold" />

    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">
            {{ translateI18n(item.meta?.title) }}
          </span>
          <a v-else class="redirect" @click.prevent="handleLink(item)">
            {{ translateI18n(item.meta?.title) }}
          </a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
  .breadcrumb {
    display: flex;
    align-items: center;
    margin-left: 10px;

    .app-fold {
      margin-right: 10px;
    }

    .app-breadcrumb.el-breadcrumb {
      .redirect {
        color: $breadcrumb-text;
      }

      .no-redirect {
        color: #97a8be;
        cursor: text;
      }
    }
  }
</style>
