<script setup lang="ts">
import {provide, reactive, ref, watch} from "vue";
import DataTable from 'primevue/treetable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import {useContactsStore} from '@/stores/contacts.store.ts'
import {contactsTable} from "@/models/Contact.model.ts";
import ButtonDeleteContact from "@/components/buttons/ButtonDeleteContact.vue"
import ButtonEditContact from "@/components/buttons/ButtonEditContact.vue";
import {useEditContactStore} from "@/stores/editContact.store.ts";
import EditContactForm from "@/components/forms/EditContactForm.vue";

const contactsStore = useContactsStore()
const contacts = ref<contactsTable[]>([])
const editContact = useEditContactStore()

contactsStore.getContacts()

watch(contactsStore.contacts, () => {
  contacts.value = contactsStore.contacts
})
</script>

<template>
  <DataTable :value="contacts" tableStyle="min-width: 50vw">
    <Column class="w-0">
      <template #body="slotProps">
        <Avatar :image="`https://api.dicebear.com/9.x/personas/svg?seed=${slotProps.node.data.phoneNumber}`"
                size="xlarge" shape="circle"/>
      </template>
    </Column>
    <Column field="phoneNumber" header="Phone number" style="width: 30%"></Column>
    <Column field="name" header="Name" #body="slotProps">
      <template v-if="editContact.isEditing && editContact.contact.phoneNumber === slotProps.node.data.phoneNumber">
        <EditContactForm />
      </template>
      <template v-else>
        {{ slotProps.node.data.name }}
      </template>
    </Column>
    <Column class="w-0" #body="slotProps">
      <ButtonEditContact class="mr-2" :name="slotProps.node.data.name" :phoneNumber="slotProps.node.data.phoneNumber"/>
      <ButtonDeleteContact :phoneNumber="slotProps.node.data.phoneNumber"/>
    </Column>
  </DataTable>
</template>