<script setup lang="ts">
  import path from 'path';
  import type { PropType } from 'vue';
  import { ref } from 'vue';
  import { isUrl } from '@jsxiaosi/utils';
  import Item from './Item.vue';
  import AppLink from './Link.vue';
  import type { AppRouteRecordRaw } from '@/router/type';
  import { translateI18n } from '@/hooks/web/useI18n';

  const props = defineProps({
    // route object
    item: {
      type: Object as PropType<AppRouteRecordRaw>,
      default: () => {},
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
    level: {
      type: Number,
      default: 0,
    },
    collapse: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
    },
  });

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
    if (isUrl(props.basePath)) {
      return props.basePath;
    }
    return path.resolve(props.basePath, routePath);
  };
</script>

<template>
  <div v-if="!item.meta?.hideSidebar">
    <template
      v-if="
        hasOneShowingChild(item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.meta?.alwaysShow
      "
    >
      <el-tooltip
        class="box-item"
        :disabled="props.level > 0 || !props.collapse"
        :content="translateI18n(onlyOneChild.meta?.title)"
        placement="right"
      >
        <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild?.path ?? '')">
          <el-menu-item
            :index="resolvePath(onlyOneChild?.path ?? '')"
            :class="{
              'submenu-title-no-dropdown': !isNest,
              'one-level-menu-item': props.level === 0,
            }"
          >
            <Item
              class-name="menu-item-svg"
              :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
              :title="onlyOneChild.meta.title || (item.meta && item.meta.title)"
              :collapse="props.level === 0 && props.collapse"
              :mode="mode"
            />
          </el-menu-item>
        </AppLink>
      </el-tooltip>
    </template>

    <el-sub-menu
      v-else
      :index="resolvePath(item.path)"
      :class="{ 'one-level-sub-menu': props.level === 0 }"
      teleported
    >
      <template #title>
        <Item
          v-if="item.meta"
          class-name="sub-menu-svg"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
          :collapse="props.level === 0 && props.collapse"
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
        :level="props.level + 1"
        :collapse="props.collapse"
      />
    </el-sub-menu>
  </div>
</template>
