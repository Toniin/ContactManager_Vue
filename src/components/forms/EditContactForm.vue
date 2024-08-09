<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {editContactFormSchema} from "@/models/Contact.model.ts";
import {useContactsStore} from "@/stores/contacts.store.ts";
import {useToast} from "primevue/usetoast";
import InputGroup from 'primevue/inputgroup';
import {useEditContactStore} from "@/stores/editContact.store.ts";

const contactsStore = useContactsStore()
const toast = useToast();
const editContact = useEditContactStore()

const {
  defineField,
  handleSubmit,
  isSubmitting
} = useForm({
  validationSchema: toTypedSchema(editContactFormSchema),
  initialValues: {
    name: editContact.contact.name,
  },
});

const [name, nameAttrs] = defineField('name');

const onSubmitEditContact = async (values) => {
  // Promise of 1s to show the loading button when form is submitting
  await new Promise((resolve) => {
    return setTimeout(() => {
      resolve(true)
    }, 1000)
  })

  const editedContact = {
    name: values.name,
    phoneNumber: editContact.contact.phoneNumber,
  }

  contactsStore.editContact(editedContact)
      .then(() => {
        editContact.isEditing = false
        editContact.contact = {
          name: '',
          phoneNumber: '',
        }

        contactsStore.getContacts()

        toast.add({
          severity: 'success',
          summary: contactsStore.message,
          detail: `Contact with phone ${editedContact.phoneNumber} is renamed`,
          group: 'br',
          life: 3000
        });
      })
}

const onSubmit = handleSubmit(onSubmitEditContact);
</script>

<template>
  <form class="flex flex-col gap-10" @submit.prevent="onSubmit" @keydown.enter.prevent="onSubmit">
    <InputGroup>
      <InputText id="name" v-model="name" v-bind="nameAttrs" autofocus/>
      <Button type="submit" label="Save" :disabled="isSubmitting" :loading="isSubmitting"/>
    </InputGroup>
  </form>
</template>