<script lang="ts" setup generic="T extends Object">
  import { onMounted, reactive, shallowRef, useTemplateRef } from 'vue';
  import type { Arrayable } from '@vueuse/core';
  import type { ElForm, FormItemRule } from 'element-plus';
  import FormItem from './src/components/FormItem.vue';
  import type { FormProps, FormSlotType } from './types/from';

  const props = defineProps<{
    formData?: T;
    formOption: FormProps<T>;
    rules?: Partial<Record<string, Arrayable<FormItemRule>>>;
  }>();

  const emit = defineEmits<{
    (e: 'submitForm', form: T): void;
  }>();

  defineSlots<FormSlotType<T>>();

  const form = reactive<T>(props.formData || ({} as T));

  // const formRef = ref();
  const fromRef = useTemplateRef<InstanceType<typeof ElForm>>('form-ref');

  onMounted(() => {});

  // function setFormModel(key: string, value: any) {
  //   form[key] = value;
  // }

  const submitForm = () => {
    fromRef.value?.validate((value: any) => {
      console.log(value);
    });
    console.log(form);
    emit('submitForm', shallowRef(form).value);
  };

  const resetForm = () => {};

  defineExpose({
    form,
  });
</script>

<template>
  <div>
    <el-form ref="form-ref" :rules="rules" :model="form" :label-position="formOption.labelPosition" label-width="120px">
      <el-row v-for="(f, fix) in formOption.formItem" :key="fix" :gutter="f.gutter || 30">
        <el-col
          v-for="(fItem, fItemIx) in f.itemList"
          :key="fItemIx"
          :xs="f.xs || 24"
          :sm="f.sm || 24"
          :md="f.md || 12"
          :lg="f.lg || 8"
          :xl="f.xl || 8"
        >
          <FormItem :form-item="fItem" :form-model="form">
            <template v-for="item in Object.keys($slots)" #[item]="data">
              <slot :name="item as keyof T" v-bind="data || {}" />
            </template>
          </FormItem>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> Create </el-button>
        <el-button @click="resetForm()"> Reset </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
