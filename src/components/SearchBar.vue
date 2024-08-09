<script setup lang="ts">
import Button from "primevue/button";
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {searchContactFormSchema} from "@/models/Contact.model.ts";
import {useContactsStore} from "@/stores/contacts.store.ts";
import InputMask from "primevue/inputmask";
import {phoneValidator_FR} from "@/utils/phone.validator.ts";
import {reactive} from "vue";
import InputGroup from 'primevue/inputgroup';

const contactsStore = useContactsStore()
const errorForm = reactive({
  isError: false,
  message: ""
})

const {
  defineField,
  handleSubmit,
  isSubmitting,
  resetForm
} = useForm({
  validationSchema: toTypedSchema(searchContactFormSchema),
  initialValues: {
    phoneNumber: '',
  },
});

const [phoneNumber, phoneNumberAttrs] = defineField('phoneNumber');

const onSubmitEditContact = async ({phoneNumber}) => {
  if (!phoneValidator_FR(phoneNumber)) {
    return;
  }

  // Promise of 1s to show the loading button when form is submitting
  await new Promise((resolve) => {
    return setTimeout(() => {
      resolve(true)
    }, 1000)
  })

  contactsStore.getContact(phoneNumber)
      .then(() => {
        errorForm.isError = false
        errorForm.message = ""
        resetForm()
      })
      .catch(error => {
        errorForm.isError = true
        errorForm.message = error.message
      })
}

const onSubmit = handleSubmit(onSubmitEditContact);
</script>

<template>
  <form class="w-1/3 h-24 flex flex-col justify-end" @submit.prevent="onSubmit" @keydown.enter.prevent="onSubmit">
    <label for="search-contact" class="text-xl">Search contact</label>
    <InputGroup class="mt-3">
      <InputMask id="search-contact" v-model="phoneNumber" v-bind="phoneNumberAttrs" :autoClear="false"
                 mask="(+33)9 99 99 99 99"
                 placeholder="(+33)1 23 45 67 89"
                 fluid
                 autofocus/>

      <Button type="submit" icon="pi pi-search" aria-label="Search contact"
              :disabled="!phoneValidator_FR(phoneNumber)|| isSubmitting"
              :loading="isSubmitting"/>
    </InputGroup>
    <small v-if="errorForm.isError" id="phone-error" class="text-red-500">{{ errorForm.message }}</small>
  </form>
</template>