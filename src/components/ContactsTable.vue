<script setup lang="ts">
import {ref, watch} from "vue";
import DataTable from 'primevue/treetable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import {useContactsStore} from '@/stores/contacts.store.ts'
import {contactsTable} from "@/models/Contact.model.ts";
import ButtonDeleteContact from "@/components/ButtonDeleteContact.vue"

const contacts = ref<contactsTable[]>([])
const contactsStore = useContactsStore()

contactsStore.getContacts()

watch(contactsStore.contacts, () => {
  contacts.value = contactsStore.contacts
})
</script>

<template>
  <DataTable :value="contacts" tableStyle="min-width: 50vw">
    <Column style="width: 1%">
      <template #body="slotProps">
        <Avatar :image="`https://api.dicebear.com/9.x/personas/svg?seed=${slotProps.node.data.phoneNumber}`"
                size="xlarge" shape="circle"/>
      </template>
    </Column>
    <Column field="phoneNumber" header="Phone number" style="width: 30%"></Column>
    <Column field="name" header="Name"></Column>
    <Column style="width: 1%">
      <template #body="slotProps">
        <ButtonDeleteContact :phoneNumber="slotProps.node.data.phoneNumber"/>
      </template>
    </Column>
  </DataTable>
</template>