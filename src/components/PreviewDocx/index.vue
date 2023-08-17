<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { renderAsync } from 'docx-preview';
  import { isUrl } from '@jsxiaosi/utils';

  const props = defineProps<{
    src: String | ArrayBuffer | Blob;
    requestOption?: RequestInit;
  }>();

  const officeDocx = ref<HTMLElement>();

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

  const fetchDocx = async (src: string) => {
    const res = await fetch(src, props.requestOption);
    if (res.status === 200) {
      if (officeDocx.value) {
        renderAsync(res.blob(), officeDocx.value);
      }
    }
  };
</script>

<template>
  <div ref="officeDocx" class="office-docx"></div>
</template>

<style lang="scss" scoped>
  .office-docx {
    width: 100%;
    height: 100%;
  }
</style>
