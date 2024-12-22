// https://element-plus.org/zh-CN/component/icon.html
import {
  ArrowDown,
  ArrowRight,
  Avatar,
  Briefcase,
  CaretLeft,
  CaretRight,
  FullScreen,
  Grid,
  HomeFilled,
  Management,
  Operation,
  Printer,
  Refresh,
  RemoveFilled,
  Select,
  Setting,
} from '@element-plus/icons-vue';
import {
  ElAlert,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCalendar,
  ElCard,
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElCol,
  ElCollapseTransition,
  ElColorPicker,
  ElDatePicker,
  ElDescriptions,
  ElDescriptionsItem,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInfiniteScroll,
  ElInput,
  // 指令
  ElLoading,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElProgress,
  ElRadio,
  ElRadioGroup,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSubMenu,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElTag,
  ElText,
  ElTooltip,
} from 'element-plus';

import type { App, Component } from 'vue';

// Directives
const plugins = [ElLoading, ElInfiniteScroll];

const components = [
  ElTag,
  ElButton,
  ElInput,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElIcon,
  ElTooltip,
  ElDrawer,
  ElRow,
  ElCol,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElForm,
  ElFormItem,
  ElAlert,
  ElDatePicker,
  ElCascader,
  ElSelect,
  ElOption,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
  ElTable,
  ElTableColumn,
  ElCalendar,
  ElTabs,
  ElTabPane,
  ElDivider,
  ElSwitch,
  ElProgress,
  ElColorPicker,
  ElText,
  ElCollapseTransition,
];

// Icon
export const iconComponents = [
  HomeFilled,
  Avatar,
  Operation,
  Grid,
  Setting,
  RemoveFilled,
  Refresh,
  CaretLeft,
  CaretRight,
  ArrowDown,
  Management,
  Select,
  ArrowRight,
  FullScreen,
  Briefcase,
  Printer,
];

const transElIconName = (iconName: string): string => {
  return `iEL${iconName.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}`;
};

export function useElementPlus(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(component.name as string, component);
  });
  // 注册指令
  plugins.forEach(plugin => {
    app.use(plugin);
  });
  // 注册图标
  iconComponents.forEach((component: Component) => {
    app.component(transElIconName(component.name as string), component);
  });
}
