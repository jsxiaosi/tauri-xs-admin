import type { Arrayable } from '@vueuse/core';
import type { FormItemRule } from 'element-plus';
import type { VNode } from 'vue';

export interface FormProps<T extends object = any> {
  labelPosition: 'top' | 'right' | 'left';
  formItem: Array<FormItemProps<T>>;
}

export interface FormItemProps<T extends object = object> {
  gutter: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  itemList: Array<FormItemListProps<T>>;
}

/**
 * @param(component) 组件名称，ElInput，ElSelect
 * @param(label) 标签名
 * @param(prop) form表单双向绑定字段
 * @param(props) 组件属性
 * @param(rules) 表单校验
 * @param(childrenComponent) 子组件属性 类似ElSelect、ElCheckboxGroup、ElRadioGroup等组件
 */
export interface FormItemListProps<T extends object = object, P extends keyof T = keyof T> {
  component: string;
  label: string;
  prop: P;
  props?: object;
  rules?: Arrayable<FormItemRule>;
  childrenComponent?: {
    props?: object;
    options?: Array<FormSelectOptProps>;
  };
  render?: (data: { formModel: T; formItem: FormItemListProps<T> }) => VNode | VNode[] | string;
}

export interface FormSelectOptProps {
  label: string;
  value: string | number | boolean;
}

// 暴露：{ formItem: FormItemListProps; formModel: T } 类型
export interface FormItemRenderProps<T extends object = object> {
  formItem: FormItemListProps<T>;
  formModel: T;
}

// slottYPE
export type FormSlotType<T extends object = object> = {
  [key in keyof T]: (props: FormItemRenderProps<T>) => any;
};
