<script setup lang="ts">
  import type { DirectiveBinding, VNode } from 'vue';
  import { getCurrentInstance, nextTick, ref } from 'vue';
  import TsComponents from '@/components/TsxComponents';
  const env = import.meta.env;
  nextTick(() => {
    console.log('渲染完了？');
  });

  const dirValue = ref('');

  const vMyDirective = {
    // 指令具有一组生命周期钩子：
    // 在绑定元素的 attribute 或事件监听器被应用之前调用
    created(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
      console.log('created', el, binding, vnode);
    },
    // 在绑定元素的父组件挂载之前调用
    beforeMount(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
      console.log('beforeMount', el, binding, vnode);
    },
    // 在绑定元素的父组件挂载之后调用
    mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
      console.log('mounted', el, binding, vnode);
    },
    // 在包含组件的 VNode 更新之前调用
    beforeUpdate(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVNode: VNode) {
      console.log('beforeUpdate', el, binding, vnode, prevVNode);
    },
    // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
    updated(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, prevVNode: VNode) {
      el.innerHTML = binding.value;
      console.log('updated', el, binding, vnode, prevVNode);
    },
    // 在绑定元素的父组件卸载之前调用
    beforeUnmount() {},
    // 在绑定元素的父组件卸载之后调用
    unmounted() {},
  };

  setTimeout(() => {
    dirValue.value = '通过自定义指令插入的内容';
  }, 2000);

  const instance = getCurrentInstance();
  // console.log(t())
  // store.commit(mutation.SET_USER, '进来了是吗？？？？')
  // console.log(useStore())
</script>

<template>
  <div class="page-container">
    <TsComponents />
    <div>获取环境变量：{{ env.VITE_ENV }}</div>
    <div>获取原型方法：{{ instance?.appContext.config.globalProperties.foo }}</div>
    <div v-my-directive="dirValue"></div>
  </div>
</template>

<style scoped lang="scss"></style>
