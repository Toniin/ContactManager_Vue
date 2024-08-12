<script setup lang="ts">
import Button from 'primevue/button';
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div className="h-full flex flex-col items-center justify-center gap-10">
    <h2 className="text-9xl">404</h2>
    <h3 className="text-4xl">Page not found</h3>

    <Button label="Return" icon="pi pi-angle-left" severity="secondary" @click="router.go(-1)"/>
  </div>
</template>