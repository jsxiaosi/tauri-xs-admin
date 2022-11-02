<script setup lang="ts">
  // import { useMouse } from '@vueuse/core';
  // import { ref } from 'vue';
  import { $ref } from 'vue/macros';

  let stem = $ref('admin');

  // 公共方法里面使用$ref导出ref
  function useMouse() {
    let x = $ref(0);
    let y = $ref(0);
    // 如果直接导出x,y会被识别{x.value,y.value}这样就会使出ref响应式，使用$$()可以保持响应式相当于{x:ref(0),y:ref(0)}
    return $$({
      x,
      y,
    });
  }

  // 通过
  let { x, y } = $(useMouse());
  console.log(x);
  // // $ref解构方法返回的ref
  // const { x, y } = $(useMouse());
  // console.log(x, y);

  const updateStem = () => {
    stem = 'update';
    x = 200;
  };
</script>

<template>
  <div class="page-container" @click="updateStem"> {{ stem }}-{{ x }}-{{ y }} </div>
</template>

<style scoped lang="scss"></style>
