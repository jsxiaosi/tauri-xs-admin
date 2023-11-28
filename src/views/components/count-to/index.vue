<script lang="ts" setup>
  import CountTo from '@/components/CountTo/index.vue';
</script>

<template>
  <div class="page-container">
    <CountTo style="font-size: 36px" :num-val="2000"></CountTo>
    <CountTo style="font-size: 36px" type="rebound" :num-val="1234212"></CountTo>
  </div>
</template>
