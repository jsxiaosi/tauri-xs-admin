<script setup lang="ts"></script>

<template>
  <router-view>
    <template #default="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </template>
  </router-view>
</template>
