<script setup lang="ts">
import ContactsTable from "@/components/ContactsTable.vue";
import ConfirmDialog from "primevue/confirmdialog";
import Button from 'primevue/button';
import SearchBar from "@/components/SearchBar.vue";
import ButtonRefreshContacts from "@/components/buttons/ButtonRefreshContacts.vue";
import {useContactsStore} from "@/stores/contacts.store.ts";

const contactsStore = useContactsStore()
</script>

<template>
  <ButtonRefreshContacts v-if="contactsStore.isSearching" class="my-8"/>
  <SearchBar v-else class="my-8"/>
  <ContactsTable/>

  <div class="fixed bottom-5 right-1/4">
    <Button as="router-link" icon="pi pi-plus" aria-label="Go to add contact" to="/contacts/add"/>
  </div>

  <ConfirmDialog group="deleteContact">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
        <i :class="message.icon" class="!text-5xl"></i>
        <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
        <p class="mb-0">{{ message.message }}</p>
        <div class="w-full flex justify-end items-center gap-4 mt-6">
          <Button severity="secondary" outlined @click="rejectCallback" class="w-32">Cancel</Button>
          <Button severity="danger" @click="acceptCallback" class="w-32">Delete</Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>