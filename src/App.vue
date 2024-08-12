<script setup lang="ts">
import {RouterView} from "vue-router";
import Header from "./components/Header.vue";
import Toast from 'primevue/toast';
</script>

<template>
  <Header/>
  <main class="h-3/4">
    <RouterView/>
    <Toast position="bottom-right" group="br"/>
  </main>
</template>