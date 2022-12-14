<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import Form from '@/components/Form/index.vue';
  import type { FormProps } from '@/components/Form/types/from';

  defineOptions({
    name: 'RtForm',
  });

  const form = ref<{
    textarea: number;
  }>({ textarea: 0 });

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

  const formOption = reactive<FormProps>({
    labelPosition: 'right',
    formItem: [
      {
        gutter: 30,
        itemList: [
          {
            component: 'ElInput',
            label: '?????????1???',
            prop: 'name',
            rules: [{ required: true, type: 'string' }],
            props: {
              onChange: (e: any) => {
                console.log(e);
              },
            },
          },
          {
            component: 'ElDatePicker',
            label: '???????????????',
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
            label: '???????????????',
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
            label: '???????????????',
            prop: 'select',
            childrenComponent: {
              options: [
                { label: '?????????????????????', value: '?????????????????????' },
                { label: '????????????????????????', value: '????????????????????????' },
              ],
            },
          },
          {
            component: 'ElCheckboxGroup',
            label: '???????????????',
            prop: 'checkbox',
            childrenComponent: {
              options: [
                { label: '??????1', value: '' },
                { label: '??????2', value: '' },
                { label: '??????3', value: '' },
                { label: '??????4', value: '' },
              ],
            },
          },
          {
            component: 'ElRadioGroup',
            label: '???????????????',
            prop: 'radio',
            childrenComponent: {
              options: [
                { label: '?????????????????????', value: '?????????????????????' },
                { label: '????????????????????????', value: '????????????????????????' },
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
            label: 'slot??????',
            prop: 'slotInput',
            rules: [{ required: true, type: 'string' }],
          },
          {
            component: '',
            label: 'render??????',
            prop: 'renderInput',
            render: ({ formModel, formItem }) => {
              return h('input', {
                placeholder: '?????????',
                value: formModel[formItem.prop],
                onChange: (e: any) => {
                  formModel[formItem.prop] = e.target.value;
                },
              });
            },
          },
        ],
      },
    ],
  });

  const handlerForm = async (val: string) => {
    if (val == 'vertical') {
      formOption.formItem.map((res) => {
        res.md = 24;
        res.lg = 24;
        res.xl = 24;
        return res;
      });
    } else if (val == 'horizontal') {
      formOption.formItem.map((res) => {
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
      <el-button @click="handlerForm('vertical')">??????</el-button>
      <el-button @click="handlerForm('horizontal')">??????</el-button>
    </div>
    <Form ref="formRef" :form-option="formOption" @submit-form="submitForm">
      <template #slotInput="{ formModel, formItem }">
        <el-input
          v-model="formModel[formItem.prop]"
          :type="formItem.inputType"
          placeholder="??????????????????"
        ></el-input>
      </template>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
  .config {
    margin-bottom: 20px;
  }
</style>
