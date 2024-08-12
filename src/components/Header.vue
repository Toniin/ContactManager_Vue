<script setup lang="ts">
import ButtonSignOut from "@/components/buttons/ButtonSignOut.vue";
import {useUserStore} from "@/stores/user.store.ts";

const userStore = useUserStore()
</script>

<template>
  <header class="flex justify-between py-6">
    <h1 class="text-4xl">ContactModel manager</h1>
    <ButtonSignOut v-if="userStore.isSignIn"/>
  </header>
</template>