<script setup lang="ts">
import Button from 'primevue/button';
import {useRouter} from "vue-router";
import AddContactForm from "@/components/forms/AddContactForm.vue";

const router = useRouter()

</script>

<template>
  <Button label="Return" icon="pi pi-angle-left" aria-label="Go to add contact" @click="router.go(-1)"/>
  <div class="flex flex-col items-center">
    <h2 class="text-3xl mb-7">Add contact</h2>
    <AddContactForm/>
  </div>
</template>