<script lang="ts" setup>
  import { ElInput } from 'element-plus';
  import { h, reactive, ref } from 'vue';
  import Form from '@/components/Form/index.vue';
  import type { FormProps } from '@/components/Form/types/from';

  defineOptions({
    name: 'RtForm',
  });

  interface FormDataType {
    name: string;
    dateTime?: string;
    cascader?: string[];
    select?: string;
    checkbox?: string[];
    radio?: string;
    slotInput?: string;
    renderInput?: string;
    admin?: number;
  }

  const form = ref<FormDataType>({ name: '' });

  const cascaderOptions = [
    {
      value: 'guide',
      label: 'Guide',
      children: [
        {
          value: 'disciplines',
          label: 'Disciplines',
          children: [
            {
              value: 'consistency',
              label: 'Consistency',
            },
            {
              value: 'feedback',
              label: 'Feedback',
            },
            {
              value: 'efficiency',
              label: 'Efficiency',
            },
            {
              value: 'controllability',
              label: 'Controllability',
            },
          ],
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'side nav',
              label: 'Side Navigation',
            },
            {
              value: 'top nav',
              label: 'Top Navigation',
            },
          ],
        },
      ],
    },
    {
      value: 'component',
      label: 'Component',
      children: [
        {
          value: 'basic',
          label: 'Basic',
          children: [
            {
              value: 'layout',
              label: 'Layout',
            },
            {
              value: 'color',
              label: 'Color',
            },
            {
              value: 'typography',
              label: 'Typography',
            },
            {
              value: 'icon',
              label: 'Icon',
            },
            {
              value: 'button',
              label: 'Button',
            },
          ],
        },
        {
          value: 'form',
          label: 'Form',
          children: [
            {
              value: 'radio',
              label: 'Radio',
            },
            {
              value: 'checkbox',
              label: 'Checkbox',
            },
            {
              value: 'input',
              label: 'Input',
            },
            {
              value: 'input-number',
              label: 'InputNumber',
            },
            {
              value: 'select',
              label: 'Select',
            },
            {
              value: 'cascader',
              label: 'Cascader',
            },
            {
              value: 'switch',
              label: 'Switch',
            },
            {
              value: 'slider',
              label: 'Slider',
            },
            {
              value: 'time-picker',
              label: 'TimePicker',
            },
            {
              value: 'date-picker',
              label: 'DatePicker',
            },
            {
              value: 'datetime-picker',
              label: 'DateTimePicker',
            },
            {
              value: 'upload',
              label: 'Upload',
            },
            {
              value: 'rate',
              label: 'Rate',
            },
            {
              value: 'form',
              label: 'Form',
            },
          ],
        },
        {
          value: 'data',
          label: 'Data',
          children: [
            {
              value: 'table',
              label: 'Table',
            },
            {
              value: 'tag',
              label: 'Tag',
            },
            {
              value: 'progress',
              label: 'Progress',
            },
            {
              value: 'tree',
              label: 'Tree',
            },
            {
              value: 'pagination',
              label: 'Pagination',
            },
            {
              value: 'badge',
              label: 'Badge',
            },
          ],
        },
        {
          value: 'notice',
          label: 'Notice',
          children: [
            {
              value: 'alert',
              label: 'Alert',
            },
            {
              value: 'loading',
              label: 'Loading',
            },
            {
              value: 'message',
              label: 'Message',
            },
            {
              value: 'message-box',
              label: 'MessageBox',
            },
            {
              value: 'notification',
              label: 'Notification',
            },
          ],
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'menu',
              label: 'Menu',
            },
            {
              value: 'tabs',
              label: 'Tabs',
            },
            {
              value: 'breadcrumb',
              label: 'Breadcrumb',
            },
            {
              value: 'dropdown',
              label: 'Dropdown',
            },
            {
              value: 'steps',
              label: 'Steps',
            },
          ],
        },
        {
          value: 'others',
          label: 'Others',
          children: [
            {
              value: 'dialog',
              label: 'Dialog',
            },
            {
              value: 'tooltip',
              label: 'Tooltip',
            },
            {
              value: 'popover',
              label: 'Popover',
            },
            {
              value: 'card',
              label: 'Card',
            },
            {
              value: 'carousel',
              label: 'Carousel',
            },
            {
              value: 'collapse',
              label: 'Collapse',
            },
          ],
        },
      ],
    },
    {
      value: 'resource',
      label: 'Resource',
      children: [
        {
          value: 'axure',
          label: 'Axure Components',
        },
        {
          value: 'sketch',
          label: 'Sketch Templates',
        },
        {
          value: 'docs',
          label: 'Design Documentation',
        },
      ],
    },
  ];

  const formOption = reactive<FormProps<FormDataType>>({
    labelPosition: 'right',
    formItem: [
      {
        gutter: 30,
        itemList: [
          {
            component: 'ElInput',
            label: '输入框1号',
            prop: 'name',
            rules: [{ required: true, type: 'string' }],
            props: {
              onChange: (e: string) => {
                console.log(e);
              },

              // onChange: (e: any) => {
              //   console.log(e);
              // },
            },
          },
          {
            component: 'ElDatePicker',
            label: '时间选择器',
            prop: 'dateTime',
            props: {
              type: 'datetimerange',
              rangeSeparator: 'To',
              startPlaceholder: 'Start date',
              endPlaceholder: 'End date',
            },
          },
          {
            component: 'ElCascader',
            label: '多级选择器',
            props: {
              options: cascaderOptions,
              onVisibleChange: (e: any) => {
                console.log(e);
              },
            },
            prop: 'cascader',
          },
        ],
      },
      {
        gutter: 30,
        itemList: [
          {
            component: 'ElSelect',
            label: '晚上吃什么',
            prop: 'select',

            childrenComponent: {
              options: [
                { label: '吃吃吃就知道吃', value: '吃吃吃就知道吃' },
                { label: '饿着吧！饿死算了', value: '饿着吧！饿死算了' },
              ],
            },
          },
          {
            component: 'ElCheckboxGroup',
            label: '晚上吃什么',
            prop: 'checkbox',
            childrenComponent: {
              options: [
                { label: '选项1', value: '' },
                { label: '选项2', value: '' },
                { label: '选项3', value: '' },
                { label: '选项4', value: '' },
              ],
            },
          },
          {
            component: 'ElRadioGroup',
            label: '晚上吃什么',
            prop: 'radio',
            childrenComponent: {
              options: [
                { label: '吃吃吃就知道吃', value: '吃吃吃就知道吃' },
                { label: '饿着吧！饿死算了', value: '饿着吧！饿死算了' },
              ],
            },
          },
        ],
      },
      {
        gutter: 30,
        itemList: [
          {
            component: 'ElInput',
            label: 'slot组件',
            prop: 'slotInput',
            rules: [{ required: true, type: 'string' }],
          },
          {
            component: '',
            label: 'render组件',
            prop: 'renderInput',
            render: () => {
              return h(ElInput, {
                placeholder: '请输入',
                modelValue: form.value.renderInput,
                'onUpdate:modelValue': (value: string) => {
                  form.value.renderInput = value;
                },
              });
            },
          },
        ],
      },
    ],
  });

  const handlerForm = async (val: string) => {
    if (val === 'vertical') {
      formOption.formItem.map(res => {
        res.md = 24;
        res.lg = 24;
        res.xl = 24;
        return res;
      });
    } else if (val === 'horizontal') {
      formOption.formItem.map(res => {
        delete res.md;
        delete res.lg;
        delete res.xl;
        return res;
      });
    }
  };
  handlerForm('vertical');

  const submitForm = (value: object) => {
    form.value = { ...value, ...form.value };
    // console.log(form.value);
  };
</script>

<template>
  <div class="page-container">
    <div class="config">
      <el-button @click="handlerForm('vertical')"> 垂直 </el-button>
      <el-button @click="handlerForm('horizontal')"> 水平 </el-button>
    </div>
    <Form ref="formRef" :form-data="form" :form-option="formOption" @submit-form="submitForm">
      <template #slotInput="{ formModel }">
        <ElInput v-model="formModel.slotInput" placeholder="自定义输入框" />
      </template>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
  .config {
    margin-bottom: 20px;
  }
</style>
