<script setup lang="ts">
  import { isUrl } from '@jsxiaosi/utils';
  import { renderAsync } from 'docx-preview';
  import { onMounted, useTemplateRef, watch } from 'vue';

  const props = defineProps<{
    src: String | ArrayBuffer | Blob;
    requestOption?: RequestInit;
  }>();

  // const officeDocx = ref<HTMLElement>();
  const officeDocx = useTemplateRef<HTMLDivElement>('office-docx');

  const fetchDocx = async (src: string) => {
    const res = await fetch(src, props.requestOption);
    if (res.status === 200) {
      if (officeDocx.value) {
        renderAsync(res.blob(), officeDocx.value);
      }
    }
  };

  const init = () => {
    let data;
    if (isUrl(props.src as string) && typeof props.src === 'string') {
      fetchDocx(props.src);
      return;
    } else if (props.src instanceof ArrayBuffer) {
      data = new Blob([props.src]);
    } else if (props.src instanceof Blob) {
      data = props.src;
    }
    if (officeDocx.value) {
      officeDocx.value.innerHTML = '';
      renderAsync(data, officeDocx.value);
    }
  };

  watch(
    () => props.src,
    () => {
      init();
    },
  );

  onMounted(() => {
    if (props.src) {
      init();
    }
  });
</script>

<template>
  <div ref="office-docx" class="office-docx" />
</template>

<style lang="scss" scoped>
  .office-docx {
    width: 100%;
    height: 100%;
  }
</style>
