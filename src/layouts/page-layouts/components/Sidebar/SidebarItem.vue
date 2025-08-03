<script setup lang="ts">
  import path from 'path';
  import { isUrl } from '@jsxiaosi/utils';
  import { ref } from 'vue';
  import { translateI18n } from '@/hooks/web/useI18n';
  import type { AppRouteRecordRaw } from '@/router/type';
  import Item from './Item.vue';
  import AppLink from './Link.vue';

  const {
    isNest = false,
    level = 0,
    collapse = false,
    mode = 'vertical',
    item,
    basePath = '',
  } = defineProps<{
    item: AppRouteRecordRaw;
    isNest?: boolean;
    basePath?: string;
    level?: number;
    collapse?: boolean;
    mode?: 'vertical' | 'horizontal';
  }>();

  const onlyOneChild = ref<Partial<AppRouteRecordRaw & { noShowingChildren: boolean }>>({});
  const hasOneShowingChild = (parent: AppRouteRecordRaw) => {
    const showingChildren =
      parent.children?.filter((item: AppRouteRecordRaw) => {
        if (item.meta?.hideSidebar) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item;
          return true;
        }
      }) ?? [];

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true;
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
      return true;
    }

    return false;
  };
  const resolvePath = (routePath: string) => {
    if (isUrl(routePath)) {
      return routePath;
    }
    if (isUrl(basePath)) {
      return basePath;
    }
    return path.resolve(basePath, routePath);
  };
</script>

<template>
  <div v-if="!item.meta?.hideSidebar">
    <template
      v-if="
        hasOneShowingChild(item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.meta?.alwaysShow
      "
    >
      <el-tooltip
        class="box-item"
        :disabled="level > 0 || !collapse"
        :content="translateI18n(onlyOneChild.meta?.title)"
        placement="right"
      >
        <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild?.path ?? '')">
          <el-menu-item
            :index="resolvePath(onlyOneChild?.path ?? '')"
            :class="{
              'submenu-title-no-dropdown': !isNest,
              'one-level-menu-item': level === 0,
            }"
          >
            <Item
              class-name="menu-item-svg"
              :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
              :title="onlyOneChild.meta.title || (item.meta && item.meta.title)"
              :collapse="level === 0 && collapse"
              :mode="mode"
            />
          </el-menu-item>
        </AppLink>
      </el-tooltip>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)" :class="{ 'one-level-sub-menu': level === 0 }" teleported>
      <template #title>
        <Item
          v-if="item.meta"
          class-name="sub-menu-svg"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
          :collapse="level === 0 && collapse"
          :mode="mode"
        />
      </template>

      <sidebar-item
        v-for="(child, index) in item.children"
        :key="child.path + index"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
        :level="level + 1"
        :collapse="collapse"
      />
    </el-sub-menu>
  </div>
</template>
