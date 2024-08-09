<script setup lang="ts">
import Button from "primevue/button";
import {useEditContactStore} from "@/stores/editContact.store.ts";

defineProps({
  name: String,
  phoneNumber: String
})

const editContact = useEditContactStore()
</script>

<template>
  <Button v-if="editContact.isEditing && editContact.contact.phoneNumber === phoneNumber" icon="pi pi-times" aria-label="Edit contact" severity="secondary"
          @click="editContact.cancel()"/>
  <Button v-else icon="pi pi-pencil" aria-label="Edit contact" severity="secondary" @click="editContact.isEdit(name, phoneNumber)"/>
</template>
