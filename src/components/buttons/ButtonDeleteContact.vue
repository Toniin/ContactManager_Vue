<script setup lang="ts">
import Button from 'primevue/button';
import {useContactsStore} from '@/stores/contacts.store.ts'
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";

const contactsStore = useContactsStore()
const toast = useToast();
const confirm = useConfirm();

defineProps({
  phoneNumber: String
})

const confirmDelete = (phoneNumber) => {
  confirm.require({
    group: 'deleteContact',
    message: 'This action cannot be undone. This will permanently delete your contact from our servers.',
    header: 'Are you sure you want to delete this contact ?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteContact(phoneNumber)
    },
    reject: () => {
    }
  });
};

const deleteContact = (phoneNumber: string) => {
  contactsStore.deleteContact(phoneNumber)
      .then(() => {
        contactsStore.getContacts()

        toast.add({
          severity: 'success',
          summary: contactsStore.message,
          detail: `Contact with phone ${phoneNumber} is deleted`,
          group: 'br',
          life: 3000
        });
      })
      .catch((error) => {
        toast.add({
          severity: 'error',
          summary: "You do not have permission",
          group: 'br',
          life: 3000
        });
      })
}
</script>

<template>
  <Button icon="pi pi-trash" aria-label="Delete contact" severity="danger" @click="confirmDelete(phoneNumber)"/>
</template>