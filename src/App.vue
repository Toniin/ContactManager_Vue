<script setup>
import {RouterView} from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <Header/>
  <main>
    <RouterView/>
  </main>
</template>

<style scoped>
:global(body) {
  font-family: "Lucida Console", "Courier New", monospace;

  display: flex;
  justify-content: center;
}
</style>
