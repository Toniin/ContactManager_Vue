<script setup lang="ts">
import Button from 'primevue/button';
import {useContactsStore} from '@/stores/contacts.store.ts'
import {ref} from "vue";

const contactsStore = useContactsStore()

const isLoading = ref(false)

const refreshContacts = async () => {
  isLoading.value = true
  // Promise of 1s to show the loading button when form is submitting
  await new Promise((resolve) => {
    return setTimeout(() => {
      resolve(true)
    }, 1000)
  })
  isLoading.value = false

  contactsStore.getContacts()
}
</script>

<template>
  <div class="h-24 flex items-end">
    <Button label="Refresh" icon="pi pi-refresh" @click="refreshContacts" :loading="isLoading"/>
  </div>

</template>