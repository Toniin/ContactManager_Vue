<script setup lang="ts">
import Button from "primevue/button";
import {useUserStore} from "@/stores/user.store.ts";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const router = useRouter()

const signOut = () => {
  userStore.signOut()
  localStorage.clear();
  router.push("/sign-in")
}
</script>

<template>
  <Button label="Sign out" icon="pi pi-sign-out" severity="secondary" @click="signOut"/>
</template>